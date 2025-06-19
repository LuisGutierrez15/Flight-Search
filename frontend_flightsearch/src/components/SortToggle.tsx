import { useEffect, useState, type FC, type JSX } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

type SortDirection = "asc" | "desc" | undefined;

const sortCycle: SortDirection[] = [undefined, "asc", "desc"];

interface SortToggleProps {
  title?: string;
  position?: "top-left" | "top-right";
  className?: string;
  onChange: (value: "asc" | "desc" | undefined) => void;
}

const SortToggle: FC<SortToggleProps> = ({
  position = "top-right",
  className = "",
  title,
  onChange,
}) => {
  const [sort, setSort] = useState<SortDirection>(undefined);

  const toggleSort = () => {
    const currentIndex = sortCycle.indexOf(sort);
    const nextIndex = (currentIndex + 1) % sortCycle.length;
    setSort(sortCycle[nextIndex]);
  };

  const getPositionClass = () => {
    return position === "top-left" ? "left-4" : "right-4";
  };

  useEffect(() => {
    onChange(sort);
  }, [sort]);

  const getColorClass = (active: boolean): string =>
    active
      ? "bg-[#4b48ff] text-white"
      : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600";

  const renderIcon = (): JSX.Element => {
    switch (sort) {
      case "asc":
        return <ArrowUpIcon className="w-4 h-4" />;
      case "desc":
        return <ArrowDownIcon className="w-4 h-4" />;
      default:
        return <MinusIcon className="w-4 h-4" />;
    }
  };

  const getLabel = (): string => {
    switch (sort) {
      case "asc":
        return "Ascending";
      case "desc":
        return "Descending";
      default:
        return "No Sort";
    }
  };

  return (
    <div className={`top-4 ${getPositionClass()} z-10 ${className}`}>
      <p className="font-bold tet-lg text-gray-800 dark:text-gray-100">
        Sort by {title}
      </p>
      <button
        onClick={toggleSort}
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md text-sm font-medium transition-all duration-300 ${getColorClass(
          sort !== undefined
        )}`}
        aria-label="Toggle sort"
      >
        {renderIcon()}
        <span>{getLabel()}</span>
      </button>
    </div>
  );
};

export default SortToggle;
