import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import OrganizationSearchModal from './OrganizationSearchModal';

jest.mock('./OrganizationsListContainer', () => {
  // eslint-disable-next-line react/prop-types
  return ({ onSelectRow }) => (
    <>
      <button
        type="button"
        onClick={() => onSelectRow({}, {})}
      >
        SelectVendor
      </button>
      <button
        type="button"
        onClick={() => onSelectRow({}, { error: 'Error' })}
      >
        SelectVendorWithError
      </button>
    </>
  );
});

const onCloseCB = jest.fn();
const onSelectVendor = jest.fn();

const renderOrganizationSearchModal = (
  openWhen = true,
  closeCB = onCloseCB,
  selectVendor = onSelectVendor,
) => (render(
  <OrganizationSearchModal
    stripes={{ connect: component => component }}
    selectVendor={selectVendor}
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
      const { getByText } = renderOrganizationSearchModal(true, onCloseCB);

      user.click(getByText('Icon'));

      expect(onCloseCB).toHaveBeenCalled();
    });
  });

  describe('Select organization', () => {
    it('should select organization and close modal', () => {
      const { getByText } = renderOrganizationSearchModal(true, onCloseCB, onSelectVendor);

      user.click(getByText('SelectVendor'));

      expect(onSelectVendor).toHaveBeenCalled();
      expect(onCloseCB).toHaveBeenCalled();
    });

    it('should select organization with error', () => {
      const { getByText } = renderOrganizationSearchModal(true, onCloseCB, onSelectVendor);

      user.click(getByText('SelectVendorWithError'));

      expect(onSelectVendor).toHaveBeenCalled();
      expect(getByText('Error')).toBeDefined();
    });
  });
});
