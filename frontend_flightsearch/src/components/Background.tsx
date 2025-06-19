import Lottie from "lottie-react";
import airplaneAnimation from "../assets/airplane-animation.json";
import { useGeneratePlanes } from "../hooks/useGeneratePlanes";

const Background = () => {
  const { planes } = useGeneratePlanes();

  return (
    <div className="absolute inset-0  pointer-events-none overflow-hidden">
      {planes.map((plane) => (
        <div
          key={plane.id}
          className="absolute animate-fly"
          style={{
            top: `${plane.top}%`,
            left: "-100px",
            animationDuration: `${plane.duration}s`,
            animationDelay: `${plane.delay}s`,
            width: `${plane.size}px`,
          }}
        >
          <Lottie
            initialSegment={[56, 150]}
            animationData={airplaneAnimation}
            loop
          />
        </div>
      ))}
    </div>
  );
};

export default Background;
