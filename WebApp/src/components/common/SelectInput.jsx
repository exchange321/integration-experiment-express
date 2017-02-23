import React, {PropTypes} from 'react';

const SelectInput = ({containerClass, label, name, id, className, options, value, onChange, errorMsg}) => {
    if (errorMsg.length > 0) {
        containerClass += ' has-danger';
        className += ' form-control-danger';
    }
    return (
        < div
    className = {containerClass} >
        < label
    className = "form-control-label"
    htmlFor = {id} > {label} < / label >
        < select
    name = {name}
    className = {className}
    id = {id}
    value = {value}
    onChange = {onChange}
        >
        {options.map(({value: optionValue, text}) => (
        < option
    key = {optionValue}
    value = {optionValue} > {text} < / option >
    ))
}
    </
    select >
    {errorMsg.length > 0 && < div
    className = "form-control-feedback" > {errorMsg} < / div >
}
    </
    div >
    )
    ;
};

SelectInput.propTypes = {
    containerClass: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }),
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMsg: PropTypes.string.isRequired,
};

export default SelectInput;
