import React from 'react';
import { UserContext } from './context';
import { Container, Card, Col, CardGroup, Row } from "react-bootstrap";

function AllData(){
  const ctx = React.useContext(UserContext);

  ctx.users.forEach(element => {

    console.log(element)

  });

  return (
    <>
    <h1>All Clients</h1>
    {/* {JSON.stringify(ctx)}<br/> */}
    <Container>
  <Row md={2}>
      {ctx.users.map((user, key) => (
          <Col className='Client-col'>
            <Card className='Client-card'>
              <Card.Header>
                # {key + 1}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                {user.name.toLocaleUpperCase()}
                </Card.Title>
                <Card.Text>
                  Email: {user.email}<br></br>
                  Balance: ${user.balance}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}

  </Row>
</Container>


    </>
  );
}

export default AllData;