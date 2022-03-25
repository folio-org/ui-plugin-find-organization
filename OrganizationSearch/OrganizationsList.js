import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Paneset,
  MultiColumnList,
} from '@folio/stripes/components';
import {
  FiltersPane,
  NoResultsMessage,
  ResetButton,
  ResultsPane,
  SingleSearchForm,
  useToggle,
} from '@folio/stripes-acq-components';

import OrganizationsListFilter from './OrganizationsListFilter';
import {
  searchableIndexes,
} from './OrganizationsListSearchConfig';

const resultsPaneTitle = <FormattedMessage id="ui-organizations.meta.title" />;
const visibleColumns = ['name', 'code', 'description', 'status', 'isVendor'];

const columnMapping = {
  name: <FormattedMessage id="ui-organizations.main.name" />,
  code: <FormattedMessage id="ui-organizations.main.code" />,
  description: <FormattedMessage id="ui-organizations.main.description" />,
  status: <FormattedMessage id="ui-organizations.main.vendorStatus" />,
  isVendor: <FormattedMessage id="ui-organizations.main.isVendor" />,
};
const resultsFormatter = {
  status: data => <FormattedMessage id={`ui-organizations.organizationStatus.${data.status.toLowerCase()}`} />,
  isVendor: data => <FormattedMessage id={`ui-organizations.main.isVendor.${data.isVendor ? 'yes' : 'no'}`} />,
};

const OrganizationsList = ({
  isLoading,
  onNeedMoreData,
  organizations,
  organizationsCount,
  onSelectRow,
  filters,
  searchQuery,
  applyFilters,
  applySearch,
  changeSearch,
  resetFilters,
  searchIndex,
  changeSearchIndex,
  sortingField,
  sortingDirection,
  changeSorting,
}) => {
  const [isFiltersOpened, toggleFilters] = useToggle(true);
  const resultsStatusMessage = (
    <NoResultsMessage
      isLoading={isLoading}
      filters={filters}
      isFiltersOpened={isFiltersOpened}
      toggleFilters={toggleFilters}
    />
  );

  return (
    <Paneset
      data-test-organizations-list
      isRoot
    >
      {isFiltersOpened && (
        <FiltersPane toggleFilters={toggleFilters}>
          <SingleSearchForm
            applySearch={applySearch}
            changeSearch={changeSearch}
            searchQuery={searchQuery}
            searchableIndexes={searchableIndexes}
            changeSearchIndex={changeSearchIndex}
            selectedIndex={searchIndex}
            isLoading={isLoading}
            ariaLabelId="ui-organizations.search"
          />

          <ResetButton
            id="reset-organizations-filters"
            reset={resetFilters}
          />

          <OrganizationsListFilter
            activeFilters={filters}
            applyFilters={applyFilters}
          />
        </FiltersPane>
      )}

      <ResultsPane
        title={resultsPaneTitle}
        count={organizationsCount}
        toggleFiltersPane={toggleFilters}
        filters={filters}
        isFiltersOpened={isFiltersOpened}
        isLoading={isLoading}
      >
        <MultiColumnList
          id="organizations-list"
          totalCount={organizationsCount}
          contentData={organizations}
          visibleColumns={visibleColumns}
          columnMapping={columnMapping}
          formatter={resultsFormatter}
          loading={isLoading}
          autosize
          virtualize
          onNeedMoreData={onNeedMoreData}
          sortOrder={sortingField}
          sortDirection={sortingDirection}
          onHeaderClick={changeSorting}
          onRowClick={onSelectRow}
          isEmptyMessage={resultsStatusMessage}
          pagingType="click"
        />
      </ResultsPane>
    </Paneset>
  );
};

OrganizationsList.propTypes = {
  onNeedMoreData: PropTypes.func.isRequired,
  organizationsCount: PropTypes.number,
  isLoading: PropTypes.bool,
  organizations: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
  applyFilters: PropTypes.func.isRequired,
  applySearch: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  searchIndex: PropTypes.string.isRequired,
  changeSearchIndex: PropTypes.func.isRequired,
  sortingField: PropTypes.string.isRequired,
  sortingDirection: PropTypes.string.isRequired,
  changeSorting: PropTypes.func.isRequired,
};

OrganizationsList.defaultProps = {
  organizationsCount: 0,
  isLoading: false,
  organizations: [],
};

export default OrganizationsList;
