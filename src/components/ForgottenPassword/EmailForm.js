import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import AnimatedButton from "../form/AnimatedButton";

const EmailForm = ({ form, setEmail, isLoading, handleSubmit }) => {
  return (
    <Form ref={form}>
      <Form.Label htmlFor="email" srOnly>
        Email address
      </Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="email"
          id="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          minLength="6"
          maxLength="50"
          required
        />
      </InputGroup>
      <AnimatedButton
        className="mb-2 mr-sm-2"
        isLoading={isLoading}
        icon={["far", "paper-plane"]}
        onClick={handleSubmit}
      >
        Send email
      </AnimatedButton>
    </Form>
  );
};

export default EmailForm;
