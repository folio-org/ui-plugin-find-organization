import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { organizationTypes } from '../../../test/jest/fixtures';
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
    const { result, waitFor } = renderHook(() => useTypes(), { wrapper });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.organizationTypes).toEqual([MOCK_TYPES]);
  });
});
