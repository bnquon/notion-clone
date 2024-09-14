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

    private static final String CONTEXT = "You are a helpful contextual and writing assistant, additionally keep responses short and sweet. You will be given full history of the conversation to help responses and do not need to mention that you are keeping history.";

    public String generateResponse(String input) {
        String combinedprompt = CONTEXT + "\n" + input;
        ChatResponse response = ollamaChatModel.call(new Prompt(combinedprompt));
        return response.getResult().getOutput().getContent();
    }
}
