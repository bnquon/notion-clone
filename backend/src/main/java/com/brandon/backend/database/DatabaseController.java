package com.brandon.backend.database;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/documents")
public class DatabaseController {
    
    @PostMapping
    public String postMethodName(@RequestBody String entity) {
        //TODO: process POST request
        
        return entity;
    }
    
    @GetMapping
    public String getAllDocuments(@RequestParam String param) {
        //TODO: process GET request for side nav

        return new String();
    }
    

    @GetMapping("/{id}")
    public String getSpecificDocument(@RequestParam String param, @PathVariable String id) {
        //TODO: process GET request for on document click

        return new String();
    }

    @PutMapping("/{id}")
    public String putMethodName(@PathVariable String id, @RequestBody String entity) {
        //TODO: process PUT request to update a document
        
        return entity;
    }

    @DeleteMapping("/{id}")
    public String deleteMethodName(@PathVariable String id, @RequestParam String entity) {
        //TODO: process DELETE request to delete a document
        
        return entity;
    }
}