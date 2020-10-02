import React, {useState, useEffect} from 'react';
// import NavBar from './components/NavBar.js'
import SignUp from './components/SignUp.js'
import LogInForm from './components/LogInForm.js'
import LogOut from './components/LogOut.js'
import Whiskeys from './components/Whiskeys.js';
import NewWhiskey from './components/NewWhiskey.js';
import MyFavs from './components/MyFavs.js'
import AgeModal from './components/AgeModal.js'
import './App.css';
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom"
import axios from 'axios'
const endpoint = 'https://whiskey-api.herokuapp.com'
const PORT = process.env.DEV_PORT

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
    const response = await axios.post(`${PORT}/users`, {
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
    const response = await axios.post(`http://localhost:3000/users/login`,{
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
    console.log('response is ', response)
    console.log('state is ', state)
    console.log(`received token is ${response.data.token}`)
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
      const response = await fetch(`${endpoint}/whiskeys`, {
        body: JSON.stringify(formInputs),
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain, text/password */*',
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
    const getFavs = await fetch(`http://localhost:3000/ledgers/${localStorage.id}/whiskeys`);

    const favData = await getFavs.json()
    setFavs(favData)
    console.log(getFavs)
       console.log(favData)
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
  <AgeModal />
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
              handleSubmit={handleSubmit}
              handleChange={handleChange}
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
              <li><h2>{fav.whiskey.name}</h2></li>
              <li><img src={fav.whiskey.image} alt={fav.whiskey.name} /></li>
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

