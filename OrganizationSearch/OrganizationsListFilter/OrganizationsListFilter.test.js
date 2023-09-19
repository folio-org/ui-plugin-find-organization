import { render } from '@folio/jest-config-stripes/testing-library/react';

import { organizationTypes } from 'fixtures';
import { useTypes } from '../hooks';
import OrganizationsListFilter from './OrganizationsListFilter';

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useTypes: jest.fn(),
}));

const renderOrganizationsListFilter = () => (render(
  <OrganizationsListFilter
    activeFilters={{}}
    applyFilters={jest.fn}
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
    expect(getByText('ui-organizations.filterConfig.country')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.languages')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.paymentMethod')).toBeDefined();
  });
});
