import {React, Button, Form, Container, Row, Col} from "react-bootstrap/Col";

const Login = () => {
  return (
    <section className="login-page">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={1}>
            <h2>LOGIN</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={5}>
            <Form>
              <Form.Group className="mb-3" controlId="inputId">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="ID" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="inputPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="PASSWORD" />
              </Form.Group>
              <Form.Group className="mb-3 login-option" controlId="checkMeOut">
                <Form.Check type="checkbox" label="로그인 상태 유지" />
                <span>아이디 · 비밀번호 찾기</span>
              </Form.Group>
              <Button type="submit" id="loginSubmit">
                LOGIN
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={12} className="text-center">
            또는
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={5}>
            <Button variant="secondary" type="submit" className="login-another">
              휴대폰 번호로 로그인
            </Button>
            <Button variant="secondary" type="submit" className="login-another">
              이메일로 로그인
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
