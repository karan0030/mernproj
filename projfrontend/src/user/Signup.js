import React, { useState } from "react";
import Base from "../core/Base";
import { Route, Link } from "react-router-dom";
import {  signup } from "../auth/helper";

const SignUp = () => {
    
        const [values,setValues] =useState({
            name:"",
            email:"",
            password:"",
            error:"",
            success:false
        })
    
    const {name,password,email,error,success}=values;

    const handleChange =name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    
    const onSubmit =event=>{
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password})
        .then(data=>{
            if(data.error){
                setValues({...values ,error:data.error,success:false})
            }
            else{
                setValues({...values,error:"",name:"",passowrd:"",success:true})

            }
        })
        .catch(console.log("error in sign up"))
    }



    const SignUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className='form-group'>
                            <label className="text-light">User name</label>
                            <input 
                            className='form-control' onChange={handleChange("name")} 
                            type="text" value={name}></input>
                        </div>
                        <div className='form-group'>
                            <label className="text-light">Email</label>
                            <input
                             className='form-control'onChange={handleChange("email")}
                              type="text" value={email}></input>
                        </div>
                        <div className='form-group'>
                            <label className="text-light">password</label>
                            <input 
                            className='form-control'onChange={handleChange("password")} 
                            type="password" value={password}></input>
                        </div>
                        <button className="btn btn-success btn-block " onClick={onSubmit}>Submit</button>
                    </form>
                </div>

            </div>

        )
    }

 const successMessage = () => {
    return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-success"
              style={{ display: success ? "" : "none" }}
            >
              New account was created successfully. Please{" "}
              <Link to="/signin">Login Here</Link>
            </div>
          </div>
        </div>
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

    return (
        <Base title="Sign up" description="Signup  for user">
         
        {successMessage()}
        {errorMessage()} 
        {SignUpForm()}
        
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default SignUp;
