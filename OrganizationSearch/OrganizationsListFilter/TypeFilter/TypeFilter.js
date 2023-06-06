import PropTypes from 'prop-types';

import { MultiSelectionFilter } from '@folio/stripes/smart-components';
import { FilterAccordion } from '@folio/stripes-acq-components';

import { useTypes } from '../../hooks';

export const TypeFilter = ({
  activeFilters,
  closedByDefault,
  disabled,
  id,
  labelId,
  name,
  onChange,
}) => {
  const { organizationTypes } = useTypes();

  const types = organizationTypes?.map(type => ({
    label: type.name,
    value: type.id,
  }));

  return (
    <FilterAccordion
      activeFilters={activeFilters}
      closedByDefault={closedByDefault}
      disabled={disabled}
      id={id}
      labelId={labelId}
      name={name}
      onChange={onChange}
    >
      <MultiSelectionFilter
        ariaLabelledBy={`accordion-toggle-button-${id}`}
        dataOptions={types}
        disabled={disabled}
        id="types-filter"
        name={name}
        onChange={onChange}
        selectedValues={activeFilters}
      />
    </FilterAccordion>
  );
};

TypeFilter.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  closedByDefault: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelId: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TypeFilter.defaultProps = {
  closedByDefault: true,
  disabled: false,
  labelId: 'ui-organizations.filterConfig.types',
};
