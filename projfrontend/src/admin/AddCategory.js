import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import {Link} from 'react-router-dom'
import {createCategory} from './helper/adminapicall'

const AddCategory=()=>{
   
     const [name,setName]=useState("");
     const [error,setError]=useState("");
     const [success,setSuccess]=useState("");
     
    const {user,token} =isAuthenticated();
    
    const  handleChange =event=>{
        setError("")
        setName(event.target.value)
        
    }
    const successMessage=()=>{
        if(success){
            return <h4 className="text-success">Category added </h4>
        }
       
    }

    const warningMessage=()=>{
        if(error){
            return <h4 className="text-warning">Adding creating failed !!!! </h4>
        }
       
    }
    
    const onSubmit =(event)=>{
        event.preventDefault();
        setSuccess(false)
        setError("")

        createCategory(user._id,token,{name}).then(data=>{
            if(data.error){
                setError(true)

            }
            else{
                setSuccess(true)
                setName("")
            }
        }).catch(error=>{console.log("error in create category")})
    }

    const myCategoryForm =()=>(
        <form>
        <div className="form-group">
        <p className="lead" >Enter Category</p>
        <input type="text"
        placeholder="Eg summer"
        required autoFocus
        onChange={handleChange}
        value={name}
        
        
        className="form-control my-3"></input>
        <button onClick={onSubmit} className="btn btn-outline-info">Add Category</button>
        </div>
        </form>
    )
    const goBack= ()=>(
        <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )
    return(
        <Base className="container p-4 bg-info" 
        title="Create Category Here" description="Add New category">
        <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
        
        {myCategoryForm()}
       
        {goBack()}
        {successMessage()}
        {warningMessage()}
        </div>
        </div>

        </Base>
    )
}

export default AddCategory;