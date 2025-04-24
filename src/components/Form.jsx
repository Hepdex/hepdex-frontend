import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { BsChevronDown } from "react-icons/bs";

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
  & > div:first-child {
    min-height: 25px;
    & > *:first-child {
      margin-right: 8px;
    }
    & > * {
      display: inline-block;
      &::first-letter {
        text-transform: capitalize;
      }
    }
  }
`;

// Input css
const InputCss = css`
  border: 1px solid var(--color-grey-3);
  padding: 0px 12px;
  height: 48px;
  border-radius: 2px;
  line-height: 48px;
  &::placeholder {
    font-weight: 400;
    color: #989898;
  }
`;

// Select
const SelectBox = styled.div`
  position: relative;
  & > * {
    cursor: pointer;
  }
  .select {
    ${() => InputCss}
    width: 100%;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  svg {
    position: absolute;
    top: 16px;
    right: 12px;
    fill: #989898;
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
  padding-top: 12px;
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

function Select({ children }) {
  return (
    <SelectBox>
      <select className="select">{children}</select>
      <BsChevronDown size={16} />
    </SelectBox>
  );
}

function FormGroup({ children, label, error }) {
  return (
    <FormGroupDiv>
      <div>
        {label && <span>{label}</span>}
        {error && <Error>{error}</Error>}
      </div>
      {children}
    </FormGroupDiv>
  );
}

export { Form, Input, Textarea, FormGroup, InputGroup, ButtonGroup, Select };
