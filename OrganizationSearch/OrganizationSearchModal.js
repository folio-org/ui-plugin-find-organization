import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Modal } from '@folio/stripes/components';

import Organizations from './OrganizationsListContainer';
import packageInfo from '../package';
import css from './OrganizationSearch.css';

export default class OrganizationSearchModal extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    selectVendor: PropTypes.func.isRequired,
    closeCB: PropTypes.func.isRequired,
    modalRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    onCloseModal: PropTypes.func,
    openWhen: PropTypes.bool,
    dataKey: PropTypes.string,
  }

  constructor(props) {
    super(props);

    const dataKey = props.dataKey;

    this.connectedApp = props.stripes.connect(Organizations, { dataKey });

    this.state = {
      error: null,
    };

    this.modalRef = props.modalRef || React.createRef();
    this.closeModal = this.closeModal.bind(this);
    this.passVendorOut = this.passVendorOut.bind(this);
  }

  closeModal() {
    this.props.closeCB();
    this.setState({
      error: null,
    });
  }

  passVendorOut(e, vendor) {
    this.props.selectVendor(vendor);

    if (!vendor.error) {
      this.closeModal();
    } else {
      this.setState({
        error: vendor.error,
      });
    }
  }

  render() {
    return (
      <Modal
        onClose={this.closeModal}
        size="large"
        open={this.props.openWhen}
        label={<FormattedMessage id="ui-plugin-find-organization.modal.label" />}
        contentClass={css.organizationSearchModalContent}
        enforceFocus={false}
        ref={this.modalRef}
        dismissible
      >
        <div className={css.organizationSearchModal}>
          {this.state.error ? <div className={css.organizationError}>{this.state.error}</div> : null}
          <this.connectedApp
            {...this.props}
            packageInfo={packageInfo}
            onSelectRow={this.passVendorOut}
            onComponentWillUnmount={this.props.onCloseModal}
            showSingleResult={false}
            browseOnly
          />
        </div>
      </Modal>
    );
  }
}
