package com.bquon.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.bquon.backend.model.Document;
import com.bquon.backend.respository.DocumentRepository;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
    
    public Document addDocument(Document document) {
        return documentRepository.save(document);
    }

    public Document getDocumentByID(Integer documentID) {
        return documentRepository.findById(documentID).orElse(null);
    }

    public Document updateDocumentByID(Integer documentID, Document document) {
        Document oldDocument = documentRepository.findById(documentID).orElse(null);
        oldDocument.setContent(document.getContent());
        oldDocument.setTitle(document.getTitle());
        return documentRepository.save(oldDocument);
    }

    public void deleteDocumentByID(Integer documentID) {
        documentRepository.deleteById(documentID);
    }

    public List<Document> getDocumentsByUserID(Integer userID) {
        return documentRepository.findDocumentsByUserID(userID);
    }
}
