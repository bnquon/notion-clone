import React, { useRef, useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';

export const ChatbotUI = () => {

  // Have to send message and make that into a block into the section and then retrieve llama response and display it in the section
  const userMessageRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessageFunction = useMutation({
    mutationFn: async () => {
        const response = await axios.post("http://localhost:8080/llama/chat", userMessageRef.current!.value, {
          headers: {
            'Content-Type': 'text/plain'  // Set the content type to plain text
          }
        });
        setMessages([...messages, response.data.toString()]);
        console.log("Response from chatbot: " , response.data);
    },
    onSuccess: () => {
        userMessageRef.current!.value = "";
    }
  })

  const handleMessageSubmit = () => {
    if (userMessageRef.current?.value !== "") {
      console.log("Sent message: ", userMessageRef.current!.value);
      setMessages([...messages, userMessageRef.current!.value]);
      sendMessageFunction.mutate();
    } else {
        // Show toast later
        alert("Please enter a message");
    }
  }

  return (
    <div className='fixed bottom-[3%] right-[3%] w-1/5 h-1/2 flex flex-col border-2 border-black rounded-xl overflow-hidden'>
      <div className='h-[85%] bg-white grid grid-flow-row overflow-y-scroll py-4 gap-4'>
        {/* Chat content area */}
        {messages.map((message: string, index: number) => (
          <div key={index} className='w-full h-fit text-white flex px-4'
          style={{ justifyContent: index % 2 === 0 ? "flex-end" : "flex-start"}}>
            <div className='max-w-[65%] w-fit h-fit py-2 px-4 text-xl rounded-xl'
            style={{ backgroundColor: index % 2 === 0 ? "blue" : "black" }}>
              <p>{message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='h-[15%] flex border-t-2 border-black'>
        <textarea ref={userMessageRef}
          className='w-4/5 resize-none text-2xl focus:outline-none p-2'
          rows={1}
          placeholder='Enter your message'
          id='userMessage'
        />
        <div className='w-1/5 h-full flex justify-center items-center text-2xl cursor-pointer bg-gray-200 hover:bg-gray-300' onClick={handleMessageSubmit}>
          Send
        </div>
      </div>
    </div>
  );
};
