import React from 'react';
import { render, act } from '@testing-library/react';

import { FindRecords } from '@folio/stripes-acq-components';

import { useOrganizations } from './hooks';
import { FindOrganization } from './FindOrganization';

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    FindRecords: jest.fn(() => <span>FindRecords</span>),
  };
});
jest.mock('./hooks', () => ({
  useOrganizations: jest.fn(),
}));

const renderFindOrganization = () => (render(
  <FindOrganization selectVendor={jest.fn()} />,
));

describe('FindOrganization component', () => {
  beforeEach(() => {
    FindRecords.mockClear();

    useOrganizations.mockClear().mockReturnValue({ fetchOrganizations: jest.fn() });
  });

  it('should render FindRecords component', async () => {
    const { getByText } = renderFindOrganization();

    expect(getByText('FindRecords')).toBeDefined();
  });

  it('should call fetchOrganizations when refreshRecords is called', async () => {
    const fetchOrganizationsMock = jest.fn().mockReturnValue(Promise.resolve({ organizations: [], totalRecords: 0 }));
    const filters = { status: 'Active' };

    useOrganizations.mockClear().mockReturnValue({ fetchOrganizations: fetchOrganizationsMock });
    renderFindOrganization();

    await act(async () => FindRecords.mock.calls[0][0].refreshRecords(filters));

    expect(fetchOrganizationsMock).toHaveBeenCalledWith({ limit: 30, offset: 0, searchParams: filters });
  });

  it('should call fetchOrganizations when onNeedMoreData is called', async () => {
    const fetchOrganizationsMock = jest.fn().mockReturnValue(Promise.resolve({ organizations: [], totalRecords: 0 }));

    useOrganizations.mockClear().mockReturnValue({ fetchOrganizations: fetchOrganizationsMock });
    renderFindOrganization();

    await act(async () => FindRecords.mock.calls[0][0].onNeedMoreData({ limit: 30, offset: 1 }));

    expect(fetchOrganizationsMock).toHaveBeenCalledWith({ limit: 30, offset: 1, searchParams: {} });
  });
});
