import React from "react";
import { Save, Download, RefreshCw, Moon, Sun } from "lucide-react";

type HeaderProps = {
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export function Header({ onSave, onLoad, onReset, isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Expected SGPA Calculator
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-md transition-colors"
            title="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="w-px h-6 bg-gray-300 dark:bg-zinc-800 mx-1"></div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md transition-colors"
            title="Reset all inputs"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-black dark:text-white dark:text-white bg-gray-100 dark:bg-zinc-800 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:hover:bg-white/20 rounded-md transition-colors"
            title="Save as template"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button
            onClick={onLoad}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-md transition-colors"
            title="Load template"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Load</span>
          </button>
        </div>
      </div>
    </header>
  );
}
