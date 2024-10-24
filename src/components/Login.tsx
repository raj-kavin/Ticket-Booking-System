import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginSchema } from '../schema/Schema';
import { Link } from 'react-router-dom';
import { LoginUser ,Users} from '../models/model'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/context';




interface Props {
    verifyUser: (user: LoginUser) => boolean;
    getUser: (user: string) => Users | null;
}

interface FormValues {
    email: string;
    password: string
}

const Login: React.FC<Props> = ({ verifyUser , getUser }) => {
    const {setUser} = useUser();
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
        const Values = {
            email: values.email,
            password: values.password
        };
        const userdata = getUser(values.email);
        setUser(userdata);
        const verify = verifyUser(Values);
        if (verify) {
            setMessage("Login Successfull")
            setTimeout(() => {
                navigate('/home')
                resetForm()
                setMessage("")
            }, 1000)
        } else {
            setErrorMessage("Login Failed")
            setTimeout(() => {
                navigate('/')
                resetForm()
                setErrorMessage("")
            }, 1000)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 flex flex-col bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-4">

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
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
                <Link to="/register" className='text-center'>If you’re new, please <span className='font-bold'>sign up!</span></Link>

                {message &&
                    <div className='w-full text-green-700 font-bold border-2 border-green-700 rounded-md p-2 text-center bg-green-200'>{message}</div>
                }
                {errorMessage &&
                    <div className='w-full text-red-700 font-bold border-2 border-red-700 rounded-md p-2 text-center bg-red-200'>{errorMessage}</div>
                }
            </div>
        </div>
    );
};

export default Login;
