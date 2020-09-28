import React, {useState, useEffect} from 'react';
import SignUp from './components/SignUp.js'
import LogInForm from './components/LogInForm.js'
import LogOut from './components/LogOut.js'
import Whiskeys from './components/Whiskeys.js';
import './App.css';
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom"
import axios from 'axios'
const endpoint = 'https://whiskey-api.herokuapp.com/whiskeys'
const PORT = process.env.DEV_PORT

export default function App() {
  const [state, setState] = useState({
    user:{
    username: '',
    password: '',
    // isLoggedIn: false
    }
  })

  const handleUserForm = (event) =>{
    const updateUserForm = Object.assign({}, state, { [event.target.id]: event.target.value})
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
      // body: JSON.stringify({
        user:{
        username: state.username,
        password: state.password
        }
      //   }),
      // method: 'POST',
      // headers: {
      //     'Accept': 'application/json, text/plain, */*',
      //     'Content-Type': 'application/json',
          // withCredentials: true
        // }
  })
  console.log(response)
  console.log(state)
  setState({
    user:{
        username: '',
        password: ''
  }})
} catch (error){
  console.log(error)
}
}
//==================================
//            Log In/Out
//==================================
const handleLogIn = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post("http://localhost:3000/users/login", {
      username: state.username,
      password: state.password,
    });
    localStorage.token = response.data.token;
    setIsLoggedIn(true);
    console.log(response)
    console.log(localStorage.token)
  } catch (error) {
    console.log(error);
  }
};

const handleLogOut = () => {
  setState({
    email: "",
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
      const response = await fetch(/*`${endpoint}/whiskeys`,*/ `${DEV_PORT}/whiskeys`, {
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
  const whiskeyData = await response.json()
  await setWhiskeys(whiskeyData)
  console.log(whiskeyData)
  } catch (error){
    console.log(error)
    } 
  }

  const handleDelete = async (event) => {
    try{
      await fetch(`http://localhost/3000/whiskeys/${whiskeys.id}`, 
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
    }, []);

  return (
    <div className="App">

     <nav>
       <h2>Sign Up Here</h2>
       <Router>
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
         /> */}
         <h2>Sign In Here</h2>
          <LogInForm
            isLoggedIN={isLoggedIn}
            username={state.username}
            password={state.password}
            handleUserForm={handleUserForm}
            handleLogIn={handleLogIn}
            />
            
                <LogOut isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
             
       <h2>Submit a whiskey!</h2>
       <form className="new" onSubmit={handleSubmit}>
         <label htmlFor="name">Name</label>
         <input type='text' id='name' value={formInputs.name}
         onChange={handleChange}/>
         <label htmlFor='distiller'>Distillery</label>
         <input type='text' id='distiller' value={formInputs.distiller}
         onChange={handleChange} />
         <label htmlFor="origin">Origin</label>
         <input type='text' id='origin' value={formInputs.origin}
         onChange={handleChange}/>
         <label htmlFor='img'>Image</label>
         <input type='text' id='image' value={formInputs.image}
         onChange={handleChange}/>
         <input type="submit" className="submit"/>
       </form>
       </Router>
     </nav>
      <main>
        <Whiskeys whiskeyData = {whiskeys} handleDelete= {handleDelete}  />
      </main>
      
    </div>
  );
}

