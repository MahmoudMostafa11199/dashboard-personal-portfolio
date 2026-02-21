const TABS = ['overview', 'description', 'technologies', 'notes'];

type ProjectTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

function ProjectTabs({ activeTab, onTabChange }: ProjectTabsProps) {
  return (
    <nav className="tabs border-b border-stone-400 mb-3 dark:border-gray-700">
      {TABS.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-t-lg capitalize border-b-0 border-gray-700 transition-all dark:border-gray-400 ${
            activeTab === tab ? 'border-b-1' : 'hover:border-b-1'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}

export default ProjectTabs;
