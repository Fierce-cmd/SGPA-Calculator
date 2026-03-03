import { GradeRule, Subject, CurriculumMap } from "./types";

export const DEFAULT_GRADE_RULES: GradeRule[] = [
  { id: "1", label: "A+", points: 10, minMarks: 91, maxMarks: 100 },
  { id: "2", label: "A", points: 9, minMarks: 81, maxMarks: 90 },
  { id: "3", label: "B+", points: 8, minMarks: 71, maxMarks: 80 },
  { id: "4", label: "B", points: 7, minMarks: 61, maxMarks: 70 },
  { id: "5", label: "C+", points: 6, minMarks: 51, maxMarks: 60 },
  { id: "6", label: "C", points: 5, minMarks: 41, maxMarks: 50 },
  { id: "7", label: "D", points: 4, minMarks: 40, maxMarks: 40 },
  { id: "8", label: "F", points: 0, minMarks: 0, maxMarks: 39 },
];

export const DEFAULT_CURRICULUM: CurriculumMap = {
  CSE: {
    "1": [
      { code: "BT101", name: "Engineering Chemistry", type: "Theory", credits: 3 },
      { code: "BT102", name: "Mathematics-I", type: "Theory", credits: 4 },
      { code: "BT103", name: "English for Communication", type: "Theory", credits: 3 },
      { code: "BT104", name: "Basic Electrical & Electronics Engineering", type: "Theory", credits: 2 },
      { code: "BT105", name: "Engineering Graphics", type: "Theory", credits: 2 },
      { code: "BT101(P)", name: "Engineering Chemistry", type: "Practical", credits: 1 },
      { code: "BT103(P)", name: "English for Communication", type: "Practical", credits: 1 },
      { code: "BT104(P)", name: "Basic Electrical & Electronics Engineering", type: "Practical", credits: 1 },
      { code: "BT105(P)", name: "Engineering Graphics", type: "Practical", credits: 1 },
      { code: "BT106(P)", name: "Manufacturing Practices", type: "Practical", credits: 1 },
      { code: "BT108(P)", name: "Swachh Bharat Unnat Bharat Abhiyan/Rural Outreach", type: "Practical", credits: 2 },
    ],
    "2": [
      { code: "BT201", name: "Engineering Physics", type: "Theory", credits: 3 },
      { code: "BT202", name: "Mathematics-II", type: "Theory", credits: 4 },
      { code: "BT203", name: "Basic Mechanical Engineering", type: "Theory", credits: 3 },
      { code: "BT204", name: "Basic Civil Engineering & Mechanics", type: "Theory", credits: 3 },
      { code: "BT205", name: "Basic Computer Engineering", type: "Theory", credits: 3 },
      { code: "BT201(P)", name: "Engineering Physics", type: "Practical", credits: 1 },
      { code: "BT203(P)", name: "Basic Mechanical Engineering", type: "Practical", credits: 1 },
      { code: "BT204(P)", name: "Basic Civil Engineering & Mechanics", type: "Practical", credits: 1 },
      { code: "BT205(P)", name: "Basic Computer Engineering", type: "Practical", credits: 1 },
      { code: "BT206(P)", name: "Language Lab & Seminars", type: "Practical", credits: 1 },
    ],
    "3": [],
  },
};

export const DEFAULT_SUBJECTS: Subject[] = [
  { id: "s1", code: "BT201", name: "Physics", type: "Theory", credits: 3 },
  { id: "s2", code: "BT202", name: "Maths-II", type: "Theory", credits: 4 },
  { id: "s3", code: "BT203", name: "BME", type: "Theory", credits: 3 },
  { id: "s4", code: "BT204", name: "BCEM", type: "Theory", credits: 3 },
  { id: "s5", code: "BT205", name: "BCE", type: "Theory", credits: 3 },
  {
    id: "s6",
    code: "BT201",
    name: "Physics Lab",
    type: "Practical",
    credits: 1,
  },
  { id: "s7", code: "BT203", name: "BME Lab", type: "Practical", credits: 1 },
  { id: "s8", code: "BT204", name: "BCEM Lab", type: "Practical", credits: 1 },
  { id: "s9", code: "BT205", name: "BCE Lab", type: "Practical", credits: 1 },
  {
    id: "s10",
    code: "BT206",
    name: "Language Lab",
    type: "Practical",
    credits: 1,
  },
];
