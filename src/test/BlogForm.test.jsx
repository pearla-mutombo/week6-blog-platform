import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import BlogForm from "../components/blogs/BlogForm";

describe("BlogForm", () => {
  it("shows a validation error when the blog content is too short", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/title/i), "Test Blog");

    await user.type(
      screen.getByLabelText(/excerpt/i),
      "This is a valid excerpt.",
    );

    await user.type(screen.getByLabelText(/content/i), "Too short");

    await user.click(screen.getByRole("button", { name: /publish blog/i }));

    expect(
      await screen.findByText("Content must be at least 50 characters."),
    ).toBeInTheDocument();

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("submits the blog data when all fields are valid", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/title/i), "  My Test Blog  ");

    await user.type(
      screen.getByLabelText(/excerpt/i),
      "  This is a valid blog excerpt.  ",
    );

    await user.type(
      screen.getByLabelText(/content/i),
      "  This is valid blog content that contains more than fifty characters for testing.  ",
    );

    await user.click(screen.getByRole("button", { name: /publish blog/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: "My Test Blog",
      excerpt: "This is a valid blog excerpt.",
      content:
        "This is valid blog content that contains more than fifty characters for testing.",
    });
  });
});
