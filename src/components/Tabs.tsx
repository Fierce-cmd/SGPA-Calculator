import React from "react";

type TabsProps = {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
};

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex overflow-x-auto mb-8 p-1 bg-gray-100 dark:bg-zinc-900 rounded-xl shadow-inner w-max">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${
            activeTab === tab
              ? "bg-white dark:bg-black text-black dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-zinc-800/50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
