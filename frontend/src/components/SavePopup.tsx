import React from "react";

type SavePopupProps = {
  saveDocumentOrExit: (operation: String) => void;
};

export const SavePopup = ({ saveDocumentOrExit }: SavePopupProps) => {
  return (
    <div className="w-full h-full bg-black/30 flex justify-center items-center absolute">
      <div className="flex justify-center items-center bg-[#f3f5f6] rounded-lg drop-shadow-lg px-10 py-8 flex-col gap-4">
        <p className="text-2xl">
          Page was not saved. Do you want to keep the changes?
        </p>
        <div className="flex w-full justify-start">
          <span
            onClick={() => saveDocumentOrExit("save")}
            className="px-3 py-1 text-xl rounded-lg bg-[#8A2BE2] drop-shadow-lg text-white mr-8 cursor-pointer"
          >
            Save
          </span>
          <span
            onClick={() => saveDocumentOrExit("exit")}
            className="px-3 py-1 text-xl rounded-lg drop-shadow-md outline outline-1 outline-[#9e9e9e] bg-white cursor-pointer"
          >
            Exit without saving
          </span>
        </div>
      </div>
    </div>
  );
};
