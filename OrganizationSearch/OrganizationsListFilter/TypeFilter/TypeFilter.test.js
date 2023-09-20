import { QueryClient, QueryClientProvider } from 'react-query';

import { screen, render } from '@folio/jest-config-stripes/testing-library/react';

import { organizationTypes } from 'fixtures';
import { useTypes } from '../../hooks';
import { TypeFilter } from './TypeFilter';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useTypes: jest.fn(),
}));

const queryClient = new QueryClient();

const defaultProps = {
  activeFilters: [],
  closedByDefault: true,
  disabled: false,
  id: 'types-filter',
  name: 'organizationTypes',
  labelId: 'labelId',
  onChange: jest.fn(),
};

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderFilter = (props = {}) => render(
  <TypeFilter
    {...defaultProps}
    {...props}
  />,
  { wrapper },
);

describe('TypeFilter component', () => {
  beforeEach(() => {
    useTypes
      .mockClear()
      .mockReturnValue({ organizationTypes, totalRecords: organizationTypes.length });
  });

  it('should display passed title', () => {
    renderFilter();

    expect(screen.getByText(defaultProps.labelId)).toBeDefined();
  });

  it('should be closed by default', () => {
    renderFilter();

    expect(screen.getByLabelText(`${defaultProps.labelId} filter list`).getAttribute('aria-expanded') || 'false').toBe('false');
  });

  it('should render all passed options', async () => {
    renderFilter();

    expect(document.querySelectorAll('#multiselect-option-list-types-filter > li').length).toEqual(2);
  });
});
