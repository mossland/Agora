const requestHeaders = (auth) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: auth
      
    },
  };
};

export default requestHeaders;
