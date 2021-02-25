import React from 'react';
import { render } from '@testing-library/react';

import OrganizationSearch from './OrganizationSearch';

jest.mock('./OrganizationSearchModal', () => {
  return () => <span>OrganizationSearchModal</span>;
});

const renderOrganizationSearch = (disabled = false) => (render(
  <OrganizationSearch disabled={disabled} />,
));

describe('OrganizationSearch component', () => {
  it('should display search organization button', () => {
    const { getByTestId } = renderOrganizationSearch();

    expect(getByTestId('open-organization-seach-modal-button')).toBeDefined();
  });

  it('should display disabled search organization button', () => {
    const { getByTestId } = renderOrganizationSearch(true);

    expect(getByTestId('open-organization-seach-modal-button')).toBeDisabled();
  });
});
