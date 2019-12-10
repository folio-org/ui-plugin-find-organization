import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Button, Icon } from '@folio/stripes/components';
import className from 'classnames';
import contains from 'dom-helpers/query/contains';

import css from './OrganizationSearch.css';
import OrganizationSearchModal from './OrganizationSearchModal';

class OrganizationSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalTrigger = React.createRef();
    this.modalRef = React.createRef();
  }

  getStyle() {
    const { marginBottom0, marginTop0 } = this.props;

    return className(
      css.searchControl,
      { [css.marginBottom0]: marginBottom0 },
      { [css.marginTop0]: marginTop0 },
    );
  }

  openModal() {
    this.setState({
      openModal: true,
    });
  }

  closeModal() {
    this.setState({
      openModal: false,
    }, () => {
      if (this.modalRef.current && this.modalTrigger.current) {
        if (contains(this.modalRef.current, document.activeElement)) {
          this.modalTrigger.current.focus();
        }
      }
    });
  }

  renderTriggerButton() {
    const {
      renderTrigger,
    } = this.props;

    return renderTrigger({
      buttonRef: this.modalTrigger,
      onClick: this.openModal,
    });
  }

  render() {
    const { id, buttonProps: { marginBottom0 }, renderTrigger } = this.props;

    return (
      <div className={this.getStyle()}>
        {renderTrigger ?
          this.renderTriggerButton() :
          <FormattedMessage id="ui-plugin-find-organization.searchButton.title">
            {ariaLabel => (
              <Button
                id={id}
                key="searchButton"
                buttonStyle={this.props.searchButtonStyle}
                marginBottom0={marginBottom0}
                onClick={this.openModal}
                aria-label={ariaLabel}
              >
                {this.props.searchLabel ? this.props.searchLabel : <Icon icon="search" color="#fff" />}
              </Button>
            )}
          </FormattedMessage>}
        <OrganizationSearchModal
          modalRef={this.modalRef}
          openWhen={this.state.openModal}
          closeCB={this.closeModal}
          {...this.props}
        />
      </div>
    );
  }
}

OrganizationSearch.defaultProps = {
  searchButtonStyle: 'primary noRightRadius',
  id: 'clickable-plugin-find-organization',
  buttonProps: {},
};

OrganizationSearch.propTypes = {
  buttonProps: PropTypes.shape({
    marginBottom0: PropTypes.bool,
  }),
  id: PropTypes.string,
  renderTrigger: PropTypes.func,
  searchLabel: PropTypes.node,
  searchButtonStyle: PropTypes.string,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
};

export default OrganizationSearch;
