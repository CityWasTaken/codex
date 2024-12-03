import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import React, { useState } from "react";

import { useStore } from "../store";
import { LOGOUT_USER } from "../graphql/mutations";
import { client } from "../main";


function Header() {
    const { state, setState } = useStore()!;
    const [searchQuery, setSearchQuery] = useState('');

    const [logoutUser] = useMutation(LOGOUT_USER, {
        onCompleted() {
            client.clearStore();
        }
    });

    const navigate = useNavigate();

    // Logout user
    const handleLogout = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();

        setState((oldState) => ({
            ...oldState,
            user: null
        }));

        await logoutUser();

        navigate('/');
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement search logic here
        console.log('Searching for:', searchQuery);
    }


    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container fluid={true}>

                {/* //Nav links */}
                <Navbar.Brand as={NavLink} to="/">CodeX</Navbar.Brand>


                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>

                    {state.user ? (
                        <>
                            {/* links for logged in users */}

                            <Nav.Link as = {NavLink} to={`/profile/${state.user.username}`}>My Profile</Nav.Link>
                            <Nav.Link as = {NavLink} to="/">My Feed</Nav.Link>
                            <Nav.Link as = {NavLink} to="/followers">Followers</Nav.Link>
                            <Nav.Link as = {NavLink} to="/following">Following</Nav.Link>

                            <NavDropdown title="Profile Menu">
                                <NavDropdown.ItemText className="border-bottom mb-2">Welcome Coder {state.user.username},</NavDropdown.ItemText>
                                <NavDropdown.Item onClick={handleLogout} href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;