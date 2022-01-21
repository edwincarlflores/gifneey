import React, { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="flex items-center justify-center custom-loader">
      <div className="flex p-6 space-x-3 bg-transparent md:space-x-4">
        <div className="w-4 h-4 bg-gray-400 rounded-full md:w-8 md:h-8 animate-bounce"></div>
        <div className="w-4 h-4 bg-gray-400 rounded-full md:w-8 md:h-8 animate-bounce"></div>
        <div className="w-4 h-4 bg-gray-400 rounded-full md:w-8 md:h-8 animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;
