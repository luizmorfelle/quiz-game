"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import { getStudentStorage } from "@/utils/storage";
import { Game, Student } from "@/types/types";
import { unwatchFile } from "fs";

const LeaderBoard = () => {
  const [games, setGames] = useState<Game[]>();
  const studentData = getStudentStorage();
  const [leaderboard, setLeaderboard] = useState<Student[]>();

  useEffect(() => {
    fetch("http://localhost:8080/api/games/" + getStudentStorage().id + "/list")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        alert("Erro ao buscar os jogos!");
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data);
      })
      .catch((error) => {
        alert("Erro ao buscar o leaderboard!");
      });
  }, []);

  return (
    <div className="h-screen flex flex-col flex-1">
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center bg-gray-100 p-4 gap-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Informações do Estudante</h2>
          <p className="mb-2">
            <strong>Name:</strong> {studentData.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {studentData.email}
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full ">
          {games !== undefined ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Informações dos Seus Jogos
              </h2>
              <p className="mb-2">
                <strong>Jogos participados:</strong> {games.length}
              </p>
              <p className="mb-2">
                <strong>Respostas Corretas:</strong>{" "}
                {games.reduce((acc, game) => acc + game.score, 0)}
              </p>
              <p className="mb-2">
                <strong>Respostas Incorretas:</strong>{" "}
                {games.reduce(
                  (acc, game) => acc + game.questions.length - game.score,
                  0
                )}
              </p>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          {leaderboard !== undefined ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center">Placar</h2>

              <table className="w-full text-center text-sm text-gray-700 bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Posição</th>
                    <th className="px-4 py-2 font-semibold">Nome</th>
                    <th className="px-4 py-2 font-semibold">Pontuação</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((student, index) => (
                    <tr
                      className={`border-b last:border-b-0 hover:bg-gray-50 ${
                        index === 0 ? "bg-slate-200 font-bold" : ""
                      }`}
                      key={student.id}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
