import styled, { css } from "styled-components";
import { flex } from "../GlobalStyles";

// Avatar image container
const StyledAvatarImage = styled.div`
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;

  // Size
  ${(props) =>
    props.$size &&
    css`
      min-width: ${`${props.$size}px`};
      height: ${`${props.$size}px`};
    `}

  // No image
    .no-image {
    text-transform: uppercase;
    ${flex("center", "center")}
    height: 100%;
    width: 100%;
    font-family: sans-serif;
    font-weight: 600;
    letter-spacing: 0px;
    font-size: 22px;
    background-color: ${(props) => props.$bgColor && props.$bgColor};
  }
`;

export default function AvatarImage({
  size = 64,
  bgColor = "#e7ddff",
  children,
  ...rest
}) {
  return (
    <StyledAvatarImage $size={size} $bgColor={bgColor} {...rest}>
      {children}
    </StyledAvatarImage>
  );
}
