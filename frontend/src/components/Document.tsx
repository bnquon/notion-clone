"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../tools";

type DocumentProps = {
  closeNewDocument: (page: String) => void;
};

export const Document = ({ closeNewDocument }: DocumentProps) => {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      ref.current = new EditorJS({
        placeholder: "Untitled",
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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit mb-[10vh] py-8 px-8 flex font-medium">
        <p className="text-2xl">DOCUMENT NAME HERE</p>
        <button
          onClick={() => closeNewDocument("home")}
          className="ml-auto text-2xl px-4 py-2 rounded-xl bg-[#f3f5f6] text-black font-medium drop-shadow-lg"
        >
          <p>Close Document X</p>
        </button>
      </div>
      <div id="editorjs" className="w-full h-full"></div>
    </div>
  );
};
