import { fireEvent, render, screen } from "@testing-library/react";
import CheckBox from "../../components/CheckBox";

describe("CheckBox component", () => {
  it("renders with the provided label", () => {
    render(<CheckBox label="CHECK" onChange={() => {}} />);
    expect(screen.getByText("CHECK")).toBeInTheDocument();
  });

  it("calls onChange when checkbox is clicked", () => {
    const handleChange = vi.fn();
    render(<CheckBox label="check" onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
