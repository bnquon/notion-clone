package com.bquon.backend.service;

import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LlamaService {
    @Autowired
    OllamaChatModel ollamaChatModel;

    public String generateResponse(String input) {
        ChatResponse response = ollamaChatModel.call(new Prompt(input));
        return response.getResult().getOutput().getContent();
    }
}
