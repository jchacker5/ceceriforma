import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navigation } from "./navigation";

function setup() {
  render(<Navigation />);
}

describe("Navigation Language Switcher", () => {
  it("shows the language switcher button", () => {
    setup();
    expect(screen.getByTestId("lang-switcher-btn")).toBeInTheDocument();
    expect(screen.getByTestId("lang-switcher-btn")).toHaveTextContent("EN");
  });

  it("opens the dropdown and selects a new language", async () => {
    setup();
    const btn = screen.getByTestId("lang-switcher-btn");
    await userEvent.click(btn);
    const ptOption = await screen.findByText("PT");
    await userEvent.click(ptOption);
    expect(btn).toHaveTextContent("PT");
  });
});
