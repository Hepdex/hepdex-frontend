const tokenUpdater = (token) => localStorage.setItem("token", token);

const getToken = (tokeName) => localStorage.getItem(tokeName);

const userDataUpdater = (data) => localStorage.setItem("userData", JSON.stringify(data));

export  {tokenUpdater, getToken, userDataUpdater};