import styled from "styled-components";
import Container from "./Container";
import { flex } from "../GlobalStyles";

const ExpertBox = styled.div`
  ${flex(undefined, "center")}
  flex-direction: column;
  background-color: var(--color-grey-1);
  border-radius: 8px;
  height: 100%;
  padding: 48px 32px;
  transition: all 0.3s ease-in-out;
  text-align: center;
  &:hover {
    background-color: var(--color-secondary);
    & p.text {
      color: var(--color-black-1);
    }
  }
  .icon {
    margin-bottom: 16px;
  }
  .name {
    font-size: 22px;
    line-height: 32px;
    margin-bottom: 8px;
    text-align: center;
  }
  .text {
    color: var(--color-grey-2);
    transition: all 0.3s ease-in-out;
  }
`;

export default function Expert({ expert }) {
  return (
    <Container.Col
      breakPoints={[
        { name: "sm", cols: 2 },
        { name: "900px", cols: 3 },
      ]}
    >
      <ExpertBox>
        <div className="icon">{expert.icon()}</div>
        <h3 className="name">{expert.name}</h3>
        <p className="text">{expert.text}</p>
      </ExpertBox>
    </Container.Col>
  );
}
