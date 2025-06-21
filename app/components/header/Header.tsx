"use client";

import SearchBar from "../searchBar/SearchBar";

const Header = () => {
  return (
    <header className="h-32 border-b border-b-slate-200 shadow relative">
      <div className="flex items-center justify-center h-full w-full">
        <h1 className="text-2xl font-bold text-slate-600">FETCHING</h1>

        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
