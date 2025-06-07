import Container from "../../components/Container";
import Netflix from "../../assets/netflix.svg?react";
import Facebook from "../../assets/facebook.svg?react";
import Gitlab from "../../assets/gitlab.svg?react";
import Apple from "../../assets/apple.svg?react";
import Soundcloud from "../../assets/soundcloud.svg?react";
import styled, { css } from "styled-components";
import { flex, mq } from "../../GlobalStyles";

// Portolio container
const StyledPortfolio = styled.div`
  background-color: var(--color-grey-1);
  padding: 40px 0px;

  .portfolio {
    &-inner {
      ${flex("center")}
      flex-direction: column;
      row-gap: 16px;

      p {
        text-align: center;
        color: var(--color-grey-2);
      }

      // Company logos
      .company-logos {
        ${flex("center", "center")}
        flex-wrap: wrap;
        gap: 32px;

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

        // Large scrrens
        ${mq(
          "lg",
          css`
            column-gap: 64px;
          `
        )}
      }
    }
  }
`;

export default function Portfolio() {
  return (
    <StyledPortfolio className="portfolio">
      <Container>
        <div className="portfolio-inner">
          <p>Trusted by 500+ companies and startups worldwide.</p>
          {/* Company logos*/}
          <ul className="company-logos">
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
    </StyledPortfolio>
  );
}
