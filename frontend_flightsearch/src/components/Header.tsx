import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  return (
    <header className="flex flex-1 flex-row justify-between bg-[#6200ea] text-center items-center px-8">
      <h1 className="font-bold text-3xl text-white">
        <a href="/">Flight Search</a>
      </h1>
      <ThemeSwitch label="Mode" />
    </header>
  );
};

export default Header;
