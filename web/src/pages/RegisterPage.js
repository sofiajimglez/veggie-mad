import React from 'react';
import UsersRegisterForm from '../components/users/UsersRegisterForm';
import PageLayout from '../components/layout/PageLayout';

export default function RegisterPage() {
  return (
    <PageLayout title="Regístrate y comienza a disfrutar de la vida veggie en Madrid">
      <div>
        <h1>Register Page</h1>
        <h3>User Register</h3>
        <UsersRegisterForm />
      </div>
    </PageLayout>
  )
}
