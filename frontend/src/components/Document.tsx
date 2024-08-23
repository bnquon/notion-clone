"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../tools";

type DocumentProps = {
  closeDocument: (page: String) => void;
};

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
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit mb-[10vh] py-8 px-8 flex font-medium">
        {/* Make input tag and put ref here and then autofocus it to be the title 
        + make a pass through state to check if its a new document or not */}
        <input ref={titleRef} type="text" name="title" id="title" className="text-2xl outline-none font-medium" placeholder="Document Title" />
        <button
          onClick={() => closeDocument("home")}
          className="ml-auto text-2xl py-2 px-2 rounded-xl bg-[#f3f5f6] text-black font-medium drop-shadow-lg"
        >
          <p>Close Document X</p>
        </button>
      </div>
      <div id="editorjs" className="w-full h-full"></div>
    </div>
  );
};
