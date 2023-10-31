import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  FindRecords,
  PLUGIN_RESULT_COUNT_INCREMENT,
} from '@folio/stripes-acq-components';

import {
  DEFAULT_DONOR_FILTERS,
  DEFAULT_VISIBLE_COLUMNS,
  DONOR_COLUMNS,
} from './constants';
import { useOrganizations } from './hooks';
import { OrganizationsListFilter } from './OrganizationsListFilter';
import {
  donorsSearchableIndexes,
  searchableIndexes as organizationSearchableIndexes,
} from './OrganizationsSearchConfig';

const INIT_PAGINATION = { limit: PLUGIN_RESULT_COUNT_INCREMENT, offset: 0 };

const idPrefix = 'ui-plugin-find-organization-';
const defaultModalLabel = <FormattedMessage id="ui-plugin-find-organization.modal.label" />;
const donorsModalLabel = <FormattedMessage id="ui-plugin-find-organization.donors.modal.label" />;
const defaultResultsPaneTitle = <FormattedMessage id="ui-plugin-find-organization.meta.pluginTitle" />;
const donorsResultsPaneTitle = <FormattedMessage id="ui-plugin-find-organization.donors.meta.pluginTitle" />;

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

export const FindOrganization = ({ selectVendor, isDonorsEnabled, ...rest }) => {
  const [pagination, setPagination] = useState(INIT_PAGINATION);
  const [totalCount, setTotalCount] = useState(0);
  const [records, setRecords] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { fetchOrganizations } = useOrganizations();

  const searchableIndexes = isDonorsEnabled ? donorsSearchableIndexes : organizationSearchableIndexes;
  const modalLabel = isDonorsEnabled ? donorsModalLabel : defaultModalLabel;
  const resultsPaneTitle = isDonorsEnabled ? donorsResultsPaneTitle : defaultResultsPaneTitle;
  const visibleColumns = isDonorsEnabled ? DONOR_COLUMNS : DEFAULT_VISIBLE_COLUMNS;
  const initialFilters = isDonorsEnabled ? DEFAULT_DONOR_FILTERS : {};

  const refreshRecords = useCallback((filters) => {
    setIsLoading(true);

    setRecords([]);
    setTotalCount(0);
    setPagination(INIT_PAGINATION);
    setSearchParams(filters);

    fetchOrganizations({ ...INIT_PAGINATION, searchParams: filters })
      .then(({ organizations, totalRecords }) => {
        setTotalCount(totalRecords);
        setRecords(organizations);
      })
      .finally(() => setIsLoading(false));
  }, [fetchOrganizations]);

  const onNeedMoreData = useCallback((newPagination) => {
    setIsLoading(true);

    fetchOrganizations({ ...newPagination, searchParams })
      .then(({ organizations }) => {
        setPagination(newPagination);
        setRecords(organizations);
      })
      .finally(() => setIsLoading(false));
  }, [fetchOrganizations, searchParams]);

  const renderFilters = useCallback((activeFilters, applyFilters) => {
    return (
      <OrganizationsListFilter
        activeFilters={activeFilters}
        applyFilters={applyFilters}
        isDonorsEnabled={isDonorsEnabled}
      />
    );
  }, [isDonorsEnabled]);

  const selectRecord = useCallback((vendors) => {
    selectVendor(isDonorsEnabled ? vendors : vendors[0]);
  }, [isDonorsEnabled, selectVendor]);

  return (
    <FindRecords
      columnMapping={columnMapping}
      idPrefix={idPrefix}
      isLoading={isLoading}
      modalLabel={modalLabel}
      onNeedMoreData={onNeedMoreData}
      pagination={pagination}
      records={records}
      refreshRecords={refreshRecords}
      renderFilters={renderFilters}
      initialFilters={initialFilters}
      resultsFormatter={resultsFormatter}
      resultsPaneTitle={resultsPaneTitle}
      searchableIndexes={searchableIndexes}
      selectRecords={selectRecord}
      totalCount={totalCount}
      visibleColumns={visibleColumns}
      isMultiSelect={isDonorsEnabled}
      {...rest}
    />
  );
};

FindOrganization.propTypes = {
  selectVendor: PropTypes.func.isRequired,
  isDonorsEnabled: PropTypes.bool,
};

FindOrganization.defaultProps = {
  isDonorsEnabled: false,
};
