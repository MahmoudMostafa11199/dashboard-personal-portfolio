import Filter from '../../ui/Filter';
import SearchBy from '../../ui/SearchBy';

function SkillOperations() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
      {/*--------------- Search ---------------*/}
      <SearchBy queryName="query" placeholder="Search skills by name or category..."/>

      {/*--------------- Filter ---------------*/}
      <Filter
        filterField="category"
        options={[
          {
            value: 'all',
            label: 'All',
          },
          {
            value: 'frontend',
            label: 'Frontend',
          },
          {
            value: 'backend',
            label: 'Backend',
          },
          {
            value: 'database',
            label: 'Database',
          },
          {
            value: 'other',
            label: 'Other',
          },
        ]}
      />
    </div>
  );
}

export default SkillOperations;
