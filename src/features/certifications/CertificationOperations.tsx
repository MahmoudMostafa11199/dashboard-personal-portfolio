import { useEffect, useState } from 'react';
import { getCertificationIssuers } from '../../services/apiCertifications';
import FilterSelect from '../../ui/FilterSelect';
import SearchBy from '../../ui/SearchBy';
import toast from 'react-hot-toast';

type IssuerOption = {
  value: string;
  label: string;
};

function CertificationOperations() {
  const [issuers, setIssuers] = useState<IssuerOption[]>([]);

  useEffect(() => {
    const fetchIssuers = async () => {
      try {
        const data = await getCertificationIssuers();
        const formattedIssuers = data.map((issuer) => ({
          value: issuer,
          label: issuer[0].toUpperCase() + issuer.slice(1),
        }));
        setIssuers(formattedIssuers);
      } catch (err) {
        toast.error('Failed to fetch issuers:' + err);
      }
    };

    fetchIssuers();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
      {/*--------------- Search ---------------*/}
      <SearchBy
        queryName="query"
        placeholder="Search certification by title or issuer..."
      />

      {/*--------------- Filter Select ---------------*/}
      <div className="w-full flex items-center justify-between sm:justify-end gap-3">
        <label className="uppercase text-xs font-semibold text-gray-400 dark:text-gray-500 whitespace-nowrap">
          Filter by Issuer
        </label>

        <FilterSelect
          filterField="issuer"
          options={[
            {
              value: 'all',
              label: 'All',
            },
            ...issuers,
          ]}
        />
      </div>
    </div>
  );
}

export default CertificationOperations;
