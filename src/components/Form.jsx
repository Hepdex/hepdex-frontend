import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { BsChevronDown, BsClock } from "react-icons/bs";
import { useState } from "react";

// Form
const Form = styled.form`
  ${flex()}
  flex-direction: column;
  & p {
    display: inline-block;
    color: var(--color-grey-2);
    font-weight: 400;
  }
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

  ${(props) =>
    props.$gap &&
    css`
      row-gap: ${props.$gap + "px"};
    `}
`;

// Input group
const InputGroup = styled.div`
  ${flex()}
  flex-direction: column;
  row-gap: 18px;
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

// Form group
const FormGroupDiv = styled.div`
  ${flex()}
  flex-direction: column;
  row-gap: 8px;
  .label-error {
    min-height: 25px;
    span {
      font-weight: 500;
      color: var(--color-grey-2);
    }
    & > * {
      display: inline-block;
      &::first-letter {
        text-transform: capitalize;
      }
    }
    &:first-child {
      margin-right: 8px;
    }
  }
`;

// Input css
const InputCss = css`
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

// Select
const SelectBox = styled.div`
  position: relative;
  color: var(--color-grey-2);
  & > * {
    cursor: pointer;
  }
  .select {
    background-color: var(--color-white-1);
    ${() => InputCss}
    padding-right: 40px;
    width: 100%;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  svg {
    position: absolute;
    top: 16px;
    right: 12px;
    fill: var(--color-grey-4);
    pointer-events: none;
  }
`;

// Input
const Input = styled.input`
  ${() => InputCss}
`;

// Textarea
const Textarea = styled.textarea`
  ${() => InputCss}
  height: auto;
  padding: 12px;
  line-height: 24px;
`;

// Error
const Error = styled.span`
  background: #fbdcdc;
  border-radius: 2px;
  padding: 0px 8px;
  font-size: 14px;
  line-height: 24px;
  width: auto;
  display: inline-block;
`;

// Button group
const ButtonGroup = styled.div`
  ${flex()}
  margin-top: 8px;
  flex-direction: column;
  row-gap: 18px;
`;

// Time box
const TimeBox = styled.div`
  ${() => InputCss}
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

function Select({ children, ...rest }) {
  return (
    <SelectBox>
      <select className="select" {...rest}>
        {children}
      </select>
      <BsChevronDown size={16} />
    </SelectBox>
  );
}

function Time({
  placeholder,
  name,
  required = false,
  defaultTime,
  defaultState = false,
}) {
  const [on, setOn] = useState(defaultState);
  return (
    <TimeBox>
      {on ? (
        <input
          type="time"
          name={name}
          required={required}
          defaultValue={defaultTime}
        />
      ) : (
        <input
          type="text"
          onFocus={() => setOn(true)}
          placeholder={placeholder}
        />
      )}
      <BsClock size={16} />
    </TimeBox>
  );
}

function FormGroup({ children, label, error }) {
  return (
    <FormGroupDiv>
      {(label || error) && (
        <div className="label-error">
          {label && <span>{label}</span>}
          {error && <Error>{error}</Error>}
        </div>
      )}
      {children}
    </FormGroupDiv>
  );
}

export {
  Form,
  Input,
  Textarea,
  FormGroup,
  InputGroup,
  ButtonGroup,
  Select,
  Time,
};
