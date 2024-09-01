package com.bquon.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "documents") 
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer documentID;
    private String title;
    private String content;
    private Long userID;
    
    // Don't need a constructor if I'm only accessing it through queries, maybe add one later

    // Getters and Setters
    
    public Integer getDocumentID() {
        return documentID;
    }
    public void setDocumentID(Integer documentID) {
        this.documentID = documentID;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Long getUserID() {
        return userID;
    }
    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
