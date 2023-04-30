import React, { useState } from "react";
import { Container, Card, Button, InputGroup, Alert } from "react-bootstrap";
import { UserContext } from "./context";
import axios from "axios";

function Withdraw() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");

    return (
        <div>
            <h1>Withdraw</h1>
            <Container className="Container">
                <Card>
                    <Card.Body>
                        {show ? (
                            <WithdrawForm
                                setShow={setShow}
                                setStatus={setStatus}
                            />
                        ) : (
                            <WithdrawMsg
                                setShow={setShow}
                                setStatus={setStatus}
                            />
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

function WithdrawMsg(props) {
    return (
        <>
            <h5>Success</h5>
            <button
                type="submit"
                className="btn btn-light"
                onClick={() => {
                    props.setShow(true);
                    props.setStatus("");
                }}
            >
                Withdraw again
            </button>
        </>
    );
}

function WithdrawForm(props) {
    const [email, setEmail] = React.useState("");
    const [amount, setAmount] = React.useState("");

    async function updateAccount(email, amount, props) {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/account/withdraw`,
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
            props.setStatus("Withdrawal failed");
            console.log("Error:", err.message);
        }
    }

    return (
        <>
            Email
            <br />
            <input
                type="input"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Amount
            <br />
            <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            <button
                type="submit"
                className="btn btn-light"
                onClick={updateAccount}
            >
                Withdraw
            </button>
        </>
    );
}

export default Withdraw;
