import React from 'react';
export default function NavBar(props) {

  let navBarItems = [
    <li key={1}>
      <a href="/">All Whiskeys</a>
    </li>,
  ];
  if (props.isLoggedIn) {
    navBarItems.push(
      <li key={2}>
        <a href="/users/logout">Log Out</a>
      </li>
    );
  } else {
    navBarItems.push(
      <li key={3}>
        <a href="/users/signup">Sign Up</a>
      </li>
    );
    if (props.isLoggedIn) {
      navBarItems.push(
    <li key={4}>
        Logged in as {props.username}
      </li>
      )
    }
    navBarItems.push(
      <li key={5}>
        <a href="/users/login">Log In</a>
      </li>
    );
  }

  return (
    <>
      <h1>Whiskeyd Away</h1>
      <nav>
         <ul>{navBarItems}</ul>
      </nav>
    </>
  );
}
