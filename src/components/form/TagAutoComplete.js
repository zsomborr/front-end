import React, { Fragment, useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { Alert, Col, Row } from "react-bootstrap";
import "./TagAutoComplete.css";

const TagAutoComplete = (props) => {
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

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <span>{suggestion}</span>;

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue("");
    props.onItemSelected(suggestion);
  };

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [shouldSuggest, setShouldSuggest] = useState(false);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    className: "form-control",
    placeholder: `Type here to get suggestions`,
    value,
    onChange: onChange,
  };

  useEffect(() => {
    if (value.length === 0 || 0 < suggestions.length) {
      setShouldSuggest(false);
      return;
    }
    if (
      props.selectedItems.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      )
    ) {
      setShouldSuggest(false);
      return;
    }
    setShouldSuggest(true);
  }, [props.selectedItems, suggestions.length, value, value.length]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleTagSuggestion = () => {
    onSuggestionSelected(null, { suggestion: value });
  };

  return (
    <Fragment>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
      <Row>
        <Col xs={12}>
          {shouldSuggest ? (
            <Alert variant="light" className="p-1 my-1">
              No suggestion found.
              <span className="a mx-1" onClick={handleTagSuggestion}>
                Click here
              </span>
              to add it anyway!
            </Alert>
          ) : null}
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

export default TagAutoComplete;
