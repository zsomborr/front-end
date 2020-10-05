import React, { Fragment } from "react";
import { Form, InputGroup } from "react-bootstrap";

const FirstName = (props) => {
  return (
    <Fragment>
      <Form.Label htmlFor="firstname" srOnly>
        First Name
      </Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control
          id="firstname"
          placeholder="First Name"
          onChange={props.onChange}
          defaultValue={props.defaultValue ? props.defaultValue : null}
          minLength="2"
          maxLength="20"
          required
        />
      </InputGroup>
    </Fragment>
  );
};

export default FirstName;
