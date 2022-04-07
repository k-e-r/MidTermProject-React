import React, { useState, useEffect } from 'react';

import LoginForm from '../components/LoginForm';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('userId', email);
    setIsLoggedIn(true);
  };

  return (
    <>
      {<LoginForm onLogin={loginHandler} />}
      {/* {!isLoggedIn && <LoginForm onLogin={loginHandler} />} */}
      {/* {isLoggedIn && <Home onLogout={logoutHandler} />} */}
    </>
  );
};

export default Login;

// .articles {
//   margin: auto;
//   list-style: none;

//   display: flex;
//   flex-direction: column;
//   width: min(100%, 40rem);
// }
