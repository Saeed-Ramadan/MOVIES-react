import React from "react";
import NavLink from "react-router-dom/NavLink";
const Navbar = ({user}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className='nav-link' to='/movies'> Movies </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className='nav-link' to='/aboutus'> about us </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className='nav-link' to='/contactus'> contact us </NavLink>
                </li>
                {
                    !user &&
                    <>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/login'> login </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/register'> register </NavLink>
                        </li>
                    </>}
                {
                    user &&
                    <>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/profile'> {user.name} </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/logout'> logout </NavLink>
                        </li>
                    </>}

            </ul>
        </nav>
    );
}

export default Navbar;