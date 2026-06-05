// Re-export dari src/api/academic-years.ts
export {
  getAcademicYearsFn,
  createAcademicYearFn,
  setActiveAcademicYearFn as setActiveYearFn,
  updateAcademicYearSemesterFn,
  deleteAcademicYearFn,
  migrateSemesterColumnFn,
  SEMESTER_LABELS,
} from "@/api/academic-years";
