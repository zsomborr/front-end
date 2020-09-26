import React, { Fragment, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const Password = (props) => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <Fragment>
      <Form.Label htmlFor="password" srOnly>
        Password
      </Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="fa fa-lock" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          id="password"
          type={passwordType}
          placeholder="Password"
          minLength="8"
          required
          onChange={(e) => props.setPassword(e.target.value)}
        />
        <InputGroup.Prepend
          className="passwordIconHover"
          onClick={togglePassword}
        >
          <InputGroup.Text>
            <i className="fa fa-eye password-icon" />
          </InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>{" "}
    </Fragment>
  );
};

export default Password;
