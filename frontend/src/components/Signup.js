import { Link ,useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik,Form,ErrorMessage,Field } from "formik";
import * as Yup from 'yup'



export default function SignUp(){
    
    const navigate = useNavigate();

    const handleSubmit = async(values) => {

        let first_name =values.first_name;
        let last_name =values.last_name;
        let email = values.email;
        let phone_no =values.phone_no;
        let userpass = values.userpass;
        let comments = values.comments
        
        await axios
        .post("http://localhost:4000/api/user/signup", { first_name,last_name,email,phone_no,userpass,comments })
        .then((res) => {
            console.log("success")
            toast.success("You have successfully signed in")
        })
        .catch((error) => { 
           console.log("error is: ", error)
           
           
        })
    };

    const initialValues ={
        first_name: '',
        last_name: '',
        email: '',
        phone_no:'',
        userpass: '',
        comments: ''
    }

    const validationSchema= Yup.object({
        first_name: Yup.string().required('Required'),
        last_name:Yup.string().required('Required'),
        email:Yup.string().email('Invalid email format').required('Required'),
        phone_no:Yup.string().required('Required'),
        userpass:Yup.string().required('Required'),
        comments:Yup.string().required('Required')
    })
    return(
        <body>
            <ToastContainer />
            <div className="main-div-sign-up main-div">
                <h2 className="login-heading">Sign Up</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form>
                    <label for="first-name" className="email-label">First Name</label><br/>
                    <Field className= 'email-input' type='text' id='first-name' name='first_name' placeholder='Enter first name' />
                    <ErrorMessage name='first_name' component="div" className="error-message"/>
                    

                    <label for="last-name" className="email-label">Last Name</label><br/>

                    <Field className= 'email-input' type='text' id='last-name' name='last_name' placeholder='Enter last name' />
                    <ErrorMessage name='last_name' component="div" className="error-message"/>

                    <label for="email" className="email-label">Email</label><br/>

                    <Field className= 'email-input' type='email' id='email' name='email' placeholder='Enter email' />
                    <ErrorMessage name='email' component="div" className="error-message"/>

                    <label for="phone" className="email-label">Phone Number</label>

                    <Field className= 'email-input' type='text' id='phone' name='phone_no' placeholder='Enter phone number' />
                    <ErrorMessage name='phone_no' component="div" className="error-message"/>

                    <label for="password" className="email-label">Password</label><br/>

                    <Field className= 'email-input' type='password' id='password' name='userpass' placeholder='Enter password' />
                    <ErrorMessage name='userpass' component="div" className="error-message"/>

                    <label for="text-area" className="email-label">Comments</label><br/>

                    <Field className= 'email-input' type='text-area' id='text-area' name='comments' placeholder='Add comments' />
                    <ErrorMessage name='comments' component="div" className="error-message"/>
                
                    <p className="sign-up-paragraph">Already a member? <Link to='/'>Log In</Link></p>
                    <button 
                    type="submit" 
                    className="signup-button" 
                    >
                        SIGN UP
                    </button>
                    </Form>
                </Formik>
                
                
                
                    
                    
                
            </div>
        </body>
    )
}