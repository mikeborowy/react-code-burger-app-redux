import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
    onAuthStartAPI,
    onAuthStart,
    onAuthSuccess,
    onAuthFail,
} from '../../../store/reducers/auth';
import Input from '../../common/input/Input';
import Button from '../../common/buttons/button/Button';
import Spinner from '../../common/spinner/Spinner';
import classes from './Auth.css';
import { BUTTONS } from '../../../constants/buttons';
import { INPUTS } from '../../../constants/inputs';
import { AUTH_STATUS } from '../../../constants/auth';
import { checkValidity } from '../../../helpers';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: INPUTS.INPUT,
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: INPUTS.INPUT,
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            // this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = ( evt, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: evt.target.value,
                valid: checkValidity( evt.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuthStartAPI( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                onChange={( evt ) => this.inputChangedHandler( evt, formElement.id )} />
        ) );

        if (this.props.isLoading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType={BUTTONS.SUCCESS}>SUBMIT</Button>
                </form>
                <Button
                    onClick={this.switchAuthModeHandler}
                    btnType={BUTTONS.DANGER}>SWITCH TO {this.state.isSignup ? AUTH_STATUS.SIGNIN : AUTH_STATUS.SIGNUP}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        // isAuthenticated: state.auth.token !== null,
        // buildingBurger: state.burgerBuilder.building,
        // authRedirectPath: state.auth.authRedirectPath
    };
};

// return {
//     onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
//     onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
// };

const mapDispatchToProps = dispatch => bindActionCreators({
    onAuthStartAPI,
    onAuthStart,
    onAuthSuccess,
    onAuthFail,
}, dispatch);

export default connect( mapStateToProps, mapDispatchToProps )( Auth );