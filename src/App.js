import React, {useState, useEffect} from 'react';
import NavBar from './components/NavBar.js'
import SignUp from './components/SignUp.js'
import LogInForm from './components/LogInForm.js'
import LogOut from './components/LogOut.js'
import Whiskeys from './components/Whiskeys.js';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import axios from 'axios'
const endpoint = 'https://whiskey-api.herokuapp.com/whiskeys'
const PORT = process.env.DEV_PORT

export default function App() {
  const [state, setState] = useState({
    user:{
    username: '',
    password: '',
    isLoggedIn: false
    }
  })

  const handleUserForm = (event) =>{
    const updateUserForm = Object.assign({}, {user:{...state.user,  [event.target.id]: event.target.value}})
    setState(updateUserForm)
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleChange = (event) =>{
    const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value})
    updateFormInputs(updateInput)
  }

  const [whiskeys, setWhiskeys] = useState([])

  const [formInputs, updateFormInputs] = useState({
    name: '',
    distiller: '',
    origin:'',
    image:''
  })

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
//        Submit New Whiskey
//==================================

  const handleSubmit = async (event) =>{
    event.preventDefault()
    try {
      const response = await fetch(/*`${endpoint}/whiskeys`,*/ `${PORT}/whiskeys`, {
        body: JSON.stringify(formInputs),
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain, password/plain */*',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      updateFormInputs({
        name: '',
        distiller: '',
        origin:'',
        image:''
      })

      
      setWhiskeys([data, ...whiskeys])
      console.log(formInputs)
    }catch(error) {
      console.log(error)
    }
    
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
     <NavBar is LoggedIn={isLoggedIn} />
       <div className='body'>
       {/* <Switch> */}
          {/* <Route 
         path='/users/signup'
         render={(props) => {
           return( */}
             <SignUp
              isLoggedIn={isLoggedIn}
              username={state.username}
              password={state.password}
              handleUserForm={handleUserForm}
              handleRegister={handleRegister}
             />
           {/* )
         }}
         />   */}
          {/* <Route
          path='/users/login'
          render={(props) =>{
            return( */}
              <LogInForm
                isLoggedIn={isLoggedIn}
                username={state.username}
                password={state.password}
                handleUserForm={handleUserForm}
                handleLogIn={handleLogIn} 
                />
            {/* );
          }}
          /> */}
          {/* <Route
          path='/logout'
          render={(props) =>{
            return( */}
              <LogOut isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
            {/* )
          }}
          /> */}
             
       <h2>Submit a whiskey!</h2>
       <form className="new" onSubmit={handleSubmit}>
         <label htmlFor="name">Name</label>
         <input type='text' id='name' value={formInputs.name}
         onChange={handleChange}/><br/>
         <label htmlFor='distiller'>Distillery</label>
         <input type='text' id='distiller' value={formInputs.distiller}
         onChange={handleChange} /><br/>
         <label htmlFor="origin">Origin</label>
         <input type='text' id='origin' value={formInputs.origin}
         onChange={handleChange}/><br/>
         <label htmlFor='img'>Image</label>
         <input type='text' id='image' value={formInputs.image}
         onChange={handleChange}/>
         <input type="submit" className="submit"/>
       </form>
        
      </div></Router>
    {/* </Switch> */}
      <main>
       { /*</main><Route
        path='/'
        render={(props) => {
          return */ }<Whiskeys /*isLoggedIn={isLoggedIn}*/whiskeyData = {whiskeys} handleDelete= {handleDelete}  />
        
         {/* }}
         /> */}
      </main>
     
      
    </div>
  );
}

