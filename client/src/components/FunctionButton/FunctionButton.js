import React from 'react';

const FunctionButton = (props) => (
    <button type='button' className={props.color} {...props}>
        {props.message}
    </button>
);

export default FunctionButton;