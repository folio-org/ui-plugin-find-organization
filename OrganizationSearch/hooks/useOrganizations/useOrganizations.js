import { useCallback } from 'react';

import {
  useOkapiKy,
} from '@folio/stripes/core';
import {
  buildArrayFieldQuery,
  getFiltersCount,
  makeQueryBuilder,
  PLUGIN_RESULT_COUNT_INCREMENT,
  VENDORS_API,
} from '@folio/stripes-acq-components';

import {
  getKeywordQuery,
} from '../../OrganizationsSearchConfig';
import { FILTERS } from '../../constants';

const buildQuery = makeQueryBuilder(
  'cql.allRecords=1',
  (query, qindex) => {
    if (qindex) {
      return `(${qindex}=${query}*)`;
    }

    return `(${getKeywordQuery(query)})`;
  },
  'sortby name/sort.ascending',
  {
    [FILTERS.ADDRESS_COUNTRY]: (filterValue) => `${FILTERS.ADDRESS_COUNTRY}=country:${filterValue}`,
    [FILTERS.ACQUISITIONS_UNIT]: buildArrayFieldQuery.bind(null, [FILTERS.ACQUISITIONS_UNIT]),
    [FILTERS.TAGS]: buildArrayFieldQuery.bind(null, [FILTERS.TAGS]),
  },
);

export const useOrganizations = () => {
  const ky = useOkapiKy();

  const fetchOrganizations = useCallback(async ({
    searchParams = {},
    offset = 0,
    limit = PLUGIN_RESULT_COUNT_INCREMENT,
  }) => {
    const query = buildQuery(searchParams);
    const filtersCount = getFiltersCount(searchParams);

    if (!filtersCount) {
      return { organizations: [], totalRecords: 0 };
    }

    const builtSearchParams = {
      query,
      limit,
      offset,
    };

    const { organizations, totalRecords } = await ky
      .get(VENDORS_API, { searchParams: { ...builtSearchParams } })
      .json();

    return {
      organizations,
      totalRecords,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetchOrganizations };
};
