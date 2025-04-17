import { createGlobalStyle, css } from "styled-components";

// Flex helper
export const flex = (justify, align) => css`
  display: flex;
  ${justify &&
  css`
    justify-content: ${justify};
  `}
  ${align &&
  css`
    align-items: ${align};
  `}
`;

// Break points
export const sizes = {
  xs: "380px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px",
};

// Media query helper
export const mq = (size, inner) => css`
  @media (min-width: ${sizes[size] ? sizes[size] : size}) {
    ${inner};
  }
`;

const GlobalStyles = createGlobalStyle`
:root{
    --color-white-1: #ffffff;
    --color-white-2: #fff9;
    --color-black-1: #111827;
    --color-primary: #915DC2;
    --color-primary-hover: #7c43b1;
    --color-secondary: #F5F1FF;
    --color-grey-1: #F9FAFC;
    --color-grey-2: #5A5758;
}
// Resets
*,
*::before,
*::after{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  border: none;
  outline: none;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Outfit", sans-serif;;
  color: var(--color-black-1);
  overflow-x: hidden;
  line-height: 24px;
  letter-spacing: -0.25px;
  font-weight: 400;
  font-size: 1.6rem;
  background-color: var(--color-white-1);
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  transition: color .4s ease-in-out;
}

p,h1,h2,h3,h4,h5,h6{
 overflow-wrap: break-word;
}

h1,h2,h3,h4,h5,h6{
letter-spacing: -0.5px;
}

img{
    display: block;
}

.heading-md{
  font-size: 48px;
  line-height: 60px;
  font-weight: 500;
}

.text-md{
  font-size: 18px;
  line-height: 28px;
}

.info-box{
  ${flex("center")}
  gap: 64px;
  .content{
    padding-top: 24px;
    max-width: 500px;
    p {
      color: var(--color-grey-2);
      margin-top: 16px;
    }
    a {
      margin-top: 24px;
    }
  }
}

div.reason {
    & > .icon {
      background-color: var(--color-secondary);
      width: 80px;
      height: 80px;
      border-radius: 8px;
      ${flex("center", "center")}
      margin-bottom: 24px;
    }
    & > .title {
      font-size: 22px;
      line-height: 32px;
      text-align: left;
      margin-bottom: 8px;
    }
    & > .text {
      color: var(--color-grey-2);
      max-width: 300px;
      width: 100%;
    }
  }

`;

export default GlobalStyles;
