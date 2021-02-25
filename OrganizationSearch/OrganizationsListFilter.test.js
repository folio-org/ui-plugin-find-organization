import React from 'react';
import { render } from '@testing-library/react';

import OrganizationsListFilter from './OrganizationsListFilter';

const renderOrganizationsListFilter = () => (render(
  <OrganizationsListFilter
    activeFilters={{}}
    applyFilters={jest.fn}
  />,
));

describe('OrganizationsListFilter component', () => {
  it('should display filters', () => {
    const { getByText } = renderOrganizationsListFilter();

    expect(getByText('ui-organizations.filterConfig.vendorStatus')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.isVendor')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.country')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.languages')).toBeDefined();
    expect(getByText('ui-organizations.filterConfig.paymentMethod')).toBeDefined();
  });
});
