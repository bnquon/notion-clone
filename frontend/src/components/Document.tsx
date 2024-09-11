"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../tools";
import { SavePopup } from "./SavePopup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChatbotUI } from "./ChatbotUI";

type DocumentProps = {
  documentInfo: {
    documentID: number;
    title: string;
    content: string;
  };
  closeDocument: () => void;
  refetchDocuments: () => void; // New prop
};

export const Document = ({ documentInfo, closeDocument, refetchDocuments }: DocumentProps) => {
  const [isSaved, setIsSaved] = useState<Boolean>(true);
  const [showSavePopup, setShowSavePopup] = useState<Boolean>(false);
  const ref = useRef<EditorJS>();
  const titleRef = useRef<HTMLInputElement>(null);

  const updateDocument = useMutation({
    mutationFn: async () => {
      const content = await ref.current?.save();
      const response = await axios.put(`http://localhost:8080/documents/${documentInfo.documentID}`, {
        title: titleRef.current?.value || "Untitled",
        content: JSON.stringify(content),
        userID: sessionStorage.getItem("userID"),
      });
      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      setIsSaved(true);
    },
  });

  const deleteDocument = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`http://localhost:8080/documents/${documentInfo.documentID}`);
      return response.data;
    },
    onSuccess: () => {
      refetchDocuments(); // Refetch documents after deletion
      closeDocument();
    },
  });

  useEffect(() => {
    if (!ref.current) {
      ref.current = new EditorJS({
        placeholder: "Start typing...",
        defaultBlock: "header",
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        data: JSON.parse(documentInfo.content),
        onChange: () => {
          setIsSaved(false);
        },
      });
    }
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, [documentInfo]);

  useEffect(() => {
    setTimeout(() => {
      titleRef.current!.value = documentInfo.title;
      if (documentInfo.title === "Untitled") {
        titleRef.current!.focus();
      }
    }, 0);
  }, [documentInfo]);

  const handleUpdateDocument = () => {
    updateDocument.mutate();
  };

  const handleDeleteDocument = () => {
    deleteDocument.mutate();
  };

  const checkIfSavedOrPopup = () => {
    if (isSaved === true) {
      closeDocument();
    } else {
      setShowSavePopup(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      <ChatbotUI />
      <div className="w-full h-fit mb-[10vh] py-8 px-8 flex font-medium">
        <input
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          className="text-2xl outline-none font-medium"
          placeholder={documentInfo ? documentInfo.title : "Untitled"}
        />
        <span
          onClick={handleUpdateDocument}
          className="text-xl ml-auto mr-4 shadow-lg rounded-lg px-2 py-2 cursor-pointer outline outline-1 outline-[#8A2BE2] hover:bg-[#8A2BE2]/90 bg-[#8A2BE2] text-white"
        >
          Save Changes
        </span>
        <span
          onClick={checkIfSavedOrPopup}
          className="text-xl py-2 px-2 mr-4 rounded-lg bg-[#f3f5f6] hover:bg-[#e6e6e6] text-black outline outline-1 outline-[#8A2BE2] font-medium cursor-pointer drop-shadow-lg"
        >
          Close Document
        </span>
        <span
          onClick={handleDeleteDocument}
          className="text-xl py-2 px-2 rounded-lg bg-red-500 hover:bg-red-500/80 text-white outline outline-1 outline-red-500 font-medium cursor-pointer drop-shadow-lg"
        >
          Delete Document
        </span>
      </div>
      <div id="editorjs" className="w-full h-full"></div>

      {showSavePopup && <SavePopup saveDocumentOrExit={handleUpdateDocument}/>}
    </div>
  );
};
