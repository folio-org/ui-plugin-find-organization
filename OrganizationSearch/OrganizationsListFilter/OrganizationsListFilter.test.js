import { render } from '@folio/jest-config-stripes/testing-library/react';

import { organizationTypes } from 'fixtures';

import { FILTERS } from '../constants';
import { useTypes } from '../hooks';
import OrganizationsListFilter from './OrganizationsListFilter';

jest.mock('@folio/stripes-acq-components/lib/hooks', () => ({
  ...jest.requireActual('@folio/stripes-acq-components/lib/hooks'),
  useAcquisitionUnits: jest.fn(() => ({ acquisitionsUnits: [] })),
  useTagsConfigs: jest.fn(() => ({ configs: [], isFetched: true })),
  useTags: jest.fn(() => ({ tags: [] })),
  useUser: jest.fn(() => ({})),
}));
jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useTypes: jest.fn(() => ({ organizationTypes: [] })),
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
    useTypes
      .mockClear()
      .mockReturnValue({ organizationTypes });
  });

  it('should display filters', () => {
    const { getByText } = renderOrganizationsListFilter();

    expect(getByText('ui-organizations.filterConfig.vendorStatus')).toBeInTheDocument();
    expect(getByText('ui-organizations.filterConfig.isVendor')).toBeInTheDocument();
    expect(getByText('ui-organizations.filterConfig.isDonor')).toBeInTheDocument();
    expect(getByText('ui-organizations.filterConfig.country')).toBeInTheDocument();
    expect(getByText('ui-organizations.filterConfig.languages')).toBeInTheDocument();
    expect(getByText('ui-organizations.filterConfig.paymentMethod')).toBeInTheDocument();
  });

  it('should display donor-related filters', () => {
    const { getByText, queryByText } = renderOrganizationsListFilter({
      visibleFilters: [
        FILTERS.TAGS,
        FILTERS.TYPES,
        FILTERS.IS_VENDOR,
      ],
    });

    expect(getByText('stripes-acq-components.filter.tags')).toBeInTheDocument();
    expect(getByText('ui-organizations.filterConfig.isVendor')).toBeInTheDocument();
    expect(getByText('ui-organizations.filterConfig.types')).toBeInTheDocument();

    expect(queryByText('ui-organizations.filterConfig.vendorStatus')).toBeNull();
    expect(queryByText('ui-organizations.filterConfig.isDonor')).toBeNull();
    expect(queryByText('ui-organizations.filterConfig.country')).toBeNull();
    expect(queryByText('ui-organizations.filterConfig.languages')).toBeNull();
    expect(queryByText('ui-organizations.filterConfig.paymentMethod')).toBeNull();
  });
});
