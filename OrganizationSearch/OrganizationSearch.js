import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Button, Icon } from '@folio/stripes/components';
import className from 'classnames';

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
    });
  }

  render() {
    const { id, buttonProps } = this.props;

    return (
      <div className={this.getStyle()}>
        <FormattedMessage id="ui-plugin-find-organization.searchButton.title">
          {ariaLabel => (
            <Button
              id={id}
              key="searchButton"
              buttonStyle={this.props.searchButtonStyle}
              onClick={this.openModal}
              ariaLabel={ariaLabel}
              tabIndex="-1"
              {...buttonProps}
            >
              {this.props.searchLabel ? this.props.searchLabel : <Icon icon="search" color="#fff" />}
            </Button>
          )}
        </FormattedMessage>
        <OrganizationSearchModal
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
  buttonProps: {},
  id: 'clickable-plugin-find-organization',
};

OrganizationSearch.propTypes = {
  buttonProps: PropTypes.object,
  id: PropTypes.string,
  searchLabel: PropTypes.string,
  searchButtonStyle: PropTypes.string,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
};

export default OrganizationSearch;
