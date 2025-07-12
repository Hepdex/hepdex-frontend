import styled from "styled-components";

const StyledPreloader = styled.div`
  background-color: #fff;
  position: fixed;
  inset: 0;
  z-index: 999999;
  overflow: hidden;
  transition: all 0.6s ease-out;

  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }

  &::before {
    content: "";
    position: fixed;
    top: calc(50% - 22px);
    left: calc(50% - 22px);
    border: 6px solid #ffffff;
    border-color: #915dc2 #915dc2 #915dc2 transparent;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    animation: rotate 1.5s infinite linear;
  }
`;

const Preloader = () => {
  return <StyledPreloader />;
};
export default Preloader;
