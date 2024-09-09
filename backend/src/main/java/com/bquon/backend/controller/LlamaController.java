package com.bquon.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.bquon.backend.service.LlamaService;


@RestController
@RequestMapping("/llama")
public class LlamaController {
    @Autowired
    LlamaService llamaService;

    @GetMapping("/chat")
    public String chat(@RequestBody String input) {
        return llamaService.generateResponse(input);
    }
}
