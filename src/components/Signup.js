import React from 'react';

export function SignUp(props){
  return(
    <div>
      <h2>Please Register</h2>

      <form>
        
          <label htmlFor='username'>Choose a Username</label>
          <input type='text' name='username' onChange={props.handleSignup} /><br/>
          <label htmlFor='password'>Select a Password</label>
          <input type='password' name='password' onchange={props.handleSignup} /><br/>
          <input value='submit' type='submit' onClick={props.handleRegister} />
      </form>
    </div>
  )
}