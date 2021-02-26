import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import OrganizationsListContainer from './OrganizationsListContainer';

jest.mock('./OrganizationsList', () => {
  // eslint-disable-next-line react/prop-types
  return ({ onNeedMoreData, applyFilters }) => (
    <>
      <button type="button" onClick={onNeedMoreData}>OnNeedMoreData</button>;
      <button type="button" onClick={() => applyFilters('status', ['Active'])}>applyFilters</button>;
    </>
  );
});

const renderOrganizationsListContainer = (mutator) => (render(
  <OrganizationsListContainer
    mutator={mutator}
    onSelectRow={jest.fn}
  />,
));

describe('OrganizationsListContainer component', () => {
  let mutator;

  beforeEach(() => {
    mutator = {
      organizationsListOrgs: {
        GET: jest.fn(() => Promise.resolve({ organizations: [], totalRecords: 0 })),
      },
    };
  });

  it('should not fetch organizations when plugin is open by default', async () => {
    await act(async () => {
      renderOrganizationsListContainer(mutator);
    });

    expect(mutator.organizationsListOrgs.GET).not.toHaveBeenCalled();
  });

  it('should not fetch organizations since filters were not applied', async () => {
    renderOrganizationsListContainer(mutator);

    await waitFor(() => {
      user.click(screen.getByText('OnNeedMoreData'));
    });

    expect(mutator.organizationsListOrgs.GET).not.toHaveBeenCalled();
  });

  it('should fetch organizations with applied Status filter', async () => {
    renderOrganizationsListContainer(mutator);

    await waitFor(() => {
      user.click(screen.getByText('applyFilters'));
    });

    expect(mutator.organizationsListOrgs.GET).toHaveBeenCalled();
  });
});
