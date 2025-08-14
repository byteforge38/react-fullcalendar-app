import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import IconButton from "../../components/IconButton";
import styles from "../../components/IconButton/IconButton.module.css";
import { ChevronLeft } from "lucide-react";

describe("IconButton Component", () => {
  test("renders with an icon", () => {
    const handleClick = vi.fn();
    render(<IconButton Icon={ChevronLeft} handleClick={handleClick} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.container);
  });

  test("calls handleClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<IconButton Icon={ChevronLeft} handleClick={handleClick} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders the provided icon", () => {
    const handleClick = vi.fn();
    render(<IconButton Icon={ChevronLeft} handleClick={handleClick} />);

    // Since the icon is rendered as an SVG, we can check for its presence
    // by verifying the button has a child element (the icon)
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });
});
