import { render, act } from '@folio/jest-config-stripes/testing-library/react';
import {
  FindRecords,
  PLUGIN_RESULT_COUNT_INCREMENT,
} from '@folio/stripes-acq-components';

import { FindOrganization } from './FindOrganization';
import { useOrganizations } from './hooks';
import { FILTERS } from './constants';

const mockVendors = [
  {
    id: '1',
    name: 'Amazon',
    code: 'AM',
  },
  {
    id: '2',
    name: 'Baker & Taylor',
    code: 'BT',
  },
];

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    FindRecords: jest.fn(() => <span>FindRecords</span>),
  };
});
jest.mock('./hooks', () => ({
  useOrganizations: jest.fn(),
}));

const fetchOrganizationsMock = jest.fn().mockReturnValue(Promise.resolve({
  organizations: [],
  totalRecords: 0,
}));

const renderFindOrganization = (props) => (render(
  <FindOrganization selectVendor={jest.fn()} {...props} />,
));

describe('FindOrganization component', () => {
  beforeEach(() => {
    FindRecords.mockClear();

    useOrganizations.mockClear().mockReturnValue({ fetchOrganizations: fetchOrganizationsMock });
  });

  it('should render FindRecords component', async () => {
    const { getByText } = renderFindOrganization();

    expect(getByText('FindRecords')).toBeDefined();
  });

  it('should call fetchOrganizations when refreshRecords is called', async () => {
    const filters = { status: 'Active' };

    renderFindOrganization();

    await act(async () => FindRecords.mock.calls[0][0].refreshRecords(filters));

    expect(fetchOrganizationsMock).toHaveBeenCalledWith({
      limit: PLUGIN_RESULT_COUNT_INCREMENT,
      offset: 0,
      searchParams: filters,
    });
  });

  it('should call fetchOrganizations when onNeedMoreData is called', async () => {
    const selectVendor = jest.fn();

    renderFindOrganization({
      selectVendor,
      isMultiSelect: false,
    });

    await act(async () => FindRecords.mock.calls[0][0].onNeedMoreData({
      limit: PLUGIN_RESULT_COUNT_INCREMENT,
      offset: 1,
    }));

    await act(async () => FindRecords.mock.calls[0][0].selectRecords(mockVendors));

    expect(selectVendor).toHaveBeenCalledWith(mockVendors[0]);
    expect(fetchOrganizationsMock).toHaveBeenCalledWith({
      limit: PLUGIN_RESULT_COUNT_INCREMENT,
      offset: 1,
      searchParams: {},
    });
  });

  it('should call fetchDonors when onNeedMoreData is called', async () => {
    const selectVendor = jest.fn();

    renderFindOrganization({
      isMultiSelect: true,
      visibleFilters: [
        FILTERS.TAGS,
        FILTERS.TYPES,
        FILTERS.IS_VENDOR,
      ],
      selectVendor,
    });

    await act(async () => FindRecords.mock.calls[0][0].selectRecords(mockVendors));

    expect(selectVendor).toHaveBeenCalledWith(mockVendors);
  });
});
