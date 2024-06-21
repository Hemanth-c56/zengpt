import { useReducedMotion } from "framer-motion";
import React, { useEffect, useReducer } from "react";
import { validate } from "./validators";

function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validator),
      };
    case "TOUCH":
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
}

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouch: false,
    isValid: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const handleChange = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validator: props.validator,
    });
  };

  const handleTouch = () => {
    dispatch({ type: "TOUCH" });
  };

  const element = (
    <input
      id = {props.id}
      type={props.type}
      placeholder={props.placeholder}
      className={props.className}
      value={inputState.value}
      onChange={handleChange}
      onBlur={handleTouch}
    />
  );

  return (
    <div
      className={!inputState.isValid && inputState.isTouch && "triggerError"}
    >
      {element}
      {!inputState.isValid && inputState.isTouch && (
        <p className="red ">{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
