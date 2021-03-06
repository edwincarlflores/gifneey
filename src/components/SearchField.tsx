import React, { Dispatch, FC, SetStateAction, useState } from "react";

type SearchFieldProps = {
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const SearchField: FC<SearchFieldProps> = ({ setSearchQuery }) => {
  const [fieldValue, setFieldValue] = useState("");
  return (
    <div className="relative text-gray-400">
      <input
        type="text"
        name="search-field"
        className="w-full py-2 pl-10 text-sm text-gray-700 rounded-md bg-zinc-200 focus:outline-none"
        placeholder="Search"
        value={fieldValue}
        onChange={(event) => {
          setFieldValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setSearchQuery(fieldValue);
          }
        }}
      />
      <span className="absolute inset-y-0 flex items-center pr-2">
        <button
          type="submit"
          className="p-1 focus:outline-none focus:shadow-outline"
          onClick={(event) => {
            event.preventDefault();
            setSearchQuery(fieldValue);
          }}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
    </div>
  );
};

export default SearchField;
