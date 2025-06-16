import { BsEnvelope, BsPeople, BsPerson } from "react-icons/bs";
import styled, { css } from "styled-components";
import Button from "../components/Button";
import Container from "../components/Container";
import PageContent from "../components/PageContent";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import { flex, mq } from "../GlobalStyles";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  Select,
  Textarea,
} from "../components/Form";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useRef } from "react";
import useMutate from "../hooks/useMutate";
import { sendMessage } from "../services/apiContact";
import Spinner from "../components/Spinner";
import { notify } from "../utils/helpers";

const StyledContact = styled.div`
  // Contact card
  .contact {
    &-card {
      ${flex("center", "center")}
      background-color: var(--color-grey-1);
      padding: 40px 24px;
      border-radius: 8px;
      text-align: center;
      flex-direction: column;

      // Icon
      &--icon {
        margin-bottom: 8px;
        fill: var(--color-primary);
      }

      // Title
      &--title {
        margin-bottom: 4px;
      }

      // Text
      &--text {
        color: var(--color-grey-2);
        margin-bottom: 16px;
        width: 100%;
        max-width: 400px;
      }
    }

    &-title {
      padding-top: 40px;
      font-size: 28px;
      line-height: 36px;
      margin-bottom: 8px;
      font-weight: 500;

      ${mq(
        "lg",
        css`
          padding-top: 56px;
        `
      )}
    }

    &-text {
      font-size: 18px;
      color: var(--color-grey-2);
      margin-bottom: 16px;
    }
  }
`;

export default function Contact() {
  // Document title
  useDocumentTitle("Contact us");

  // Form box ref
  const formBoxRef = useRef(null);

  // Send message
  const [send, loading] = useMutate(sendMessage);

  // Handle scroll
  function handleScroll() {
    // Scroll offset
    const offset = 100;

    // Get top position of box
    const y =
      formBoxRef.current.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    // Scroll to box
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Handle send message
  const handleSendMessage = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Get form data
    const data = Object.fromEntries(new FormData(e.target));

    // Send request
    const response = await send(data);

    // Check response
    if (response === 200) {
      // Success
      notify("Your message has been sent", "success");
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <StyledContact>
      <PageContent>
        <Section
          title="Reach Out Anytime"
          subtitle="Have a question or feedback? We'd love to connect."
          spaceBottom={true}
        >
          <Container.Row className="custom-fade-up" data-aos>
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="contact-card">
                <BsPeople size={48} className="contact-card--icon" />
                <h3 className="contact-card--title heading-sm">
                  Become a member
                </h3>
                <p className="contact-card--text">
                  If you're looking to grow your career or collaborate with us,
                  drop us a message — we're always open to new talent.
                </p>
                <div>
                  <Button size="sm" onClick={handleScroll}>
                    Join our team
                  </Button>
                </div>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="contact-card">
                <BsEnvelope size={48} className="contact-card--icon" />
                <h3 className="contact-card--title heading-sm">
                  Contact the HepDex team
                </h3>
                <p className="contact-card--text">
                  Have a question or need assistance? Fill out the form below
                  and we’ll get back to you shortly.
                </p>
                <div>
                  <Button size="sm" onClick={handleScroll}>
                    Contact us
                  </Button>
                </div>
              </div>
            </Container.Col>
          </Container.Row>
          <div className="custom-fade-up" data-aos>
            <h2 className="contact-title">How to Get the Fastest Response</h2>
            <p className="contact-text">
              We’re committed to providing you with the best possible support.
              While we strive to respond promptly, please allow a few business
              days for a reply. To help us assist you efficiently, choose the
              most relevant category when submitting your inquiry. This ensures
              your message reaches the right team and allows us to prioritize it
              effectively.
            </p>
            <p className="contact-text">
              For the fastest assistance, include as much detail as possible —
              such as job IDs, account email, technical issues, or specific
              questions. The more context you provide, the quicker we can
              understand and resolve your concern. Thanks for your patience —
              we’re here to help!
            </p>
            <p className="contact-text">
              For more information about HepDex, please visit our FAQs.
            </p>
            <Button size="sm" as={Link} to="/faqs">
              Visit FAQs
            </Button>
          </div>
          <div className="custom-fade-up sm" ref={formBoxRef} data-aos>
            <h2 className="contact-title">Get in Touch</h2>
            <Form
              $gap={18}
              className="contact-form"
              onSubmit={handleSendMessage}
            >
              <InputGroup>
                <FormGroup label="Full name">
                  <Input
                    placeholder="Full name"
                    type="text"
                    required
                    name="name"
                  />
                </FormGroup>
                <FormGroup label="Email address">
                  <Input
                    placeholder="Email address"
                    type="email"
                    required
                    name="email"
                  />
                </FormGroup>
              </InputGroup>
              <FormGroup label="Subject">
                <Select name="inquiryType" required>
                  <option value="General inquiry">General inquiry</option>
                  <option value="Technical support">Technical support</option>
                  <option value="Billing issue">Billing issue</option>
                  <option value="Member application">Member application</option>
                  <option value="Others">Others</option>
                </Select>
              </FormGroup>
              <FormGroup label="Message">
                <Textarea
                  placeholder="Your message"
                  rows={5}
                  required
                  name="message"
                />
              </FormGroup>
              <div className="submit-box">
                <Button type="submit" $loading={loading} disabled={loading}>
                  <span>Send message</span>
                  {loading && <Spinner />}
                </Button>
              </div>
            </Form>
          </div>
        </Section>
      </PageContent>
    </StyledContact>
  );
}
