import { buildArrayFieldQuery } from '@folio/stripes-acq-components';

import { FILTERS } from './constants';

const indexesMap = {
  name: 'name',
  code: 'code',
  language: 'language',
  aliases: 'aliases',
  erpCode: 'erpCode',
  taxId: 'taxId',
};

const indexes = Object.values(indexesMap);

const placeholderIdsMap = {
  [indexesMap.language]: 'ui-organizations.search.placeholder.language',
};

export const searchableIndexes = [
  {
    labelId: 'ui-organizations.search.keyword',
    value: '',
  },
  ...indexes.map(index => ({
    labelId: `ui-organizations.search.${index}`,
    placeholderId: placeholderIdsMap[index],
    value: index,
  })),
];

export const getKeywordQuery = query => indexes.reduce(
  (acc, sIndex) => {
    if (acc) {
      return `${acc} or ${sIndex}="${query}*"`;
    } else {
      return `${sIndex}="${query}*"`;
    }
  },
  '',
);

export const filterMap = {
  [FILTERS.ADDRESS_COUNTRY]: (filterValue) => `${FILTERS.ADDRESS_COUNTRY}=country:${filterValue}`,
  [FILTERS.ACQUISITIONS_UNIT]: buildArrayFieldQuery.bind(null, [FILTERS.ACQUISITIONS_UNIT]),
  [FILTERS.TAGS]: buildArrayFieldQuery.bind(null, [FILTERS.TAGS]),
  [FILTERS.TYPES]: buildArrayFieldQuery.bind(null, [FILTERS.TYPES]),
};
