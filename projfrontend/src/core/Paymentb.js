import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { getmeToken, processPayment } from './helper/PaymentHelper';
import {Link} from 'react-router-dom'
import {createOrder} from './helper/OrderHelper'
import DropIn from 'braintree-web-drop-in-react';
import { loadCart, emptyCart } from './helper/cardHelper';


const PaymentB=({ products, setReload = f => f, reload = undefined })=>{

    const [info, setInfo] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:{}
    })
       
    const userId = isAuthenticated() &&isAuthenticated().user._id
    const token = isAuthenticated() &&isAuthenticated().token

    const getToken=(userId,token)=>{
       
        getmeToken(userId,token).then(info=>{
            console.log("INFORMATION  ",info)
            if(info.error){
                setInfo({...info ,error:info.error})
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }  
    
    useEffect(() => {
        getToken(userId,token)
    }, [])
    
    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
          nonce = data.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount()
          };
          processPayment(userId, token, paymentData)
            .then(response => {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
              const orderData ={
                  products:products,
                  transaction_id:response.transaction.id,
                  amount:response.amount
              }
              createOrder(userId,token,orderData)

              emptyCart(()=>{
                  console.log("cart empty")
              })
              
              setReload(!reload)
            })
            .catch(error => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED");
            });
        });
      };
    
      const getAmount = () => {
        let amount = 0;
        products.map(p => {
          amount = amount + p.price;
        });
        return amount;
      };
    

    const showDropin=()=>{
        return (
            <div>
            {info.clientToken!==null && products.length > 0?(
                <div>
                <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={(instance) => (info.instance = instance)}
                />
                <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>
              </div>

            ):(<h3 className="text-white">please login</h3>)}
            </div>
        )
    }

    


    return(
        <div>
        <h3>Your bill amount is {getAmount()} $</h3>
        {showDropin()}
        </div>
        
    )

}

export default PaymentB;