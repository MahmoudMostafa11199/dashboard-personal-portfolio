import Filter from '../../ui/Filter';
import SearchBy from '../../ui/SearchBy';

function ExperienceOperations() {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
      {/*--------------- Filter ---------------*/}
      <Filter
        filterField="experience-type"
        options={[
          {
            value: 'all',
            label: 'All',
          },
          {
            value: 'work',
            label: 'Work',
          },
          {
            value: 'training',
            label: 'Training',
          },
          {
            value: 'internship',
            label: 'Internship',
          },
          {
            value: 'other',
            label: 'Other',
          },
        ]}
      />

      {/*--------------- Search ---------------*/}
      <SearchBy
        queryName="query"
        placeholder="Search experiences by title..."
      />
    </div>
  );
}

export default ExperienceOperations;
