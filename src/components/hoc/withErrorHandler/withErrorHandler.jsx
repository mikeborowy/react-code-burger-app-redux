import React, { Component } from 'react';
import Modal from '../../views/sharedLayout/modal/Modal';
import Aux from '../aux/Aux';
import { getDisplayName } from '../../../helpers';

export const withErrorHandler = (WrappedComponent, axios) => {
  class WithErrorHandler extends Component {
    state = {
      error: null,
    };

    reqInterceptors = null;

    resInterceptors = null;

    componentDidMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });
        return req;
      });

      this.resInterceptors = axios.interceptors.response.use(
        (res) => {
          return res;
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.request.eject(this.resInterceptors);
    }

    /**
     * HANDLERS
     * */

    errorConfirmedHandler = () => {
      this.state({
        error: null,
      });
    };

    render() {
      const { error } = this.state;
      return (
        <Aux>
          <Modal isOpen={error} onModalClose={this.errorConfirmedHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }

  WithErrorHandler.displayName = `withErrorHandler(${getDisplayName(WrappedComponent)})`;

  return WithErrorHandler;
};
