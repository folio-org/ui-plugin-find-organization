import { buildArrayFieldQuery } from '@folio/stripes-acq-components';

import { FILTERS } from './constants';

const indexesMap = {
  name: 'name',
  code: 'code',
  language: 'language',
  aliases: 'aliases',
  erpCode: 'erpCode',
  taxId: 'taxId',
  bankingAccountNumber: 'bankingInformation.bankAccountNumber',
};

const protectedIndexesMap = {
  [indexesMap.bankingAccountNumber]: 'ui-organizations.banking-information.view',
};

const indexes = Object.values(indexesMap);

const placeholderIdsMap = {
  [indexesMap.language]: 'ui-organizations.search.placeholder.language',
};

const KEYWORD_SEARCH_OPTION = {
  labelId: 'ui-organizations.search.keyword',
  value: '',
};

/**
 * @deprecated Use getSearchableIndexes(stripes) instead.
 */
export const searchableIndexes = [
  KEYWORD_SEARCH_OPTION,
  ...indexes.filter(sIndex => !protectedIndexesMap[sIndex]).map(index => ({
    labelId: `ui-organizations.search.${index}`,
    placeholderId: placeholderIdsMap[index],
    value: index,
  })),
];

const isSearchableIndexHidden = (stripes, sIndex) => Boolean(
  protectedIndexesMap[sIndex] && !stripes?.hasPerm(protectedIndexesMap[sIndex]),
);

export const getSearchableIndexes = (stripes) => [
  KEYWORD_SEARCH_OPTION,
  ...indexes.reduce((acc, sIndex) => {
    if (!isSearchableIndexHidden(stripes, sIndex)) {
      acc.push({
        labelId: `ui-organizations.search.${sIndex}`,
        placeholderId: placeholderIdsMap[sIndex],
        value: sIndex,
      });
    }

    return acc;
  }, []),

];

export const getKeywordQuery = (query, stripes) => indexes.reduce(
  (acc, sIndex) => {
    if (isSearchableIndexHidden(stripes, sIndex)) return acc;

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
