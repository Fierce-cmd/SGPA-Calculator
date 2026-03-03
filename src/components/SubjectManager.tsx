import React, { useState } from "react";
import { Subject, SubjectType } from "../types";
import { Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Edit2, Check, X } from "lucide-react";

type SubjectManagerProps = {
  subjects: Subject[];
  onChange: (subjects: Subject[]) => void;
};

export function SubjectManager({ subjects, onChange }: SubjectManagerProps) {
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({
    code: "",
    name: "",
    type: "Theory",
    credits: 3,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSubject, setEditSubject] = useState<Partial<Subject>>({});

  const handleAdd = () => {
    if (!newSubject.name || !newSubject.credits) return;

    const subject: Subject = {
      id: Math.random().toString(36).substring(7),
      code: newSubject.code || "",
      name: newSubject.name,
      type: newSubject.type as SubjectType,
      credits: Number(newSubject.credits),
    };

    onChange([...subjects, subject]);
    setNewSubject({ code: "", name: "", type: "Theory", credits: 3 });
  };

  const handleRemove = (id: string) => {
    onChange(subjects.filter((s) => s.id !== id));
  };

  const moveSubject = (index: number, direction: "up" | "down") => {
    const newSubjects = [...subjects];
    if (direction === "up" && index > 0) {
      [newSubjects[index - 1], newSubjects[index]] = [
        newSubjects[index],
        newSubjects[index - 1],
      ];
    } else if (direction === "down" && index < newSubjects.length - 1) {
      [newSubjects[index + 1], newSubjects[index]] = [
        newSubjects[index],
        newSubjects[index + 1],
      ];
    }
    onChange(newSubjects);
  };

  const updateSubject = (id: string, field: keyof Subject, value: any) => {
    onChange(
      subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const startEditing = (subject: Subject) => {
    setEditingId(subject.id);
    setEditSubject(subject);
  };

  const saveEdit = () => {
    if (!editSubject.name || !editSubject.credits || !editingId) return;
    onChange(
      subjects.map((s) =>
        s.id === editingId
          ? {
              ...s,
              code: editSubject.code || "",
              name: editSubject.name!,
              type: editSubject.type as SubjectType,
              credits: Number(editSubject.credits),
            }
          : s
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200/80 dark:border-zinc-800/80 overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800/50 bg-gray-50/50 dark:bg-zinc-900/10 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
              Add New Subject
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add theory or practical subjects to your list.
            </p>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Code <span className="text-gray-400 font-normal">(Opt)</span>
            </label>
            <input
              type="text"
              value={newSubject.code}
              onChange={(e) =>
                setNewSubject({ ...newSubject, code: e.target.value })
              }
              placeholder="e.g. BT201"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={newSubject.name}
              onChange={(e) =>
                setNewSubject({ ...newSubject, name: e.target.value })
              }
              placeholder="e.g. Physics"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <select
              value={newSubject.type}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  type: e.target.value as SubjectType,
                })
              }
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
            >
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
            </select>
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Credits
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max="10"
                value={newSubject.credits}
                onChange={(e) =>
                  setNewSubject({
                    ...newSubject,
                    credits: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
              />
              <button
                onClick={handleAdd}
                disabled={!newSubject.name || !newSubject.credits}
                className="flex items-center justify-center p-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200/80 dark:border-zinc-800/80 overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800/50 bg-gray-50/50 dark:bg-zinc-900/10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
            Current Subjects
          </h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-zinc-800/50">
          {subjects.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No subjects added yet.
            </div>
          ) : (
            subjects.map((subject, index) => (
              <div
                key={subject.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-zinc-900/30 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col text-gray-400 dark:text-gray-500">
                    <button
                      onClick={() => moveSubject(index, "up")}
                      disabled={index === 0}
                      className="hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveSubject(index, "down")}
                      disabled={index === subjects.length - 1}
                      className="hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    {editingId === subject.id ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editSubject.code}
                            onChange={(e) => setEditSubject({ ...editSubject, code: e.target.value })}
                            placeholder="Code"
                            className="w-20 px-2 py-1 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded text-sm"
                          />
                          <input
                            type="text"
                            value={editSubject.name}
                            onChange={(e) => setEditSubject({ ...editSubject, name: e.target.value })}
                            placeholder="Name"
                            className="w-48 px-2 py-1 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={editSubject.type}
                            onChange={(e) => setEditSubject({ ...editSubject, type: e.target.value as SubjectType })}
                            className="px-2 py-1 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded text-sm"
                          >
                            <option value="Theory">Theory</option>
                            <option value="Practical">Practical</option>
                          </select>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={editSubject.credits}
                            onChange={(e) => setEditSubject({ ...editSubject, credits: Number(e.target.value) })}
                            className="w-16 px-2 py-1 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded text-sm"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          {subject.code && (
                            <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                              {subject.code}
                            </span>
                          )}
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {subject.name}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              subject.type === "Theory"
                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                : "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                            }`}
                          >
                            {subject.type}
                          </span>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={subject.credits}
                              onChange={(e) => {
                                let val = e.target.value === "" ? "" : Number(e.target.value);
                                if (typeof val === "number" && val > 10) val = 10;
                                if (typeof val === "number" && val < 1) val = 1;
                                updateSubject(subject.id, "credits", val);
                              }}
                              className="w-12 px-1 py-0.5 text-center border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded shadow-sm focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white text-xs transition-colors"
                            />
                            <span>Credits</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  {editingId === subject.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-md transition-colors"
                        title="Save"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                        title="Cancel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(subject)}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        title="Edit subject"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleRemove(subject.id)}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                        title="Remove subject"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
