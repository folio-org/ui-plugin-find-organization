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
