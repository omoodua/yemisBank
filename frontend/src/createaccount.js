import React from "react";
import { Container, Card, Button, InputGroup, Alert } from "react-bootstrap";
import { UserContext } from "./context";
import axios from "axios";

function CreateAccount() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const validEmail =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // Validating Email

    const ctx = React.useContext(UserContext);

    function validate(field, label) {
        if (!field) {
            // Validate all fields are filled.
            setStatus(
                <Alert variant="danger">
                    All fields are required (name, email and password.)
                </Alert>
            );
            setTimeout(() => setStatus(""), 3000);
            return false;
        }

        if (!email.match(validEmail)) {
            // Validate email format is valid.
            setStatus(
                <Alert variant="danger">Please, enter a valid email.</Alert>
            );
            setTimeout(() => setStatus(""), 5000);
            return false;
        }

        if (password.length < 8) {
            // Validate password is atl least 8 characters long
            setStatus(
                <Alert variant="danger">
                    The password must be at least 8 characters.
                </Alert>
            );
            setTimeout(() => setStatus(""), 3000);
            return false;
        }

        return true;
    }

    async function signup(email, password, username) {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/signup",
                {
                    email: email,
                    password: password,
                    username: username,
                }
            );
            ctx.users.push({ name, email, password });
            const data = response.data;
            setName("");
            setEmail("");
            setPassword("");
            console.log("Data:", data);
        } catch (err) {
            console.log("Error:", err.message);
        }
    }

    async function handleCreateAccount() {
        const data = await axios.post("/api/signup", {
            email,
            password,
        });
        if (data) {
            setShow(true);
        }
    }

    return (
        <div>
            <h1>Join Yemi's Bank</h1>
            <Container className="Container">
                <Card>
                    <Card.Header as="h3">
                        Create your client account.
                    </Card.Header>
                    <Card.Body>
                        {status}
                        {show ? (
                            <>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text className="input-label">
                                        Name
                                    </InputGroup.Text>
                                    <input
                                        type="input"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.currentTarget.value)
                                        }
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text className="input-label">
                                        em@il
                                    </InputGroup.Text>
                                    <input
                                        type="input"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.currentTarget.value)
                                        }
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text className="input-label">
                                        Password
                                    </InputGroup.Text>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.currentTarget.value)
                                        }
                                    />
                                </InputGroup>
                                <Button
                                    variant="dark"
                                    id="createIt"
                                    type="submit"
                                    onClick={signup}
                                >
                                    Create your account
                                </Button>
                            </>
                        ) : (
                            <>
                                <Alert variant="success">
                                    Your account has been created.
                                </Alert>
                                <Button
                                    variant="dark"
                                    type="submit"
                                    onClick={() => setShow(false)}
                                >
                                    Create another account
                                </Button>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default CreateAccount;
