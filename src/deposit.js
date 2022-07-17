import React from "react";
import { Container, Card, Button, InputGroup, Alert } from "react-bootstrap";
import { UserContext } from "./context";
function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [amountDep, setAmount]  = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(field){
    if (!field) {
      setStatus(<Alert variant="danger">Enter the amount you would like to deposit.</Alert>);
      setTimeout(() => setStatus(''),5000);
      return false;
    }
    if (amountDep <= 0) {
      setStatus(<Alert variant="danger">The value to deposit should not be less than $0</Alert>);
      setTimeout(() => setStatus(''),5000);
      return false;
    }
    return true;
}

function depositMoney(){
  console.log(amountDep);
  if (!validate(amountDep, status))     return;
  ctx.users[0].balance = Number(ctx.users[0].balance) + Number(amountDep);

  setShow(false);
}

function clearForm(){
  setAmount('');
  setShow(true);
}
  return (
    <div>
      <h1>Deposit</h1>
      <Container  className="Container">
        <Card>
          <Card.Header as="h3">{`Your balance is: $` + ctx.users[0].balance}</Card.Header>
          <Card.Body>
          {status}
          {show ? (
                  <>
            <Card.Text>
            {`How much you'd like to deposit?: $` + amountDep }
            </Card.Text>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <input type="number" min="0" className="form-control" id="amountDep" placeholder="$0000" value={amountDep} onChange={e => setAmount(e.currentTarget.value)} />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            <Button variant="dark"  type="submit" onClick={depositMoney} disabled={!amountDep}>Deposit your money</Button>
                  </>
                ):(
                  <>
                  <Alert variant="success">Your deposit of ${amountDep} has been credited.</Alert>
                  <Button variant="dark"  type="submit" onClick={clearForm}>Make anothe deposit</Button>
                  </>
                )}
          </Card.Body>
        </Card>
      </Container>
  </div>
  )
}
export default Deposit;