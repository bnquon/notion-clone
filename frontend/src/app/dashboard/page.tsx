"use client";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SideNav } from "@/components/SideNav";
import { Document } from "@/components/Document";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<String>("home");
  const [totalWordCount, setTotalWordCount] = useState<number>(0);
  const [userDocuments, setUserDocuments] = useState<any[]>([]);
  const [documentInfo, setDocumentInfo] = useState<any>(null);

  // Fetch documents on initial render or when currentPage changes
  const retrieveDocumentsByUserID = useQuery({
    queryKey: ["retrieveDocumentsByUserID"],
    queryFn: async () => {
      const userID = sessionStorage.getItem("userID");
      const response = await axios.get(`http://localhost:8080/documents/user/${userID}`);
      console.log("retrieveDocumentsByUserID: ", response.data);
      if (response.data) {
        setUserDocuments(response.data);
        countTotalWords(response.data);
      }
      return response.data;
    },
  });

  const retrieveDocumentByDocumentID = useMutation({
    mutationFn: async (documentID: number) => {
      const response = await axios.get(`http://localhost:8080/documents/${documentID}`);
      setDocumentInfo(response.data);
      console.log("retrieveDocumentByDocumentID: ", response.data);
      return response.data;
    },
    onSuccess: () => {
      setCurrentPage("document");
    },
  });

  const countTotalWords = (documentArray: any) => {
    let totalWords = 0;
    let validTypes = ["header", "list", "paragraph"];
    documentArray.forEach((document: any) => {
      if (document.content !== "{}") {
        let temp = JSON.parse(document.content);
        temp.blocks.forEach((block: any) => {
          if (validTypes.includes(block.type)) {
            let documentText = block.data.text;
            totalWords += documentText.split(" ").length;
          }
        });
      }
    });
    setTotalWordCount(totalWords);
  };

  const showDocumentByID = (documentID: number | null) => {
    if (documentID !== null) {
      retrieveDocumentByDocumentID.mutate(documentID);
    } else {
      setDocumentInfo(null);
      setCurrentPage("document");
    }
  };

  const closeDocument = () => {
    setCurrentPage("home");
  };

  // Function to refetch documents after deletion or addition
  const refetchDocuments = () => {
    retrieveDocumentsByUserID.refetch();
  };

  return (
    <div className="w-screen h-screen flex flex-row relative">
      <SideNav showDocumentByID={showDocumentByID} userDocument={userDocuments} />
      {currentPage === "home" ? (
        <div className="w-full h-full py-8 px-8 flex flex-col">
          <div className="w-full">
            <p className="text-2xl mb-2">Welcome back, {sessionStorage.getItem("username")}!</p>
            <p>Total words typed in all documents: {totalWordCount}</p>
          </div>
          {/* <div className="w-full h-full flex flex-col bg-blue-200 "></div> */}
        </div>
      ) : (
        <Document key={documentInfo.documentID} closeDocument={closeDocument} documentInfo={documentInfo} refetchDocuments={refetchDocuments} />
      )}
    </div>
  );
}
