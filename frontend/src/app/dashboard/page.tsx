"use client";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SideNav } from "@/components/SideNav";
import { Document } from "@/components/Document";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<String>("home");
  const [userDocuments, setUserDocuments] = useState<any[]>([]);
  const [documentInfo, setDocumentInfo] = useState<any>(null);

  useEffect(() => {
    retrieveDocumentsByUserID.refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // This does work but have to store userID in session storage
  const retrieveDocumentsByUserID = useQuery({
    queryKey: ["retrieveDocumentsByUserID"],
    queryFn: async () => {
      const userID = sessionStorage.getItem("userID");
      const response = await axios.get(`http://localhost:8080/documents/user/${userID}`);
      console.log("retrieveDocumentsByUserID: ", response.data);
      if (response.data) {
        setUserDocuments(response.data);
      }
      return response.data;
    },
  })

  const retrieveDocumentByDocumentID = useMutation({
    mutationFn: async (documentID: number) => {
      const response = await axios.get(`http://localhost:8080/documents/${documentID}`);
      setDocumentInfo(response.data);
      console.log("retrieveDocumentByDocumentID: ", response.data);
      return response.data;
    },
    onSuccess: () =>{
      setCurrentPage("document");
    }
  })

  const showDocumentByID = (documentID: number | null) => {
    if (documentID !== null) {
      retrieveDocumentByDocumentID.mutate(documentID);
    } else {
      setDocumentInfo(null);
      setCurrentPage("document");
    }
  }

  const closeDocument = () => {
    setCurrentPage("home");
  }

  return (
    <div className="w-screen h-screen flex flex-row relative">
      <SideNav showDocumentByID={showDocumentByID} userDocument={userDocuments}/>
      {currentPage === "home" ? (
        <div className="w-full h-full text-2xl font-medium py-8 px-8">
          Welcome back, {sessionStorage.getItem("username")}!
        </div>
      ) : (
        <Document closeDocument={closeDocument} documentInfo={documentInfo}/>
      )}
    </div>
  );
}
