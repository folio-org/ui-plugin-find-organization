import React from 'react';
import { render } from '@testing-library/react';
import faker from 'faker';
import user from '@testing-library/user-event';

import OrganizationsList from './OrganizationsList';

jest.mock('./OrganizationsListFilter', () => {
  return () => <span>OrganizationsListFilter</span>;
});

jest.mock('react-virtualized-auto-sizer/dist/index.cjs', () => {
  return (props) => {
    const renderCallback = props.children;

    return renderCallback({
      width: 600,
      height: 400,
    });
  };
});

const generateOrgs = () => ({
  name: `${faker.company.companyName()}`,
  isVendor: faker.random.boolean(),
  status: 'Active',
});

const orgsCount = 5;
const orgs = [...Array(orgsCount)].map(() => generateOrgs());

const renderOrganizationsList = (
  organizations = orgs,
  organizationsCount = orgsCount,
  onSelectRow = jest.fn(),
) => (render(
  <OrganizationsList
    onNeedMoreData={jest.fn}
    organizations={organizations}
    organizationsCount={organizationsCount}
    onSelectRow={onSelectRow}
    filters={{}}
    searchQuery=""
    applyFilters={jest.fn}
    applySearch={jest.fn}
    changeSearch={jest.fn}
    resetFilters={jest.fn}
    searchIndex=""
    changeSearchIndex={jest.fn}
    sortingField="name"
    sortingDirection="ascending"
    changeSorting={jest.fn}
  />,
));

describe('OrganizationsList component', () => {
  it('should display title', () => {
    const { getByText } = renderOrganizationsList();

    expect(getByText('ui-organizations.meta.title')).toBeDefined();
  });

  it('should display search form', () => {
    const { getByText } = renderOrganizationsList();

    expect(getByText('stripes-components.searchFieldIndex')).toBeDefined();
  });

  it('should display organization list with passed names', () => {
    const { getByText } = renderOrganizationsList();

    orgs.forEach(({ name }) => {
      expect(getByText(name)).toBeDefined();
    });
  });

  it('should display no results message', () => {
    const { queryAllByText } = renderOrganizationsList([], 0);

    expect(queryAllByText('stripes-smart-components.sas.noResults.noTerms')).toBeDefined();
  });

  describe('Select organization', () => {
    it('should select organization', () => {
      const onSelectRow = jest.fn();

      const { getByText } = renderOrganizationsList(orgs, orgsCount, onSelectRow);

      user.click(getByText(orgs[0].name));

      expect(onSelectRow).toHaveBeenCalledTimes(1);
    });
  });
});
