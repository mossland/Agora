import abi from "../contracts/ProposalVoting.json";

export const contractABIProposalVoting = abi;
import Web3 from "web3";

export const createNewProposalTx = async (
  wallet,
  startDate,
  endDate,
  proposalIdMongo
) => {
  const ethereumProvider = window.ethereum;
  const web3 = new Web3(ethereumProvider);

  const contractAddress = import.meta.env.VITE_APP_VOTING_CONTRACT;

  const contract = new web3.eth.Contract(
    contractABIProposalVoting,
    contractAddress.toString().toLowerCase()
  );

  const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
  const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

  // Set up transaction data
  const data = contract.methods
    .createProposal(startTimestamp, endTimestamp, proposalIdMongo)
    .encodeABI();

  // Estimate the gas limit required for the transaction
  const estimatedGasLimit = await web3.eth.estimateGas({
    to: contractAddress.toString().toLowerCase(),
    from: wallet,
    data: data,
  });

  // Fetch current gas price from the network
  const gasPrice = await web3.eth.getGasPrice();

  //Set up transaction parameters
  const transactionParameters = {
    to: contractAddress.toString().toLowerCase(), // Contract interacting with
    from: wallet, // User's wallet address
    gas: estimatedGasLimit,
    gasPrice: gasPrice,
    data: contract.methods
      .createProposal(startTimestamp, endTimestamp, proposalIdMongo)
      .encodeABI(),
  };

  // Sign the transaction
  try {
    const txHash = await web3.eth.sendTransaction(transactionParameters);
    console.log(txHash);
    return txHash;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
};

export const castVote = async (wallet, proposalId, vote) => {
  const ethereumProvider = window.ethereum;
  const web3 = new Web3(ethereumProvider);

  const contractAddress = import.meta.env.VITE_APP_VOTING_CONTRACT;

  let voteValue;
  switch (vote) {
    case "For":
      voteValue = 0;
      break;
    case "Against":
      voteValue = 1;
      break;
    case "Abstain":
      voteValue = 2;
      break;
    default:
      throw new Error("Invalid vote");
  }

  const contract = new web3.eth.Contract(
    contractABIProposalVoting,
    contractAddress.toString().toLowerCase()
  );

  // Set up transaction data
  const data = contract.methods.vote(proposalId, voteValue).encodeABI();

  // Estimate the gas limit required for the transaction
  const estimatedGasLimit = await web3.eth.estimateGas({
    to: contractAddress.toString().toLowerCase(),
    from: wallet,
    data: data,
  });


  // Fetch current gas price from the network
  const gasPrice = await web3.eth.getGasPrice();

  //Set up transaction parameters
  const transactionParameters = {
    to: contractAddress.toString().toLowerCase(), // Contract interacting with
    from: wallet, // User's wallet address
    data: contract.methods.vote(proposalId, voteValue).encodeABI(),
    gas: estimatedGasLimit,
    gasPrice: gasPrice,
  };

  // Sign the transaction
  try {
    const txHash = await web3.eth.sendTransaction(transactionParameters);
    return txHash;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
};

export const getProposalResult = async (proposalId) => {
  const ethereumProvider = window.ethereum;
  const web3 = new Web3(ethereumProvider);

  const contractAddress = import.meta.env.VITE_APP_VOTING_CONTRACT;

  const contract = new web3.eth.Contract(
    contractABIProposalVoting,
    contractAddress.toString().toLowerCase()
  );

  try {
    // Call the getResult function from the contract
    const result = await contract.methods.getResult(proposalId).call();

    // Return the result
    return result;
  } catch (error) {
    console.error("Error fetching proposal result:", error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
};
