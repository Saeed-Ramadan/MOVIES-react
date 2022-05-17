import React, { Component } from 'react';
import Movies from './Movies';
import { Route, Switch, Redirect } from 'react-router-dom';
import ContactUs from './components/contactus';
import AboutUs from './components/aboutus';
import NotFound from './components/notfound';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import MovieForm from './components/movieForm';
import Logout from './components/logout';
import { ToastContainer } from 'react-toastify';
import jwt_decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    state = {};
    componentDidMount() {
        try {
        const jwt = localStorage.getItem("token");
        const data = jwt_decode(jwt);
        const user = data.data;
        this.setState({ user });
        } catch (ex) { }
        }
        
    render() {
        return (
            <>
                <ToastContainer />
                <Navbar user={this.state.user}/>
                <Switch>
                    <Route path='/movies/:id' component={MovieForm} />
                    <Route path='/movies' component={Movies} />
                    <Route path='/contactus' component={ContactUs} />
                    <Route path='/aboutus' component={AboutUs} />
                    <Route path='/notfound' component={NotFound} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/logout' component={Logout} />
                    <Redirect from='/' exact to='/movies' />
                    <Redirect to='/notfound' />
                </Switch>
            </>
        );
    }
}

export default App;