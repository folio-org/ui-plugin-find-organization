import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import OrganizationSearchModal from './OrganizationSearchModal';

jest.mock('./OrganizationsListContainer', () => {
  return () => <span>OrganizationsListContainer</span>;
});

const renderOrganizationSearchModal = (
  openWhen = true,
  closeCB = jest.fn(),
) => (render(
  <OrganizationSearchModal
    stripes={{ connect: component => component }}
    selectVendor={jest.fn}
    closeCB={closeCB}
    openWhen={openWhen}
  />,
));

describe('OrganizationSearchModal component', () => {
  it('should display Organization search modal', () => {
    const { getByText } = renderOrganizationSearchModal();

    expect(getByText('ui-plugin-find-organization.modal.label')).toBeDefined();
  });

  it('should not display Organization search modal', () => {
    const { queryByText } = renderOrganizationSearchModal(false);

    expect(queryByText('ui-plugin-find-organization.modal.label')).toBeNull();
  });

  describe('Close organization search modal', () => {
    it('should close organization search modal', () => {
      const closeCB = jest.fn();

      const { getByText } = renderOrganizationSearchModal(true, closeCB);

      user.click(getByText('Icon'));

      expect(closeCB).toHaveBeenCalled();
    });
  });
});
