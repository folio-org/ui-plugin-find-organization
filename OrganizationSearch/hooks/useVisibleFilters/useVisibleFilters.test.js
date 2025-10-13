import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { VISIBLE_FILTERS } from '../../constants';
import { useVisibleFilters } from './useVisibleFilters';

jest.mock('../../constants', () => ({
  VISIBLE_FILTERS: [
    'acqUnitIds',
    'addresses',
    'metadata.createdByUserId',
    'isVendor',
    'isDonor',
    'status',
    'tags',
  ],
}));

describe('useVisibleFilters', () => {
  it('should return custom visibleFilters when provided (whitelist)', () => {
    const customVisibleFilters = ['status', 'isVendor', 'isDonor'];
    const { result } = renderHook(() => useVisibleFilters(customVisibleFilters, null));

    expect(result.current).toEqual(customVisibleFilters);
  });

  it('should filter out hideFilters from VISIBLE_FILTERS (blacklist)', () => {
    const hideFilters = ['status', 'isVendor'];
    const { result } = renderHook(() => useVisibleFilters(null, hideFilters));

    const expectedFilters = VISIBLE_FILTERS.filter((f) => !hideFilters.includes(f));

    expect(result.current).toEqual(expectedFilters);
  });

  it('should return all VISIBLE_FILTERS when no parameters provided', () => {
    const { result } = renderHook(() => useVisibleFilters());

    expect(result.current).toEqual(VISIBLE_FILTERS);
  });
});
