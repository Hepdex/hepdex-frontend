import { useState } from "react";
import { BsSliders, BsX, BsXLg } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { flex } from "../GlobalStyles";
import { capitalizeFirst } from "../utils/helpers";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { Form } from "./Form";

// Filter box
const FilterBox = styled.div`
  position: relative;
  ${flex(undefined, "center")}
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
      position: absolute;
      top: calc(100% + 12px);
      min-width: 280px;
      width: 100%;
      z-index: 10;
      background-color: var(--color-white-1);
      box-shadow: 0 7px 24px 0 #64646f33;
      left: 0;
      border-radius: 8px;
      padding: 16px;
      // Form
      form {
        select {
          height: 40px;
          padding: 0 12px;
          border-radius: 4px;
          & ~ svg {
            top: 12px;
          }
          font-size: 15px;
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
        border-radius: 4px;
        min-height: 40px;
        max-height: 40px;
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

  // Set filter
  const setFilter = (e) => {
    // Prevent default submit
    e.preventDefault();
    // Get form values
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    // Set params
    const params = new URLSearchParams(searchParams);
    Object.entries(data).forEach((item) => {
      const [key, value] = item;
      if (value) params.set(key, value);
    });
    // Delete page
    params.delete("page");
    setSearchParams(params);
    // Close window
    close();
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
  return (
    <FilterBox className="filter" id={id}>
      <Button
        size="sm"
        className="alternate filter-btn"
        color="secondary"
        id={`${id}__btn`}
        onClick={() => setOpen((s) => !s)}
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
        <Dropdown close={close} menuId={id}>
          <div className="filter-dropdown">
            <Form $gap={16} onSubmit={setFilter}>
              {children}
              <div className="btn-box">
                <Button
                  type="button"
                  color="secondary"
                  size="sm"
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
