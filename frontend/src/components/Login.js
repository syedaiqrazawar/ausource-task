import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik,Form,ErrorMessage,Field } from "formik";
import * as Yup from 'yup'


export default function Login(){
    const navigate = useNavigate(); 
    
    
    //submission related
    const onSubmit = (values) => {

        let email = values.email;
        let password = values.password;
        
        axios
        .post("http://localhost:4000/api/user/signin", { email, password })
        .then((res) => {
            if(res.data.user) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem('token', res.data.token);
            }
            navigate("home");
        })
        .catch((error) => { 
           console.log("error is: ", error)
           if(email ===''){
            toast.error("Please enter email")
           }else if(password ==='' ){
            toast.error("Please enter password")
           }else {
            toast.error("Incorrect credentials")
           }
           
        })
    };

    const initialValues ={
        email:'',
        password:''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required')
    });


    
    return(
    <>
            <ToastContainer />
            <div className="main-div login">
                <h2 className="login-heading">Login</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        <label htmlFor="email" className="email-label">Email</label><br/>

                        <Field className="email-input" id='email' type='email' placeholder='Enter email' name='email'/>
                        <ErrorMessage name='email' component="div" className="error-message"/> 
                        
                        <label htmlFor="password" className="email-label password-lable">Password</label><br/>

                        <Field className="email-input" id='password' type='password' placeholder='Enter password' name='password'/>
                        <ErrorMessage name='password' component="div" className="error-message"/>
                        
                        <p className="link-to-sign-up">Don't have an account?<Link to="sign-up">Sign Up</Link></p>
                        <button 
                            type="submit" 
                        >
                            LOGIN
                        </button>
                        <a href="./" className="anchor">Forgot Password?</a>   
                    </Form>
                </Formik>
            </div>
        </>
    )
}

