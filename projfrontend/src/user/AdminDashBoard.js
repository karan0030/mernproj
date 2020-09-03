import React from 'react';
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom'


const AdminDashBoard = () => {
  const { user: { name, email, role } } = isAuthenticated();
  
  
  const leftAdmin = () => {
    return (
      <div className="card">
        <h4 className="text-white bg-dark card-header">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link text-success" to='/admin/create/category'>
              Create Category
             </Link>
          </li>
          <li className="list-group-item">
          <Link className="nav-link text-success" to='/admin/categories'>
            Manage Category
           </Link>
        </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to='/admin/create/product'>
              Create Products
             </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to='/admin/products'>
              Manage Product
             </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to='/admin/orders'>
              Manage Order
             </Link>
          </li>
        </ul>
      </div>
    )

  }
  const rightAdmin = () => {
    return (
      <div className="card mb-4">
        <h4 className=" card-header">Admin Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
           <h5> <span className="badge badge-success mr-2">Name :</span>{name}</h5>
          </li>
          <li className="list-group-item">
            <h5><span className="badge badge-success mr-2">Email :</span>{email}</h5>
          </li>
          <li className="list-group-item">
          <h5>  <span className="badge badge-danger mr-2">Admin Area :</span></h5>
          </li>
          
        </ul>
      </div>
    )


  }
  return (
    <Base title="Welcome To Admin" description="Manage products here"
      className="container bg-success p-4">
      <div className="row">
        <div className="col-3">
          {leftAdmin()}
        </div>
        <div className="col-5">
          {rightAdmin()}
        </div>
      </div>


    </Base>
  )

}

export default AdminDashBoard;