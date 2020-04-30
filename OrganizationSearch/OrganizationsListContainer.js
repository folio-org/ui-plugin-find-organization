import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  baseManifest,
  makeQueryBuilder,
  useFilters,
  useSorting,
} from '@folio/stripes-acq-components';

import OrganizationsList from './OrganizationsList';
import {
  getKeywordQuery,
} from './OrganizationsListSearchConfig';
import { FILTERS } from './constants';

const customFilterMap = {
  [FILTERS.ADDRESS_COUNTRY]: (filterValue) => `${FILTERS.ADDRESS_COUNTRY}=country:${filterValue}`,
};
const RESULT_COUNT_INCREMENT = 30;
const buildQuery = makeQueryBuilder(
  'cql.allRecords=1',
  (query, qindex) => {
    if (qindex) {
      return `(${qindex}=${query}*)`;
    }

    return getKeywordQuery(query);
  },
  'sortby name/sort.ascending',
  customFilterMap,
);
const sortableFields = ['name', 'code', 'description', 'status', 'isVendor'];

const resetData = () => { };

const OrganizationsListContainer = ({ mutator, onSelectRow }) => {
  const [organizations, setOrganizations] = useState([]);
  const [organizationsCount, setOrganizationsCount] = useState(0);
  const [organizationsOffset, setOrganizationsOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    filters,
    searchQuery,
    applyFilters,
    applySearch,
    changeSearch,
    resetFilters,
    searchIndex,
    changeSearchIndex,
  } = useFilters(resetData);
  const [
    sortingField,
    sortingDirection,
    changeSorting,
    setSortingField,
    setSortingDirection,
  ] = useSorting(resetData, sortableFields);

  const loadOrganizations = (offset) => {
    setIsLoading(true);
    const hasToCallAPI = Object.keys(filters).some(key => filters[key] !== undefined);
    const loadRecordsPromise = hasToCallAPI
      ? mutator.organizationsListOrgs.GET({
        params: {
          limit: RESULT_COUNT_INCREMENT,
          offset,
          query: buildQuery({
            ...filters,
            sorting: sortingField,
            sortingDirection,
          }),
        },
      })
        .then(organizationsResponse => {
          if (!offset) setOrganizationsCount(organizationsResponse.totalRecords);

          setOrganizations((prev) => [...prev, ...organizationsResponse.organizations]);
        })
      : Promise.resolve();

    return loadRecordsPromise.finally(() => setIsLoading(false));
  };

  const onNeedMoreData = () => {
    const newOffset = organizationsOffset + RESULT_COUNT_INCREMENT;

    loadOrganizations(newOffset)
      .then(() => {
        setOrganizationsOffset(newOffset);
      });
  };

  useEffect(
    () => {
      setOrganizations([]);
      setOrganizationsOffset(0);
      loadOrganizations(0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters, sortingField, sortingDirection],
  );

  useEffect(
    () => {
      setSortingField('name');
      setSortingDirection('ascending');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <OrganizationsList
      onNeedMoreData={onNeedMoreData}
      organizationsCount={organizationsCount}
      isLoading={isLoading}
      organizations={organizations}
      onSelectRow={onSelectRow}
      filters={filters}
      searchQuery={searchQuery}
      applyFilters={applyFilters}
      applySearch={applySearch}
      changeSearch={changeSearch}
      resetFilters={resetFilters}
      searchIndex={searchIndex}
      changeSearchIndex={changeSearchIndex}
      sortingField={sortingField}
      sortingDirection={sortingDirection}
      changeSorting={changeSorting}
    />
  );
};

OrganizationsListContainer.manifest = Object.freeze({
  organizationsListOrgs: {
    ...baseManifest,
    accumulate: true,
    fetch: false,
    path: 'organizations-storage/organizations',
  },
});

OrganizationsListContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
  onSelectRow: PropTypes.func.isRequired,
};

export default OrganizationsListContainer;
