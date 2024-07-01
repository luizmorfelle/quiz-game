"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import { getStudentStorage } from "@/utils/storage";
import { Game } from "@/types/types";
import { useRouter } from "next/navigation";

const Quiz = () => {
  const router = useRouter();
  const [game, setGame] = useState<Game>();
  const [question, setQuestion] = useState(0);

  const handleOptionClick = (option: number) => {
    if (game) {
      game.answers.push(option.toString());
      game.actualQuestion = (question + 1).toString();
      game.score = game.answers.reduce((acc, answer, index) => {
        if (answer === game.questions[index].answer) {
          return acc + 1;
        }
        return acc;
      }, 0);
      fetch("http://localhost:8080/api/games/" + game?.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      }).catch((error) => {
        alert("Erro ao responder a questão!");
      });
    }
  };

  useEffect(() => {
    fetch(
      "http://localhost:8080/api/games/" +
        getStudentStorage().id +
        "?difficulty=easy"
    )
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
        setQuestion(parseInt(data["actualQuestion"]));
      })
      .catch((error) => {
        alert("Erro ao buscar o jogo!");
      });
  }, []);
  //game != undefined && question >= game?.questions.length
  if (game != undefined && question >= game?.questions.length) {
    fetch(
      "http://localhost:8080/api/students/" +
        getStudentStorage().id +
        "/restart",
      {
        method: "PUT",
      }
    ).catch((error) => {
      alert("Erro ao atualizar o status!");
    });

    return (
      <div className="">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Fim do jogo!</h2>
            <h2 className="text-2xl font-bold mb-6">
              Sua pontuação foi: {game?.score}
            </h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Jogar novamente
              </button>
              <button
                onClick={() => {
                  router.push("/studentDashboard");
                }}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ver leaderboard
              </button>
              <button
                onClick={() => {
                  router.push("/home");
                }}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Voltar para o menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen flex flex-col flex-1 w-screen">
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center bg-gray-100">
        <div className=" bg-white p-8 rounded-lg shadow-lg max-w-lg h-[30rem] w-full">
          {game !== undefined ? (
            <div className="flex flex-col h-full">
              <h2 className="text-1xl font-bold mb-6">
                Questão {question + 1} de {game?.questions.length}
              </h2>
              <h2 className="flex flex-col justify-center text-2xl font-bold mb-6 flex-1">
                {game?.questions[question].question}
              </h2>
              <div className="flex flex-col justify-center flex-grow">
                {game?.questions[question].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleOptionClick(index);
                      setQuestion(question + 1);
                    }}
                    className="w-full mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6">Carregando...</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
