import React from 'react';
import { render, act } from '@testing-library/react';

import OrganizationsListContainer from './OrganizationsListContainer';

jest.mock('./OrganizationsList', () => {
  return () => <span>OrganizationsList</span>;
});

const renderOrganizationsListContainer = (mutator) => (render(
  <OrganizationsListContainer
    mutator={mutator}
    onSelectRow={jest.fn}
  />,
));

describe('OrganizationsListContainer component', () => {
  it('should not fetch organizations when plugin is open by default ', async () => {
    const mutator = {
      organizationsListOrgs: {
        GET: jest.fn(),
      },
    };

    await act(async () => {
      renderOrganizationsListContainer(mutator);
    });

    expect(mutator.organizationsListOrgs.GET).not.toHaveBeenCalled();
  });
});
