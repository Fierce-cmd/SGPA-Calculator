import React, { useState } from "react";
import { CurriculumMap, Subject } from "../types";

type CurriculumSelectorProps = {
  curriculumMap: CurriculumMap;
  selectedBranch: string;
  selectedSemester: string;
  onBranchChange: (branch: string) => void;
  onSemesterChange: (semester: string) => void;
  onLoadSubjects: (subjects: Omit<Subject, "id">[], replace: boolean) => void;
};

export function CurriculumSelector({
  curriculumMap,
  selectedBranch,
  selectedSemester,
  onBranchChange,
  onSemesterChange,
  onLoadSubjects,
}: CurriculumSelectorProps) {
  const [replace, setReplace] = useState(true);

  const branches = Object.keys(curriculumMap);
  const semesters = selectedBranch ? Object.keys(curriculumMap[selectedBranch] || {}) : [];

  const handleLoad = () => {
    if (!selectedBranch || !selectedSemester) return;
    const subjects = curriculumMap[selectedBranch]?.[selectedSemester] || [];
    if (subjects.length === 0) {
      alert("Curriculum not configured yet. Please use the Curriculum Editor in the Grade Rules tab to add subjects.");
      return;
    }
    onLoadSubjects(subjects, replace);
  };

  return (
    <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6 transition-colors">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Choose Curriculum
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Selecting branch + semester loads the fixed subject list with credits automatically.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Branch
          </label>
          <select
            value={selectedBranch}
            onChange={(e) => onBranchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white sm:text-sm transition-colors"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch === "CSE" ? "Computer Science Engineering (CSE)" : branch}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Semester
          </label>
          <select
            value={selectedSemester}
            onChange={(e) => onSemesterChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
            disabled={!selectedBranch}
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                Sem {sem}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-2">
          <label className="flex items-center text-sm text-gray-700 dark:text-gray-300 h-6">
            <input
              type="checkbox"
              checked={replace}
              onChange={(e) => setReplace(e.target.checked)}
              className="mr-2 h-4 w-4 text-black dark:text-white focus:ring-indigo-500 border-gray-300 dark:border-zinc-700 rounded"
            />
            Replace current subjects
          </label>
          <button
            onClick={handleLoad}
            disabled={!selectedBranch || !selectedSemester}
            className="w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Load Subjects
          </button>
        </div>
      </div>
    </div>
  );
}
