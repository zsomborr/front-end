import React, { Fragment } from "react";
import { Form, InputGroup } from "react-bootstrap";

const LastName = (props) => {
  return (
    <Fragment>
      <Form.Label htmlFor="lastname" srOnly>
        Last Name
      </Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control
          id="lastname"
          placeholder="Last Name"
          onChange={props.onChange}
          defaultValue={props.defaultValue}
          minLength="2"
          maxLength="20"
          required
        />
      </InputGroup>
    </Fragment>
  );
};

export default LastName;
