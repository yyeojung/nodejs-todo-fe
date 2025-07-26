import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [secPassword, setSecPassword] = useState("");
  const [isShowSecPassword, setIsShowSecPassword] = useState(false);
  const [error, setError] = useState("");
  const [animateError, setAnimateError] = useState(false);

  const navigate = useNavigate();

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    try {
      if (!name) throw new Error("이름을 입력해주세요.");
      if (!email) throw new Error("이메일을 입력해주세요.");
      if (!password) throw new Error("패스워드를 입력해주세요.");
      if (!secPassword) throw new Error("패스워드 확인을 입력해주세요.");
      if (password !== secPassword)
        throw new Error("비밀번호가 일치하지 않습니다.");

      const response = await api.post("/user", { name, email, password });
      if (response.status === 200) {
        navigate("/login");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      setError(error.message);
      setAnimateError(true);
      setTimeout(() => setAnimateError(false), 400);
    }
  };

  return (
    <div className="display-center" onSubmit={handleSubmitClick}>
      {error && (
        <div className={animateError ? "error shake" : "error"}>{error}</div>
      )}
      <Form className="login-box">
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div className="password-box">
            <Form.Control
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setIsShowPassword((prev) => !prev)}
            >
              {isShowPassword ? "🙈" : "🙉"}
            </button>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>

          <div className="password-box">
            <Form.Control
              type={isShowSecPassword ? "text" : "password"}
              placeholder="re-enter the password"
              value={secPassword}
              onChange={(e) => setSecPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setIsShowSecPassword((prev) => !prev)}
            >
              {isShowSecPassword ? "🙈" : "🙉"}
            </button>
          </div>
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
