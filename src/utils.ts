import { GradeRule, Subject, SubjectMarks } from "./types";

export function calculateTheoryMarks(marks: SubjectMarks): {
  total: number;
  attendanceMarks: number;
} {
  const end = Number(marks.endSem) || 0;
  const mid = Number(marks.midSem) || 0;
  const att = Number(marks.attendance) || 0;

  const attendanceMarks = att >= 75 ? 10 : 0;
  const total = end + mid + attendanceMarks;

  return { total, attendanceMarks };
}

export function getGradeFromMarks(
  totalMarks: number,
  rules: GradeRule[],
): GradeRule | undefined {
  return rules.find(
    (r) => totalMarks >= r.minMarks && totalMarks <= r.maxMarks,
  );
}

export function calculatePracticalGrade(
  marks: SubjectMarks,
  rules: GradeRule[],
): GradeRule | undefined {
  const att = Number(marks.attendance) || 0;
  const fileSubmitted = marks.fileSubmitted;

  // Baseline
  let baselineLabel = att >= 75 ? "A+" : "A";

  // Grade down if file not submitted
  if (!fileSubmitted) {
    const downgradeMap: Record<string, string> = {
      "A+": "A",
      A: "B+",
      "B+": "B",
      B: "C+",
      "C+": "C",
      C: "D",
      D: "F",
      F: "F",
    };
    baselineLabel = downgradeMap[baselineLabel] || "F";
  }

  return rules.find((r) => r.label === baselineLabel);
}

export function calculateSubjectResult(
  subject: Subject,
  marks: SubjectMarks,
  rules: GradeRule[],
) {
  if (subject.type === "Theory") {
    const { total, attendanceMarks } = calculateTheoryMarks(marks);
    const grade = getGradeFromMarks(total, rules);
    const gp = grade ? grade.points : 0;
    const cp = gp * subject.credits;
    return {
      totalMarks: total,
      attendanceMarks,
      gradeLabel: grade?.label || "N/A",
      gp,
      cp,
    };
  } else {
    const grade = calculatePracticalGrade(marks, rules);
    const gp = grade ? grade.points : 0;
    const cp = gp * subject.credits;
    return {
      totalMarks: null,
      attendanceMarks: null,
      gradeLabel: grade?.label || "N/A",
      gp,
      cp,
    };
  }
}
