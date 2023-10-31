import { render, act } from '@folio/jest-config-stripes/testing-library/react';
import {
  FindRecords,
  PLUGIN_RESULT_COUNT_INCREMENT,
} from '@folio/stripes-acq-components';

import { FindOrganization } from './FindOrganization';
import { useOrganizations } from './hooks';

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    FindRecords: jest.fn(() => <span>FindRecords</span>),
  };
});
jest.mock('./hooks', () => ({
  useOrganizations: jest.fn(),
}));

const renderFindOrganization = (props) => (render(
  <FindOrganization selectVendor={jest.fn()} {...props} />,
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

    expect(fetchOrganizationsMock).toHaveBeenCalledWith({
      limit: PLUGIN_RESULT_COUNT_INCREMENT,
      offset: 0,
      searchParams: filters,
    });
  });

  it('should call fetchOrganizations when onNeedMoreData is called', async () => {
    const fetchOrganizationsMock = jest.fn().mockReturnValue(Promise.resolve({ organizations: [], totalRecords: 0 }));

    useOrganizations.mockClear().mockReturnValue({ fetchOrganizations: fetchOrganizationsMock });
    renderFindOrganization();

    await act(async () => FindRecords.mock.calls[0][0].onNeedMoreData({
      limit: PLUGIN_RESULT_COUNT_INCREMENT,
      offset: 1,
    }));

    expect(fetchOrganizationsMock).toHaveBeenCalledWith({
      limit: PLUGIN_RESULT_COUNT_INCREMENT,
      offset: 1,
      searchParams: {},
    });
  });
});

describe('FindOrganization component with isDonorsEnabled', () => {
  beforeEach(() => {
    FindRecords.mockClear();

    useOrganizations.mockClear().mockReturnValue({ fetchOrganizations: jest.fn() });
  });

  it('should render FindRecords component with donors columns', async () => {
    const { getByText } = renderFindOrganization({ isDonorsEnabled: true });

    expect(getByText('FindRecords')).toBeDefined();
  });

  it('should call fetchDonors when onNeedMoreData is called', async () => {
    const fetchOrganizationMock = jest.fn().mockReturnValue(Promise.resolve({ organizations: [], totalRecords: 0 }));

    useOrganizations.mockClear().mockReturnValue({ fetchOrganizations: fetchOrganizationMock });
    renderFindOrganization({ isDonorsEnabled: true });

    await act(async () => FindRecords.mock.calls[0][0].onNeedMoreData({
      limit: PLUGIN_RESULT_COUNT_INCREMENT,
      offset: 1,
    }));

    expect(fetchOrganizationMock).toHaveBeenCalledWith({
      limit: PLUGIN_RESULT_COUNT_INCREMENT,
      offset: 1,
      searchParams: {},
    });
  });
});
