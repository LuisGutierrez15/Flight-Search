import { render, screen, fireEvent } from "@testing-library/react";
import Carousel, { DEFAULT_ITEMS } from "../../components/Carousel";

describe("Carousel component", () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the first item by default", () => {
    render(<Carousel />);
    expect(screen.getByText(DEFAULT_ITEMS[0].title)).toBeInTheDocument();
  });

  it("keyboard navigation works", () => {
    render(<Carousel />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByText(DEFAULT_ITEMS[1].title)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText(DEFAULT_ITEMS[0].title)).toBeInTheDocument();
  });
});
