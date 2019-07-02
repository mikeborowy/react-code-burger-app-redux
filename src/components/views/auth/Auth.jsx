import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  onAuthStartAPI,
  onAuthStart,
  onAuthSuccess,
  onAuthFail,
  onSetAuthRedirectPath,
} from '../../../store/reducers/auth';
import Input from '../../common/input/Input';
import Button from '../../common/buttons/button/Button';
import Spinner from '../../common/spinner/Spinner';
import classes from './Auth.css';
import { BUTTONS } from '../../../constants/buttons';
import { INPUTS } from '../../../constants/inputs';
import { AUTH_STATUS } from '../../../constants/auth';
import { checkValidity } from '../../../helpers';

class AuthComponent extends Component {
  state = {
    controls: {
      email: {
        elementType: INPUTS.INPUT,
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: INPUTS.INPUT,
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  componentDidMount() {
    const { authRedirectPath, isBuilding, onSetAuthRedirectPath } = this.props;

    if (!isBuilding && authRedirectPath !== '/') {
      onSetAuthRedirectPath('/');
    }
  }

  inputChangedHandler = (evt, controlName) => {
    const { controls } = this.state;
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: evt.target.value,
        valid: checkValidity(evt.target.value, controls[controlName].validation),
        touched: true,
      },
    };
    this.setState({
      controls: updatedControls,
    });
  };

  submitHandler = (event) => {
    const { isAuth, onAuthStartAPI } = this.props;
    const { controls } = this.state;
    event.preventDefault();
    onAuthStartAPI(controls.email.value, controls.password.value, isAuth);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    const { isLoading, error, isAuth, authRedirectPath } = this.props;
    const { controls } = this.state;
    const formElementsArray = [];
    for (const key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          onChange={(evt) => {
            return this.inputChangedHandler(evt, formElement.id);
          }}
        />
      );
    });

    if (isLoading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (error) {
      errorMessage = <p>{error.message}</p>;
    }

    let authRedirect = null;

    if (isAuth) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType={BUTTONS.SUCCESS}>SUBMIT</Button>
        </form>
        <Button onClick={this.switchAuthModeHandler} btnType={BUTTONS.DANGER}>
          SWITCH TO {isAuth ? AUTH_STATUS.SIGNIN : AUTH_STATUS.SIGNUP}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    isBuilding: state.burger.isBuilding,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onAuthStartAPI,
      onAuthStart,
      onAuthSuccess,
      onAuthFail,
      onSetAuthRedirectPath,
    },
    dispatch
  );
};

export const Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);
