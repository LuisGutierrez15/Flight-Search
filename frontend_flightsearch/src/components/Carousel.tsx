import { useEffect, useState, useRef } from "react";
import {
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  FiCircle,
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
} from "react-icons/fi";

export interface CarouselItem {
  title: string;
  description: string;
  id: number | string;
  icon: React.ReactNode;
  details?: React.ReactNode;
}

export interface CarouselProps {
  items?: CarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

export const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    icon: <FiFileText className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2,
    icon: <FiCircle className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3,
    icon: <FiLayers className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    icon: <FiLayout className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Common UI",
    description: "Common UI components are coming soon!",
    id: 5,
    icon: <FiCode className="h-4 w-4 text-black dark:text-white" />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 15;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const carouselItems = loop ? [...items, items[0]] : items;

  const containerPadding = 16;
  const itemWidth = containerSize.width + 25 - containerPadding * 2;

  const trackItemOffset = itemWidth + GAP;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => {
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => {
          if (prev === 0) {
            return loop ? items.length - 1 : 0;
          }
          return prev - 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [carouselItems.length, loop, items.length]);

  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        isScrolling = true;

        setCurrentIndex((prev) => {
          if (e.deltaX > 0) {
            if (prev === carouselItems.length - 1) {
              return loop ? 0 : prev;
            }
            return prev + 1;
          } else {
            if (prev === 0) {
              return loop ? items.length - 1 : 0;
            }
            return prev - 1;
          }
        });

        setTimeout(() => {
          isScrolling = false;
        }, 500);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [carouselItems.length, loop, items.length]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`
        relative overflow-hidden p-4 mx-auto  
        ${
          round
            ? "rounded-full aspect-square max-w-[90vw]"
            : "rounded-2xl h-auto max-w-[60dvw] max-h-[90vh] w-auto"
        }
        border border-neutral-300 dark:border-neutral-700
      `}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            currentIndex * trackItemOffset + itemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`shrink-0 flex flex-col p-0 w-full   
                ${
                  round
                    ? "items-center justify-center text-center"
                    : "items-start justify-between h-auto max-w-[60dvw] w-auto"
                }
                overflow-scroll cursor-grab active:cursor-grabbing
                ${
                  round
                    ? "bg-neutral-100 dark:bg-neutral-900"
                    : "bg-white dark:bg-neutral-900"
                }
                ${
                  round
                    ? "rounded-full"
                    : "rounded-xl border border-neutral-300 dark:border-neutral-700"
                }
              `}
              style={{
                rotateY,
              }}
              transition={effectiveTransition}
            >
              <div
                className={`${
                  round ? "pt-4 w-full" : "mb-4 p-5 w-full max-h-[60vh]"
                }`}
              >
                {item.icon}
              </div>
              <div className="p-5 justify-between flex-row flex w-full">
                <div>
                  <div className="mb-1 font-bold text-lg text-black dark:text-white">
                    {item.title}
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {item.description}
                  </p>
                </div>

                <div>{item.details}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div
          className="mt-4 flex w-[90vh] justify-start px-8 cursor-pointer dark:text-white"
          onClick={() =>
            setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
          }
        >
          ←
        </div>
        <div className="mt-4 flex w-[90vh] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-0 rounded-full cursor-pointer transition-colors duration-150 sm:w-0.5 md:w-0.5 lg:w-1 xl:w-2
        ${
          currentIndex % items.length === index
            ? round
              ? "bg-white"
              : "bg-neutral-800 dark:bg-white"
            : round
            ? "bg-neutral-400 dark:bg-neutral-500"
            : "bg-neutral-300 dark:bg-neutral-600"
        }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>

        <div
          className="mt-4 flex w-[90vh] justify-end px-8 cursor-pointer dark:text-white"
          onClick={() =>
            setCurrentIndex((prev) =>
              items.length === prev + 1 ? prev : prev + 1
            )
          }
        >
          →
        </div>
      </div>
    </div>
  );
}
