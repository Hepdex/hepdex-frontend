import EyeSlashIcon from "../assets/icons/eye-slash.svg?react";
import EyeIcon from "../assets/icons/eye.svg?react";
import styled, { css } from "styled-components";
import { useState } from "react";
import { BsArrowRight, BsChevronDown, BsClock, BsX } from "react-icons/bs";
import { flex, mq } from "../GlobalStyles";

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

  // Link styles
  & a {
    display: inline-block;
    color: var(--color-black-1);
    font-weight: 500;
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

  .label {
    min-height: 25px;

    span {
      font-weight: 500;
      color: #484646;
      display: inline-block;

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

    li {
      ${flex("center", "center")}
      gap: 4px;
      background-color: #f3f4f6;
      border-radius: 2px;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 14px;
      line-height: 20px;
      color: var(--color-grey-2);

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

function FormGroup({ children, label, ...rest }) {
  return (
    <StyledFormGroup {...rest}>
      {label && <div className="label">{label && <span>{label}</span>}</div>}
      {children}
    </StyledFormGroup>
  );
}

function ValuesBox({
  state = [],
  setState,
  placeholder = "Enter values",
  label,
}) {
  // Input state
  const [inputValue, setInputValue] = useState("");

  // Handle set value
  const handleSetValue = (value) => {
    setState((prev) => [...prev, value]);
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
            <li key={i}>
              <span>{item}</span>
              <button
                type="button"
                onClick={() =>
                  setState((prev) => prev.filter((value) => value !== item))
                }
              >
                <BsX size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </StyledValuesBox>
  );
}

function Password({
  label,
  name,
  required = false,
  placeholder = "Enter password",
}) {
  // Hide password state
  const [show, setShow] = useState(false);

  return (
    <StyledPassword>
      <FormGroup label={label}>
        <Input
          type={`${show ? "text" : "password"}`}
          name={name}
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
  Password,
  Select,
  Textarea,
  Time,
};
