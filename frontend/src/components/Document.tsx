"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../tools";
import { SavePopup } from "./SavePopup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

type DocumentProps = {
  documentInfo: {
    documentID: number;
    title: string;
    content: string;
  };
};

// Make function for the save popup to be a check if its saved then if yes then close document if not then popup

export const Document = ({ documentInfo }: DocumentProps) => {
  console.log("Document info received on click: ", documentInfo);
  const [isSaved, setIsSaved] = useState<Boolean>(false);
  const [showSavePopup, setShowSavePopup] = useState<Boolean>(false);
  const ref = useRef<EditorJS>();
  const titleRef = useRef<HTMLInputElement>(null);

  const saveDocument = useMutation({
    mutationFn: async () => {
      const content = await ref.current?.save();
      const response = await axios.post('http://localhost:8080/documents', {
        title: titleRef.current?.value || "Untitled",
        content: JSON.stringify(content),
        userID: sessionStorage.getItem("userID"),
      });
      return response.data;
    },
    onSuccess: () => {
      setIsSaved(true);
    }
  })
  
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
    }
  })

  useEffect(() => {
    if (!ref.current) {
      ref.current = new EditorJS({
        placeholder: "Start typing...",
        defaultBlock: "header",
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        data: JSON.parse(documentInfo.content) || {},
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
  }, []);

  useEffect(() => {
    setTimeout(() => {
      titleRef.current!.value = documentInfo.title;
      titleRef.current?.focus();
    }, 0);
  }, []);

  const handleSaveDocument = () => {
    saveDocument.mutate();
  }

  const handleUpdateDocument = () => {
    updateDocument.mutate();
  }

  // const checkIfSavedOrPopup = () => {
  //   if (isSaved === true) {
  //     closeDocument("home");
  //   } else {
  //     setShowSavePopup(true);
  //   }
  // };

  // Make function to save the document
  // const saveDocumentOrExit = (operation: String) => {
  //   if (operation === "save") {
  //     // Call eventual async save function
  //     setShowSavePopup(false);
  //     setIsSaved(true);
  //     closeDocument("home");
  //   } 
  //   if (operation === "exit") {
  //     // Do not save!
  //     setShowSavePopup(false);
  //     closeDocument("home");
  //   }
  // }

  return (
    <div className="w-full h-full flex flex-col relative">
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
          onClick={documentInfo ? handleUpdateDocument : handleSaveDocument}
          className="text-xl ml-auto mr-8 shadow-lg rounded-lg px-2 py-2 cursor-pointer outline outline-1 outline-[#8A2BE2] hover:bg-[#8A2BE2]/90 bg-[#8A2BE2] text-white"
        >
          Save Changes
        </span>
        <span
          // onClick={checkIfSavedOrPopup}
          className="text-xl py-2 px-2 rounded-lg bg-[#f3f5f6] hover:bg-[#e6e6e6] text-black outline outline-1 outline-[#8A2BE2] font-medium cursor-pointer drop-shadow-lg"
        >
          Close Document
        </span>
      </div>
      <div id="editorjs" className="w-full h-full"></div>

      {/* {showSavePopup && <SavePopup saveDocumentOrExit={saveDocumentOrExit}/>} */}
    </div>
  );
};
