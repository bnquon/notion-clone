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
}
