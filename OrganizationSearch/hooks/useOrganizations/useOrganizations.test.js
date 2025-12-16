import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import {
  SEARCH_PARAMETER,
  VENDORS_API,
} from '@folio/stripes-acq-components';
import { NO_DST_TIMEZONES } from '@folio/stripes-acq-components/test/jest/fixtures';

import { useOrganizations } from './useOrganizations';
import { FILTERS } from '../../constants';

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
    useOkapiKy.mockReturnValue({ get: getMock });
    useStripes.mockReturnValue(stripesStub);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  describe('Datetime filters', () => {
    const dateTimeConfig = {
      from: '2014-07-14',
      to: '2020-07-14',
    };

    const expectedResultsDict = {
      [NO_DST_TIMEZONES.AFRICA_DAKAR]: {
        start: '2014-07-14T00:00:00.000',
        end: '2020-07-14T23:59:59.999',
      },
      [NO_DST_TIMEZONES.AMERICA_BOGOTA]: {
        start: '2014-07-14T05:00:00.000',
        end: '2020-07-15T04:59:59.999',
      },
      [NO_DST_TIMEZONES.ASIA_DUBAI]: {
        start: '2014-07-13T20:00:00.000',
        end: '2020-07-14T19:59:59.999',
      },
      [NO_DST_TIMEZONES.ASIA_SHANGHAI]: {
        start: '2014-07-13T16:00:00.000',
        end: '2020-07-14T15:59:59.999',
      },
      [NO_DST_TIMEZONES.ASIA_TOKIO]: {
        start: '2014-07-13T15:00:00.000',
        end: '2020-07-14T14:59:59.999',
      },
      [NO_DST_TIMEZONES.EUROPE_MOSCOW]: {
        start: '2014-07-13T20:00:00.000',
        end: '2020-07-14T20:59:59.999',
      },
      [NO_DST_TIMEZONES.PACIFIC_TAHITI]: {
        start: '2014-07-14T10:00:00.000',
        end: '2020-07-15T09:59:59.999',
      },
      [NO_DST_TIMEZONES.UTC]: {
        start: '2014-07-14T00:00:00.000',
        end: '2020-07-14T23:59:59.999',
      },
    };

    const datetimeFilters = [
      FILTERS.DATE_CREATED,
      FILTERS.DATE_UPDATED,
    ];

    describe.each(datetimeFilters)('Filter: %s', (filter) => {
      it.each(Object.keys(expectedResultsDict))('should properly apply filter for the timezone - %s', async (timezone) => {
        useStripes.mockReturnValue({
          ...stripesStub,
          timezone,
        });

        const { start, end } = expectedResultsDict[timezone];

        const { result } = renderHook(() => useOrganizations());

        await result.current.fetchOrganizations({
          searchParams: {
            [filter]: [dateTimeConfig.from, dateTimeConfig.to].join(':'),
          },
        });

        expect(getMock.mock.calls[0][1].searchParams.query).toContain(`(${filter}>="${start}" and ${filter}<="${end}")`);
      });
    });
  });
});
