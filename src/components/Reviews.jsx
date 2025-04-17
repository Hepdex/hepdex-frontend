import styled from "styled-components";
import Section from "./Section";
import { reviews } from "../data/reviews";
import { flex } from "../GlobalStyles";
import { BsStarFill } from "react-icons/bs";
import { motion } from "framer-motion";

const Div = styled.div`
  ul.reviews {
    ${flex("space-between")}
    .review {
      max-width: 520px;
      .text {
        font-size: 24px;
        line-height: 32px;
        font-weight: 500;
        margin-bottom: 16px;
      }
      .rating {
        ${flex(undefined, "center")}
        margin-bottom: 24px;
        column-gap: 8px;
      }
      .user {
        ${flex(undefined, "center")}
        column-gap: 12px;
        .details {
          ${flex()}
          flex-direction: column;
          .name {
            font-size: 14px;
            line-height: 28px;
          }
          .role {
            font-size: 12px;
            line-height: 12px;
            color: var(--color-grey-2);
          }
        }
      }
    }
  }
`;

export default function Reviews() {
  return (
    <Section
      title="What our clients say"
      subtitle="We consistently guide clients worldwide to success."
      marginBottom={true}
    >
      <Div>
        <ul className="reviews">
          {reviews.map((review, index) => (
            <motion.li
              className="review"
              key={index}
              initial={{ opacity: 0, y: "50%" }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                ease: "easeIn",
              }}
            >
              <p className="text">“{review.text}”</p>
              <div className="rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <BsStarFill size={16} key={index} fill="#F99D15" />
                ))}
              </div>
              <div className="user">
                <div className="image">
                  <img src={review.img} alt={review.name} />
                </div>
                <div className="details">
                  <p className="name">-{review.name}</p>
                  <span className="role">{review.role}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </Div>
    </Section>
  );
}
