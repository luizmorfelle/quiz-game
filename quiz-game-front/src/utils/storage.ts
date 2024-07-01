import { Student } from "@/types/types";

export const getStudentStorage = () => {
  return JSON.parse(atob(localStorage.getItem("token")!)) as Student;
};
