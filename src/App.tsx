import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { AdminPanel } from "./components/AdminPanel";
import { GradeRulesPanel } from "./components/GradeRulesPanel";
import { Calculator } from "./components/Calculator";
import { Results } from "./components/Results";
import { CurriculumSelector } from "./components/CurriculumSelector";
import { AppState, GradeRule, Subject, SubjectMarks, CurriculumSubject } from "./types";
import { DEFAULT_GRADE_RULES, DEFAULT_SUBJECTS, DEFAULT_CURRICULUM } from "./constants";

const STORAGE_KEY = "sgpa_calculator_state";

export default function App() {
  const [activeTab, setActiveTab] = useState("Calculator");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("sgpa_dark_mode");
    if (saved !== null) {
      return saved === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("sgpa_dark_mode", isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        let mergedCurriculum = JSON.parse(JSON.stringify(DEFAULT_CURRICULUM));
        if (parsed.curriculumMap) {
          for (const branch of Object.keys(parsed.curriculumMap)) {
            if (!mergedCurriculum[branch]) {
              mergedCurriculum[branch] = parsed.curriculumMap[branch];
            } else {
              for (const sem of Object.keys(parsed.curriculumMap[branch])) {
                if (parsed.curriculumMap[branch][sem] && parsed.curriculumMap[branch][sem].length > 0) {
                  mergedCurriculum[branch][sem] = parsed.curriculumMap[branch][sem];
                }
              }
            }
          }
        }

        return {
          ...parsed,
          curriculumMap: mergedCurriculum,
          selectedBranch: parsed.selectedBranch || "",
          selectedSemester: parsed.selectedSemester || "",
        };
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return {
      gradeRules: DEFAULT_GRADE_RULES,
      subjects: DEFAULT_SUBJECTS,
      marks: {},
      curriculumMap: DEFAULT_CURRICULUM,
      selectedBranch: "",
      selectedSemester: "",
    };
  });

  // Auto-save state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    alert("Template saved successfully!");
  };

  const handleLoad = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
        alert("Template loaded successfully!");
      } catch (e) {
        alert("Failed to load template.");
      }
    } else {
      alert("No saved template found.");
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all inputs?")) {
      setState((prev) => ({
        ...prev,
        marks: {},
      }));
    }
  };

  const handleMarksChange = (
    subjectId: string,
    field: keyof SubjectMarks,
    value: any,
  ) => {
    setState((prev) => {
      const currentMarks = prev.marks[subjectId] || {
        subjectId,
        endSem: "",
        midSem: "",
        attendance: "",
        fileSubmitted: false,
      };
      return {
        ...prev,
        marks: {
          ...prev.marks,
          [subjectId]: {
            ...currentMarks,
            [field]: value,
          },
        },
      };
    });
  };

  const handleLoadSubjects = (curriculumSubjects: CurriculumSubject[], replace: boolean) => {
    setState((prev) => {
      let newSubjects: Subject[];
      let newMarks = { ...prev.marks };

      if (replace) {
        newSubjects = curriculumSubjects.map((s, index) => ({
          ...s,
          id: `${Math.random().toString(36).substring(2, 9)}-${index}`,
        }));
        newMarks = {}; // Reset marks if replacing all
      } else {
        newSubjects = [...prev.subjects];
        curriculumSubjects.forEach((cs, index) => {
          const exists = newSubjects.some(
            (s) => s.code === cs.code && s.type === cs.type
          );
          if (!exists) {
            newSubjects.push({
              ...cs,
              id: `${Math.random().toString(36).substring(2, 9)}-${index}`,
            });
          }
        });
      }

      return {
        ...prev,
        subjects: newSubjects,
        marks: newMarks,
      };
    });

    setActiveTab("Calculator");
    alert(`Loaded subjects successfully!`);
  };

  const handleSubjectChange = (
    subjectId: string,
    field: keyof Subject,
    value: any,
  ) => {
    setState((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) =>
        s.id === subjectId ? { ...s, [field]: value } : s
      ),
    }));
  };

  const tabs = ["Calculator", "Results", "Grade Rules", "Admin"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-black/10 dark:selection:bg-white/20 selection:text-black dark:selection:text-white transition-colors">
      <Header onSave={handleSave} onLoad={handleLoad} onReset={handleReset} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <CurriculumSelector
            curriculumMap={state.curriculumMap || DEFAULT_CURRICULUM}
            selectedBranch={state.selectedBranch || ""}
            selectedSemester={state.selectedSemester || ""}
            onBranchChange={(branch) => setState({ ...state, selectedBranch: branch })}
            onSemesterChange={(semester) => setState({ ...state, selectedSemester: semester })}
            onLoadSubjects={handleLoadSubjects}
          />
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === "Admin" && (
            <AdminPanel
              curriculumMap={state.curriculumMap || DEFAULT_CURRICULUM}
              onCurriculumChange={(curriculumMap) => setState({ ...state, curriculumMap })}
            />
          )}

          {activeTab === "Grade Rules" && (
            <GradeRulesPanel
              rules={state.gradeRules}
              onChange={(gradeRules) => setState({ ...state, gradeRules })}
              curriculumMap={state.curriculumMap || DEFAULT_CURRICULUM}
              onCurriculumChange={(curriculumMap) => setState({ ...state, curriculumMap })}
            />
          )}

          {activeTab === "Calculator" && (
            <Calculator
              subjects={state.subjects}
              marks={state.marks}
              onChange={handleMarksChange}
              onSubjectChange={handleSubjectChange}
            />
          )}

          {activeTab === "Results" && (
            <Results
              subjects={state.subjects}
              marks={state.marks}
              rules={state.gradeRules}
            />
          )}
        </div>
      </main>
    </div>
  );
}
