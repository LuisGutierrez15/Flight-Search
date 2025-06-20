import { render, screen, fireEvent } from "@testing-library/react";
import ThemeSwitch from "../../components/ThemeSwitch";

vi.mock("../hooks/useThemeSwitch", () => ({
  useThemeSwitch: vi.fn(),
}));

function setupMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("ThemeSwitch", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("initializes dark mode from localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeSwitch label="Switch theme" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("initializes dark mode based on system preference if localStorage is not set", () => {
    setupMatchMedia(true);
    render(<ThemeSwitch label="Switch theme" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles dark mode when clicked", () => {
    render(<ThemeSwitch label="Toggle" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("renders without crashing when no label is provided", () => {
    render(<ThemeSwitch />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
});
