import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

type SideNavProps = {
  showDocument: (page: String) => void;
};

export const SideNav = ({ showDocument }: SideNavProps) => {
  return (
    <div className="w-[15%] h-screen bg-[#f3f5f6] flex flex-col flex-shrink-0 py-8 px-8">
      {/* Title */}
      <div>
        <p className="text-4xl font-bold">MindSpace</p>
      </div>
      {/* Project Container */}
      <div className="w-full h-full py-8 flex flex-col">
        <p className="text-2xl border-t-2 border-[#9e9e9e] py-8">Projects</p>
        <div className="w-full flex gap-4 text-xl items-center cursor-pointer" onClick={() => showDocument("createDocument")}>
          <FontAwesomeIcon icon={faFileLines} style={{ color: "#9e9e9e" }} className="text-2xl" />
          Example 1
        </div>
      </div>
      {/* Add new button */}
      <div className="mt-auto">
        <button
          onClick={() => showDocument("createDocument")}
          className="w-full text-xl font-medium px-2 py-4 rounded-lg bg-[#8A2BE2] drop-shadow-lg text-white"
        >
          +&nbsp; New Project
        </button>
      </div>
    </div>
  );
};
