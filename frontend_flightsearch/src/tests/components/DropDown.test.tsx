import DropDown from "../../components/DropDown";
import { render, screen, fireEvent } from "@testing-library/react";
interface Item {
  id: number;
  name: string;
}

describe("DropDown component", () => {
  const sampleData: Item[] = [
    { id: 1, name: "Option A" },
    { id: 2, name: "Option B" },
  ];

  const renderOption = (item: Item) => <span>{item.name}</span>;

  it("shows loading text when isLoading is true", () => {
    render(
      <DropDown
        data={[]}
        isLoading={true}
        selectOption={() => {}}
        renderOption={renderOption}
      />
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders options when data is available", () => {
    render(
      <DropDown
        data={sampleData}
        isLoading={false}
        selectOption={() => {}}
        renderOption={renderOption}
      />
    );
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  it('shows "No results found" when data is empty and not loading', () => {
    render(
      <DropDown
        data={[]}
        isLoading={false}
        selectOption={() => {}}
        renderOption={renderOption}
      />
    );
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("calls selectOption when an option is clicked", () => {
    const mockSelectOption = vi.fn();

    render(
      <DropDown
        data={sampleData}
        isLoading={false}
        selectOption={mockSelectOption}
        renderOption={renderOption}
      />
    );

    fireEvent.click(screen.getByText("Option B"));
    expect(mockSelectOption).toHaveBeenCalledWith(sampleData[1]);
  });
});
