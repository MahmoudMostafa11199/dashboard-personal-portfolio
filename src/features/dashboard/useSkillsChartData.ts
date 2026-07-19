import { useQuery } from '@tanstack/react-query';
import { getSkillsForChart } from '../../services/apiStats';

export function useSkillsChartData() {
  const { data: skills, isPending: isLoading } = useQuery({
    queryKey: ['dashboard', 'skills-chart'],

    queryFn: getSkillsForChart,
  });

  const chartData = (skills ?? []).reduce<Record<string, number>>(
    (acc, skill) => {
      acc[skill.categoryFilter] = (acc[skill.categoryFilter] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const data = Object.entries(chartData).map(([category, count]) => ({
    category,
    count,
  }));

  return { data, isLoading };
}
