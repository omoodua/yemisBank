import React from "react";
import {
    Container,
    Card,
    Button,
    InputGroup,
    Alert,
    Form,
} from "react-bootstrap";
import { UserContext } from "./context";
import axios from "axios";
// function Login(){
//   const [show, setShow]         = React.useState(true);
//   const [status, setStatus]     = React.useState('');
//   const [email, setEmail]       = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const validEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // Validating Email
//   // Creating a function to find if user exist
//   function clienExist(clientList) {
//     return clientList.email === email, clientList.password === password;
//   }

//   const ctx = React.useContext(UserContext);

//   function validate(field){
//     if (!field) {
//       setStatus(<Alert variant="danger">Please, enter your email and password.</Alert>);
//       setTimeout(() => setStatus(''),5000);
//       return false;
//     }

//     if (!email.match(validEmail)) {
//       setStatus(<Alert variant="danger">Please, enter a valid email.</Alert>);
//       setTimeout(() => setStatus(''), 5000);
//       return false;
//     }

//     if (ctx.users.find(clienExist) === undefined) {
//       setStatus(<Alert variant="danger">This client does not exist.</Alert>);
//       setTimeout(() => setStatus(''), 5000);
//       return false;
//     } else {
//         // Save the Client's name and email on his computer
//         localStorage.setItem('loggedClientName', JSON.stringify(ctx.users.find(clienExist).name));
//         localStorage.setItem('loggedClientEmail', JSON.stringify(ctx.users.find(clienExist).email));
//     }

//     return true;
// }

// function handleLogin(){
//   console.log(email,password);
//   if (!validate(email,    'email'))    return;
//   if (!validate(password, 'password')) return;
//   setShow(false);
// }

// function clearForm(){
//   setEmail('');
//   setPassword('');
//   setShow(true);
// }

//   return (
//     <div>
//       <h1>Login</h1>
//       {status}
//       {show ? (
//       <>
//       <Container className="Container">
//         <Form>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control id="email" type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Enter email" />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control id="password" type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="Password" />
//           </Form.Group>
//           <Button variant="dark" onClick={handleLogin} type="submit">Sign in</Button>
//         </Form>
//       </Container>
//       </>
//       ):(
//         <>
//         <Alert variant="success">You are logged in. Go to homepage.</Alert>
//         </>
//       )}
//     </div>
//   )
// }

function Login() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");

    return (
        <>
            {/* <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ?
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    /> */}

            <div>
                <h1>Login</h1>
                <Container className="Container">
                    <Card>
                        <Card.Body>
                            {show ? (
                                <LoginForm
                                    setShow={setShow}
                                    setStatus={setStatus}
                                />
                            ) : (
                                <LoginMsg
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

function LoginMsg(props) {
    return (
        <>
            <h5>Success</h5>
            <button
                type="submit"
                className="btn btn-light"
                onClick={() => props.setShow(true)}
            >
                Authenticate again
            </button>
        </>
    );
}

function LoginForm(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handle() {
        const data = await axios.post("/api/login", {
            email,
            password,
        });
        console.log(data);
        // fetch(`http://localhost:5000/account/login`)
        //     .then((response) => response.text())
        //     .then((text) => {
        //         try {
        //             const data = JSON.parse(text);
        //             props.setStatus("");
        //             props.setShow(false);
        //             console.log("JSON:", data);
        //         } catch (err) {
        //             props.setStatus(text);
        //             console.log("err:", text);
        //         }
        //     });
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
            Password
            <br />
            <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" onClick={handle}>
                Login
            </button>
        </>
    );
}

export default Login;
