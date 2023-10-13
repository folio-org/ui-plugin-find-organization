import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
} from '@folio/stripes/components';

import {
  AcqCheckboxFilter,
  AcqTagsFilter,
  AcqUnitFilter,
  CountryFilter,
  LanguageFilter,
  PAYMENT_METHOD_OPTIONS,
} from '@folio/stripes-acq-components';

import {
  FILTERS,
  BOOLEAN_OPTIONS,
  STATUS_OPTIONS,
} from '../constants';
import { TypeFilter } from './TypeFilter';

const applyFiltersAdapter = (applyFilters) => ({ name, values }) => applyFilters(name, values);

const OrganizationsListFilter = ({
  activeFilters,
  applyFilters,
  disabled,
}) => {
  const adaptedApplyFilters = useCallback(
    applyFiltersAdapter(applyFilters),
    [applyFilters],
  );

  return (
    <AccordionSet>
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.STATUS]}
        disabled={disabled}
        labelId="ui-organizations.filterConfig.vendorStatus"
        name={FILTERS.STATUS}
        onChange={adaptedApplyFilters}
        options={STATUS_OPTIONS}
        closedByDefault={false}
      />

      <TypeFilter
        activeFilters={activeFilters[FILTERS.TYPES]}
        disabled={disabled}
        id={`org-filter-${FILTERS.TYPES}`}
        name={FILTERS.TYPES}
        onChange={adaptedApplyFilters}
      />

      <AcqTagsFilter
        activeFilters={activeFilters[FILTERS.TAGS]}
        disabled={disabled}
        id={FILTERS.TAGS}
        name={FILTERS.TAGS}
        onChange={adaptedApplyFilters}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.IS_DONOR]}
        disabled={disabled}
        labelId="ui-organizations.filterConfig.isDonor"
        name={FILTERS.IS_DONOR}
        onChange={adaptedApplyFilters}
        options={BOOLEAN_OPTIONS}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.IS_VENDOR]}
        disabled={disabled}
        labelId="ui-organizations.filterConfig.isVendor"
        name={FILTERS.IS_VENDOR}
        onChange={adaptedApplyFilters}
        options={BOOLEAN_OPTIONS}
      />

      <CountryFilter
        id="plugin-country-filter"
        activeFilters={activeFilters[FILTERS.ADDRESS_COUNTRY]}
        disabled={disabled}
        labelId="ui-organizations.filterConfig.country"
        name={FILTERS.ADDRESS_COUNTRY}
        onChange={adaptedApplyFilters}
      />

      <LanguageFilter
        id="plugin-language-filter"
        activeFilters={activeFilters[FILTERS.LANGUAGE]}
        disabled={disabled}
        labelId="ui-organizations.filterConfig.languages"
        name={FILTERS.LANGUAGE}
        onChange={adaptedApplyFilters}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.PAYMENT_METHOD]}
        disabled={disabled}
        labelId="ui-organizations.filterConfig.paymentMethod"
        name={FILTERS.PAYMENT_METHOD}
        onChange={adaptedApplyFilters}
        options={PAYMENT_METHOD_OPTIONS}
      />

      <AcqUnitFilter
        id={`org-filter-${FILTERS.ACQUISITIONS_UNIT}`}
        activeFilters={activeFilters[FILTERS.ACQUISITIONS_UNIT]}
        disabled={disabled}
        name={FILTERS.ACQUISITIONS_UNIT}
        onChange={adaptedApplyFilters}
      />
    </AccordionSet>
  );
};

OrganizationsListFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  applyFilters: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default OrganizationsListFilter;
