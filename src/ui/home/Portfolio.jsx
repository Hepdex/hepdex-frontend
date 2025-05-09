import Container from "../../components/Container";
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
        img {
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
              <img alt="netflix" src="logos/netflix.svg" />
            </li>
            <li>
              <img alt="facebook" src="logos/facebook.svg" />
            </li>
            <li>
              <img alt="apple-music" src="logos/apple.svg" />
            </li>
            <li>
              <img alt="gitlab" src="logos/gitlab.svg" />
            </li>
            <li>
              <img alt="soundcloud" src="logos/soundcloud.svg" />
            </li>
          </ul>
        </div>
      </Container>
    </Box>
  );
}
