import EyeSlashIcon from "../assets/icons/eye-slash.svg?react";
import EyeIcon from "../assets/icons/eye.svg?react";
import Badge from "./Badge";
import Dropdown from "./Dropdown";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import {
  BsArrowRight,
  BsChevronDown,
  BsClock,
  BsX,
  BsXLg,
} from "react-icons/bs";
import { flex, mq } from "../GlobalStyles";
import { notify } from "../utils/helpers";

// Form container
const Form = styled.form`
  ${flex()}
  flex-direction: column;

  // Paragraph styles
  & p {
    display: inline-block;
    color: var(--color-grey-2);
    font-weight: 400;
  }

  & a,
  & p {
    &::first-letter {
      text-transform: capitalize;
    }
  }

  // Vertical spacing
  ${(props) =>
    props.$gap &&
    css`
      row-gap: ${props.$gap + "px"};
    `}

  // Submit box
  .submit-box {
    margin-top: 6px;
  }
`;

// Input group
const InputGroup = styled.div`
  ${flex()}
  flex-direction: column;
  row-gap: 18px;

  // Small screens
  ${mq(
    "sm",
    css`
      flex-direction: row;
      align-items: end;
      gap: 16px;

      & > * {
        width: 50%;

        input {
          width: 100%;
        }
      }
    `
  )}
`;

// Form group styles
const StyledFormGroup = styled.div`
  ${flex()}
  flex-direction: column;
  row-gap: 4px;

  .error-instructions {
    margin-top: 4px;
    font-size: 14px;
    line-height: 1;
    color: var(--color-grey-2);
  }

  &.error {
    input {
      border-color: var(--color-error);
    }

    .error-instructions {
      color: var(--color-error);
    }
  }

  .label {
    min-height: 25px;

    span {
      font-weight: 500;
      color: #484646;
      display: inline-block;

      .required {
        color: var(--color-error);
      }

      &::first-letter {
        text-transform: capitalize;
      }
    }
  }
`;

// Default styles
const DefaultStyles = css`
  border: 1px solid var(--color-grey-3);
  padding: 12px;
  height: 48px;
  border-radius: 8px;
  line-height: 24px;
  color: var(--color-grey-2);

  &::placeholder {
    font-weight: 400;
    color: var(--color-grey-4);
  }
`;

// Select styles
const StyledSelect = styled.div`
  position: relative;
  color: var(--color-grey-2);

  & > * {
    cursor: pointer;
  }

  select {
    ${() => DefaultStyles}
    background-color: var(--color-white-1);
    padding-right: 40px;
    width: 100%;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
    fill: var(--color-grey-4);
    pointer-events: none;
  }

  ${(props) =>
    props.$alt === true &&
    css`
      select {
        height: 40px;
        line-height: 20px;
        font-size: 15px;
        padding-top: 0px;
        padding-bottom: 0px;
      }

      svg {
        width: 14px;
        height: 14px;
      }
    `}
`;

// Input styles
const Input = styled.input`
  ${() => DefaultStyles}

  ${(props) =>
    props.$sm === true &&
    css`
      height: 40px;
      line-height: 20px;
      font-size: 15px;
      padding-top: 0px;
      padding-bottom: 0px;

      & ~ svg {
        fill: #757575;
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
      }
    `}
`;

// Textarea styles
const Textarea = styled.textarea`
  ${() => DefaultStyles}
  height: auto;
  padding: 12px;
  line-height: 24px;
`;

// Time input styles
const StyledTime = styled.div`
  ${() => DefaultStyles}
  cursor: pointer;
  position: relative;

  input::-webkit-calendar-picker-indicator,
  svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  input {
    border: none;
    outline: none;
    cursor: pointer;
    width: 100%;

    &::-webkit-calendar-picker-indicator {
      opacity: 0;
      cursor: pointer;
      right: 8px;
    }
  }

  svg {
    pointer-events: none;
    fill: var(--color-grey-2);
  }
`;

