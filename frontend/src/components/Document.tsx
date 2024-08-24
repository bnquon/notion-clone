"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../tools";
import { SavePopup } from "./SavePopup";

type DocumentProps = {
  closeDocument: (page: String) => void;
};

// Make function for the save popup to be a check if its saved then if yes then close document if not then popup

export const Document = ({ closeDocument }: DocumentProps) => {
  const ref = useRef<EditorJS>();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) {
      ref.current = new EditorJS({
        placeholder: "Start typing...",
        defaultBlock: "header",
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
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
      titleRef.current?.focus();
    }, 0);
  }, []);
  

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="w-full h-fit mb-[10vh] py-8 px-8 flex font-medium">
        {/* Make input tag and put ref here and then autofocus it to be the title 
        + make a pass through state to check if its a new document or not */}
        <input ref={titleRef} type="text" name="title" id="title" className="text-2xl outline-none font-medium" placeholder="Document Title" />
        <span className="text-xl ml-auto mr-8 shadow-lg rounded-lg px-2 py-2 cursor-pointer outline outline-[#8A2BE2] hover:bg-[#8A2BE2]/90 bg-[#8A2BE2] text-white">
          Save Changes
        </span>
        <span
          onClick={() => closeDocument("home")}
          className="text-xl py-2 px-2 rounded-lg bg-[#f3f5f6] hover:bg-[#e6e6e6] text-black outline outline-[#8A2BE2] font-medium cursor-pointer drop-shadow-lg"
        >
          Close Document
        </span>
      </div>
      <div id="editorjs" className="w-full h-full"></div>
    </div>
  );
};
