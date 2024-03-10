import {react,useState} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import {environment} from '../../constants/index.development'
import http    from '../../constants/Api/index'
import { useNavigate } from "react-router-dom";


const Navbar=()=>{

    const Navigate=useNavigate();
    const [formD,setform]=useState({
        email:"",
        password:""
      })

const handleChange=(e)=>{

if(e.target.name=="email"){
    setform({...formD,email:e.target.value});
}
if(e.target.name=="password"){
    setform({...formD,password:e.target.value});
}

}

const body={
    email:formD.email,
    password:formD.password
}


const handleSubmit=()=>{
    console.log(formD.email);
    console.log(formD.password);

    http.post(environment.api_url+"/user/login",body).then((res)=>{
        if(res.data.user.role){
                Navigate("/contact");
        }
    }).catch((err)=>{
        console.log("err",err);
    })

}





return (

<>

<form action="" >

<label>
    emial:
    <input    type="text"  onChange={(e)=>handleChange(e)}   name="email" /><br/>
    password:
    <input type="password"   onChange={(e)=>handleChange(e)}  name="password" /><br/>
  </label>




</form>
<button onClick={handleSubmit} >login</button>





</>





)



}

export default Navbar