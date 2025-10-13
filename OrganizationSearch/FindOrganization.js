import PropTypes from 'prop-types';
import { useState, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { useStripes } from '@folio/stripes/core';
import {
  FindRecords,
  PLUGIN_RESULT_COUNT_INCREMENT,
} from '@folio/stripes-acq-components';

import {
  VISIBLE_FILTERS,
  VISIBLE_COLUMNS,
} from './constants';
import { useOrganizations, useVisibleFilters } from './hooks';
import { OrganizationsListFilter } from './OrganizationsListFilter';
import { getSearchableIndexes } from './OrganizationsSearchConfig';

const INIT_PAGINATION = { limit: PLUGIN_RESULT_COUNT_INCREMENT, offset: 0 };

const idPrefix = 'ui-plugin-find-organization-';
const modalLabel = <FormattedMessage id="ui-plugin-find-organization.modal.label" />;
const resultsPaneTitle = <FormattedMessage id="ui-plugin-find-organization.meta.pluginTitle" />;

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

export const FindOrganization = ({
  isMultiSelect = false,
  selectVendor,
  tenantId,
  visibleFilters,
  hideFilters,
  ...rest
}) => {
  const stripes = useStripes();
  const [pagination, setPagination] = useState(INIT_PAGINATION);
  const [totalCount, setTotalCount] = useState(0);
  const [records, setRecords] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { fetchOrganizations } = useOrganizations({ tenantId });

  const searchableIndexes = useMemo(() => getSearchableIndexes(stripes), [stripes]);

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

  const computedVisibleFilters = useVisibleFilters(visibleFilters, hideFilters);

  const renderFilters = useCallback((activeFilters, applyFilters) => {
    return (
      <OrganizationsListFilter
        activeFilters={activeFilters}
        applyFilters={applyFilters}
        tenantId={tenantId}
        visibleFilters={computedVisibleFilters}
      />
    );
  }, [tenantId, computedVisibleFilters]);

  const selectRecord = useCallback((vendors) => {
    selectVendor(isMultiSelect ? vendors : vendors[0]);
  }, [isMultiSelect, selectVendor]);

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
      visibleColumns={VISIBLE_COLUMNS}
      isMultiSelect={isMultiSelect}
      {...rest}
    />
  );
};

FindOrganization.propTypes = {
  isMultiSelect: PropTypes.bool,
  selectVendor: PropTypes.func.isRequired,
  tenantId: PropTypes.string,
  // whitelist of available filters
  visibleFilters: PropTypes.arrayOf(
    PropTypes.oneOf(VISIBLE_FILTERS),
  ),
  // blacklist of available filters, only takes effect if visibleFilters is not provided
  hideFilters: PropTypes.arrayOf(
    PropTypes.oneOf(VISIBLE_FILTERS),
  ),
};
