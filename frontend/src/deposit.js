import React, { useState } from "react";
import { Container, Card, Button, InputGroup, Alert } from "react-bootstrap";
import axios from "axios";

function Deposit() {
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState("");

    return (
        <>
            <div>
                <h1>Deposit</h1>
                <Container className="Container">
                    <Card>
                        <Card.Body>
                            {show ? (
                                <DepositForm
                                    setShow={setShow}
                                    setStatus={setStatus}
                                />
                            ) : (
                                <DepositMsg
                                    setShow={setShow}
                                    setStatus={setStatus}
                                />
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    );
}
function DepositMsg(props) {
    return (
        <>
            <Alert variant="success">Your deposit has been credited.</Alert>
            <button
                type="submit"
                className="btn btn-light"
                onClick={() => {
                    props.setShow(true);
                    props.setStatus("");
                }}
            >
                Deposit more money
            </button>
        </>
    );
}
function DepositForm(props) {
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");

    async function updateAccount(email, amount, props) {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/account/deposit`,
                {
                    email,
                    amount,
                }
            );
            const data = response.data;
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log("Data:", data);
        } catch (err) {
            props.setStatus("Deposit failed");
            console.log("Error:", err.message);
        }
    }
    return (
        <>
            <Card.Text>
                {`How much you'd like to deposit?: $ ${amount}`}
            </Card.Text>
            <input
                type="input"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="amountDep"
                    placeholder="$0000"
                    value={amount}
                    onChange={(e) => setAmount(e.currentTarget.value)}
                />
                <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            <Button variant="dark" type="submit" onClick={updateAccount}>
                Deposit your money
            </Button>
        </>
    );
}

export default Deposit;
