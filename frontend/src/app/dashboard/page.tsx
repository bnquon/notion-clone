"use client";
import React, { useState } from "react";
import { SideNav } from "@/components/SideNav";
import { Document } from "@/components/Document";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<String>("home");

  const showDocument = (page: String) => {
    if (page === "createDocument") {
      setCurrentPage("createDocument");
    } else {
      return null;
    }
  };

  const closeDocument = (page: String) => {
    if (page === "home") {
      setCurrentPage("home");
    } else {
      return null;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row relative">
      <SideNav showDocument={showDocument} />
      {currentPage === "home" ? (
        <div className="w-full h-full text-2xl font-medium py-8 px-8">
          Welcome back, NAME!
        </div>
      ) : (
        <Document closeDocument={closeDocument} />
      )}
    </div>
  );
}
