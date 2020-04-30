import React from 'react';
import { FormattedMessage } from 'react-intl';

export const ORGANIZATION_STATUS = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
};

export const ORGANIZATION_STATUS_LABELS = {
  [ORGANIZATION_STATUS.active]: <FormattedMessage id="ui-organizations.organizationStatus.active" />,
  [ORGANIZATION_STATUS.inactive]: <FormattedMessage id="ui-organizations.organizationStatus.inactive" />,
  [ORGANIZATION_STATUS.pending]: <FormattedMessage id="ui-organizations.organizationStatus.pending" />,
};

export const FILTERS = {
  STATUS: 'status',
  TAGS: 'tags',
  ADDRESS_COUNTRY: 'addresses',
  LANGUAGE: 'language',
  PAYMENT_METHOD: 'paymentMethod',
  STATS_AVAILABLE: 'statsAvailable',
  IS_VENDOR: 'isVendor',
};

export const STATUS_OPTIONS = Object.values(ORGANIZATION_STATUS).map(status => ({
  value: status,
  label: ORGANIZATION_STATUS_LABELS[status],
}));

export const BOOLEAN_OPTIONS = [
  {
    value: 'true',
    label: <FormattedMessage id="ui-organizations.filterConfig.boolean.true" />,
  },
  {
    value: 'false',
    label: <FormattedMessage id="ui-organizations.filterConfig.boolean.false" />,
  },
];
