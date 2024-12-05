import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import React from "react";

import { useStore } from "../store";
import { LOGOUT_USER } from "../graphql/mutations";
import { client } from "../main";



function Header() {
  const { state, setState } = useStore()!;
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]); // State to store search results

  const [logoutUser] = useMutation(LOGOUT_USER, {
    onCompleted() {
      client.clearStore();
    }
  });

  // const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_USER, {
  //   onCompleted: (data) => {
  //     setSearchResults(data.searchUsers);
  //   }
  // });

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



  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container fluid={true}>

        {/* //Nav links */}
        <Navbar.Brand as={NavLink} to="/">CodeX</Navbar.Brand>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>

              {state.user ? (
                <>
                  {/* links for logged in users */}

                  <Nav.Link as={NavLink} to={`/profile/${state.user.username}`}>My Profile</Nav.Link>
                  <Nav.Link as={NavLink} to="/myfeed">My Feed</Nav.Link>
                  <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>

                  <NavDropdown title="Profile Menu">
                    <NavDropdown.ItemText className="border-bottom mb-2">Welcome, {state.user.username}</NavDropdown.ItemText>
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
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
  )
}

export default Header;
