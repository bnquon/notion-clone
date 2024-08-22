"use client";
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const handleFormSubmit = () => {
    router.refresh();
    router.push('/dashboard');
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="w-1/4 h-1/2 drop-shadow-xl bg-[#f3f5f6] flex flex-col justify-center items-center">
      <p className="text-5xl font-semibold mb-10">MindSpace</p>
        <form action="" className="flex flex-col w-1/2 gap-8" onSubmit={handleFormSubmit}>
          <input type="text" name="" id="" className="p-2 text-xl rounded-xl drop-shadow-lg" placeholder="Enter your username"/>
          <input type="password" name="" id="" className="p-2 text-xl rounded-xl drop-shadow-lg" placeholder="Enter your password"/>
          <button type="submit" className="bg-white w-fit px-8 py-2 rounded-xl ml-auto mr-auto drop-shadow-lg text-xl">Login</button>
        </form>
      </div>
    </div>
  );
}
