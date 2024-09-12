package com.bquon.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.bquon.backend.service.LlamaService;


@RestController
@RequestMapping("/llama")
@CrossOrigin(origins = "http://localhost:3000")
public class LlamaController {
    @Autowired
    LlamaService llamaService;

    @PostMapping("/chat")
    public String chat(@RequestBody String input) {
        System.out.println("Input: " + input);
        return llamaService.generateResponse(input);
    }
}
