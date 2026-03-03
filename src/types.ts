export type GradeRule = {
  id: string;
  label: string;
  points: number;
  minMarks: number;
  maxMarks: number;
};

export type SubjectType = "Theory" | "Practical";

export type Subject = {
  id: string;
  code: string;
  name: string;
  type: SubjectType;
  credits: number;
};

export type CurriculumSubject = Omit<Subject, "id">;

export type CurriculumMap = {
  [branch: string]: {
    [semester: string]: CurriculumSubject[];
  };
};

export type SubjectMarks = {
  subjectId: string;
  endSem: number | "";
  midSem: number | "";
  attendance: number | "";
  fileSubmitted: boolean;
};

export type AppState = {
  gradeRules: GradeRule[];
  subjects: Subject[];
  marks: Record<string, SubjectMarks>;
  curriculumMap?: CurriculumMap;
  selectedBranch?: string;
  selectedSemester?: string;
};
