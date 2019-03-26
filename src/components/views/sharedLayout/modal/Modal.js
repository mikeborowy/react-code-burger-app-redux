import React from 'react';
import styles from './modal.scss';
import Aux from '../../../hoc/aux/Aux';
import Overlay from '../../../common/overlay/Overlay';

const Modal = (props) => {

    let style = {};
    style = {
        ...style,
        transform: props.isOpen ? 'translateY(0)' : 'translate(-100vh)',
        opacity:  props.isOpen ? '1' : '0'
    };

    return (
        <Aux>
            <Overlay
                isOpen={props.isOpen}
                onClose={props.onClose}
            />
            <div
                className={styles.modal}
                style={style}
            >
                {props.children}
            </div>
        </Aux>
    );
};

export default Modal;