import React, { useEffect, useState } from 'react';
import axios from 'axios'
// import { UserContext } from './context';
import { Container, Card, Col, CardGroup, Row } from "react-bootstrap";

function AllData(){

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get(`http://localhost:3003/account/all`);
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (<>
      <h1>Clients</h1>
      <Container>
        <Row md={2}>
            {data.map((user, key) => (
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
  </>);
}

export default AllData;