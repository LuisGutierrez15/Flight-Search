import type { FC } from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  pressed?: boolean;
}

const Button: FC<ButtonProps> = ({ children, onClick, type, pressed }) => {
  return (
    <StyledWrapper>
      <button
        disabled={pressed}
        className={`button ${pressed ? "pressed" : ""}`}
        onClick={onClick}
        type={type}
      >
        <span className="shadow" />
        <span className="edge" />
        <div className="front">
          <span>{children}</span>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    border: none;
    padding: 0;
    outline: none;
    cursor: pointer;
    font-family: sans-serif;
  }

  /* Shadow layer */
  .button .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  /* Edge layer */
  .button .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: linear-gradient(
      to left,
      hsl(217, 33%, 16%) 0%,
      hsl(217, 33%, 32%) 8%,
      hsl(217, 33%, 32%) 92%,
      hsl(217, 33%, 16%) 100%
    );
  }

  /* Front layer */
  .button .front {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    font-size: 1.25rem;
    color: white;
    background: hsl(217, 33%, 17%);
    border-radius: 8px;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  /* Hover and active states */
  .button:hover .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  .button:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  .button:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }

  .button:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  /* Pressed state */
  .button.pressed .shadow {
    transform: translateY(1px);
  }

  .button.pressed .front {
    transform: translateY(-2px);
    background: gray;
  }

  /* Disable text selection */
  .button .front span {
    user-select: none;
  }
`;

export default Button;
