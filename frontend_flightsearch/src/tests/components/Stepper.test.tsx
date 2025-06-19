import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Stepper, { Step } from "../../components/Stepper";

describe("Stepper", () => {
  let onStepChange: ReturnType<typeof vi.fn>;
  let onFinalStepCompleted: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onStepChange = vi.fn();
    onFinalStepCompleted = vi.fn();
  });

  const renderStepper = (overrideProps = {}) => {
    return render(
      <Stepper
        onStepChange={onStepChange}
        onFinalStepCompleted={onFinalStepCompleted}
        canMoveFoward={{ 1: true, 2: true, 3: true }}
        {...overrideProps}
      >
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );
  };

  it("renders first step by default", () => {
    renderStepper();
    expect(screen.getByText("Step 1 content")).toBeInTheDocument();
  });

  it("calls onStepChange when changing steps", () => {
    renderStepper();
    fireEvent.click(screen.getByText("Continue"));
    expect(onStepChange).toHaveBeenCalledWith(2);
    expect(screen.getByText("Step 2 content")).toBeInTheDocument();
  });

  it("calls onFinalStepCompleted when completing", async () => {
    renderStepper();

    fireEvent.click(screen.getByText("Continue")); // to Step 2
    fireEvent.click(screen.getByText("Continue")); // to Step 3
    fireEvent.click(screen.getByText("Complete")); // complete

    await waitFor(() => {
      expect(onFinalStepCompleted).toHaveBeenCalled();
    });
  });

  it("does not allow forward navigation if canMoveFoward is false", () => {
    renderStepper({ canMoveFoward: { 1: false, 2: true, 3: false } });

    const nextButton = screen.getByRole("button", {
      name: "Continue",
    }) as HTMLButtonElement;
    expect(nextButton).toBeDisabled();
  });

  it("renders back button and navigates backward", () => {
    renderStepper();
    fireEvent.click(screen.getByText("Continue"));
    fireEvent.click(screen.getByText("Back"));
    expect(screen.getByText("Step 1 content")).toBeInTheDocument();
  });

  it("renders with custom labels and classNames", () => {
    renderStepper({
      nextButtonText: "Next Step",
      className: "custom-wrapper",
      footerClassName: "custom-footer",
      stepCircleContainerClassName: "custom-circle",
    });

    expect(screen.getByText("Next Step")).toBeInTheDocument();
    expect(document.querySelector(".custom-wrapper")).toBeInTheDocument();
    expect(document.querySelector(".custom-footer")).toBeInTheDocument();
    expect(document.querySelector(".custom-circle")).toBeInTheDocument();
  });
});
