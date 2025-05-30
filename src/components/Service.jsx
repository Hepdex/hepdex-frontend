import styled from "styled-components";
import Container from "./Container";
import { Link } from "react-router-dom";
import { flex } from "../GlobalStyles";

const ServiceBox = styled(Link)`
  ${flex(undefined, "center")}
  flex-direction: column;
  background-color: var(--color-grey-1);
  border-radius: 8px;
  height: 100%;
  padding: 48px 32px;
  transition: all 0.3s ease-in-out;
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
  .browse {
    font-weight: 500;
    margin-top: 16px;
    font-size: 14px;
    border-bottom: 1px solid var(--color-black-1);
  }
`;

export default function Service({ service, to = "" }) {
  return (
    <Container.Col
      breakPoints={[
        { name: "sm", cols: 2 },
        { name: "900px", cols: 3 },
      ]}
    >
      <ServiceBox to={to}>
        <div className="icon">
          <img src={service.img} alt={service.name} />
        </div>
        <h3 className="name">{service.name}</h3>
        <p className="text">{service.text}</p>
        <span className="browse">Browse experts</span>
      </ServiceBox>
    </Container.Col>
  );
}
