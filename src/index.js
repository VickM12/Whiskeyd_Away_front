import App from './App';
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import Show from './components/Show';
import Edit from './components/Edit';
import SignUp from './components/SignUp';
import LogInForm from './components/LogInForm';
import Whiskeys from './components/Whiskeys'
import * as serviceWorker from './serviceWorker';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';


const routes = [
	{
		path: '/:id/edit',
		component: Edit,
		name: 'Edit'
	},
	{
		path: 'whiskeys/:id',
		component: Show,
		name: 'Show'
	},
	{
		path: 'users/signup',
		component: SignUp,
		name: 'Sign Up'
	},
	{
		path: 'users/login',
		component: LogInForm,
		name: 'Log In'
	},
	{
		path: '/',
		component: App, 
		name: 'Home'
	}
];

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <Router> */}
//       <App />
//     {/* </Router> */}
//   </React.StrictMode>,
//   document.getElementById("root")
// );
ReactDOM.render(
  <React.StrictMode>
    <Router>
		<Switch>
			{routes.map(route => {
				return (
					<Route
						component={route.component}
						key={route.name}
						path={route.path}
					/>
				);
			})}
       <App />
		</Switch>
	</Router>,
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
