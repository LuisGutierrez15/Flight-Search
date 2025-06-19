interface DropDownProps<T> {
  data: T[];
  isLoading: boolean;
  selectOption: (item: T) => void;
  renderOption: (item: T) => React.ReactNode;
}

const DropDown = <T,>({
  data,
  isLoading,
  selectOption,
  renderOption,
}: DropDownProps<T>) => {
  return (
    <div className="fixed max-w-sm mt-2 w-full rounded-md shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-scroll max-h-24 z-50 transition-all duration-200 ease-in-out">
      {isLoading ? (
        <div className="p-4 text-gray-500 dark:text-gray-400 text-sm text-center">
          Loading...
        </div>
      ) : data.length > 0 ? (
        data.map((item, index) => (
          <button
            key={index}
            onClick={() => selectOption(item)}
            className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-100 text-gray-800 transition-colors duration-150 cursor-pointer"
          >
            {renderOption(item)}
          </button>
        ))
      ) : (
        <div className="p-4 text-center text-md text-red-500 dark:text-red-400">
          No results found
        </div>
      )}
    </div>
  );
};

export default DropDown;
