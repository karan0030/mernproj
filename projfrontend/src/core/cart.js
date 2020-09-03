import React ,{useState,useEffect}from 'react';
import Base from '../core/Base'

import {API } from "../backend"
import Card from './card';
import { getAllProducts } from './helper/coreapicalls';
import { loadCart } from './helper/cardHelper';
import PaymentB from './Paymentb';


export default function Cart(){
    
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)
    
     useEffect(() => {
        setProducts(loadCart())
     }, [reload])

    const loadAllProucts =(products)=>{
        
        
        return (
            <div >
            <h2>load products</h2>
            {products.map((product,index)=>{
              return (
                <Card 
                key={index}
                product={product}
                addtocart={false}
                removefromCart={true} 
                reload={reload}
                setReload={setReload}
                />
                
              )})}
              
            </div>
        )
    }

    const loadCheckout =()=>{
        return (
            <div>
            <h2>checkout</h2></div>
        )
    }
    return (
        <Base title="Cart Page" description="Checkout">
        <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProucts(products)
          ) : (
            <h4>No products</h4>
          )}
        </div>
        <div className="col-6">
          <PaymentB products={products} setReload={setReload} />
        </div>
      </div>

      </Base>
  
    )
}