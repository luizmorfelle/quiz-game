"use client";
import { getStudentStorage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-slate-950 p-5 ">
      <div className="w-full flex justify-between items-center px-5">
        <div className="text-white font-bold text-xl">Quiz Game</div>
        <div className="flex gap-4 items-center">
          <div className="text-white">Hello, {getStudentStorage().name}</div>
          <button
            className="text-white bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-800"
            onClick={() => router.push("/")}
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
