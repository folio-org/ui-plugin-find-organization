import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import {
  SEARCH_PARAMETER,
  VENDORS_API,
} from '@folio/stripes-acq-components';

import { useOrganizations } from './useOrganizations';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: jest.fn(),
  useStripes: jest.fn(),
}));

const org = { id: 'orgId', name: 'VENDOR' };

const getMock = jest.fn().mockReturnValue({
  json: () => ({ organizations: [org], totalRecords: 1 }),
});

const stripesStub = {
  hasPerm: jest.fn(() => true),
};

describe('useOrganizations', () => {
  beforeEach(() => {
    getMock.mockClear();
    stripesStub.hasPerm.mockClear();

    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: getMock,
      });
    useStripes
      .mockClear()
      .mockReturnValue(stripesStub);
  });

  it('should not make a get a request to fetch orgs when fetchOrganizations is called and without filters', async () => {
    const { result } = renderHook(() => useOrganizations());

    await result.current.fetchOrganizations({ searchParams: {}, offset: 0, limit: 30 });

    expect(getMock).not.toHaveBeenCalled();
  });

  it('should make a get a request to fetch orgs when fetchOrganizations is called and with filters', async () => {
    const { result } = renderHook(() => useOrganizations());

    await result.current.fetchOrganizations({ searchParams: { status: 'Active' }, offset: 0, limit: 30 });

    expect(getMock).toHaveBeenCalledWith(
      'organizations/organizations',
      {
        searchParams: {
          limit: 30,
          offset: 0,
          query: '(status=="Active") sortby name/sort.ascending',
        },
      },
    );
  });

  it('should return orgs when fetchOrganizations is called and with filters', async () => {
    const { result } = renderHook(() => useOrganizations());

    const { organizations } = await result.current.fetchOrganizations({ searchParams: { status: 'Active' }, offset: 0, limit: 30 });

    expect(organizations).toEqual([org]);
  });

  describe('Banking information', () => {
    const params = {
      searchParams: {
        [SEARCH_PARAMETER]: 'qwerty',
      },
    };

    it('should include banking information index in the query if a user has the appropriate permission', async () => {
      const { result } = renderHook(() => useOrganizations());

      await result.current.fetchOrganizations(params);

      expect(getMock).toHaveBeenCalledWith(VENDORS_API, expect.objectContaining({
        searchParams: expect.objectContaining({
          [SEARCH_PARAMETER]: expect.stringContaining('bankingInformation.bankAccountNumber="qwerty*"'),
        }),
      }));
    });

    it('should NOT include banking information index in the query if a user does not have the appropriate permission', async () => {
      stripesStub.hasPerm.mockReturnValue(false);

      const { result } = renderHook(() => useOrganizations());

      await result.current.fetchOrganizations(params);

      expect(getMock).toHaveBeenCalledWith(VENDORS_API, expect.objectContaining({
        searchParams: expect.objectContaining({
          [SEARCH_PARAMETER]: expect.not.stringContaining('bankingInformation.bankAccountNumber="qwerty*"'),
        }),
      }));
    });
  });
});
