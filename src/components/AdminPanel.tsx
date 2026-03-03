import React, { useState } from "react";
import { CurriculumManager } from "./CurriculumManager";
import { CurriculumMap } from "../types";

type AdminPanelProps = {
  curriculumMap: CurriculumMap;
  onCurriculumChange: (map: CurriculumMap) => void;
};

export function AdminPanel({ curriculumMap, onCurriculumChange }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === "prathvish123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid passkey");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white dark:bg-black p-8 rounded-2xl shadow-sm border border-gray-200/80 dark:border-zinc-800/80 transition-all duration-200 hover:shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100 tracking-tight">Admin Access</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Passkey
            </label>
            <input
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black sm:text-sm transition-all duration-200"
              placeholder="Passkey"
            />
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-all duration-200 font-medium"
          >
            Access Admin Panel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-black p-5 rounded-2xl shadow-sm border border-gray-200/80 dark:border-zinc-800/80 transition-all duration-200 hover:shadow-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Admin Dashboard</h2>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-xl transition-all duration-200"
        >
          Logout
        </button>
      </div>
      <CurriculumManager curriculumMap={curriculumMap} onChange={onCurriculumChange} />
    </div>
  );
}
