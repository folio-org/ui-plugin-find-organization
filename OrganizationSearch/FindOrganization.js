import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  FindRecords,
  PLUGIN_RESULT_COUNT_INCREMENT,
} from '@folio/stripes-acq-components';

import {
  DEFAULT_VISIBLE_COLUMNS,
  DONOR_COLUMNS,
} from './constants';
import {
  useDonors,
  useOrganizations,
} from './hooks';
import { OrganizationsListFilter } from './OrganizationsListFilter';
import {
  donorsSearchableIndexes,
  organizationSearchableIndexes,
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

  const visibleColumnsMemo = React.useMemo(() => {
    if (isDonorsEnabled) {
      return DONOR_COLUMNS;
    }

    return DEFAULT_VISIBLE_COLUMNS;
  }, [isDonorsEnabled]);

  const { fetchOrganizations } = useOrganizations();
  const { fetchDonors } = useDonors();

  const fetchRecords = isDonorsEnabled ? fetchDonors : fetchOrganizations;
  const searchableIndexes = isDonorsEnabled ? donorsSearchableIndexes : organizationSearchableIndexes;
  const modalLabel = isDonorsEnabled ? donorsModalLabel : defaultModalLabel;
  const resultsPaneTitle = isDonorsEnabled ? donorsResultsPaneTitle : defaultResultsPaneTitle;

  const refreshRecords = useCallback((filters) => {
    setIsLoading(true);

    setRecords([]);
    setTotalCount(0);
    setPagination(INIT_PAGINATION);
    setSearchParams(filters);

    fetchRecords({ ...INIT_PAGINATION, searchParams: filters })
      .then(({ organizations, totalRecords }) => {
        setTotalCount(totalRecords);
        setRecords(organizations);
      })
      .finally(() => setIsLoading(false));
  }, [fetchRecords]);

  const onNeedMoreData = useCallback((newPagination) => {
    setIsLoading(true);

    fetchRecords({ ...newPagination, searchParams })
      .then(({ organizations }) => {
        setPagination(newPagination);
        setRecords(organizations);
      })
      .finally(() => setIsLoading(false));
  }, [fetchRecords, searchParams]);

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
      resultsFormatter={resultsFormatter}
      resultsPaneTitle={resultsPaneTitle}
      searchableIndexes={searchableIndexes}
      selectRecords={selectRecord}
      totalCount={totalCount}
      visibleColumns={visibleColumnsMemo}
      isMultiSelect={isDonorsEnabled}
      {...rest}
    />
  );
};

FindOrganization.propTypes = {
  selectVendor: PropTypes.func.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string),
  isDonorsEnabled: PropTypes.bool,
};

FindOrganization.defaultProps = {
  isDonorsEnabled: false,
};
