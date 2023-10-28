import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import {
  ASC_DIRECTION,
  buildFilterQuery,
  connectQuery,
  PLUGIN_RESULT_COUNT_INCREMENT,
  VENDORS_API,
} from '@folio/stripes-acq-components';

import {
  DONORS_SORT_MAP,
  FILTERS,
} from '../../constants';
import { DEFAULT_DONORS_QUERY } from './constants';

const buildCustomFilterQuery = filter => values => {
  const value = values.map(val => `"${val}"`).join(' or ');

  return `${filter}=(${value})`;
};

const buildCustomSortingQuery = ({ sorting, sortingDirection } = {}) => {
  if (sorting) {
    const sortIndex = (DONORS_SORT_MAP[sorting] || sorting)
      .split(' ')
      .map(value => `${value}/sort.${sortingDirection || ASC_DIRECTION}`)
      .join(' ');

    return `sortby ${sortIndex}`;
  }

  return '';
};

const buildDonorsQuery = searchParams => {
  const mainQuery = buildFilterQuery(
    searchParams,
    (query) => `name="${query}*" or code="${query}*"`,
    {
      [FILTERS.IS_VENDOR]: buildCustomFilterQuery(FILTERS.IS_VENDOR),
      [FILTERS.TAGS]: buildCustomFilterQuery(FILTERS.TAGS),
      [FILTERS.TYPES]: buildCustomFilterQuery(FILTERS.TYPES),
    },
  );

  const sortingQuery = buildCustomSortingQuery(searchParams);
  const filtersQuery = mainQuery ? `${mainQuery} and ${DEFAULT_DONORS_QUERY}` : DEFAULT_DONORS_QUERY;

  return connectQuery(filtersQuery, sortingQuery);
};

export const useDonors = () => {
  const ky = useOkapiKy();

  const { mutateAsync: fetchDonors } = useMutation({
    mutationFn: async ({
      searchParams = {},
      limit = PLUGIN_RESULT_COUNT_INCREMENT,
      offset = 0,
    }) => {
      const donorsQuery = buildDonorsQuery(searchParams);
      const builtSearchParams = {
        query: donorsQuery,
        limit,
        offset,
      };

      const {
        organizations = [],
        totalRecords,
      } = await ky.get(VENDORS_API, { searchParams: { ...builtSearchParams } }).json();

      return {
        organizations,
        totalRecords,
      };
    },
  });

  return { fetchDonors };
};
