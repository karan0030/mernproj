import React,{useState,useEffect} from 'react'
import Imagehelper from './helper/Imagehelper';
import { addItemCard, removeItemFromCart } from './helper/cardHelper';
import {Redirect} from 'react-router-dom'

    const Card = (
       { product, addtocart=true, removefromCart=false,reload=undefined,setReload=f=>f}
    ) => {
         
         const [redirect, setRedirect] = useState(false)
         const [count, setCount] = useState(product.count)
         
         const getRedirect=redirect=>{
           if(redirect){
             return <Redirect to="/cart"/>
           }

         }
         const addToCart=()=>{
           addItemCard(product,()=>setRedirect(true))
         }

         const cardTitle =product?product.name:"Coming Soon"
         const cardDescription =product?product.description:"Coming Soon"
         const cardPrice =product?product.price:" < 20"

         const showaddtoCart=(addtocart)=>(
            
          addtocart&& (
            <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
          )

         )

         const  showremoveFromCart=removefromCart=>(
           removefromCart&&(
            <button
            onClick={() => { removeItemFromCart(product._id); setReload(!reload)}}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>

           )
         ) 


         

        return (
          <div className="card text-white bg-dark border border-info p-1 bm-3 mt-3 ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
            {getRedirect(redirect)}
              <div className="rounded border border-success p-1">
                <Imagehelper product={product}/>
              </div>
              <p className="lead bg-success font-weight-normal text-wrap">
                {cardDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
              <div className="row">
                <div className="col-12">
                 {showaddtoCart(addtocart)}
                </div>
                <div className="col-12">
                  {showremoveFromCart(removefromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };





export default Card;
