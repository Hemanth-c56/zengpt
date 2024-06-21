import React, { useCallback, useReducer } from "react"

const formReducer = (state,action)=>{
    switch(action.type){
        case 'INPUT_CHANGE':
            // console.log("in form Reducer",state)
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(!state.inputs[inputId]){
                    continue
                }
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }
                else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return{
                ...state,
                inputs:{
                    ...state.inputs,
                    [action.inputId] : {value: action.value , isValid: action.isValid}
                },
                isValid: formIsValid
            }
        case "SET_DATA":
            return{
                inputs: action.value,
                isValid : action.isValid
            };
        default:
            return state;
    }
}

const useForm = (initialInputs, initialValidity)=>{
    // console.log("visited form hook - useform",initialValidity)
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialValidity
    });
    // console.log(" after form staet : - ", formState.isValid)
    // console.log("formstate inputs username" , formState.inputs.username.isValid)
    // console.log("formstate inputs password", formState.inputs.password.isValid)
    const inputHandler = useCallback((id,value,isValid)=>{
        dispatch({
            type: 'INPUT_CHANGE',
            inputId: id,
            value: value,
            isValid: isValid
        });
        // console.log("visited Input Handler", isValid)
        // console.log("formstate.isValid in input handler",formState.isValid)
    },[]);

    const setFormData = useCallback((initialState, initialValidity)=>{
        // console.log("visited setform data")
        dispatch({
            type: 'SET_DATA',
            value: initialState,
            isValid: initialValidity
        })
    }
  ,[])
  
    return [formState, inputHandler, setFormData];
}

export default useForm