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
  CREATED_BY: 'metadata.createdByUserId',
  DATE_CREATED: 'metadata.createdDate',
  DATE_UPDATED: 'metadata.updatedDate',
  IS_VENDOR: 'isVendor',
  IS_DONOR: 'isDonor',
  LANGUAGE: 'language',
  PAYMENT_METHOD: 'paymentMethod',
  STATUS: 'status',
  TAGS: 'tags',
  TYPES: 'organizationTypes',
  UPDATED_BY: 'metadata.updatedByUserId',
};

export const VISIBLE_FILTERS = Object.values(FILTERS);

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

export const VISIBLE_COLUMNS = ['name', 'code', 'description', 'status', 'isVendor'];
