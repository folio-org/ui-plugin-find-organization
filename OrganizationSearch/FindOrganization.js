import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  FindRecords,
  PLUGIN_RESULT_COUNT_INCREMENT,
} from '@folio/stripes-acq-components';

import { OrganizationsListFilter } from './OrganizationsListFilter';
import { useOrganizations } from './hooks';

import { searchableIndexes } from './OrganizationsSearchConfig';

const INIT_PAGINATION = { limit: PLUGIN_RESULT_COUNT_INCREMENT, offset: 0 };

const idPrefix = 'ui-plugin-find-organization-';
const modalLabel = <FormattedMessage id="ui-plugin-find-organization.modal.label" />;
const resultsPaneTitle = <FormattedMessage id="ui-plugin-find-organization.meta.pluginTitle" />;

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

export const FindOrganization = ({ selectVendor, ...rest }) => {
  const [pagination, setPagination] = useState(INIT_PAGINATION);
  const [totalCount, setTotalCount] = useState(0);
  const [records, setRecords] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { fetchOrganizations } = useOrganizations();

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
      />
    );
  }, []);

  const selectRecord = useCallback((vendors) => {
    selectVendor(vendors[0]);
  }, [selectVendor]);

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
      resultsFormatter={resultsFormatter}
      resultsPaneTitle={resultsPaneTitle}
      searchableIndexes={searchableIndexes}
      selectRecords={selectRecord}
      totalCount={totalCount}
      visibleColumns={visibleColumns}
      {...rest}
    />
  );
};

FindOrganization.propTypes = {
  selectVendor: PropTypes.func.isRequired,
};
