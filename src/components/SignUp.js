import React from 'react';
export default function SignUp(props){
  return(
    <div>
      <h2>Please Register</h2>

      <form>
          <label htmlFor='username'>Choose a Username</label>
          <input type='text' name='username' value={props.username}onChange={props.handleSignUp} /><br/>
          <label htmlFor='password'>Select a Password</label>
          <input type='text' name='password' value={props.password}onChange={props.handleSignUp} /><br/>
          <input value='submit' type='submit' onClick={props.handleRegister} />
      </form>
    </div>
  )
}