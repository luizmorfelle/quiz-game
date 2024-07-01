export type Student = {
  id: string;
  name: string;
  email: string;
  password: string;
  actualGameId: string;
  teacherId: string;
  score: string;
};

export type Question = {
  id: string;
  question: string;
  difficulty: string;
  answer: string;
  options: string[];
};

export type Game = {
  id: string;
  teacherId: string;
  studentId: string;
  actualQuestion: string;
  answers: string[];
  score: number;
  questions: Question[];
  difficulty: string;
};

