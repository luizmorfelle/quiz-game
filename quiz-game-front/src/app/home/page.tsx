"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import { getStudentStorage } from "@/utils/storage";

const Dashboard = () => {
  const router = useRouter();

  const handleContinueQuiz = () => {
    // Lógica para iniciar o quiz
    router.push("/quiz");
  };

  const handleStartQuiz = () => {
    fetch(
      "http://localhost:8080/api/students/" +
        getStudentStorage().id +
        "/restart",
      {
        method: "PUT",
      }
    )
      .then(() => {
        router.push("/quiz");
      })
      .catch((error) => {
        alert("Erro ao atualizar o status!");
      });
  };

  const handleViewLeaderboard = () => {
    // Lógica para visualizar o leaderboard
    router.push("/studentDashboard");
  };

  return (
    <div className="h-screen flex flex-col flex-1">
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center bg-slate-700">
        <div className="bg-slate-950 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Dashboard</h2>
          {getStudentStorage().actualGameId != "" && (
            <button
              onClick={handleContinueQuiz}
              className="w-full mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-950 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Quiz
            </button>
          )}
          <button
            onClick={handleStartQuiz}
            className="w-full mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-950 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start New Quiz
          </button>
          <button
            onClick={handleViewLeaderboard}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-950 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
