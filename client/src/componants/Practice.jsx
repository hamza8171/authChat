import React,{useState,useEffect} from 'react'
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import {Link} from  'react-router-dom'
import http from '../../constants/Api'
import { environment } from '../../constants/index.development'
import e from 'express'


const Practice=()=>{
      
    
    const defaultValidationErrors = {
		mail: [],
		name: [],
		text: [],
		phone: [],
	};
const [validationError,setValidationError]=useState(defaultValidationErrors);


const [inputValue, setInputValue] = useState(0)
const [User,setUser]=useState([]);
const [Uid,setUserId]=useState([]);



        const deleteUser=()=>{

             

             console.log(User[0]._id)

        }


   
    const body={
        email:"b@gmail.com",
        password:"b41333"

    }

    const getUser=()=>{
        http.get(environment.api_url+"/user").then((res)=>{

            console.log(res.data)
           setUser(res.data)
           
        })
    }


useEffect(()=>{

},[inputValue])





return (
<>
<h1>Location:{inputValue}</h1>
<button onClick={()=>{setInputValue(inputValue=>inputValue+1)}}>INC++</button>
<h1>  delete segment</h1>



<button onClick={deleteUser}> delete curent User</button>

</>
);



}

export default Practice