import React, { useState, useRef } from "react";

const defaultProps = {
    type : "text",
    value : "",
    onChange : null,
    onFocus : null,
    onBlur : null,
    labelClass : '',
    autoComplete : 'new-password',
    extraprops : {
        id : '',
        parentId : '',
        parentClass : 'inputfield',
        placeHolder : '',
        validation : ''
    },
    error : {
        errorClass : '',
        message : ''
    }
};

const useInput = ({children, ...props}) => {

    //Reference
    const inputElement = useRef(null);

    //State Variables
    const [inputValue, setValue] = useState(props.value);
    const [labelClass, setLabelClass] = useState(props.labelClass);
    const [placeHolder, setPlaceHolder] = useState(props.extraprops.placeHolder);
    const [error, setError] = useState(props.extraprops.error);

    //Handlers
    const handleChange = (event) => {
        const value = event?.target?.value;
        setValue(value || '');
        setLabelClass(value ? 'active' : '');
        commonUtils(event, props.onChange);
    };

    const handleFocus = (event) => {
        inputElement.current.scrollIntoView({ block: "start", behavior: "smooth" });
        setLabelClass('active');
        commonUtils(event, props.onFocus);
    };

    const handleBlur = (event) => {
        setLabelClass('');
        commonUtils(event, props.onBlur);
    };

    const commonUtils = (event, callback) => {
        callback && typeof callback === "function" && callback(event);
    };

    const inputJSX = (
        
        <div className={props.extraprops.parentClass} id = {props.extraprops.parentId}>
            {children && typeof children === 'function' && children()}
            <input
                {...props}
                ref={inputElement}
                data-gsv-type={props.extraprops.validation}
                data-gsv-min-length={props.extraprops.minLength}
                data-gsf-name={props.name}
                autoComplete={props.autoComplete}
                value={inputValue || ''}
                onChange={(e) => handleChange(e)}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                type={props.type}
            />
            <label 
                className={labelClass || (inputValue && 'active')} 
                htmlFor={props.extraprops.id}>{placeHolder}
            </label>
            {
                error?.message 
                && 
                <span 
                    data-gsv-error="1" 
                    className={`error ${error.errorClass}`}>
                        {error.message}
                </span>
            }
        </div>
    );

    return [inputValue, inputJSX];
};

useInput.defaultProps = defaultProps;
export default useInput;