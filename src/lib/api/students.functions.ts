// Re-export dari src/api/students.ts
export {
  getStudentsFn,
  getStudentFn as getStudentByIdFn,
  createStudentFn,
  updateStudentFn,
  deleteStudentFn,
  bulkDeleteStudentsFn,
  assignRombelFn as assignStudentRombelFn,
} from "@/api/students";
