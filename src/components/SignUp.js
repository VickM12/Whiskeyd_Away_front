import React from 'react';
export default function SignUp(props){
  
  return(
    <div>
      <h2>Please Register</h2>

      <form>
          <label htmlFor='username'>Choose a Username</label>
          <input type='text' id='username' onChange={props.handleUserForm} /><br/>
          <label htmlFor='password'>Select a Password</label>
          <input type='password' id='password' onChange={props.handleUserForm} /><br/>
          <input value='submit' type='submit'className="submit" onClick={props.handleRegister} />
      </form>
    </div>
  )
}