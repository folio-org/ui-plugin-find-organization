import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  AcqCheckboxFilter,
  AcqDateRangeFilter,
  AcqTagsFilter,
  AcqUnitFilter,
  CountryFilter,
  LanguageFilter,
  PAYMENT_METHOD_OPTIONS,
  PluggableUserFilter,
} from '@folio/stripes-acq-components';
import { AccordionSet } from '@folio/stripes/components';

import {
  FILTERS,
  BOOLEAN_OPTIONS,
  STATUS_OPTIONS,
  VISIBLE_FILTERS,
} from '../constants';
import { TypeFilter } from './TypeFilter';

const applyFiltersAdapter = (applyFilters) => ({ name, values }) => applyFilters(name, values);

const OrganizationsListFilter = ({
  activeFilters,
  applyFilters,
  disabled,
  tenantId,
  visibleFilters = VISIBLE_FILTERS,
}) => {
  const adaptedApplyFilters = useCallback((data) => applyFiltersAdapter(applyFilters)(data), [applyFilters]);

  const availableFilters = useMemo(() => [
    {
      key: FILTERS.STATUS,
      component: (
        <AcqCheckboxFilter
          activeFilters={activeFilters[FILTERS.STATUS]}
          disabled={disabled}
          labelId="ui-organizations.filterConfig.vendorStatus"
          name={FILTERS.STATUS}
          onChange={adaptedApplyFilters}
          options={STATUS_OPTIONS}
          closedByDefault={false}
        />
      ),
    },
    {
      key: FILTERS.TYPES,
      component: (
        <TypeFilter
          activeFilters={activeFilters[FILTERS.TYPES]}
          disabled={disabled}
          id={`org-filter-${FILTERS.TYPES}`}
          name={FILTERS.TYPES}
          onChange={adaptedApplyFilters}
          tenantId={tenantId}
        />
      ),
    },
    {
      key: FILTERS.TAGS,
      component: (
        <AcqTagsFilter
          activeFilters={activeFilters[FILTERS.TAGS]}
          disabled={disabled}
          id={FILTERS.TAGS}
          name={FILTERS.TAGS}
          onChange={adaptedApplyFilters}
          tenantId={tenantId}
        />
      ),
    },
    {
      key: FILTERS.IS_DONOR,
      component: (
        <AcqCheckboxFilter
          activeFilters={activeFilters[FILTERS.IS_DONOR]}
          disabled={disabled}
          labelId="ui-organizations.filterConfig.isDonor"
          name={FILTERS.IS_DONOR}
          onChange={adaptedApplyFilters}
          options={BOOLEAN_OPTIONS}
        />
      ),
    },
    {
      key: FILTERS.IS_VENDOR,
      component: (
        <AcqCheckboxFilter
          activeFilters={activeFilters[FILTERS.IS_VENDOR]}
          disabled={disabled}
          labelId="ui-organizations.filterConfig.isVendor"
          name={FILTERS.IS_VENDOR}
          onChange={adaptedApplyFilters}
          options={BOOLEAN_OPTIONS}
        />
      ),
    },
    {
      key: FILTERS.ADDRESS_COUNTRY,
      component: (
        <CountryFilter
          id="plugin-country-filter"
          activeFilters={activeFilters[FILTERS.ADDRESS_COUNTRY]}
          disabled={disabled}
          labelId="ui-organizations.filterConfig.country"
          name={FILTERS.ADDRESS_COUNTRY}
          onChange={adaptedApplyFilters}
        />
      ),
    },
    {
      key: FILTERS.LANGUAGE,
      component: (
        <LanguageFilter
          id="plugin-language-filter"
          activeFilters={activeFilters[FILTERS.LANGUAGE]}
          disabled={disabled}
          labelId="ui-organizations.filterConfig.languages"
          name={FILTERS.LANGUAGE}
          onChange={adaptedApplyFilters}
        />
      ),
    },
    {
      key: FILTERS.PAYMENT_METHOD,
      component: (
        <AcqCheckboxFilter
          activeFilters={activeFilters[FILTERS.PAYMENT_METHOD]}
          disabled={disabled}
          labelId="ui-organizations.filterConfig.paymentMethod"
          name={FILTERS.PAYMENT_METHOD}
          onChange={adaptedApplyFilters}
          options={PAYMENT_METHOD_OPTIONS}
        />
      ),
    },
    {
      key: FILTERS.ACQUISITIONS_UNIT,
      component: (
        <AcqUnitFilter
          id={`org-filter-${FILTERS.ACQUISITIONS_UNIT}`}
          activeFilters={activeFilters[FILTERS.ACQUISITIONS_UNIT]}
          disabled={disabled}
          name={FILTERS.ACQUISITIONS_UNIT}
          onChange={adaptedApplyFilters}
          tenantId={tenantId}
        />
      ),
    },
    {
      key: FILTERS.CREATED_BY,
      component: (
        <PluggableUserFilter
          id={FILTERS.CREATED_BY}
          activeFilters={activeFilters[FILTERS.CREATED_BY]}
          labelId="ui-organizations.filterConfig.createdBy"
          name={FILTERS.CREATED_BY}
          onChange={adaptedApplyFilters}
          disabled={disabled}
          tenantId={tenantId}
        />
      ),
    },
    {
      key: FILTERS.DATE_CREATED,
      component: (
        <AcqDateRangeFilter
          id={FILTERS.DATE_CREATED}
          activeFilters={activeFilters[FILTERS.DATE_CREATED]}
          disabled={disabled}
          labelId="ui-organizations.filterConfig.dateCreated"
          name={FILTERS.DATE_CREATED}
          onChange={adaptedApplyFilters}
        />
      ),
    },
    {
      key: FILTERS.UPDATED_BY,
      component: (
        <PluggableUserFilter
          id={FILTERS.UPDATED_BY}
          activeFilters={activeFilters[FILTERS.UPDATED_BY]}
          labelId="ui-organizations.filterConfig.updatedBy"
          name={FILTERS.UPDATED_BY}
          onChange={adaptedApplyFilters}
          disabled={disabled}
          tenantId={tenantId}
        />
      ),
    },
    {
      key: FILTERS.DATE_UPDATED,
      component: (
        <AcqDateRangeFilter
          id={FILTERS.DATE_UPDATED}
          activeFilters={activeFilters[FILTERS.DATE_UPDATED]}
          labelId="ui-organizations.filterConfig.dateUpdated"
          name={FILTERS.DATE_UPDATED}
          onChange={adaptedApplyFilters}
          disabled={disabled}
        />
      ),
    },
  ], [activeFilters, adaptedApplyFilters, disabled, tenantId]);

  const renderFilters = useCallback(() => {
    return availableFilters
      .filter(({ key }) => visibleFilters.includes(key))
      .map(({ component, key }) => (
        <React.Fragment key={key}>
          {component}
        </React.Fragment>
      ));
  }, [availableFilters, visibleFilters]);

  return (
    <AccordionSet>
      {renderFilters()}
    </AccordionSet>
  );
};

OrganizationsListFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  applyFilters: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  tenantId: PropTypes.string,
  visibleFilters: PropTypes.arrayOf(PropTypes.string),
};

export default OrganizationsListFilter;
