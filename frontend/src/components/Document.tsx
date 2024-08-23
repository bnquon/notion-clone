"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../tools";

export const Document = () => {
  
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
    }
  }, [])


  return (
    <div className="w-full h-full flex flex-col">
        <div className="w-full h-1/5"></div>
        <div id="editorjs" className="w-full h-full"></div>
    </div>
      
  );
};
