import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    onAddIngredient,
    onRemoveIngredient,
    onGetIngredientsAPI
} from '../../../store/reducers/burger';
// HOC
import Aux from '../../hoc/aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// COMPONENTS
import Spinner from '../../common/spinner/Spinner';
import Burger from '../../common/burger/Burger';
import BuildControls from '../burgerBuilder/buildControls/BuildControls';
import Modal from '../../sharedLayout/modal/Modal';
import OrderModal from './orderModal/OrderModal';
// CONST/ENUMS

import { ROUTES } from '../../../constants/routes';
// API
import { burgerAPI } from '../../../services/api/index';

class BurgerBuilder extends Component {

    state = {
        isPurchasing: false,
        isLoading: false
    }

    componentDidMount() {
        this.props.onGetIngredientsAPI();
    }

    /**
     * HANDLERS
     */

    purchasingHandler = () => {
        this.setState({ isPurchasing: true })
    };

    purchaseContinuedHandler = () => {
        this.props.history.push(ROUTES.CHECKOUT.LINK);
    };

    purchaseCanceldHandler = () => {
        this.setState({ isPurchasing: false })
    };

    /**
     * HELPERS
     */

    updatePurchaseHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
            .reduce((sum, item) => sum + item, 0);
        return sum > 0;
    }

    chckIfDisabled = () => {
        const disabledInfo = { ...this.props.ingredients };
        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
        }

        return disabledInfo;
    }

    /**
     * RENDERERS
     */

    renderSummaryModal = () => {
        const {
            ingredients,
            totalPrice
        } = this.props;

        const orderModalProps = {
            ingredients,
            totalPrice,
            onPurchaseContinue: this.purchaseContinuedHandler,
            onPurchaseCancel: this.purchaseCanceldHandler
        }

        return (
            <Modal
                isOpen={this.state.isPurchasing}
                onClose={this.purchaseCanceldHandler}
            >
                <OrderModal {...orderModalProps} />
            </Modal>
        )
    }

    renderBurger = () => {
        const {
            ingredients,
            totalPrice,
            error
        } = this.props;

        const burgerProps = {
            ingredients
        }

        const buildControlsProps = {
            purchasable: this.updatePurchaseHandler(ingredients),
            totalPrice,
            disabled: this.chckIfDisabled(),
            onAddIngredient: this.props.onAddIngredient,
            onRemoveIngredient: this.props.onRemoveIngredient,
            onPurchase: this.purchasingHandler
        }

        if (!ingredients) {
            return <Spinner />
        }

        return (
            <Aux>
                {!error ? <Burger {...burgerProps}/> : <p>Error has occured</p>}
                <BuildControls {...buildControlsProps}/>
            </Aux>
        );
    }

    render() {

        return (
            <Aux>
                {this.renderSummaryModal()}
                {this.renderBurger()}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error,
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onAddIngredient,
    onRemoveIngredient,
    onGetIngredientsAPI
}, dispatch);

const BurgerBuilderWithError = withErrorHandler(BurgerBuilder, burgerAPI);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BurgerBuilderWithError);