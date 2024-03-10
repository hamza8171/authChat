import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { environment } from '../constants/index.development'
import http    from '../constants/Api/index'
import Contact from './componants/contct'
import  Navbar  from './componants/Nav'
import Practice from './componants/Practice'
import {BrowserRouter,Route,Outlet,Routes,Link,useLocation} from 'react-router-dom'


function App() {
  let UNIT_PRICE=10;
  const [count, setCount] = useState(1)
  const [loading,setLoading]=useState(false);
  const [tprice ,setPrice]=useState(0);
  const [emaill,setEmaill]=useState("");
  const [formD,setform]=useState({
    email:"",
    password:""
  })
  const [image,setImage]=useState("")
  useEffect(()=>{
setPrice(count*UNIT_PRICE);
  },[count])
   

const setEmail=(e)=>{
    setform({...formD,email:e.target.value});
    console.log(e.target.value);
}
const setPassword=(e)=>{
setform({...formD,password:e.target.value});


}

const body={
  email:formD.email,
  password:formD.password,
  status:"active",
  id:"24442344242"
}
const handleSubmit2=()=>{

  console.log("hamza");
  http.post(environment.api_url+"/user/signup",body).then((res)=>{

    console.log(res.data.user)
  }).catch((err)=>{
  console.log("error",err)
})



}

  return (
    
<>
    {loading &&  <div>
    <h1>baby ={tprice}</h1>
    <h1>Quantity ={count}</h1>
   
    <button onClick={()=>setCount((count)=>count+1)}>Add cart</button>

    <form>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" onChange={(e)=>setEmail(e)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" onChange={(e)=>{setPassword(e)}} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button    type="submit" class="btn btn-primary">Submit</button>
</form>



<button onClick={handleSubmit2} className="btn btn-success">register User</button>



</div>}
         


   

<Routes>
  <Route path="contact" element={<Contact/>}   />
  <Route path="/Nav" element={<Navbar/>}   />
  <Route path="Practice" element={<Practice/>}/>


</Routes>
<Link to={"/contact"} className="btn-btn success">
                <span className="iconify" data-icon="noto-v1:back-arrow">Contact</span>
              </Link>

    <Link to={"/Nav"} className="back-btn">
                <span className="iconify" data-icon="noto-v1:back-arrow">Nav</span>
              </Link>
      <Link to="/Practice">Practice</Link>
</>
  )}

export default App
