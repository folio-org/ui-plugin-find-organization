import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import OrganizationSearch from './OrganizationSearch';

jest.mock('./OrganizationSearchModal', () => {
  return () => <span>OrganizationSearchModal</span>;
});

const renderOrganizationSearch = (
  disabled = false,
  renderTrigger,
) => (render(
  <OrganizationSearch
    disabled={disabled}
    renderTrigger={renderTrigger}
  />,
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

  it('should render trigger button', () => {
    const renderTrigger = jest.fn();

    renderOrganizationSearch(false, renderTrigger);

    expect(renderTrigger).toHaveBeenCalled();
  });

  it('should open organization search modal', () => {
    const { getByText, getByTestId } = renderOrganizationSearch();

    user.click(getByTestId('open-organization-seach-modal-button'));

    expect(getByText('OrganizationSearchModal')).toBeDefined();
  });
});
