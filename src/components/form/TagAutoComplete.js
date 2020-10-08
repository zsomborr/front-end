import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import TagSuggester from "./TagSuggester";

const TagAutoComplete = (props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [shouldSuggest, setShouldSuggest] = useState(false);

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
  }, [props.selectedItems, value, suggestions.length]);

  const handleTagSuggestion = () => {
    props.onItemSelected(value);
    setValue("");
  };

  const suggestionSection = () => {
    return (
      <Alert variant="light" className="p-1 my-1">
        No suggestion found.
        <span className="a mx-1" onClick={handleTagSuggestion}>
          Click here
        </span>
        to add it anyway!
      </Alert>
    );
  };

  return (
    <TagSuggester
      source={props.source}
      selectedItems={props.selectedItems}
      onItemSelected={props.onItemSelected}
      value={value}
      setValue={setValue}
      suggestions={suggestions}
      setSuggestions={setSuggestions}
      shouldDisplayValueChange={shouldSuggest}
      onValueChange={suggestionSection}
    />
  );
};

export default TagAutoComplete;