// Password input styles
const StyledPassword = styled.div`
  position: relative;
  button {
    ${flex("center", "center")}
    background-color: transparent;
    position: absolute;
    height: 16px;
    top: 44px;
    right: 12px;

    svg {
      & > * {
        fill: var(--color-grey-4);
      }
    }
  }
`;

// Values box styles
const StyledValuesBox = styled.div`
  .values-box {
    position: relative;

    button.add-value {
      top: calc(29px + 15px);
      right: 12px;
      background-color: transparent;
      position: absolute;

      svg {
        fill: #757575;
      }
    }
  }

  .values-list {
    ${flex(undefined, "center")}
    gap: 12px;
    margin-top: 8px;
    flex-wrap: wrap;

    span {
      button {
        background-color: transparent;

        svg {
          margin-top: 1px;
          fill: #757575;
        }
      }
    }
  }
`;

// Search dropdown
const StyledSearchSelect = styled.div`
  position: relative;
  width: 100%;

  &.sm {
    width: auto;
    .search-dropdown {
      &--input {
        font-size: 15px;
        line-height: 20px;
        padding: 0 12px;
        height: 40px;
      }

      &--icon {
        width: 14px;
        height: 14px;
      }
    }
  }

  .search-dropdown {
    &--input {
      cursor: pointer;
      width: 100%;
      caret-color: transparent;
      padding-right: 40px !important;

      &::placeholder {
        color: var(--color-grey-2);
      }
    }

    &--icon {
      position: absolute;
      top: 50%;
      right: 12px;
      fill: var(--color-grey-4);
      transform: translateY(-50%);
      pointer-events: none;
    }

    &--list {
      list-style: none;
      position: absolute;
      width: 100%;
      min-width: 220px;
      background-color: var(--color-white-1);
      border: 1px solid var(--color-grey-3);
      max-height: 216px;
      border-radius: 8px;
      overflow-y: auto;
      z-index: 4;
      box-shadow: 0 7px 24px 0 #64646f33;

      li {
        max-height: 36px;
        padding: 8px 12px;
        cursor: pointer;
        background-color: var(--color-white-1);
        font-size: 15px;
        line-height: 20px;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;

        &:not(:first-child):hover,
        &.active {
          background-color: #f3f4f6;
        }

        &.search-list {
          position: sticky;
          top: 0;
          left: 0;
          ${flex("space-between", "center")}

          svg {
            fill: var(--color-grey-4);
          }

          input {
            width: 100%;
          }
        }
      }
    }
  }
`;

function Select({ children, className, alt = false, ...rest }) {
  return (
    <StyledSelect className={className} $alt={alt}>
      <select {...rest}>{children}</select>
      <BsChevronDown size={16} />
    </StyledSelect>
  );
}

function Time({ name, required = false, defaultTime }) {
  return (
    <StyledTime>
      <input
        type="time"
        name={name}
        required={required}
        defaultValue={defaultTime}
      />
      <BsClock size={16} />
    </StyledTime>
  );
}

function FormGroup({
  children,
  label,
  error = "",
  instructions = "",
  ...rest
}) {
  return (
    <StyledFormGroup {...rest} className={error ? "error" : ""}>
      {label && <div className="label">{label && <span>{label}</span>}</div>}
      {children}
      {(instructions || error) && (
        <div className="error-instructions">{error || instructions}</div>
      )}
    </StyledFormGroup>
  );
}

