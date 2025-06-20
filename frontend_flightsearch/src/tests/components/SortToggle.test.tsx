import { render, screen, fireEvent } from "@testing-library/react";
import SortToggle from "../../components/SortToggle";

describe("SortToggle", () => {
  let onChangeMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChangeMock = vi.fn();
  });

  const setup = (props = {}) => {
    render(<SortToggle onChange={onChangeMock} {...props} />);
  };

  it("renders with default position and no sort", () => {
    setup({ title: "Duration" });
    expect(screen.getByText("Sort by Duration")).toBeInTheDocument();
    expect(screen.getByText("No Sort")).toBeInTheDocument();
    expect(screen.getByLabelText("Toggle sort")).toBeInTheDocument();
  });

  it("cycles through sort states on click", () => {
    setup();
    const button = screen.getByRole("button", { name: /toggle sort/i });

    fireEvent.click(button); // undefined -> asc
    expect(screen.getByText("Ascending")).toBeInTheDocument();
    expect(onChangeMock).toHaveBeenLastCalledWith("asc");

    fireEvent.click(button); // asc -> desc
    expect(screen.getByText("Descending")).toBeInTheDocument();
    expect(onChangeMock).toHaveBeenLastCalledWith("desc");

    fireEvent.click(button); // desc -> undefined
    expect(screen.getByText("No Sort")).toBeInTheDocument();
    expect(onChangeMock).toHaveBeenLastCalledWith(undefined);
  });

  it("applies custom position and className", () => {
    setup({
      position: "top-left",
      className: "custom-class",
      title: "Price",
    });
    const container = screen.getByText(/sort by price/i).parentElement!;
    expect(container.className).toContain("left-4");
    expect(container.className).toContain("custom-class");
  });

  it("calls onChange with initial undefined", () => {
    setup();
    expect(onChangeMock).toHaveBeenCalledWith(undefined);
  });
});
