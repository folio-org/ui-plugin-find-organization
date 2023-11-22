import {
  parse,
  stringify,
} from 'query-string';
import { useCallback } from 'react';

import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import {
  getFiltersCount,
  makeQueryBuilder,
  PLUGIN_RESULT_COUNT_INCREMENT,
  VENDORS_API,
} from '@folio/stripes-acq-components';

import {
  filterMap,
  getKeywordQuery,
} from '../../OrganizationsSearchConfig';

export const useOrganizations = () => {
  const ky = useOkapiKy();
  const stripes = useStripes();

  const fetchOrganizations = useCallback(async ({
    searchParams = {},
    offset = 0,
    limit = PLUGIN_RESULT_COUNT_INCREMENT,
  }) => {
    const queryParams = parse(stringify(searchParams));
    const query = makeQueryBuilder(
      'cql.allRecords=1',
      (query, qindex) => {
        if (qindex) {
          return `(${qindex}=${query}*)`;
        }
    
        return `(${getKeywordQuery(query, stripes)})`;
      },
      'sortby name/sort.ascending',
      filterMap,
    )(queryParams);
    const filtersCount = getFiltersCount(queryParams);

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
