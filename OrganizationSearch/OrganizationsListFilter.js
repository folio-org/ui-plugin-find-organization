import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
} from '@folio/stripes/components';

import {
  AcqCheckboxFilter,
  AcqTagsFilter,
  CountryFilter,
  LanguageFilter,
  PAYMENT_METHOD_OPTIONS,
} from '@folio/stripes-acq-components';

import {
  FILTERS,
  BOOLEAN_OPTIONS,
  STATUS_OPTIONS,
} from './constants';

const applyFiltersAdapter = (applyFilters) => ({ name, values }) => applyFilters(name, values);

const OrganizationsListFilter = ({
  activeFilters,
  applyFilters,
}) => {
  const adaptedApplyFilters = useCallback(
    applyFiltersAdapter(applyFilters),
    [applyFilters],
  );

  return (
    <AccordionSet>
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.STATUS]}
        labelId="ui-organizations.filterConfig.vendorStatus"
        name={FILTERS.STATUS}
        onChange={adaptedApplyFilters}
        options={STATUS_OPTIONS}
        closedByDefault={false}
      />

      <AcqTagsFilter
        activeFilters={activeFilters[FILTERS.TAGS]}
        id={FILTERS.TAGS}
        name={FILTERS.TAGS}
        onChange={adaptedApplyFilters}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.IS_VENDOR]}
        labelId="ui-organizations.filterConfig.isVendor"
        name={FILTERS.IS_VENDOR}
        onChange={adaptedApplyFilters}
        options={BOOLEAN_OPTIONS}
      />

      <CountryFilter
        activeFilters={activeFilters[FILTERS.ADDRESS_COUNTRY]}
        labelId="ui-organizations.filterConfig.country"
        name={FILTERS.ADDRESS_COUNTRY}
        onChange={adaptedApplyFilters}
      />

      <LanguageFilter
        activeFilters={activeFilters[FILTERS.LANGUAGE]}
        labelId="ui-organizations.filterConfig.languages"
        name={FILTERS.LANGUAGE}
        onChange={adaptedApplyFilters}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.PAYMENT_METHOD]}
        labelId="ui-organizations.filterConfig.paymentMethod"
        name={FILTERS.PAYMENT_METHOD}
        onChange={adaptedApplyFilters}
        options={PAYMENT_METHOD_OPTIONS}
      />

    </AccordionSet>
  );
};

OrganizationsListFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  applyFilters: PropTypes.func.isRequired,
};

export default OrganizationsListFilter;
