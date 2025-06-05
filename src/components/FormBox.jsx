import styled from "styled-components";
import { flex } from "../GlobalStyles";

const StyledFormBox = styled.div`
  padding: 40px 0px;
  max-width: 580px;
  margin: 0 auto;

  .form-box {
    &--content {
      ${flex("center")}
      flex-direction: column;
      gap: 4px;
      margin-bottom: 32px;

      p {
        color: var(--color-grey-2);
      }
    }
  }

  form {
    .form-content {
      ${flex("center")}
      flex-direction: column;
      row-gap: 18px;

      // Radio group
      .radio-group {
        ${flex(undefined, "center")}
        column-gap: 32px;
        row-gap: 18px;
        flex-wrap: wrap;

        .radio-group--box {
          label {
            ${flex(undefined, "center")}
            gap: 8px;

            &,
            input {
              cursor: pointer;
            }

            input {
              height: 20px;
              width: 20px;
              border: 2px solid;
              border-color: var(--color-grey-2);
              border-radius: 50%;
              box-sizing: border-box;
              appearance: none;
              position: relative;

              &:checked,
              &:hover {
                border-color: var(--color-primary);
              }

              &:checked::after {
                content: "";
                position: absolute;
                width: 10px;
                height: 10px;
                display: block;
                border-radius: 50%;
                background-color: var(--color-primary);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
      }

      &--row__box {
        ${flex("center")}
        gap: 18px;
        flex-direction: column;
      }
    }
  }
`;

export default function FormBox({ children, title, subtitle }) {
  return (
    <StyledFormBox>
      <div className="form-box--content">
        <h3 className="heading-md">{title}</h3>
        <p className="text-md">{subtitle}</p>
      </div>
      {children}
    </StyledFormBox>
  );
}
