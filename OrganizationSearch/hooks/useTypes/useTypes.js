import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

const DEFAULT_DATA = [];

export const useTypes = () => {
  const ky = useOkapiKy();

  const searchParams = {
    limit: LIMIT_MAX,
    query: 'cql.allRecords=1 sortby name',
  };

  const {
    isLoading,
    data,
  } = useQuery(
    ['organization-types'],
    () => ky.get('organizations-storage/organization-types', { searchParams }).json(),
  );

  return ({
    organizationTypes: data?.organizationTypes ?? DEFAULT_DATA,
    isLoading,
  });
};
