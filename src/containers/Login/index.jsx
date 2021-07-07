import React from "react";
import {
  Form,
  FloatingLabel,
  Navbar,
  Container,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";

const Login = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm">
        <Container>
          <Navbar.Brand href="#home">Hello</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid="lg">
        <Row className="justify-content-center align-content-center h-100">
          <Col>
            {/* <Form className="p-5"> */}
            {/*   <FloatingLabel */}
            {/*     controlId="floatingInput" */}
            {/*     label="Email address" */}
            {/*     className="mb-3" */}
            {/*   > */}
            {/*     <Form.Control type="email" placeholder="name@example.com" /> */}
            {/*   </FloatingLabel> */}
            {/*   <FloatingLabel controlId="floatingPassword" label="Password"> */}
            {/*     <Form.Control type="password" placeholder="Password" /> */}
            {/*   </FloatingLabel> */}
            {/*   <Button type="Submit">Submit</Button> */}
            {/* </Form> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
