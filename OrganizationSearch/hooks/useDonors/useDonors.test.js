import { QueryClient, QueryClientProvider } from 'react-query';

import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useDonors } from './useDonors';
import { DEFAULT_DONORS_QUERY } from './constants';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const org = { id: 'orgId', name: 'VENDOR' };

const getMock = jest.fn().mockReturnValue({
  json: () => ({ organizations: [org], totalRecords: 1 }),
});

describe('useDonors', () => {
  beforeEach(() => {
    getMock.mockClear();

    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: getMock,
      });
  });

  it('should make a get a request with default search params', async () => {
    const { result } = renderHook(() => useDonors(), { wrapper });

    await result.current.fetchDonors({ searchParams: {}, offset: 0, limit: 30 });

    expect(getMock).toHaveBeenCalledWith('organizations/organizations', {
      searchParams: {
        limit: 30,
        offset: 0,
        query: DEFAULT_DONORS_QUERY,
      },
    });
  });

  it('should make a get a request with filters', async () => {
    const { result } = renderHook(() => useDonors(), { wrapper });

    await result.current.fetchDonors({ searchParams: { isVendor: [true] }, offset: 0, limit: 30 });

    expect(getMock).toHaveBeenCalledWith(
      'organizations/organizations',
      {
        searchParams: {
          limit: 30,
          offset: 0,
          query: 'isVendor=("true") and status=="active" and isDonor=true',
        },
      },
    );
  });
});
