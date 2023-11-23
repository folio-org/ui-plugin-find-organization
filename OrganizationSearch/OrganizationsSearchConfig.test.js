import { getSearchableIndexes } from './OrganizationsSearchConfig';

describe('OrganizationsSearchConfig', () => {
  it('should return non-protecred searchable indexes', () => {
    const stripesMock = { hasPerm: jest.fn(() => false) };

    expect(getSearchableIndexes(stripesMock).length).toEqual(7);
  });

  it('should return all searchable indexes (with protected)', () => {
    const stripesMock = { hasPerm: jest.fn(() => true) };

    expect(getSearchableIndexes(stripesMock).length).toEqual(8);
  });
});
