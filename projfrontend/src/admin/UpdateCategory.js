import React ,{useState,useEffect} from 'react';
import Base from '../core/Base';
import {Link } from 'react-router-dom'
import {getCategory, updateCategory} from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper';



const UpdateCategory=({match})=>{

  const[name,setName]=useState("");
const {user,token}= isAuthenticated();
    const [values,setValues] =useState({
        namex:"",
       
        getRedirect:false,
        formData:"",
        error:"",
        loading:false,
        createdCategory:""

    });
   
    const { 
            namex,error,getRedirect,formData,loading,createdCategory
           }= values;

    const preload =(categoryId)=>{
        getCategory(categoryId).then(data=>{
           
            if(data.error){
                setValues({...values,error:error.data})
            }
            else{
                
                setValues({
                    ...values,
                     name:data.name,
                     formData:new FormData
                     
                })
                
                console.log(data.name);
            }
        }).catch(err=>console.log(err))
    }  
    
    

    useEffect(() => {
        preload(match.params.categoryId)
       
    }, [])
   
 
    const  handleChange =event=>{
      
      setName(event.target.value)
      
  }
  //   const handleChange =name=>event=>{
  //     const value= name===""?"":event.target.value
  //     setValues({name:event.target.value})
  //     setValues({...values,[name]:event.target.value})
  // }

    const onSubmit=(event)=>{
        event.preventDefault();
        setValues({...values,error:"",loading:true});
        console.log(" setting ",{name},name);
        updateCategory(match.params.categoryId,user._id,token,{name}).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,
                    name:"",
                    
                    loading:false,
                    createdCategory:data.name})
            }
        })

    }

    const successMessage=()=>(
        <div className="alert alert-success mt-3" style={{display : createdCategory?"":"none"}}>
        <h4>{createdCategory} Updated</h4>
        </div>
           
    
       
    )

    const warningMessage=()=>{
        if(error){
            return <h4 className="text-warning">Update failed !!!! </h4>
        }
       
    }

    const createProductForm = () => (
        <form >
         
          <div className="form-group">
            <input
              onChange={handleChange}
              name="newname"
              className="form-control"
              placeholder="Name"required
              value={name}
            />
          </div>
          
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Update Category
          </button>
        </form>
      );



    return(
        <Base title="Update Category" description="update category here" className="container bg-info p-4">
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

export default UpdateCategory;