import { useMemo } from 'react';
import { VISIBLE_FILTERS } from '../../constants';

export function useVisibleFilters(visibleFilters, hiddenFilters) {
  return useMemo(() => {
    if (visibleFilters) {
      return visibleFilters;
    }

    if (hiddenFilters) {
      return VISIBLE_FILTERS.filter((f) => !hiddenFilters.includes(f));
    }

    return VISIBLE_FILTERS;
  }, [visibleFilters, hiddenFilters]);
}
