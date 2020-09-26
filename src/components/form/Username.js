import React, { Fragment } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

const Username = (props) => {
  return (
    <Fragment>
      <Form.Label htmlFor="username" srOnly>
        Username
      </Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="fas fa-user"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          id="username"
          placeholder="Username"
          onChange={(e) => props.setUsername(e.target.value)}
        />
      </InputGroup>
    </Fragment>
  );
};

export default Username;
