import { useMemo } from 'react';
import { VISIBLE_FILTERS } from '../../constants';

export function useVisibleFilters(visibleFilters, hideFilters) {
  return useMemo(() => {
    if (visibleFilters) {
      return visibleFilters;
    }

    if (hideFilters) {
      return VISIBLE_FILTERS.filter((f) => !hideFilters.includes(f));
    }

    return VISIBLE_FILTERS;
  }, [visibleFilters, hideFilters]);
}
