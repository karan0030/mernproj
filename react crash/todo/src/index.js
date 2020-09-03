import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import User from './user'
import NotFound from './notfound'
import Visit from './visit'


const routing=<Router>
    <div>
      <ul>
       <li><Link to="/">Home</Link></li>
       <li><Link to="/user">User</Link></li>
       <li><Link to="/visit">Visit</Link></li>
       
      </ul>
    </div>
   <Switch>
  <Route exact  path='/' component={App}/>
  <Route  path='/user' component={User}/>
  
  <Route  path='/visit' component={Visit}/>
  <Route  exact component={NotFound}/>
  </Switch>
  

</Router>


ReactDom.render(routing,document.getElementById('root'));
