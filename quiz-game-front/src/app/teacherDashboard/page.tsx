import React from 'react';
import Navbar from '@/components/NavBar'

const TeacherDashboard = () => {
  const studentsData = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      totalQuestions: 10,
      correctAnswers: 7,
      incorrectAnswers: 3
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      totalQuestions: 10,
      correctAnswers: 8,
      incorrectAnswers: 2
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      totalQuestions: 10,
      correctAnswers: 6,
      incorrectAnswers: 4
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Student Leaderboard</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Total Questions</th>
                <th className="py-2 px-4 border-b">Correct Answers</th>
                <th className="py-2 px-4 border-b">Incorrect Answers</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">{student.totalQuestions}</td>
                  <td className="py-2 px-4 border-b">{student.correctAnswers}</td>
                  <td className="py-2 px-4 border-b">{student.incorrectAnswers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
