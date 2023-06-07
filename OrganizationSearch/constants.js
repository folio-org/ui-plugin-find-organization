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
  ACQUISITIONS_UNIT: 'acqUnitIds',
  ADDRESS_COUNTRY: 'addresses',
  IS_VENDOR: 'isVendor',
  LANGUAGE: 'language',
  PAYMENT_METHOD: 'paymentMethod',
  STATUS: 'status',
  TAGS: 'tags',
  TYPES: 'organizationTypes',
};

export const STATUS_OPTIONS = Object.values(ORGANIZATION_STATUS).map(status => ({
  value: status,
  label: ORGANIZATION_STATUS_LABELS[status],
}));

export const BOOLEAN_OPTIONS = [
  {
    value: 'true',
    label: <FormattedMessage id="stripes-acq-components.filter.true" />,
  },
  {
    value: 'false',
    label: <FormattedMessage id="stripes-acq-components.filter.false" />,
  },
];
