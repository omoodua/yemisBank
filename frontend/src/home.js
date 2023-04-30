import React from 'react';
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsBank2 } from 'react-icons/bs';
function Home(){

  // Client Name
  let clientName;
  if(!localStorage.getItem("loggedClientName")) { clientName = `Client`; } else { clientName = localStorage.getItem("loggedClientName")}

  return (
    <div>
      <Card className="Home">
          <Card.Header as="h3">Welcome, {clientName}</Card.Header>
          <Card.Body>
            <Card.Text>
            <h1 className='bank-name'>Yemi's Bank</h1>
            <h2 className='bank-motto'>"Your success is our priority."</h2>
            </Card.Text>
            <br></br>
            <Card.Text>
            <BsBank2 className='Home-bank' />
            </Card.Text>
            <br></br>
            <Link to="/login">Log in to your account.</Link>
          </Card.Body>
        </Card>
    </div>
  );
}

export default Home;
