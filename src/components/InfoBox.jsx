import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";

// InfoBox styles
const InfoBox = styled.div`
  ${flex("center", "center")}
  flex-direction: column;
  column-gap: 32px;
  row-gap: 24px;
  overflow: hidden;

  // Content box
  .content-box {
    width: 100%;
    max-width: 400px;

    p {
      color: var(--color-grey-2);
      margin-top: 12px;
    }

    a {
      margin-top: 24px;
    }

    // Media queries
    ${mq(
      "700px",
      css`
        max-width: 500px;
      `
    )}

    ${mq(
      "800px",
      css`
        padding-top: 24px;
      `
    )}
  }

  // Image box
  .img-box {
    max-width: 400px;
    width: 100%;

    // Image
    img {
      width: 100%;
      height: 100%;
    }
  }

  // Media queries
  ${mq(
    "700px",
    css`
      flex-direction: row !important;
      align-items: flex-start;
    `
  )}

  ${mq(
    "lg",
    css`
      column-gap: 64px;
    `
  )}
`;

export default InfoBox;
