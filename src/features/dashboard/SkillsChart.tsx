import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useSkillsChartData } from '../../features/dashboard/useSkillsChartData';

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#3b82f6', // blue
  backend: '#10b981', // emerald
  database: '#f59e0b', // amber
  other: '#8b5cf6', // violet
};

function SkillsChart() {
  const { data, isLoading } = useSkillsChartData();

  const chartData = data.map((item) => ({
    ...item,
    name: item.category[0].toUpperCase() + item.category.slice(1),
  }));

  return (
    <div className="bg-white dark:bg-gray-750 rounded-md p-5 sm:p-6">
      <h2 className="text-lg font-semibold mb-5">Skills Breakdown</h2>

      {isLoading && (
        <div className="h-56 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-gray-700 border-t-primary-500 animate-spin" />
        </div>
      )}

      {!isLoading && chartData.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-12">
          No skills yet — add some to see the breakdown.
        </p>
      )}

      {!isLoading && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={CATEGORY_COLORS[entry.category] ?? '#94a3b8'}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SkillsChart;
