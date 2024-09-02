"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SideNav } from "@/components/SideNav";
import { Document } from "@/components/Document";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<String>("home");

  useEffect(() => {
    retrieveDocumentsByUserID.refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // This does work but have to store userID in session storage
  const retrieveDocumentsByUserID = useQuery({
    queryKey: ["retrieveDocumentsByUserID"],
    queryFn: async () => {
      const userID = 1;
      const response = await axios.get(`http://localhost:8080/documents/user/${userID}`);
      console.log(response.data);
      return response.data;
    },
  })

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
      <SideNav showDocument={showDocument}/>
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
