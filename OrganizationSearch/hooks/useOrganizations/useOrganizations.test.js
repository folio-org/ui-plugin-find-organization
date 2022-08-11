import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
  useOkapiKy,
} from '@folio/stripes/core';

import { useOrganizations } from './useOrganizations';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: jest.fn(),
}));

const org = { id: 'orgId', name: 'VENDOR' };

const getMock = jest.fn().mockReturnValue({
  json: () => ({ organizations: [org], totalRecords: 1 }),
});

describe('useOrganizations', () => {
  beforeEach(() => {
    getMock.mockClear();

    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: getMock,
      });
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
});
