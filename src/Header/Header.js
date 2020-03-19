import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Hunter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/chart">Chart</Link>
                    <Link className="nav-link" to="/contact">Contact</Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}
