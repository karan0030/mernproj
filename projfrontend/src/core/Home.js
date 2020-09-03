import React ,{useState,useEffect}from 'react';
import Base from '../core/Base'

import {API } from "../backend"
import Card from './card';
import { getAllProducts } from './helper/coreapicalls';


export default function Home(){
    
    const [products,setProducts]=useState([]);
    const [error,setError]=useState("");
 
    const LoadAllProducts=()=>{
    getAllProducts().then(data=>{
      if(data.error){
        setError(data.error)
      }
      else{
        setProducts(data)
      }
    })
  }
  
  useEffect(() => {
     LoadAllProducts();
  }, [])
    
    return (
        <Base title="Home Page" description="welcome to home page">
        <div className="row text-center">
        <h1 className="row text-center text-white">All T-Shirts</h1>
        <div className="row">
          {products.map((product,index)=>{
            return (
              <div key={index} className="col-4 bm-4 mt-4">
              <Card product={product}/>
              </div>
            )
          })
        }
          </div>
        </div>
      </Base>
  
    )
}