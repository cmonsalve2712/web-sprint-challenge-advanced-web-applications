import React, { useState } from "react";

import { axiosWithAuth } from '../components/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const initialState = {
  username: '',
  password: ''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(initialState);
  const history = useHistory();

  const handleChanges = event => {
    setLogin({ ...login, [event.target.name] : event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    axiosWithAuth()
      .post('/api/login', login)
      .then(response => {
        localStorage.setItem('token', response.data.payload);
        history.push('/bubble-page');
      })
      .catch(error => {
        console.error(error.response);
      })
  };


  

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          name='username'
          type='text'
          value={login.username}
          onChange={handleChanges}
          placeholder='username'
        />
        <input 
          name='password'
          type='password'
          value={login.password}
          onChange={handleChanges}
          placeholder='password'
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.