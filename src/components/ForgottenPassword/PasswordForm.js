import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import AnimatedButton from "../form/AnimatedButton";
import Password from "../form/Password";

const PasswordForm = ({
  form,
  setPassword1,
  setPassword2,
  isLoading,
  handleSubmit,
  setEmailCode,
}) => {
  return (
    <Form ref={form}>
      <InputGroup className="mb-2 mr-sm-2">
        <InputGroup.Prepend>
          <InputGroup.Text>#</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          placeholder="Code"
          onChange={(e) => setEmailCode(e.target.value)}
          minLength="6"
          maxLength="6"
          required
        />
      </InputGroup>

      <Form.Label htmlFor="email" srOnly>
        Password
      </Form.Label>
      <Password setPassword={setPassword1} />
      <Form.Label htmlFor="email" srOnly>
        Repeat password
      </Form.Label>
      <Password setPassword={setPassword2} />

      <AnimatedButton
        className="mb-2 mr-sm-2"
        isLoading={isLoading}
        icon={["fas", "sign-in-alt"]}
        onClick={handleSubmit}
      >
        Save password
      </AnimatedButton>
    </Form>
  );
};

export default PasswordForm;
