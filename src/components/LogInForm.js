import React from "react";

export default function LogInForm(props) {
  return (
    <div>
      <h2>Log In</h2>

      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={props.handleInput} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" onChange={props.handleInput} />
        </div>
        <input value="Submit" type="submit" onClick={props.handleLogIn} />
      </form>
    </div>
  );
}


