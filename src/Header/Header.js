import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand className="mb-0 h1" href="/">Hunter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink
                        className="nav-link"
                        exact
                        activeClassName="active"
                        to="/"
                    >Home
                    </NavLink>
                    <NavLink className="nav-link"
                        activeClassName="active"
                        to="/chart">Chart</NavLink>
                    <NavLink className="nav-link"
                        activeClassName="active"
                        to="/updates">Updates</NavLink>
                    <NavLink className="nav-link"
                        activeClassName="active"
                        to="/contact">Contact</NavLink>
                    <NavLink className="nav-link"
                        activeClassName="active"
                        to="/privacy">Privacy</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
