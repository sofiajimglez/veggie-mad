import React from 'react';
import UsersLoginForm from '../components/users/UsersLoginForm';

export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <h3>User Login</h3>
      <UsersLoginForm mode='user' />
      <UsersLoginForm mode='business' />
    </div>
  )
};
