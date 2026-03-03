import React from "react";
import { GradeRule, Subject, SubjectMarks } from "../types";
import { calculateSubjectResult } from "../utils";

type ResultsProps = {
  subjects: Subject[];
  marks: Record<string, SubjectMarks>;
  rules: GradeRule[];
};

export function Results({ subjects, marks, rules }: ResultsProps) {
  let totalCredits = 0;
  let totalCreditPoints = 0;

  const results = subjects.map((subject) => {
    const subjectMarks = marks[subject.id] || {
      subjectId: subject.id,
      endSem: "",
      midSem: "",
      attendance: "",
      fileSubmitted: false,
    };

    const res = calculateSubjectResult(subject, subjectMarks, rules);

    totalCredits += subject.credits;
    totalCreditPoints += res.cp;

    return {
      ...subject,
      ...res,
      marks: subjectMarks,
    };
  });

  const sgpa =
    totalCredits > 0 ? (totalCreditPoints / totalCredits).toFixed(2) : "0.00";

  const handleExport = () => {
    const headers = [
      "Subject",
      "Type",
      "Credits",
      "Total Marks",
      "Attendance %",
      "File Submitted",
      "Grade",
      "GP",
      "Credit Points",
    ];
    const rows = results.map((r) => [
      `${r.code ? r.code + " " : ""}${r.name}`,
      r.type,
      r.credits,
      r.totalMarks !== null ? r.totalMarks : "N/A",
      r.marks.attendance !== "" ? r.marks.attendance : "0",
      r.type === "Practical" ? (r.marks.fileSubmitted ? "Yes" : "No") : "N/A",
      r.gradeLabel,
      r.gp,
      r.cp,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sgpa_results.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* SGPA Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-xl overflow-hidden text-white dark:text-black relative">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>

        <div className="p-8 sm:p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-indigo-100 font-medium text-lg mb-1 uppercase tracking-wider">
              Expected SGPA
            </h2>
            <div className="text-6xl sm:text-7xl font-bold tracking-tight">
              {sgpa}
            </div>
          </div>

          <div className="flex flex-row gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-3xl font-semibold">{totalCredits}</div>
              <div className="text-indigo-200 text-sm mt-1 uppercase tracking-wider font-medium">
                Total Credits
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold">{totalCreditPoints}</div>
              <div className="text-indigo-200 text-sm mt-1 uppercase tracking-wider font-medium">
                Credit Points
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden transition-colors">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black/50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Subject Breakdown
          </h3>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors"
          >
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
            <thead className="bg-gray-50 dark:bg-zinc-900/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Subject
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Credits
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Total Marks
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Att % / File
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Grade
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  GP
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  CP
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {results.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {r.code && (
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mr-2 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                          {r.code}
                        </span>
                      )}
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {r.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        r.type === "Theory"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
                      }`}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center font-medium">
                    {r.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-center font-medium">
                    {r.type === "Theory" ? (
                      r.totalMarks
                    ) : (
                      <span className="text-gray-400 dark:text-gray-600">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                    {r.type === "Theory" ? (
                      `${r.marks.attendance !== "" ? r.marks.attendance : 0}%`
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span>
                          {r.marks.attendance !== "" ? r.marks.attendance : 0}%
                        </span>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded ${r.marks.fileSubmitted ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"}`}
                        >
                          {r.marks.fileSubmitted ? "File: Yes" : "File: No"}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        r.gradeLabel === "F"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          : "bg-gray-100 dark:bg-zinc-800 dark:bg-white/10 text-black dark:text-white dark:text-white"
                      }`}
                    >
                      {r.gradeLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-center font-medium">
                    {r.gp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-center font-bold">
                    {r.cp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
