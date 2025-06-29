import SignupBox from "../components/SignupBox";
import styled from "styled-components";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { flex } from "../GlobalStyles";
import { BsHouseDoor, BsPerson } from "react-icons/bs";

const StyledOptions = styled.ul`
  ${flex("center")}
  flex-direction: column;
  gap: 16px;

  li a {
    ${flex("space-between", "center")}
    background-color: var(--color-white-1);
    width: 100%;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 24px 16px;
    gap: 16px;

    &:hover {
      border-color: var(--color-primary);
    }

    .left {
      h3 {
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
        margin-bottom: 2px;
      }

      p {
        color: var(--color-grey-2);
      }
    }

    .right {
      ${flex("center", "center")}
      background-color: var(--color-secondary);
      height: 40px;
      min-width: 40px;
      border-radius: 8px;

      svg {
        fill: var(--color-primary);
      }
    }
  }
`;

const SignupPage = () => {
  // Document title
  useDocumentTitle("Sign up");

  return (
    <SignupBox>
      <SignupBox.Left>
        <div>
          <h2>Sign up to get started</h2>
          <p>
            Signing up is simple, free, and fast. Join our platform and unlock
            new possibilities.
          </p>
        </div>
      </SignupBox.Left>
      <SignupBox.Content title="How would you be using HepDex?">
        <StyledOptions>
          <li className="company">
            <Link to="/employer/signup">
              <div className="left">
                <h3>I'm a company</h3>
                <p>I want to manage my team or recruit new talent.</p>
              </div>
              <div className="right icon">
                <BsHouseDoor size={24} />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/candidate/signup">
              <div className="left">
                <h3>I'm an individual</h3>
                <p>I'm a freelancer, job seeker, or employee.</p>
              </div>
              <div className="right icon">
                <BsPerson size={24} />
              </div>
            </Link>
          </li>
        </StyledOptions>
      </SignupBox.Content>
    </SignupBox>
  );
};

export default SignupPage;
