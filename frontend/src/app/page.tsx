"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginUser = useMutation({
    mutationFn: async () => {
      // console.log(usernameRef.current!.value, passwordRef.current!.value);
      const response = await axios.post('http://localhost:8080/users/login', {
        username: usernameRef.current!.value,
        password: passwordRef.current!.value
      });
      console.log("Response.data is :", response.data);
      sessionStorage.setItem("username", response.data.username);
      sessionStorage.setItem("userID", response.data.userID); 
      return response.data;
    },
    onSuccess: () => {
      router.push("/dashboard");
    }
  })

  const createUser = useMutation({
    mutationFn: async () => {
      const response = await axios.post('http://localhost:8080/users/create', {
        username: usernameRef.current!.value,
        password: passwordRef.current!.value
      })
      sessionStorage.setItem("username", response.data.username);
      sessionStorage.setItem("userID", response.data.userID); 
      return response.data;
    },
    onSuccess: () => {
      router.push("/dashboard");
    }
  })

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usernameRef.current?.value !== "" && passwordRef.current?.value !== "") {
      if (isLogin) {
        loginUser.mutate();
      } else {
        createUser.mutate();
      }
    } else {
      // Change to a toast later
      alert("Please enter both username and password");
    }
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
            {isLogin ? "Login": "Sign up"}
          </button>
        </form>
        <p className="mt-10 underline font-bold text-lg cursor-pointer hover:text-[#8A2BE2]" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up instead" : "Login instead"}
        </p>
      </div>
    </div>
  );
}
