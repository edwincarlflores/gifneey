import React, { FC } from "react";
import NoResultIcon from "../../assets/images/no-result.png";
import ErrorIcon from "../../assets/images/error.png";

type FallbackProps = {
  error: boolean;
  resultCount: number;
  resultType: "trending" | "search" | "trending-home";
  searchQuery: string;
};

const Fallback: FC<FallbackProps> = ({
  error,
  resultCount,
  resultType,
  searchQuery
}) => {
  const noResultMessage =
    resultType === "search"
      ? `No results were found for "${searchQuery}"`
      : "There are no trending posts found";
  let message = "Something went wrong with your request";
  let icon = ErrorIcon;

  if (resultCount <= 0 && !error) {
    message = noResultMessage;
    icon = NoResultIcon;
  }

  return (
    <div className="flex justify-center px-6 mx-4 space-x-4 text-gray-700 sm:space-x-12 sm:px-12">
      <img
        src={icon}
        alt="no-result-image"
        className="w-32 h-32 text-gray-700"
      />
      <div className="self-center px-2 overflow-hidden font-mono text-sm md:text-5xl">
        {message}
      </div>
    </div>
  );
};

export default Fallback;
