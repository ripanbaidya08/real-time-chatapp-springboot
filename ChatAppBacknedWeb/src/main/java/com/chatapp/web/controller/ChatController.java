package com.chatapp.web.controller;

import com.chatapp.web.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    /**
     * Handles incoming chat messages sent to the "/chat.sendMessage" endpoint.
     * The message is then broadcast to the "/topic/public" topic.
     *
     * @param chatMessage the incoming chat message payload
     * @return the chat message to be broadcast
     */
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    /**
     * Handles adding a new user when a message is sent to the "/chat.addUser" endpoint.
     * It stores the user's name in the session attributes and broadcasts the message to the "/topic/public" topic.
     *
     * @param chatMessage the incoming chat message payload
     * @param headerAccessor provides access to the session attributes
     * @return the chat message to be broadcast
     */
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
}
