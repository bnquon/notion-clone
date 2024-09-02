"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginUser =  useMutation({
    mutationFn: async () => {
      // console.log(usernameRef.current!.value, passwordRef.current!.value);
      const response = await axios.post('http://localhost:8080/users/login', {
        username: usernameRef.current!.value,
        password: passwordRef.current!.value
      });
      return response.data;
    },
    onSuccess: () => {
      router.push("/dashboard");
    }
  })

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser.mutate();
  };

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="w-1/4 h-1/2 drop-shadow-xl bg-[#f3f5f6] flex flex-col justify-center items-center">
        <p className="text-5xl font-semibold mb-10">MindSpace</p>
        <form
          action=""
          className="flex flex-col w-1/2 gap-8"
          onSubmit={handleFormSubmit}
        >
          <input
            ref={usernameRef}
            type="text"
            name="username"
            id="username"
            className="p-2 text-xl rounded-xl drop-shadow-lg focus:outline focus:outline-[#8A2BE2]"
            placeholder="Enter your username"
          />
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            className="p-2 text-xl rounded-xl drop-shadow-lg focus:outline focus:outline-[#8A2BE2]"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="bg-white w-fit px-8 py-2 rounded-xl ml-auto mr-auto drop-shadow-lg text-xl hover:bg-[#8A2BE2] duration-150 hover:text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
