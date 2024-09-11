import React, { useRef } from 'react';
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';

export const ChatbotUI = () => {

  // Have to send message and make that into a block into the section and then retrieve llama response and display it in the section
  const userMessageRef = useRef<HTMLTextAreaElement>(null);

  const sendMessageFunction = useMutation({
    mutationFn: async () => {
        const response = await axios.post("http://localhost:8080/llama/chat", {
            input: userMessageRef.current!.value
        });
        console.log(response);
    }
  })

  const handleMessageSubmit = () => {
    if (userMessageRef.current?.value !== "") {
      console.log("userMessageRef.current?.value: ", userMessageRef.current?.value);
      sendMessageFunction.mutate();
    } else {
        // Show toast later
        alert("Please enter a message");
    }
  }

  return (
    <div className='fixed bottom-[3%] right-[3%] w-1/5 h-1/2 flex flex-col border-2 border-black rounded-xl overflow-hidden'>
      <div className='h-[85%] bg-white grid grid-flow-col'>
        {/* Chat content area */}
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
