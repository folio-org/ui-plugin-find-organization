import { render } from '@folio/jest-config-stripes/testing-library/react';

import { organizationTypes } from 'fixtures';

import { FILTERS } from '../constants';
import { useTypes } from '../hooks';
import OrganizationsListFilter from './OrganizationsListFilter';

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useTypes: jest.fn(),
}));

const renderOrganizationsListFilter = (props) => (render(
  <OrganizationsListFilter
    activeFilters={{}}
    applyFilters={jest.fn}
    {...props}
  />,
));

describe('OrganizationsListFilter component', () => {
  beforeEach(() => {
    useTypes.mockClear().mockReturnValue({ organizationTypes });
  });

  it('should display filters', () => {
    const { getByText } = renderOrganizationsListFilter();

    expect(getByText('ui-organizations.filterConfig.vendorStatus')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.isVendor')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.isDonor')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.country')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.languages')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.paymentMethod')).toBeDefined();
  });

  it('should display donor-related filters', () => {
    const { getByText, queryByText } = renderOrganizationsListFilter({
      visibleFilters: [
        FILTERS.TAGS,
        FILTERS.TYPES,
        FILTERS.IS_VENDOR,
      ],
    });

    expect(getByText('stripes-acq-components.filter.tags')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.isVendor')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.types')).toBeDefined();

    expect(queryByText('ui-organizations.filterConfig.vendorStatus')).toBeNull();
    expect(queryByText('ui-organizations.filterConfig.isDonor')).toBeNull();
    expect(queryByText('ui-organizations.filterConfig.country')).toBeNull();
    expect(queryByText('ui-organizations.filterConfig.languages')).toBeNull();
    expect(queryByText('ui-organizations.filterConfig.paymentMethod')).toBeNull();
  });
});
