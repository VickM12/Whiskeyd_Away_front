import React, {useState, useEffect} from 'react';
import SignUp from './components/SignUp.js'
import Whiskeys from './components/Whiskeys.js';
import './App.css';
import { Route, Link, BrowserRouter as Router } from "react-router-dom"
const endpoint = process.env.REACT_APP_API_KEY
const DEV_PORT = process.env.DEV_PORT
// import background from './components/imgs/barrel.jpg'


function App() {
  const [state, setState] = useState({
    username:'',
    password:'',
    isLoggedIn: false
  })
  const [isLoggedIn, seIsLoggedIn] = useState(false)
  const [whiskeys, setWhiskeys] = useState([])
  const [formInputs, updateFormInputs] = useState({
    name: '',
    distiller: '',
    origin:'',
    image:''
  })

/////////////////////////////////////////////
////////// Handle Signup/Registration///////
////////////////////////////////////////////
const handleSignUp = (event) =>{
  setState({...state, [event.target.name]: event.target.value})
}

const handleRegister = async(event) =>{
  event.preventDefault();
  try{
    const response = await fetch(/*`${endpoint}/users`,*/ `http://localhost:3000/users`, {
    body: JSON.stringify(formInputs),
    method:'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
} catch (error){
  console.log(error)
}
}
//////////////////////////////////////////////
/////////////Submit New Whiskey//////////////
////////////////////////////////////////////
  const handleChange = (event) =>{
    const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value})
    updateFormInputs(updateInput)
  }
  const handleSubmit = async (event) =>{
    event.preventDefault()
    try {
      const response = await fetch(/*`${endpoint}/whiskeys`,*/ `${DEV_PORT}/whiskeys`, {
        body: JSON.stringify(formInputs),
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
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
/////////////////////////////////////////
////////End New Whiskey//////////////////
////////////////////////////////////////

///////////////////////////////////////
//////////Get Whiskey Data////////////
/////////////////////////////////////
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
////////////////////////////////////
////////End Get Whiskey Data///////
//////////////////////////////////

// const getData = async() => {
// try {
  // const response = await fetch('endpoint', 
  // {
  //   body: JSON.stringify(),
  //   method:'GET',
  //   headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json'
  //   }
  // })

  // const whiskeyData = await response.json()
  // await setWhiskeys(whiskeyData)
  // console.log(whiskeyData)
  // } catch (error){
  //   console.log(error)
  //   } 
  // }

  ////////////////////////////////////////////
  ////////////// Delete a Whiskey ////////////
  ///////////////////////////////////////////
  const handleDelete = async (event) => {
    try{
      await fetch(`http://localhost/3000/whiskeys/${whiskeys.params.id}`, 
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
////////////////////////////////////////
///////// End Delete Whiskey////////////
////////////////////////////////////////

  useEffect(() => {
    (async function () {
        await getData();
    })();
    }, []);

  return (
    <div className="App">
      {/* <img src={background} alt="barrel" /> */}
     <nav>
       <h2>Sign Up Here</h2>
       <Router>
         <Route 
         path='/users/signup'
         render={(props) => {
           return(
             <SignUp
             isLoggedIn={isLoggedIn}
             handleChange={handleChange}
             handleRegister={handleRegister}
             />
           )
         }}
         />
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

export default App;
