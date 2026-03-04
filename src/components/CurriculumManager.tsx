import React, { useState } from "react";
import { CurriculumMap, CurriculumSubject, Subject, SubjectType } from "../types";
import { SubjectManager } from "./SubjectManager";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";

type CurriculumManagerProps = {
  curriculumMap: CurriculumMap;
  onChange: (map: CurriculumMap) => void;
};

export function CurriculumManager({ curriculumMap, onChange }: CurriculumManagerProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  const [newBranch, setNewBranch] = useState("");
  const [editingBranch, setEditingBranch] = useState<string | null>(null);
  const [editBranchName, setEditBranchName] = useState("");

  const [newSemester, setNewSemester] = useState("");
  const [editingSemester, setEditingSemester] = useState<string | null>(null);
  const [editSemesterName, setEditSemesterName] = useState("");

  const [confirmDeleteBranch, setConfirmDeleteBranch] = useState<string | null>(null);
  const [confirmDeleteSemester, setConfirmDeleteSemester] = useState<string | null>(null);

  const branches = Object.keys(curriculumMap);
  const semesters = selectedBranch ? Object.keys(curriculumMap[selectedBranch] || {}) : [];

  // Branch Operations
  const handleAddBranch = () => {
    if (!newBranch.trim() || curriculumMap[newBranch.trim()]) return;
    onChange({
      ...curriculumMap,
      [newBranch.trim()]: {},
    });
    setNewBranch("");
    setSelectedBranch(newBranch.trim());
    setSelectedSemester("");
  };

  const handleEditBranch = (oldBranch: string) => {
    if (!editBranchName.trim() || editBranchName.trim() === oldBranch) {
      setEditingBranch(null);
      return;
    }
    const newMap = { ...curriculumMap };
    newMap[editBranchName.trim()] = newMap[oldBranch];
    delete newMap[oldBranch];
    onChange(newMap);
    setEditingBranch(null);
    if (selectedBranch === oldBranch) {
      setSelectedBranch(editBranchName.trim());
    }
  };

  const handleDeleteBranch = (branch: string) => {
    const newMap = { ...curriculumMap };
    delete newMap[branch];
    onChange(newMap);
    if (selectedBranch === branch) {
      setSelectedBranch("");
      setSelectedSemester("");
    }
    setConfirmDeleteBranch(null);
  };

  // Semester Operations
  const handleAddSemester = () => {
    if (!selectedBranch || !newSemester.trim() || curriculumMap[selectedBranch][newSemester.trim()]) return;
    onChange({
      ...curriculumMap,
      [selectedBranch]: {
        ...curriculumMap[selectedBranch],
        [newSemester.trim()]: [],
      },
    });
    setNewSemester("");
    setSelectedSemester(newSemester.trim());
  };

  const handleEditSemester = (oldSemester: string) => {
    if (!selectedBranch || !editSemesterName.trim() || editSemesterName.trim() === oldSemester) {
      setEditingSemester(null);
      return;
    }
    const newMap = { ...curriculumMap };
    newMap[selectedBranch] = { ...newMap[selectedBranch] };
    newMap[selectedBranch][editSemesterName.trim()] = newMap[selectedBranch][oldSemester];
    delete newMap[selectedBranch][oldSemester];
    onChange(newMap);
    setEditingSemester(null);
    if (selectedSemester === oldSemester) {
      setSelectedSemester(editSemesterName.trim());
    }
  };

  const handleDeleteSemester = (semester: string) => {
    if (!selectedBranch) return;
    const newMap = { ...curriculumMap };
    newMap[selectedBranch] = { ...newMap[selectedBranch] };
    delete newMap[selectedBranch][semester];
    onChange(newMap);
    if (selectedSemester === semester) {
      setSelectedSemester("");
    }
    setConfirmDeleteSemester(null);
  };

  // Subject Operations
  const handleSubjectsChange = (subjects: Subject[]) => {
    if (!selectedBranch || !selectedSemester) return;
    const curriculumSubjects: CurriculumSubject[] = subjects.map(({ id, ...rest }) => rest);
    onChange({
      ...curriculumMap,
      [selectedBranch]: {
        ...curriculumMap[selectedBranch],
        [selectedSemester]: curriculumSubjects,
      },
    });
  };

  const currentSubjects: Subject[] = (selectedBranch && selectedSemester && curriculumMap[selectedBranch]?.[selectedSemester])
    ? curriculumMap[selectedBranch][selectedSemester].map((s, i) => ({ ...s, id: `sub-${i}` }))
    : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branches */}
        <div className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200/80 dark:border-zinc-800/80 p-6 transition-all duration-200 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">Branches</h3>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newBranch}
              onChange={(e) => setNewBranch(e.target.value)}
              placeholder="New Branch (e.g. CSE)"
              className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
            />
            <button
              onClick={handleAddBranch}
              disabled={!newBranch.trim()}
              className="p-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl disabled:opacity-50 transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {branches.map(branch => (
              <div
                key={branch}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedBranch === branch
                    ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-900/50 shadow-sm"
                    : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-gray-50/50 dark:hover:bg-zinc-900/30"
                }`}
                onClick={() => {
                  if (editingBranch !== branch) {
                    setSelectedBranch(branch);
                    setSelectedSemester("");
                  }
                }}
              >
                {editingBranch === branch ? (
                  <div className="flex items-center gap-2 flex-1" onClick={e => e.stopPropagation()}>
                    <input
                      type="text"
                      value={editBranchName}
                      onChange={(e) => setEditBranchName(e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 dark:border-zinc-700 rounded text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                      autoFocus
                    />
                    <button onClick={() => handleEditBranch(branch)} className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => setEditingBranch(null)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : confirmDeleteBranch === branch ? (
                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBranch(branch);
                      }}
                      className="px-2 py-1 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteBranch(null);
                      }}
                      className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{branch}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingBranch(branch);
                          setEditBranchName(branch);
                        }}
                        className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteBranch(branch);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {branches.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No branches added.</p>
            )}
          </div>
        </div>

        {/* Semesters */}
        <div className={`bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200/80 dark:border-zinc-800/80 p-6 transition-all duration-200 hover:shadow-md ${!selectedBranch ? 'opacity-50 pointer-events-none' : ''}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
            Semesters {selectedBranch && `for ${selectedBranch}`}
          </h3>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSemester}
              onChange={(e) => setNewSemester(e.target.value)}
              placeholder="New Semester (e.g. 1)"
              className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
            />
            <button
              onClick={handleAddSemester}
              disabled={!newSemester.trim()}
              className="p-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl disabled:opacity-50 transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {semesters.map(semester => (
              <div
                key={semester}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedSemester === semester
                    ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-900/50 shadow-sm"
                    : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-gray-50/50 dark:hover:bg-zinc-900/30"
                }`}
                onClick={() => {
                  if (editingSemester !== semester) {
                    setSelectedSemester(semester);
                  }
                }}
              >
                {editingSemester === semester ? (
                  <div className="flex items-center gap-2 flex-1" onClick={e => e.stopPropagation()}>
                    <input
                      type="text"
                      value={editSemesterName}
                      onChange={(e) => setEditSemesterName(e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 dark:border-zinc-700 rounded text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                      autoFocus
                    />
                    <button onClick={() => handleEditSemester(semester)} className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => setEditingSemester(null)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : confirmDeleteSemester === semester ? (
                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSemester(semester);
                      }}
                      className="px-2 py-1 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteSemester(null);
                      }}
                      className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Semester {semester}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSemester(semester);
                          setEditSemesterName(semester);
                        }}
                        className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteSemester(semester);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {semesters.length === 0 && selectedBranch && (
              <p className="text-sm text-gray-500 text-center py-4">No semesters added.</p>
            )}
          </div>
        </div>
      </div>

      {/* Subjects Manager */}
      {selectedBranch && selectedSemester && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Subjects for {selectedBranch} - Semester {selectedSemester}
          </h3>
          <SubjectManager subjects={currentSubjects} onChange={handleSubjectsChange} />
        </div>
      )}
    </div>
  );
}
