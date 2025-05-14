import { createGlobalStyle, css, keyframes } from "styled-components";

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

// Animations
export const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

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
  font-family: "Outfit", sans-serif;;
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

// Steps
.steps {
  ${flex("center")}
  flex-direction: column;
  li:last-child {
    .icon {
      align-self: flex-start;
    }
    .arrow {
      display: none;
    }
    .content{
      padding-bottom: 0px;
    }
  }
}

// Info box
.info-box{
  overflow: hidden;
  &#talent{
    flex-direction: column-reverse;
  }
  ${flex("center", "center")}
  flex-direction: column;
  column-gap: 32px;
  row-gap: 24px;
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
  .content{
    width: 100%;
    p {
      color: var(--color-grey-2);
      margin-top: 12px;
    }
    a {
      margin-top: 24px;
    }
    max-width: 400px;
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
  .img-box{
    max-width: 400px;
    width: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
}

// Icon title
.icon-title{
  ${flex(undefined, "center")}
  font-weight: 500;
  gap: 12px;
  span.icon {
    ${flex("center", "center")}
    border-radius: 8px;
    height: 32px;
    width: 32px;
    background-color: var(--color-secondary);
    svg {
      fill: var(--color-primary);
    }
  }
}

// Dashboard box
.dashboard-box {
  background-color: var(--color-white-1);
  border-radius: 8px;
  padding: 24px 16px 40px 16px;
  ${mq(
    "sm",
    css`
      padding: 32px 24px 48px 24px;
    `
  )}
  .title {
    margin-bottom: 24px;
    font-size: 18px;
    line-height: 24px;
  }
}

// Box icon
.box-icon{
  background-color: var(--color-secondary);
  width: 80px;
  height: 80px;
  border-radius: 8px;
  ${flex("center", "center")}
  margin-bottom: 24px;
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

// Table box
.table-box{
  ${flex("center")}
  flex-direction: column;
  // Pagination
  .pagination{
    background-color: var(--color-white-1);
    border-top: 1px solid #e5e7eb;
    padding: 18px 16px;
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
  .table-container{
    overflow-x: auto;
    display: grid;
    grid-template-columns: repeat(1, minmax(0,1fr));
    .table{
    border-spacing: 0;
    text-align: left;
    border-collapse: collapse;
    white-space: nowrap;
    thead{
      letter-spacing: 0px;
      line-height: 56px;
      background-color: #f7f7f7;
      color: var(--color-grey-2);
      th{
        text-transform: uppercase;
        font-weight: 500;
        font-size: 12px;
      }
    }
    tbody{
      background-color: var(--color-white-1);
      tr{
        cursor: pointer;
        &:hover{
            background-color: #fcfcfc;
        }
        &:not(:last-child){
        border-bottom: 1px solid #e5e7eb;
        }
        td{
          padding: 8px 16px;
      
        }
      }
    }
    tr{
      width: 100%;

    th{
      padding: 0px 16px;
    }
  }
}
  }
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
            color: #12b749;
          }
        }
        &.error{
          background-color: #fad2ce;
          svg{
            color: #ed6658;
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

  // Details box
  .details-box {
    ${flex(undefined, "stretch")}
    flex-direction: column;
    ${mq(
      "1100px",
      css`
        flex-direction: row;
      `
    )}
    &__content {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      flex: 1;
      .info {
        padding-left: 20px;
        ${mq(
          "sm",
          css`
            padding-left: 40px;
          `
        )}
        flex-direction: column;
        ${flex("center")}
        &-item {
          ${flex("space-between", "center")}
          gap: 16px;
          padding: 12px 0px;
          border-bottom: 1px solid #e5e7eb;
          &:first-child {
            padding-top: 0px;
          }
          .name {
            width: 33.333%;
            font-weight: 500;
          }
          .value {
            width: 33.333%;
            flex: 1; 
            color: var(--color-grey-2);
            max-width: calc(100% - 16px);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          button{
            ${flex(undefined, "center")}
            background-color: transparent;
            color: var(--color-primary);
            gap: 4px;
            transition: color 0.4s ease-in-out;
            font-size: 15px;
            line-height: 20px;
            &:hover {
              color: var(--color-primary-hover);
            }
          }
        }
      }
    }
    // Side box
    .side-box {
      width: 100%;
      background-color: var(--color-grey-1);
      padding: 40px 32px;
      ${mq(
        "1100px",
        css`
          max-width: 380px;
        `
      )}
      ${flex("center", "center")}
      flex-direction: column;
      gap: 16px;
    }
  }

// Animation classes
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

.aos-animate.custom-fade-up{
  opacity: 1;
  transform: translateY(0);
}
`;

export default GlobalStyles;
