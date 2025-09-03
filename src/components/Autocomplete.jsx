import React, { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import { SuggestionList } from "./Suggestion-list";
import debounce from "lodash/debounce";
import useCache from "../hooks/use-cache";

const Autocomplete = (props) => {
  const {
    placeholder,
    onBlur,
    onFocus,
    onSelect,
    customStyle,
    onChange,
    staticData,
    fetchSuggestions,
    customLoading,
    caching = true,
    dataKey,
  } = props;
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const suggestionListRef = useRef(null);

  const { setCache, getCache } = useCache("autocomplete", 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };

  const getSuggestion = async (query) => {
    setError(null);

    const cachedSuggestion = getCache(query);

    if (cachedSuggestion && caching) {
      setSuggestions(cachedSuggestion);
    } else {
      setLoading(true);
      try {
        let result;
        if (staticData) {
          result = staticData.filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase());
          });
        } else if (fetchSuggestions) {
          result = await fetchSuggestions(query);
        }

        setCache(query, result);
        setSuggestions(result);
      } catch (error) {
        setError("Failes to fetch suggestions");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const getSuggestionsDebounced = useCallback(debounce(getSuggestion, 300), []);

  useEffect(() => {
    setSelectedIndex(-1);
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

  const scrollIntoView = (index) => {
    if (suggestionListRef.current) {
      const suggestionElement =
        suggestionListRef.current.getElementsByTagName("li");
      if (suggestionElement[index]) {
        suggestionElement[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % suggestions.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;

      case "ArrowUp":
        setSelectedIndex((prevIndex) => {
          const newIndex =
            (prevIndex - 1 + suggestions.length) % suggestions.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;

      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        style={customStyle}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={`suggestion-${selectedIndex}`}
      />
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">{customLoading}</div>}

      <ul className="suggestions-list" role="listbox" ref={suggestionListRef}>
        <SuggestionList
          dataKey={dataKey}
          highlight={inputValue}
          suggestions={suggestions}
          onSugestionClick={handleSuggestionClick}
          selectedIndex={selectedIndex}
        />
      </ul>
    </div>
  );
};

export default Autocomplete;
