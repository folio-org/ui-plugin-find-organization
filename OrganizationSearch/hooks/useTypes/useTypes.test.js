import { QueryClient, QueryClientProvider } from 'react-query';

import { renderHook, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { organizationTypes } from 'fixtures';
import { useTypes } from './useTypes';

const queryClient = new QueryClient();

const MOCK_TYPES = { organizationTypes };

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useTypes', () => {
  beforeEach(() => {
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: () => ({
          json: () => Promise.resolve({ organizationTypes: [MOCK_TYPES] }),
        }),
      });
  });

  it('should fetch all organization types', async () => {
    const { result } = renderHook(() => useTypes(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.organizationTypes).toEqual([MOCK_TYPES]);
  });
});
