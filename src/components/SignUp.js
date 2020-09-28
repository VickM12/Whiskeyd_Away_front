import React, {useState} from 'react';
export default function SignUp(props){
  // const [state, setState] = useState({
  //   user:{
  //   username: '',
  //   password: '',
  //   }
  //   // isLoggedIn: false
  // })
  // const handleSignUp = (event) =>{
  //   const updateSignUp = Object.assign({}, state, { [event.target.id]: event.target.value})
  //   setState(updateSignUp)
  // }
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const handleRegister = async(event) =>{
  //   event.preventDefault();  
  //   try{
  //     const response = await fetch('http://localhost:3000/users', {
  //       body: JSON.stringify(state),
  //       method: 'POST',
  //       headers: {
  //           'Accept': 'application/json, text/plain, */*',
  //           'Content-Type': 'application/json',
  //           withCredentials: true
  //         }
  //   })
  //   console.log(response)
  //   console.log(state)
  //   setState({
  //     user:{
  //         username: '',
  //         password: ''
  //   }})
  // } catch (error){
  //   console.log(error)
  // }
  // }
  return(
    <div>
      <h2>Please Register</h2>

      <form>
          <label htmlFor='username'>Choose a Username</label>
          <input type='text' id='username' onChange={props.handleUserForm} /><br/>
          <label htmlFor='password'>Select a Password</label>
          <input type='text' id='password' onChange={props.handleUserForm} /><br/>
          <input value='submit' type='submit' onClick={props.handleRegister} />
      </form>
    </div>
  )
}