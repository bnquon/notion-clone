import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

type SideNavProps = {
  showDocument: (page: String) => void;
  userDocument: any[] | undefined;
};

export const SideNav = ({ showDocument, userDocument }: SideNavProps) => {
  return (
    <div className="w-[15%] h-screen bg-[#f3f5f6] flex flex-col flex-shrink-0 py-8">
      {/* Title */}
      <div>
        <p className="text-4xl font-bold px-8">MindSpace</p>
      </div>
      {/* Project Container */}
      <div className="w-full h-full py-8 flex flex-col">
        <p className="text-2xl border-t-2 border-[#9e9e9e] px-8 pt-8 pb-4">Projects</p>
          {userDocument ? (
            userDocument.map((document: any) => (
              <div
                key={document.documentID}
                className="w-full flex gap-4 text-xl items-center cursor-pointer py-4 px-8 hover:bg-gray-300/30"
                onClick={() => showDocument(document.documentID)}
              >
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{ color: "#9e9e9e" }}
                  className="text-2xl"
                />
                {document.title ? document.title : "Untitled"}
              </div>
            ))
          ) : (
            <p className="text-2xl">No projects created yet</p>
          )} 
      </div>
      {/* Add new button */}
      <div className="mt-auto px-8">
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
