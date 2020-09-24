const { API } = require("../../backend");

 
export const getmeToken =(userid,token)=>{
    return fetch(`${API}/payment/gettoken/${userid}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`

        }
    }).then(response=> {return response.json()})
    .catch(err=> {return err.json()})
}

export const processPayment=(userid,token,paymentInfo)=>{
    return fetch(`${API}/payment/braintree/${userid}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`

        },
        body: JSON.stringify( paymentInfo)
    }).then(response=> {return response.json()})
    .catch(err=> {return err.json()})
}