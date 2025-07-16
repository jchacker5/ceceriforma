import HomePage from "@/app/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider } from "./language-provider";
import { Navigation } from "./navigation";

function renderWithProvider() {
  return render(
    <LanguageProvider>
      <Navigation />
      <HomePage />
    </LanguageProvider>
  );
}

describe("Full-site language switching", () => {
  it("updates all visible text when language is changed", async () => {
    renderWithProvider();
    // English by default
    expect(screen.getByText("Latest Updates")).toBeInTheDocument();
    expect(
      screen.getByText("Stay connected with the campaign")
    ).toBeInTheDocument();
    // Switch to Portuguese
    await userEvent.click(screen.getByTestId("lang-switcher-btn"));
    await userEvent.click(screen.getByText("PT"));
    expect(screen.getByText("Últimas Atualizações")).toBeInTheDocument();
    expect(
      screen.getByText("Fique conectado com a campanha")
    ).toBeInTheDocument();
    // Switch to Spanish
    await userEvent.click(screen.getByTestId("lang-switcher-btn"));
    await userEvent.click(screen.getByText("ES"));
    expect(screen.getByText("Últimas Actualizaciones")).toBeInTheDocument();
    expect(
      screen.getByText("Mantente conectado con la campaña")
    ).toBeInTheDocument();
    // Switch back to English
    await userEvent.click(screen.getByTestId("lang-switcher-btn"));
    await userEvent.click(screen.getByText("EN"));
    expect(screen.getByText("Latest Updates")).toBeInTheDocument();
    expect(
      screen.getByText("Stay connected with the campaign")
    ).toBeInTheDocument();
  });
});
