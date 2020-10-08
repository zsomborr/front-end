import React, { Fragment } from "react";
import Autosuggest from "react-autosuggest";
import { Col, Row } from "react-bootstrap";
import "./TagSuggester.css";

const TagSuggester = (props) => {
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();

    if (value.length === 0) {
      return [];
    }

    const allSuggestions = new Set(props.source);
    props.selectedItems.forEach((item) => {
      if (allSuggestions.has(item)) {
        allSuggestions.delete(item);
      }
    });

    const isMatch = (item) => {
      return item.toLowerCase().includes(inputValue);
    };
    return Array.from(allSuggestions).filter((item) => isMatch(item));
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    props.setValue("");
    props.onItemSelected(suggestion);
  };

  const inputProps = {
    className: "form-control",
    placeholder: `Type here to get suggestions`,
    value: props.value,
    onChange: (_, { newValue }) => props.setValue(newValue),
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    props.setSuggestions(getSuggestions(value));
  };

  return (
    <Fragment>
      <Autosuggest
        suggestions={props.suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={() => props.setSuggestions([])}
        getSuggestionValue={(item) => item}
        renderSuggestion={(item) => <span>{item}</span>}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
      <Row>
        <Col xs={12}>
          {props.shouldDisplayValueChange ? props.onValueChange() : null}
        </Col>
        <Col>
          {0 < props.selectedItems.length ? (
            <small className="text-muted font-italic">
              Click on the tag to remove it.
            </small>
          ) : null}
        </Col>
      </Row>
    </Fragment>
  );
};

export default TagSuggester;
