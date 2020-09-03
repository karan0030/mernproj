import React, { useState } from 'react';
import Base from '../core/Base';
import {  Link,Redirect } from 'react-router-dom'
import {  signin ,isAuthenticated, authenticate } from "../auth/helper";


const SignIn = () => {

    const [values,setValues] =useState({
        
        email:"",
        password:"",
        error:"",
        didRedirect:false,
        loading:false

    })

const {password,email,error,didRedirect,loading}=values;
const {user}  = isAuthenticated()

const handleChange =name=>event=>{
    setValues({...values,error:false,[name]:event.target.value})
}

const onSubmit =event=>{
    event.preventDefault()
    setValues({...values,error:false,loading:true})
    signin({email,password})
    .then(data=>{
        if(data.error){
            setValues({...values ,error:data.error,loading:false})
        }
        else{

            authenticate(data,()=>{
                setValues({...values,didRedirect:true})
            })
           

        }
    })
    .catch(console.log("error in sign in "))
}
const redirect =()=>{
    if(didRedirect){
        if(user && user.role===1){
            return <Redirect to="admin/dashboard"/>
        }
        return <Redirect to="user/dashboard"/>

    }
    if( isAuthenticated())
    {
        return   <Redirect to="/"/>

    }
}

const loadingMessage = () => {
    return (
        loading && (
            <div className="alert alert-info">
            <h2>Loading......</h2>
            </div>
        )
      );
    };
  
    const errorMessage = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>
          </div>
        </div>
      );
    };

    const SignInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                       
                        <div className='form-group'>
                            <label className="text-light">Email</label>
                            <input value={email}className='form-control' 
                            onChange={handleChange("email")} type="text"></input>
                        </div>
                        <div className='form-group'>
                            <label className="text-light">password</label>
                            <input
                            onChange={handleChange("password")}  value={password}
                             className='form-control' type="password"></input>
                        </div>
                        <button className="btn btn-success btn-block " onClick={onSubmit} >Submit</button>
                    </form>
                </div>

            </div>

        )
    }
    return (
        <Base title="Sign In" description='SignIn  for user'>
    
         {loadingMessage()}
         {errorMessage()}
        {SignInForm()}
        {redirect()}
        <p className="text-center text-white">pp {JSON.stringify({values})}</p>
        
        </Base>

    )
}

export default SignIn;