import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signUp, signIn, signOut } from './store/authSlice';
import Dashboard from './Pages/Dashboard';

function App() {
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);

  const handleSignUp = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(signUp({ username, email, password }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(signIn({ email, password }));
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div>
      {token ? (
        <Dashboard/>
      ) : (
        <div>
          <form onSubmit={handleSignUp}>
            <input name="username" placeholder="Username" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit" disabled={loading}>Sign Up</button>
          </form>
          <form onSubmit={handleSignIn}>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit" disabled={loading}>Sign In</button>
          </form>
          {error && <p>{error.message}</p>}
        </div>
      )}
    </div>
  );
}

export default App;