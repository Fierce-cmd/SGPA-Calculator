import React, { useState } from "react";
import { GradeRule, CurriculumMap } from "../types";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

type GradeRulesPanelProps = {
  rules: GradeRule[];
  onChange: (rules: GradeRule[]) => void;
  curriculumMap: CurriculumMap;
  onCurriculumChange: (map: CurriculumMap) => void;
};

export function GradeRulesPanel({ rules, onChange, curriculumMap, onCurriculumChange }: GradeRulesPanelProps) {
  const [error, setError] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [jsonText, setJsonText] = useState(JSON.stringify(curriculumMap, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleRuleChange = (
    id: string,
    field: keyof GradeRule,
    value: string | number,
  ) => {
    const newRules = rules.map((r) => {
      if (r.id === id) {
        return { ...r, [field]: value };
      }
      return r;
    });
    validateAndSave(newRules);
  };

  const validateAndSave = (newRules: GradeRule[]) => {
    // Basic validation
    let hasError = false;
    for (let i = 0; i < newRules.length; i++) {
      const r = newRules[i];
      if (r.points < 0 || r.points > 10) {
        setError(`Grade points for ${r.label} must be between 0 and 10.`);
        hasError = true;
        break;
      }
      if (r.minMarks > r.maxMarks) {
        setError(`Min marks cannot be greater than max marks for ${r.label}.`);
        hasError = true;
        break;
      }
      // Check overlap
      for (let j = i + 1; j < newRules.length; j++) {
        const other = newRules[j];
        if (
          Math.max(r.minMarks, other.minMarks) <=
          Math.min(r.maxMarks, other.maxMarks)
        ) {
          setError(`Marks range for ${r.label} overlaps with ${other.label}.`);
          hasError = true;
          break;
        }
      }
      if (hasError) break;
    }

    if (!hasError) {
      setError(null);
      onChange(newRules);
    } else {
      onChange(newRules);
    }
  };

  const handleValidateJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonError(null);
      return parsed;
    } catch (e: any) {
      setJsonError(e.message);
      return null;
    }
  };

  const handleSaveCurriculum = () => {
    const parsed = handleValidateJson();
    if (parsed) {
      onCurriculumChange(parsed);
      alert("Curriculum saved successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200/80 dark:border-zinc-800/80 overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800/50 bg-gray-50/50 dark:bg-zinc-900/10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Grade Rules</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Customize grade labels, points, and marks ranges for theory subjects.
          </p>
        </div>

        {error && (
          <div className="px-6 py-3 bg-red-50 dark:bg-red-900/30 border-b border-red-100 dark:border-red-800 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-zinc-900/30 border-b border-gray-100 dark:border-zinc-800/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                <th className="px-6 py-3">Grade Label</th>
                <th className="px-6 py-3">Grade Points</th>
                <th className="px-6 py-3">Min Marks</th>
                <th className="px-6 py-3">Max Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={rule.label}
                      onChange={(e) =>
                        handleRuleChange(rule.id, "label", e.target.value)
                      }
                      className="w-full px-3 py-1.5 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white sm:text-sm transition-colors"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={rule.points}
                      onChange={(e) =>
                        handleRuleChange(
                          rule.id,
                          "points",
                          Number(e.target.value),
                        )
                      }
                      className="w-full px-3 py-1.5 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white sm:text-sm transition-colors"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={rule.minMarks}
                      onChange={(e) =>
                        handleRuleChange(
                          rule.id,
                          "minMarks",
                          Number(e.target.value),
                        )
                      }
                      className="w-full px-3 py-1.5 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white sm:text-sm transition-colors"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={rule.maxMarks}
                      onChange={(e) =>
                        handleRuleChange(
                          rule.id,
                          "maxMarks",
                          Number(e.target.value),
                        )
                      }
                      className="w-full px-3 py-1.5 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white sm:text-sm transition-colors"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Curriculum Editor */}
      <div className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200/80 dark:border-zinc-800/80 overflow-hidden transition-all duration-200 hover:shadow-md">
        <button
          onClick={() => setIsEditorOpen(!isEditorOpen)}
          className="w-full px-6 py-5 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-900/10 hover:bg-gray-100/50 dark:hover:bg-zinc-800/30 transition-colors focus:outline-none"
        >
          <div className="text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Curriculum Editor</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Advanced: Edit the JSON map for branches and semesters.
            </p>
          </div>
          {isEditorOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>

        {isEditorOpen && (
          <div className="p-6 border-t border-gray-100 dark:border-zinc-800/50">
            {jsonError && (
              <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                Invalid JSON: {jsonError}
              </div>
            )}
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full h-64 p-4 font-mono text-sm border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-inner focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors"
              spellCheck="false"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleValidateJson}
                className="px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-all duration-200"
              >
                Validate JSON
              </button>
              <button
                onClick={handleSaveCurriculum}
                className="px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl shadow-sm text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-all duration-200"
              >
                Save Curriculum
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
