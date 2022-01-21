import React, { Dispatch, FC, SetStateAction } from "react";
import SearchField from "./SearchField";
import GifneeyLogo from "../assets/images/gifneey-logo.png";

type ResultType = "trending" | "search" | "trending-home";

type NavbarProps = {
  setResultType: Dispatch<SetStateAction<ResultType>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const Navbar: FC<NavbarProps> = ({ setResultType, setSearchQuery }) => {
  return (
    <nav className="fixed inset-x-0 z-50 shadow-lg bg-zinc-100">
      <div className="max-w-full px-4 mx-auto">
        <div className="flex items-center sm:px-3 sm:space-x-4">
          <div
            className="font-bold text-gray-700 hover:text-gray-900"
            onClick={() => {
              setSearchQuery("");
              setResultType("trending-home");
            }}
          >
            <a href="#" className="flex items-center">
              <img src={GifneeyLogo} className="w-12 h-12" alt="Gifneey" />
              <span className="hidden font-mono text-lg sm:block">Gifneey</span>
            </a>
          </div>

          <div className="p-4 grow">
            <div className="w-full md:w-1/2">
              <SearchField setSearchQuery={setSearchQuery} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
