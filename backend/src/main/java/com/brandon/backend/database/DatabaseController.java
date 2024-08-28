package com.brandon.backend.database;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/documents")
public class DatabaseController {

    private final DocumentRepository docRepo;

    public DatabaseController(DocumentRepository docRepo) {
        this.docRepo = docRepo;
    }
    
    @PostMapping
    public String postDocument(@RequestBody Document document) {
        docRepo.insertDocument(document.getTitle(), document.getContent(), document.getUserID());
        return "Document inserted successfully";
    }
    
    @GetMapping
    public List<Document> getAllDocumentTitles(@RequestParam Integer param) {
        return docRepo.findByUserID(param);
    }
    

    @GetMapping("/{id}")
    public Document getSpecificDocument(@PathVariable Integer param) {
        return docRepo.findByDocumentID(param);
    }

    @PutMapping("/{id}")
    public String updateSpecificDocument(@PathVariable Document param) {
        docRepo.updateDocument(param.getContent(), param.getId());
        return "Document updated successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteSpecificDocument(@PathVariable Integer param) {
        docRepo.deleteDocument(param);
        return "Document deleted successfully";
    }
}