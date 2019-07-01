import React, { Component } from 'react';
import Modal from '../../views/sharedLayout/modal/Modal';
import Aux from '../aux/Aux';
import { getDisplayName } from '../../../helpers';

export const withErrorHandler = (WrappedComponent, axios) => {
    class WithErrorHandler extends Component {

        state = {
            error: null
        }

        reqInterceptors = null;
        resInterceptors = null;

        componentDidMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptors = axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState({ error });
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
            this.state({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        isOpen={this.state.error}
                        onModalClose={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        };
    }

    WithErrorHandler.displayName = `withErrorHandler(${getDisplayName(WrappedComponent)})`;

    return WithErrorHandler;
};