import styled, { css } from "styled-components";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { useState } from "react";
import {
  BsCheck2,
  BsChevronDown,
  BsEnvelope,
  BsPaperclip,
  BsTwitterX,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { mq } from "../../GlobalStyles";

const StyledShareJob = styled.div`
  position: relative;

  .share-container {
    &--dropdown {
      position: absolute;
      top: calc(100% + 1px);
      left: 0;
      background-color: var(--color-white-1);
      z-index: 10;
      box-shadow: 0 7px 24px 0 #64646f33;
      border-radius: 8px;
      min-width: 200px;
      padding: 1px 4px;
      flex-direction: column;
      display: flex;
      justify-content: center;

      ${mq(
        "md",
        css`
          left: unset;
          right: 0;
        `
      )}

      li {
        padding: 3px 0;

        &:not(:last-child) {
          border-bottom: 1px solid #e5e7eb;
        }

        button.clip {
          svg {
            transform: rotate(45deg);
          }
        }

        a,
        button {
          padding: 10px;
          background-color: transparent;
          width: 100%;
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          line-height: 20px;
          border-radius: 4px;

          &:hover {
            color: var(--color-black-1);
            background-color: #f3f4f6;
          }
        }
      }
    }
  }
`;

export default function ShareJob({
  url = window.location.href,
  title = "Check out this job!",
}) {
  // Copied state
  const [copied, setCopied] = useState(false);

  // Nav open state
  const [open, setOpen] = useState(false);

  // Handle copy url
  const handleCopy = async () => {
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(url);

      // Set copied state to true
      setCopied(true);

      // Set copied state to false
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Error
      console.error("Copy failed:", err);
    }
  };

  // Encoded url
  const encodedURL = encodeURIComponent(url);

  // Encoded title
  const encodedTitle = encodeURIComponent(title);

  // Share links
  const shareLinks = [
    {
      label: "Refer a friend",
      url: `mailto:?subject=${encodedTitle}&body=Hey there, I saw this job on hepdex.com/find-work and thought you might be interested: ${encodedURL}`,
      icon: <BsEnvelope size={16} />,
    },
    {
      label: "Share on Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      icon: <FaFacebookF size={16} />,
    },
    {
      label: "Share on X",
      url: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`,
      icon: <BsTwitterX size={16} />,
    },
    {
      label: "Share on LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
      icon: <FaLinkedinIn size={16} />,
    },
  ];

  return (
    <StyledShareJob className="share-container">
      <Button
        size="sm"
        color="secondary"
        className="alternate"
        id="dropdown-toggle"
        onClick={() => setOpen((s) => !s)}
      >
        Share job <BsChevronDown size={16} />
      </Button>
      {open && (
        <Dropdown
          menuId="share-dropdown"
          btnId="dropdown-toggle"
          close={() => setOpen(false)}
        >
          <ul className="share-container--dropdown" id="share-dropdown">
            <li>
              {copied ? (
                <button>
                  <BsCheck2 size={16} />
                  <span>Copied!</span>
                </button>
              ) : (
                <button onClick={handleCopy} className="clip">
                  <BsPaperclip size={16} />
                  <span>Copy link</span>
                </button>
              )}
            </li>
            {shareLinks.map(({ label, url, icon }, index) => (
              <li key={index} onClick={() => setOpen(false)}>
                <Link target="_blank" to={url} rel="noopener noreferrer">
                  {icon} <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Dropdown>
      )}
    </StyledShareJob>
  );
}
