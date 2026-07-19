import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function ProjectTableOperations() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      {/*--------------- Filter ---------------*/}
      <Filter
        filterField="status"
        options={[
          {
            value: 'all',
            label: 'All',
          },
          {
            value: 'completed',
            label: 'Completed',
          },
          {
            value: 'in-progress',
            label: 'In Progress',
          },
          {
            value: 'pending',
            label: 'Pending',
          },
        ]}
      />

      {/*--------------- Sort ---------------*/}
      <SortBy
        options={[
          { value: 'startDate-asc', label: 'Sort by date (earlier first)' },
          { value: 'startDate-desc', label: 'Sort by date (recent first)' },
        ]}
      />
    </div>
  );
}

export default ProjectTableOperations;
