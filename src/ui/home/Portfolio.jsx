import Container from "../../components/Container";
import Netflix from "../../assets/netflix.svg?react";
import Facebook from "../../assets/facebook.svg?react";
import Gitlab from "../../assets/gitlab.svg?react";
import Apple from "../../assets/apple.svg?react";
import Soundcloud from "../../assets/soundcloud.svg?react";
import styled, { css } from "styled-components";
import { flex, mq } from "../../GlobalStyles";

const Box = styled.div`
  background-color: var(--color-grey-1);
  padding: 40px 0px;
  .portfolio {
    ${flex("center")}
    flex-direction: column;
    row-gap: 16px;
    p {
      text-align: center;
      color: var(--color-grey-2);
    }
    ul.logos {
      ${flex("center", "center")}
      flex-wrap: wrap;
      gap: 32px;
      ${mq(
        "lg",
        css`
          column-gap: 64px;
        `
      )}
      li {
        svg {
          height: 24px;
          ${mq(
            "lg",
            css`
              height: auto;
            `
          )}
        }
      }
    }
  }
`;

export default function Portfolio() {
  return (
    <Box>
      <Container>
        <div className="portfolio">
          <p>Trusted by 500+ companies and startups worldwide</p>
          <ul className="logos">
            <li>
              <Netflix />
            </li>
            <li>
              <Facebook />
            </li>
            <li>
              <Apple />
            </li>
            <li>
              <Gitlab />
            </li>
            <li>
              <Soundcloud />
            </li>
          </ul>
        </div>
      </Container>
    </Box>
  );
}
