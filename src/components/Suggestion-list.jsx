import React from "react";
import "./style.css";

export const SuggestionList = ({
  suggestions = [],
  highlight,
  dataKey,
  onSugestionClick,
  selectedIndex,
}) => {
  const getHighlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    console.log(parts);

    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };
  return (
    <React.Fragment>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
        return (
          <li
            key={index}
            onClick={() => onSugestionClick(suggestion)}
            className="suggestions-item"
            id={`suggestion-${index}`}
            role="option"
            aria-selected={selectedIndex === index}
          >
            {getHighlightText(currSuggestion, highlight)}
          </li>
        );
      })}
    </React.Fragment>
  );
};
