import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { BiRightArrow } from 'react-icons/bi';
import {
  Link
} from "react-router-dom";

function NavBar(){
  return(
    <>
  <Navbar bg="black" variant="black">
    <Container>
    <Navbar.Brand>
      <Link  className='App-nav' to="/home">
        <RiExchangeDollarFill className='App-logo' />
      </Link>
    </Navbar.Brand>
    <Nav>
      <Link  className='App-nav' to="/home">Yemi's Bank </Link>
      <Link  className='App-nav' to="/deposit">Deposit</Link>
      <Link  className='App-nav' to="/withdraw">Withdraw</Link>
      <Link  className='App-nav' to="/alldata">All Data</Link>
      <Link  className='App-nav' to="/login">Log in</Link>
      <Link  className='App-nav' to="/createaccount">Create account</Link>
    </Nav>
    </Container>
  </Navbar>
</>
  );
}


export default NavBar;