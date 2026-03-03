import React from "react";

type TabsProps = {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
};

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex overflow-x-auto border-b border-gray-200 dark:border-zinc-800 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab === tab
              ? "border-black dark:border-white text-black dark:text-white"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
