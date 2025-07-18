import styled from "styled-components";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { Form } from "./Form";
import { useEffect, useRef, useState } from "react";
import { BsSliders, BsXLg } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { flex } from "../GlobalStyles";
import { capitalizeFirst } from "../utils/helpers";

// Filter box
const FilterBox = styled.div`
  ${flex(undefined, "center")}
  display: inline-flex;
  gap: 12px;
  flex-wrap: wrap;
  .filter {
    // Btn
    &-btn {
      svg {
        pointer-events: none;
      }
    }
    // Dropdown
    &-dropdown {
      position: fixed;
      min-width: 250px;
      z-index: 4;
      background-color: var(--color-white-1);
      box-shadow: 0 7px 24px 0 #64646f33;
      border-radius: 8px;
      padding: 16px;
      // Form
      form {
        select,
        * > input {
          max-width: 218px;
        }
        // Btn box
        .btn-box {
          gap: 12px;
          ${flex("start", "center")}
        }
      }
    }
    // List
    &-list {
      ${flex(undefined, "center")}
      flex-wrap: wrap;
      gap: 12px;
      &__item {
        font-size: 15px;
        font-weight: 500;
        color: var(--color-black-1);
        background-color: var(--color-secondary);
        border-radius: 8px;
        height: 40px;
        border: 1px solid var(--color-primary);
        padding: 0 16px;
        gap: 8px;
        ${flex("center", "center")}
      }
      &__btn {
        background-color: transparent;
        color: var(--color-primary);
      }
    }
  }
`;

export default function Filter({ children, id, fields }) {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();
  // Dropdown state
  const [open, setOpen] = useState(false);
  // Close
  const close = () => setOpen(false);
  // Button ref
  const buttonRef = useRef(null);
  // Menu ref
  const menuRef = useRef(null);

  // Set filter
  const setFilter = (e) => {
    // Prevent default submit
    e.preventDefault();
    // Get form values
    const data = Object.fromEntries(new FormData(e.target));

    // Set params
    const params = new URLSearchParams(searchParams);
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (key === "country") {
          const [_emoji, ...rest] = value.split(" ");
          params.set(key, rest.join(" "));
        } else {
          params.set(key, value);
        }
      }
    });
    // Delete page
    params.delete("page");
    setSearchParams(params);
    // Close window
    close();
  };

  // Update position
  const updatePosition = () => {
    if (buttonRef.current && menuRef.current) {
      // Get button position
      const rect = buttonRef.current.getBoundingClientRect();
      // Menu
      const menu = menuRef.current;
      // Set menu position
      let top = `${rect.bottom + 12}px`;
      let left = `${rect.left}px`;

      // Check if menu is close to right edge
      if (rect.left + menu.offsetWidth + 20 > window.innerWidth) {
        left = `${
          rect.left - (menu.offsetWidth - buttonRef.current.offsetWidth)
        }px`;
      }
      // Position menu
      menu.style.top = top;
      menu.style.left = left;
    }
  };

  // Reset filter
  const resetFilter = () => {
    // Set params
    const params = new URLSearchParams(searchParams);
    // Clear filters
    fields.forEach((item) => {
      params.delete(item);
    });
    // Delete page
    params.delete("page");
    setSearchParams(params);
    // Close window
    close();
  };

  // Filter array
  const filterArray = fields
    .filter((item) => searchParams.get(item))
    .map((item) => {
      return { key: item, value: searchParams.get(item) };
    });

  // Remove filter
  const removeFilter = (key) => {
    // Set params
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    setSearchParams(params);
  };

  // Listener
  useEffect(() => {
    if (open) {
      // Update position
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }

    // Clean up function
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  return (
    <FilterBox className="filter" id={id}>
      <Button
        size="sm"
        className="alternate filter-btn"
        color="secondary"
        id={`${id}__btn`}
        onClick={() => setOpen((s) => !s)}
        ref={buttonRef}
      >
        <BsSliders size={16} />
        Filter
      </Button>
      {filterArray.length > 0 && (
        <ul className="filter-list">
          {filterArray.map((item, index) => (
            <li key={index} className="filter-list__item">
              <span>{capitalizeFirst(item.value)}</span>
              <button
                className="filter-list__btn"
                onClick={() => removeFilter(item.key)}
              >
                <BsXLg size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && (
        <Dropdown close={close} menuId={id} btnId={`${id}__btn`}>
          <div className="filter-dropdown" ref={menuRef}>
            <Form $gap={16} onSubmit={setFilter}>
              {children}
              <div className="btn-box">
                <Button
                  type="button"
                  color="secondary"
                  size="sm"
                  className="alternate"
                  onClick={resetFilter}
                >
                  Reset
                </Button>
                <Button size="sm" type="submit">
                  Apply
                </Button>
              </div>
            </Form>
          </div>
        </Dropdown>
      )}
    </FilterBox>
  );
}
