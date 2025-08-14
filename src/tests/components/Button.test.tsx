import { render, screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import Button from "../../components/Button";
import { describe, expect, test, vi } from "vitest";
import styles from "../../components/Button/Button.module.css";

describe("Button Component", () => {
  test("renders with default props", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" handleClick={handleClick} />);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      styles.container,
      styles.primary,
      styles.outlined,
      styles.sm
    );
    expect(button).not.toHaveClass(styles.fullWidth);
  });

  test("renders disabled button", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" handleClick={handleClick} disabled />);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("renders with fullWidth option", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" handleClick={handleClick} fullWidth />);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(styles.fullWidth);
  });

  test("renders with different variants", () => {
    const handleClick = vi.fn();
    const { rerender } = render(
      <Button
        label="Outlined Button"
        handleClick={handleClick}
        variant="outlined"
      />
    );

    let button = screen.getByRole("button", { name: /outlined button/i });
    expect(button).toHaveClass(styles.outlined);

    rerender(
      <Button label="Text Button" handleClick={handleClick} variant="text" />
    );
    button = screen.getByRole("button", { name: /text button/i });
    expect(button).toHaveClass(styles.text);
  });

  test("renders with different colors", () => {
    const handleClick = vi.fn();
    const { rerender } = render(
      <Button
        label="Primary Button"
        handleClick={handleClick}
        color="primary"
      />
    );

    let button = screen.getByRole("button");
    expect(button).toHaveClass(styles.primary);

    rerender(
      <Button
        label="Success Button"
        handleClick={handleClick}
        color="success"
      />
    );
    button = screen.getByRole("button");
    expect(button).toHaveClass(styles.success);

    rerender(
      <Button
        label="Warning Button"
        handleClick={handleClick}
        color="warning"
      />
    );
    button = screen.getByRole("button");
    expect(button).toHaveClass(styles.warning);

    rerender(
      <Button label="Error Button" handleClick={handleClick} color="error" />
    );
    button = screen.getByRole("button");
    expect(button).toHaveClass(styles.error);
  });

  test("renders with different rounded options", () => {
    const handleClick = vi.fn();
    const { rerender } = render(
      <Button label="Full Rounded" handleClick={handleClick} rounded="full" />
    );

    let button = screen.getByRole("button");
    expect(button).toHaveClass(styles.full);

    rerender(
      <Button label="Small Rounded" handleClick={handleClick} rounded="sm" />
    );
    button = screen.getByRole("button");
    expect(button).toHaveClass(styles.sm);
  });

  test("renders with startIcon", () => {
    const handleClick = vi.fn();
    const startIcon = <span data-testid="test-icon">Icon</span>;

    render(
      <Button
        label="With Icon"
        handleClick={handleClick}
        startIcon={startIcon}
      />
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /with icon/i })
    ).toBeInTheDocument();
  });
});
