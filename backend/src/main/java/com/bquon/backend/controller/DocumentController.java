package com.bquon.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bquon.backend.model.Document;
import com.bquon.backend.service.DocumentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    @GetMapping("/{id}")
    public Document getDocumentByID(@PathVariable Integer id) {
        return documentService.getDocumentByID(id);
    }

    @GetMapping("/user/{userID}")
    public List<Document> getDocumentsByUserID(@PathVariable Integer userID) {
        return documentService.getDocumentsByUserID(userID);
    }

    @PostMapping
    public Document addDocument(@RequestBody Document document) {
        return documentService.addDocument(document);
    }

    @PutMapping("/{id}")
    public Document updateDocumentByID(@PathVariable Integer id, @RequestBody Document document ) {
        return documentService.updateDocumentByID(id, document);
    }

    @DeleteMapping("/{id}")
    public String deleteDocumentByID(@PathVariable Integer id) {
        documentService.deleteDocumentByID(id);
        return "Document deleted successfully";
    }
}
