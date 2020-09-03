const { API } = require("../../backend");

export const getAllProducts = () => {
    return fetch(`${API}/product`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));
  };