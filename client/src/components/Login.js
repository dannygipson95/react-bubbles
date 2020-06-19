import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialFormVals = {
  username: '',
  password: ''
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials]= useState(initialFormVals);
  const history = useHistory();
  
  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleLogin = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res=>{
        window.localStorage.setItem('token', res.data.payload);
        // setTimeout(, 250)
        history.push('/bubbles')
      })
      .catch(err=>console.error(err))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username
          <input
            type='text'
            name='username'
            value={credentials.username}
            onChange={handleChange}
          />
        </label>
        
        <label>
          Password
          <input
            type='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
          />
        </label>

        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
