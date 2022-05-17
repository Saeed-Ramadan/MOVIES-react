import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import axios from 'axios';
import Form from './form';
class Register extends Form {
    state = {
        data: { userName: '', password: '', name: '' },
        errors: {}
    };
    schema = {
        userName: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("name")
    };
        doSubmit = async () => {
            //call the server
            try {
                await 
                axios.post('http://localhost/MoviesApis/userApi/register.php',this.state.data);
                toast.info("user registered successfully");
                this.props.history.push("/login");
            } catch (ex) {
            console.log(ex);
            }
        console.log("submitted");
    };
    render() {
        return (
            <div className='w-50 m-auto'>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("userName", "User Name")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}
export default Register;