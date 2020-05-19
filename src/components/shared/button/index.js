import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './index.module.css';

const Button = ({
    children, onClick, className, disabled, active, ...args
}) => {
    const classes = classNames(style.button, className, { [style.active]: active });

    const onClickAction = e => {
        if (disabled) {
            e.preventDefault();
        } else {
            return onClick(e);
        }
    };

    const Tag = args.href ? 'a' : 'button';

    return (
        <Tag className={classes} onClick={onClickAction} disabled={disabled} {...args}>
            {children}
        </Tag>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
};

Button.defaultProps = {
    children: 'Default',
    onClick: () => {},
    className: '',
    disabled: false,
    active: false,
};

export default Button;
