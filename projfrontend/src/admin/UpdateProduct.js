import React ,{useState,useEffect} from 'react';
import Base from '../core/Base';
import {Link } from 'react-router-dom'
import {getCategories, getProduct,updateProduct} from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper';



const UpdateProduct=({match})=>{
    
const {user,token}= isAuthenticated();
    const [values,setValues] =useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        error:"",
        getRedirect:false,
        formData:"",
        category:"",
        categories:[],
        loading:false,
        createdProduct:""

    });
   
    const { 
            name,description,price,stock,photo,error,getRedirect,formData,category,
            categories,loading,createdProduct
           }= values;

    const preload =(productId)=>{
        getProduct(productId).then(data=>{
           
            if(data.error){
                setValues({...values,error:error.data})
            }
            else{
                getAllCategories()
                //console.log(data.category,"-- ")
                setValues({
                    ...values,
                     name:data.name,
                     description:data.description,
                     price:data.price,
                     stock:data.stock,
                     photo:data.photo,
                     category:data.category._id,
                     formData:new FormData
                     
                })
                
                console.log(categories.name);
            }
        }).catch(err=>console.log(err))
    }  
    
    const getAllCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values,error:error.data})
            } 
            else{
                setValues({categories:data,formData:new FormData})
            }
        })
    }

    useEffect(() => {
        preload(match.params.productId)
       
    }, [])

    const handleChange =name=>event=>{
        const value= name==="photo"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setValues({...values,error:"",loading:true});
        updateProduct(match.params.productId,user._id,token,formData).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,
                    name:"",
                    description:"",
                    price:"",
                    stock:"",
                    photo:"",
                    loading:false,
                    createdProduct:data.name})
            }
        })

    }

    const successMessage=()=>(
        <div className="alert alert-success mt-3" style={{display : createdProduct?"":"none"}}>
        <h4>{createdProduct} Updated</h4>
        </div>
           
    
       
    )

    const warningMessage=()=>{
        if(error){
            return <h4 className="text-warning">Update failed !!!! </h4>
        }
       
    }

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                required
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"required
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"required
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"required
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {
                  categories && categories.map((cate,index)=>(
                      <option key={index} value={cate._id} >{cate.name}</option>
                  ))
              }
            </select>
          </div>
          
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              required
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Update Product
          </button>
        </form>
      );



    return(
        <Base title="Update Product" description="update product here" className="container bg-info p-4">
         <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-4"> Admin Home</Link>
         <div className="row bg-dark text-white rounded">
         <div className="col-md-8 offset-md-2 mb-3 mt-3">
         {successMessage()}
         {warningMessage()}
          {createProductForm ()}
         </div>
         </div>
        </Base>
    )
}

export default UpdateProduct;