import React from "react";
import { Subject, SubjectMarks } from "../types";
import { calculateTheoryMarks } from "../utils";

type CalculatorProps = {
  subjects: Subject[];
  marks: Record<string, SubjectMarks>;
  onChange: (subjectId: string, field: keyof SubjectMarks, value: any) => void;
  onSubjectChange: (subjectId: string, field: keyof Subject, value: any) => void;
};

export function Calculator({ subjects, marks, onChange, onSubjectChange }: CalculatorProps) {
  if (subjects.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 transition-colors">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No subjects found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Please add subjects in the Subject Manager tab first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {subjects.map((subject) => {
        const subjectMarks = marks[subject.id] || {
          subjectId: subject.id,
          endSem: "",
          midSem: "",
          attendance: "",
          fileSubmitted: false,
        };

        return (
          <div
            key={subject.id}
            className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200/80 dark:border-zinc-800/80 overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <div
              className={`px-6 py-5 border-b border-gray-100 dark:border-zinc-800/50 flex justify-between items-center ${
                subject.type === "Theory" ? "bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent" : "bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-900/10 dark:to-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                    subject.type === "Theory"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
                  }`}
                >
                  {subject.type}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {subject.code && (
                    <span className="text-gray-500 dark:text-gray-400 font-mono mr-2">
                      {subject.code}
                    </span>
                  )}
                  {subject.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={subject.credits}
                  onChange={(e) => {
                    let val = e.target.value === "" ? "" : Number(e.target.value);
                    if (typeof val === "number" && val > 10) val = 10;
                    if (typeof val === "number" && val < 1) val = 1;
                    onSubjectChange(subject.id, "credits", val);
                  }}
                  className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white sm:text-sm transition-colors"
                />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Credits
                </span>
              </div>
            </div>

            <div className="p-6">
              {subject.type === "Theory" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End-Sem Marks <span className="text-gray-400 font-normal">(out of 70)</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="70"
                        value={subjectMarks.endSem}
                        onChange={(e) => {
                          let val =
                            e.target.value === "" ? "" : Number(e.target.value);
                          if (typeof val === "number" && val > 70) val = 70;
                          onChange(subject.id, "endSem", val);
                        }}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
                        placeholder="0-70"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mid-Sem Marks <span className="text-gray-400 font-normal">(out of 20)</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={subjectMarks.midSem}
                        onChange={(e) => {
                          let val =
                            e.target.value === "" ? "" : Number(e.target.value);
                          if (typeof val === "number" && val > 20) val = 20;
                          onChange(subject.id, "midSem", val);
                        }}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
                        placeholder="0-20"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between items-center">
                        <span>Attendance <span className="text-gray-400 font-normal">(%)</span></span>
                        {subjectMarks.attendance !== "" && (
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${Number(subjectMarks.attendance) >= 75 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}
                          >
                            {Number(subjectMarks.attendance) >= 75
                              ? "+10 Marks"
                              : "+0 Marks"}
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subjectMarks.attendance}
                        onChange={(e) => {
                          let val =
                            e.target.value === "" ? "" : Number(e.target.value);
                          if (typeof val === "number" && val > 100) val = 100;
                          onChange(subject.id, "attendance", val);
                        }}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
                        placeholder="0-100"
                      />
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                      ≥ 75% gives 10 marks, else 0.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between items-center">
                        <span>Attendance <span className="text-gray-400 font-normal">(%)</span></span>
                        {subjectMarks.attendance !== "" && (
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${Number(subjectMarks.attendance) >= 75 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}
                          >
                            {Number(subjectMarks.attendance) >= 75
                              ? "Base: A+"
                              : "Base: A"}
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subjectMarks.attendance}
                        onChange={(e) => {
                          let val =
                            e.target.value === "" ? "" : Number(e.target.value);
                          if (typeof val === "number" && val > 100) val = 100;
                          onChange(subject.id, "attendance", val);
                        }}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
                        placeholder="0-100"
                      />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      File Submitted
                    </label>
                    <div className="flex items-center mt-3">
                      <button
                        type="button"
                        onClick={() =>
                          onChange(
                            subject.id,
                            "fileSubmitted",
                            !subjectMarks.fileSubmitted,
                          )
                        }
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 ${
                          subjectMarks.fileSubmitted
                            ? "bg-black dark:bg-white"
                            : "bg-gray-200 dark:bg-zinc-800"
                        }`}
                        role="switch"
                        aria-checked={subjectMarks.fileSubmitted}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            subjectMarks.fileSubmitted
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {subjectMarks.fileSubmitted ? "Yes" : "No"}
                      </span>
                    </div>
                    {!subjectMarks.fileSubmitted && (
                      <p className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">
                        Grade will be downgraded by one step.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
