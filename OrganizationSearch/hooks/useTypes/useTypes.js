import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

const DEFAULT_DATA = [];

export const useTypes = (options = {}) => {
  const {
    enabled = true,
    tenantId,
    ...queryOptions
  } = options;

  const ky = useOkapiKy({ tenant: tenantId });

  const searchParams = {
    limit: LIMIT_MAX,
    query: 'cql.allRecords=1 sortby name',
  };

  const {
    isLoading,
    data,
  } = useQuery({
    queryKey: ['organization-types', tenantId],
    queryFn: ({ signal }) => ky.get('organizations-storage/organization-types', { searchParams, signal }).json(),
    enabled,
    ...queryOptions,
  });

  return ({
    organizationTypes: data?.organizationTypes ?? DEFAULT_DATA,
    isLoading,
  });
};
