import React, {useState, useEffect} from 'react';
// import NavBar from './components/NavBar.js'
import {storage} from './firebase/firebase'
import SignUp from './components/SignUp.js'
import LogInForm from './components/LogInForm.js'
import LogOut from './components/LogOut.js'
import Whiskeys from './components/Whiskeys.js';
import NewWhiskey from './components/NewWhiskey.js';
import './App.css';
import aws, { CodeBuild } from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import axios from 'axios'
// import { response } from 'express';


const endpoint = 'https://whiskey-api.herokuapp.com/whiskeys'
const PORT = process.env.DEV_PORT
const imageEndPoint = process.env.REACT_APP_AWS_API_ENDPOINT
const key = process.env.REACT_APP_API_KEY
const id = process.env.AWS_ID

export default function App() {
  const [state, setState] = useState({
    user:{
    username: '',
    password: '',
    isLoggedIn: false
    }
  })

  const handleUserForm = (event) =>{
    // const updateUserForm = Object.assign({}, {user:{...state.user,  [event.target.id]: event.target.value}})
    // setState(updateUserForm)
    setState({...state, [event.target.id]: event.target.value})
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleChange = (event) =>{
    const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value})
    updateFormInputs(updateInput)
  }

  const [whiskeys, setWhiskeys] = useState([])
  const fileState = {selectedFile: null}
  const [formInputs, updateFormInputs] = useState({
    name: '',
    distiller: '',
    origin:'',
    image:''
  })

aws.config.update({
  secretAccessKey: key,
  accessKeyId: id,
  region: 'us-east-1'
})
const s3 = new aws.S3()
//==================================
//        Register New User
//==================================


const handleRegister = async(event) =>{
  event.preventDefault();
  try{
    const response = await axios.post('http://localhost:3000/users', {
        user:{
        username: state.username,
        password: state.password
        }
  })
  localStorage.token = response.data.token
  setIsLoggedIn(true)
  console.log(response)
  console.log(state)
  .then(setState({
    user:{
        username: '',
        password: ''
  }})
  )} catch (error){
  console.log(error)
}
}
//==================================
//            Log In/Out
//==================================
const handleLogIn = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post("http://localhost:3000/users/login",{
      user:{
      username: state.username,
      password: state.password,
      }
    });
    localStorage.token = response.data.token;
    setIsLoggedIn(true);
    console.log('response is ', response)
    console.log('state is ', state)
    console.log(localStorage.token)
  } catch (error) {
    console.log(error);
  }
};

const handleLogOut = () => {
  setState({
    username: "",
    password: "",
    isLoggedIn: false,
  });
  localStorage.clear();
};


//==================================
//        Upload Whiskey Image
//==================================

const allInputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)
console.log(imageAsFile)

const fileChangedHandler = (event) => {
  const image = event.target.files[0]
  setImageAsFile(imageFile => (image))
}
// const fileChangedHandler = (req, fileState, cb)=>{
//   if (fileState.mimetype === 'image/jpeg' || fileState.mimetype === 'image/png'){
//     cb(null, true)
//   }else {
//     console.log('Invalid File Type, only jpg/png')
//     }
// }
//==================================
//        Submit New Whiskey
//==================================

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const uploadHandler= (event) =>{
    console.log('start of upload')
      if(imageAsFile === ''){
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)}
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      }
    // multer({
    //   fileChangeHandler: this.fileChangeHandler,
    //   storage: multerS3({
    //     s3: s3,
    //     bucket: 'whiskeydaway',
    //     acl: 'public-read',
    //     metadata: function(req, file, cb){
    //       cb(null, {filedName: 'Test Data'})
    //     },
    //     key: function (req, file, cb){
    //       cb(null, Date.now().toString())
    //     }
    //   })
    // })
  //     try {
  //      const res = await axios.post(URL, key, {
  //       headers: {
  //         "Access-Control-Allow-Headers" : "application/json, image/jpg, image/png",
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Methods": "POST,GET"
  //       },         
  //       body: JSON.stringify(payload)
  //       })
  //     //  return res.json()
  //     console.log(payload)
  //   console.log(res)
  //     } catch (error){
  //     console.log(error)
  //   }
  // }
  uploadHandler()
    try {
      const response = await  fetch(/*`${endpoint}/whiskeys`,*/ `http://localhost:3000/whiskeys`, {
        body: JSON.stringify(formInputs, fileState.selectedFile),
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain, password/plain, image/jpeg, image/png,  */*',
          'Content-Type': 'application/json'
        }
      })
      const data =/* await*/ response.json()
     
      updateFormInputs({
        name: '',
        distiller: '',
        origin:'',
        image:''
      })
      setWhiskeys([data, ...whiskeys])
      console.log(formInputs)
    } catch(error) {
      console.log(error)
    }
    
    updateFormInputs({
      name: '',
      distiller: '',
      origin:'',
      image:''
    })
  }


//==================================
//        Get Whiskey Data
//==================================
  const getData = async() =>{
    try {
    const response = await fetch(/*`${endpoint}/whiskeys`, */`http://localhost:3000/whiskeys`)
    
    const whiskeyData = await response.json()
    setWhiskeys(whiskeyData)
       console.log(whiskeyData)
  } catch (error) {
    console.error(error)
  }
}

//==================================
//       Delete a Whiskey
//==================================

  const handleDelete = async (event) => {
    try{
      await fetch(`http://localhost/3000/whiskeys/${whiskeys.id}/destroy`, 
        {
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
  }catch (error){
    console.log(error)
  }
  }

  useEffect(() => {
    (async function () {
        await getData();
        if (localStorage.token){
          setIsLoggedIn(true);
        }else {
          setIsLoggedIn(false)}
    })();
    }, [isLoggedIn]);

  return (
    <div className="App">
<Router>
     <nav>
       <div>
         { isLoggedIn ? '' :
         <SignUp
            isLoggedIn={isLoggedIn}
            username={state.username}
            password={state.password}
            handleUserForm={handleUserForm}
            handleRegister={handleRegister}
           />
          }
        </div>
          <div>
            { isLoggedIn ? '' :
             <LogInForm
            isLoggedIn={isLoggedIn}
            username={state.username}
            password={state.password}
            handleUserForm={handleUserForm}
            handleLogIn={handleLogIn} 
           /> }
         </div>
        <div>
          {isLoggedIn ? 
          <LogOut isLoggedIn={isLoggedIn} handleLogOut =
          {handleLogOut} /> : ''}
        </div>
        <div className="newWhiskey">
          { isLoggedIn ?     
            <NewWhiskey 
            fileChangedHandler = {fileChangedHandler}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              formInputs={formInputs} /> : ''
           }
        </div>
      </nav>
      </Router>
    {/* </Switch> */}
      <main>
       { /*</main><Route
        path='/'
        render={(props) => {
          return */ }<Whiskeys /*isLoggedIn={isLoggedIn}*/whiskeyData = {whiskeys} handleDelete= {handleDelete}  />
      </main>
     
      
    </div>
  );
}