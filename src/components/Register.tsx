import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignupSchema } from '../schema/Schema';
import { Users } from '../models/model';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Props {
  addUser: (user: Users) => boolean;
}

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC<Props> = ({ addUser }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    const userAdded = addUser(newUser);
    if (userAdded) {
      setMessage("Registration Successful");
      setTimeout(() => {
        setMessage("");
        resetForm();
        navigate('/');
      }, 1000);
    } else {
      setErrorMessage("Registration Failed");
      setTimeout(() => {
        setErrorMessage("");
        resetForm();
      }, 1000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white flex flex-col rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <Field
                  name="username"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                  autoComplete="off"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                  autoComplete="off"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                  autoComplete="off"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                  autoComplete="off"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <Link to="/" className='text-center'>If you’ve already signed up, please <span className='font-bold'>Login !</span></Link>
        {message && (
          <div className='w-full text-green-700 font-bold border-2 border-green-700 rounded-md p-2 text-center bg-green-200'>
            {message}
          </div>
        )}
        {errorMessage && (
          <div className='w-full text-red-700 font-bold border-2 border-red-700 rounded-md p-2 text-center bg-red-200'>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
