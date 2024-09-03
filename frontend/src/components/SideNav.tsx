import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

type SideNavProps = {
  showDocumentByID: (documentID: number | null) => void;
  userDocument: any[] | undefined;
};

export const SideNav = ({ showDocumentByID, userDocument }: SideNavProps) => {

  const saveDocument = useMutation({
    mutationFn: async () => {
      const response = await axios.post('http://localhost:8080/documents', {
        title: "Untitled",
        content: "{}",
        userID: sessionStorage.getItem("userID"),
      });
      console.log("Post response to create new document is: ", response.data);
      return response.data.documentID;
    },
    onSuccess: (documentID) => {
      showDocumentByID(documentID);
    }
  })

  const createNewDocument = async () => {
    saveDocument.mutate();
  }

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
                onClick={() => showDocumentByID(document.documentID)}
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
          onClick={createNewDocument}
          className="w-full text-xl font-medium px-2 py-4 rounded-lg bg-[#8A2BE2] drop-shadow-lg text-white"
        >
          +&nbsp; New Project
        </button>
      </div>
    </div>
  );
};
