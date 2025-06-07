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

// Global styles
const GlobalStyles = createGlobalStyle`
:root{
    --color-white-1: #ffffff;
    --color-white-2: #fff9;
    --color-black-1: #111827;
    --color-primary: #915DC2;
    --color-primary-hover: #7c43b1;
    --color-secondary: #F5F1FF;
    --color-tertiary: #E7DDFF;
    --color-error: #e24838;
    --color-success:  #12b749;
    --color-grey-1: #F9FAFC;
    --color-grey-2: #5A5758;
    --color-grey-3: #D2D2D2;
    --color-grey-4: #989898;

    // Toastify
    --toastify-font-family: "Outfit" , sans-serif;
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
  font-family: "Twemoji Country Flags","Outfit", sans-serif;;
  color: var(--color-black-1);
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

// Heading styles
.heading-lg{
  font-size: 42px;
  line-height: 48px;

  ${mq(
    "sm",
    css`
      font-size: 56px;
      line-height: 64px;
    `
  )}
  
  ${mq(
    "xl",
    css`
      font-size: 72px;
      line-height: 70px;
    `
  )}
}

.heading-sm{
  font-size: 22px;
  font-weight: 500;
  line-height: 28px;
}

.heading-md{
  font-size: 36px;
  line-height: 44px;

  ${mq(
    "sm",
    css`
      font-size: 42px;
      line-height: 56px;
    `
  )}

  ${mq(
    "lg",
    css`
      font-size: 48px;
      line-height: 60px;
    `
  )}

  font-weight: 500;
}

// Font weights
.font-medium{
  font-weight: 500;
}

// Text styles
.text-md{
  font-size: 18px;
  line-height: 28px;
}


// Overlay
.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 8;
}


// Tabs
.tabs{
  ${flex(undefined, "center")}
  gap: 40px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 32px;
  li {
    button{
      background-color: transparent;
      padding-bottom: 12px;
      display: inline-block;
      color: var(--color-grey-2);
      font-weight: 500;
      transition: color .4s ease-in-out;
      &.active, &:hover{
        color: var(--color-black-1);
      }
      &.active{
        position: relative;
        &::after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: var(--color-primary);
          height: 3px;
        }
      }
    }
  }
}

// Toast
.toast{
  position: relative;
  & > div:first-child{
    width: 100%;
    // Top
    .top{
      button{
        position: absolute;
        right: 14px;
        top: 12px;
        background-color: transparent;
        svg{
          fill: #757575;
        }
      }
    }
    // Content
    .content{
      ${flex(undefined, "center")}
      gap: 8px;
      // Icon
      .icon{
        ${flex("center", "center")}
        min-width: 20px;
        height: 20px;
        border-radius: 50%;
        // Success
        &.success{
          background-color: #aee5c2;
          svg{
            color: var(--color-success);
          }
        }
        &.error{
          background-color: #fad2ce;
          svg{
            color: var(--color-error);
          }
        }
      }
      .label{
        &::first-letter{
          text-transform: uppercase;
        }
        color: var(--color-black-1);
      }
    }
  }
}


   // Pagination
  .pagination{
    background-color: var(--color-white-1);
    border-top: 1px solid #e5e7eb;
    padding: 16px;
    font-size: 15px;
    line-height: 20px;
    min-height: 64px;
    max-height: 64px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    ${flex("space-between", "center")}
    &-controls{
      ${flex(undefined, "center")}
      gap: 4px;
      button{
        min-height: 32px;
        min-width: 32px;
        padding: 0px;
      }
    }
  } 

// Animations
@keyframes skeletonLoader {
  0% {
      background-color: hsl(200, 20%, 86%)
  }
  100%{
    background-color: hsl(200, 20%, 95%)
  }
}

@keyframes rotate {
 to {
    transform: rotate(1turn)
  }
}

// Animation classes
.skeleton{
  opacity: 0.7;
  animation: skeletonLoader 1s linear infinite alternate;
}

.rotate{
  animation: rotate 1.5s infinite linear;
}

.custom-fade-right{
  opacity: 0;
  transform: translateX(-50%);
  transition:  transform .5s ease-in, opacity .5s ease-in;
}

.aos-animate.custom-fade-right{
  opacity: 1;
  transform: translateX(0);
}

.custom-fade-left{
  opacity: 0;
  transform: translateX(50%);
  transition: transform .5s ease-in, opacity .5s ease-in;
}

.aos-animate.custom-fade-left{
  opacity: 1;
  transform: translateX(0);
}

.custom-fade-up{
  opacity: 0;
  transform: translateY(80%);
  transition:  transform .5s ease-in, opacity .5s ease-in;
}

.custom-fade-up.sm{
  transform: translateY(20%);
}

.aos-animate.custom-fade-up{
  opacity: 1;
  transform: translateY(0);
}
`;

export default GlobalStyles;