function ValuesBox({
  state = [],
  limit = 5,
  setState,
  placeholder = "Enter values",
  label,
}) {
  // Input state
  const [inputValue, setInputValue] = useState("");

  // Handle set value
  const handleSetValue = (value) => {
    if (state.length < limit) {
      setState((prev) => [...prev, value]);
    } else {
      notify(`Maximum of ${limit} ${label.toLowerCase()} allowed`, "error");
    }
    setInputValue("");
  };

  return (
    <StyledValuesBox>
      <FormGroup className="values-box" label={label}>
        <Input
          placeholder={placeholder}
          value={inputValue}
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => {
            if ((e.key === "Enter" || e.code === 13) && e.target.value)
              handleSetValue(e.target.value);
          }}
        />
        {inputValue && (
          <button
            className="add-value"
            type="button"
            onClick={() => handleSetValue(inputValue)}
          >
            <BsArrowRight />
          </button>
        )}
      </FormGroup>
      {state.length > 0 && (
        <ul className="values-list">
          {state.map((item, i) => (
            <Badge className="neutral" key={i}>
              <span>{item}</span>
              <button
                type="button"
                onClick={() =>
                  setState((prev) => prev.filter((value) => value !== item))
                }
              >
                <BsX size={20} />
              </button>
            </Badge>
          ))}
        </ul>
      )}
    </StyledValuesBox>
  );
}

function SearchSelect({
  items,
  name,
  defaultItem,
  onSelect,
  param,
  required = true,
  valueField = "name",
  placeholder = "Select items",
  searchPlaceholder = "Search items",
  className = "",
}) {
  // Select item
  const [item, setItem] = useState(defaultItem);

  // Search value
  const [query, setQuery] = useState(defaultItem?.[valueField] ?? "");

  // Filtered items
  const filteredItems = items.filter((item) =>
    item[valueField].toLowerCase().includes(query.toLowerCase())
  );

  // Show dropdown
  const [show, setShow] = useState(false);

  // Clear item
  function clear() {
    setItem({});

    setQuery("");
  }

  // Handle select item
  function handleSelect(item) {
    // Set search value
    setQuery("");

    // Hide dropdown
    setShow(false);

    // Select item
    setItem(item);

    onSelect?.(item, setItem);
  }

  useEffect(() => {
    if (param === "") clear();
    if (param) {
      setItem(items.find((item) => item.name === param) ?? {});
    }
  }, [param, items]);

  return (
    <StyledSearchSelect className={`search-dropdown ${className}`}>
      <Input
        name={name}
        autoComplete="off"
        onClick={(e) => {
          e.stopPropagation();
          setQuery("");
          setShow((s) => !s);
        }}
        required={required}
        placeholder={placeholder}
        onChange={() => {}}
        className="search-dropdown--input"
        value={
          Object.keys(item).length === 0
            ? ""
            : `${item.flag} ${item[valueField]}`
        }
        id={`${name}-btn`}
      />
      <BsChevronDown size={16} className="search-dropdown--icon" />
      {show && (
        <Dropdown
          close={() => setShow(false)}
          menuId={`${name}-select`}
          btnId={`${name}-btn`}
        >
          <ul className="search-dropdown--list" id={`${name}-select`}>
            <li className="search-list">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
              />

              {query && (
                <BsXLg
                  size={14}
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuery("");
                  }}
                />
              )}
            </li>
            {filteredItems.length > 0 ? (
              filteredItems.map((currItem, i) => (
                <li
                  className={
                    currItem[valueField] === item[valueField] ? "active" : ""
                  }
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(currItem);
                  }}
                >
                  {`${currItem.flag} ${currItem[valueField]}`}
                </li>
              ))
            ) : (
              <li style={{ padding: "8px", color: "#999" }}>No results</li>
            )}
          </ul>
        </Dropdown>
      )}
    </StyledSearchSelect>
  );
}

function Password({
  label,
  name,
  required = false,
  placeholder = "Enter password",
  onChange,
  ...rest
}) {
  // Hide password state
  const [show, setShow] = useState(false);

  return (
    <StyledPassword>
      <FormGroup label={label} {...rest}>
        <Input
          type={`${show ? "text" : "password"}`}
          name={name}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
      </FormGroup>
      <button type="button" onClick={() => setShow((s) => !s)}>
        {show ? (
          <EyeSlashIcon width={20} height={20} />
        ) : (
          <EyeIcon width={20} height={20} />
        )}
      </button>
    </StyledPassword>
  );
}

export {
  Form,
  FormGroup,
  Input,
  ValuesBox,
  InputGroup,
  SearchSelect,
  Password,
  Select,
  Textarea,
  Time,
};
