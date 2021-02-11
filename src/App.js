
import React, {useState, useEffect} from 'react';
// import NavBar from './components/NavBar.js'
import {storage} from './firebase/firebase'
import SignUp from './components/SignUp.js'
import LogInForm from './components/LogInForm.js'
import LogOut from './components/LogOut.js'
import Whiskeys from './components/Whiskeys.js';
import NewWhiskey from './components/NewWhiskey.js';
import MyFavs from './components/MyFavs.js'
import AgeModal from './components/AgeModal.js'
import './App.css';
import aws, { CodeBuild } from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom"
import axios from 'axios';
require('dotenv').config();
// import { response } from 'express';
// const endpoint = 'https://whiskey-api.herokuapp.com/whiskeys'
// const PORT = process.env.DEV_PORT
// const imageEndPoint = process.env.REACT_APP_AWS_API_ENDPOINT
// const key = process.env.REACT_APP_API_KEY
// const id = process.env.AWS_ID
const endpoint = 'https://whiskey-api.herokuapp.com'
const PORT = 'http://localhost:3000'


export default function App() {
  const [state, setState] = useState({
    user:{
    id: '',
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
const allInputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)

  const [whiskeys, setWhiskeys] = useState([])
  const fileState = {selectedFile: null}
  const [formInputs, updateFormInputs] = useState({
    name: '',
    distiller: '',
    origin:'',
    image: ''
  })

// aws.config.update({
//   secretAccessKey: key,
//   accessKeyId: id,
//   region: 'us-east-1'
// })
// const s3 = new aws.S3()
//==================================
//        Register New User
//==================================


const handleRegister = async(event) =>{
  event.preventDefault();
  try{
    const response = await axios.post(`${endpoint}/users`, {
        user:{
        username: state.username,
        password: state.password
        }
  })
  localStorage.token = response.data.token
  localStorage.id = response.data.id
  localStorage.username = response.data.username
  setIsLoggedIn(true)
  // console.log(response)
  // console.log(state)
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
    const response = await axios.post(`${endpoint}/users/login`,{
      user:{
      id: state.id,
      username: state.username,
      password: state.password,
      }
    });
    localStorage.token = response.data.token;
    localStorage.id = response.data.user.id;
    localStorage.username = response.data.user.username;
    setIsLoggedIn(true);
    setState(state)
    // console.log('response is ', response)
    // console.log('state is ', state)
    // console.log(`received token is ${response.data.token}`)
    // console.log(localStorage.token)
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


// console.log(imageAsFile)

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

    const uploadHandler= async(event) =>{
      event.preventDefault()
      try{
    console.log('start of upload')
      if(imageAsFile === ''){
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)}
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot)
        }, (err) => {
          //catches the errors
          console.log(err)
        }, () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage.ref('images').child(imageAsFile.name).getDownloadURL()
           .then(fireBaseUrl => {
            setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            console.log(fireBaseUrl)
             console.log(`image url is: ${imageAsUrl}`)
           })
        })
        }catch(error){
          console.log(error)
        }
  
    }
    const handleSubmit = async (event) =>{
    event.preventDefault()
      
    try{
      // uploadHandler()
      const response = await fetch(`${endpoint}/whiskeys`, /*`http://localhost:3000/whiskeys`*/ {
        body: JSON.stringify({whiskey: {
          name: formInputs.name,
          distiller: formInputs.distiller,
          origin: formInputs.origin,
          image: imageAsUrl.imgUrl
        }
      }),
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain, password/plain, image/jpeg, image/png,  */*',
          'Content-Type': 'application/json'
        }
      })
      // console.log(response.image)
      const data = await response.json()
     
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
  }


//==================================
//        Get Whiskey Data
//==================================
  const getData = async() =>{
    try {
    const response = await fetch(`${endpoint}/whiskeys`, /*`http://localhost:3000/whiskeys`*/)
    
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
     const deleteResponse = await axios.delete(`${endpoint}/whiskeys/${whiskeys.id}` 
       ).then(response => response.json())
      console.log(deleteResponse)
  }catch (error){
    console.log(error)
  }
  }

//========================
//    Show Favorites
//========================
const [favs, setFavs] = useState([])
const showFavs = async(event) =>{
  try{
    const getFavs = await fetch(`${endpoint}/ledgers/${localStorage.id}/whiskeys`);

    const favData = await getFavs.json()
    setFavs(favData.whiskeys)
    // console.log(getFavs)
      //  console.log(favData.whiskeys)
  } catch (error) {
    console.error(error)
  }
  }
//=======================
//    Use Effect
//=======================
  useEffect(() => {
    (async function () {
        await getData();
        if (localStorage.token){
          setIsLoggedIn(true);
          if (localStorage.token === 'undefined'){
            setIsLoggedIn(false)
          }
        }else {
          setIsLoggedIn(false)}
          // await showFavs();
    })();
    }, [/*isLoggedIn*/]);


  return (
    <div className="App">
      
<Router>
  { isLoggedIn ? '' :
  <AgeModal /> }
     <nav>
       { isLoggedIn ? 
       <h1>Welcome {localStorage.username}!</h1> : '' }
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
        {/* <div>
        {isLoggedIn ? 
          <Link to={MyFavs}>My Favorites </Link> : ''}
        </div> */}
        <div className="newWhiskey">
          { isLoggedIn ?     
            <NewWhiskey 
            fileChangedHandler = {fileChangedHandler}
              handleSubmit={handleSubmit}
              uploadHandler={uploadHandler}
              handleChange={handleChange}
              imageAsUrl={imageAsUrl}
              formInputs={formInputs} /> : ''
           }
        </div>
      </nav>
      </Router>
    {/* </Switch> */}
      <main>
        <h1>The Whiskey List</h1>
        <div className='whiskey'>
      {isLoggedIn ?  
       <Whiskeys isLoggedIn={isLoggedIn}
          whiskeyData = {whiskeys} 
          handleDelete= {handleDelete}
          state = {state} /> : ''}
          </div>
       { isLoggedIn ? 
          <div>
          <h1>Your Favorite Whiskeys, {localStorage.username}</h1>
          <button onClick={showFavs}>Show Favorite Whiskeys</button>
           
        <div className='favs'>
          
          { favs.map(fav => {
            return(
              <div className="favCards">
            <ul key={fav.whiskey_id}>
              <li><h2>{fav.name}</h2></li>
              <li><img src={fav.image} alt={fav.name} /></li>
            </ul>
            </div>
            )})}  
          </div> 
        </div>: '' 
      }
          {/* <MyFavs isLoggedIn={isLoggedIn} */}
          {/* favData = {favs}/> */}
      </main>
     
      
    </div>
  );
}