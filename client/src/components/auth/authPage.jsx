import React, { useContext, useState } from "react";
import "./authPage.css";
import Input from "../validations/inputValidation";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../validations/validators.jsx";
import useForm from "../validations/formValidationHook.jsx";
import { AuthContext } from "../context/auth-context.jsx";
import axios from 'axios'
import ErrorModel from "../models/errorModel.jsx";
import LoadingSpinner from "../ui/loadingSpinner.jsx";

function AuthPage() {

  const auth = useContext(AuthContext)

  const [isLoading , setIsLoading] = useState(false);

  const [signup , setSignup] = useState(false)

  const [error, setError] = useState("");

  const [formState, inputHandler, setFormData] = useForm(
    {
      email:{
        value: "",
        isValid: false
      },
      password:{
        value: "",
        isValid: false
      }
    },
    false
)

  const switchModeHandler = ()=>{
    console.log('entered into switch mode handler')
    if(!signup){
      setFormData(
        {
          ...formState.inputs,
          name:{
            value: '',
            isValid: false
          }
        },
        false
      )
    }
    else{
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    }
    setSignup(!signup)
  }

  const handleFormSubmit = async ()=>{
    setIsLoading(true);

    if(!signup){
      //logic for login
      try{
        const res = await axios.post(`${window.location.origin}/api/users/zengpt/login`, {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        })
        setIsLoading(false);
        auth.login(res.data.userId, res.data.userName, res.data.userEmail);
      }
      catch(error){
        setError(error.response.data.message)
      }
    }
    else{
      //logic for signup
      try{
        const res = await axios.post(`${window.location.origin}/api/users/zengpt/signup`, {
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        })
        setIsLoading(false);
        auth.login(res.data.userId, res.data.userName, res.data.userEmail);
      }
      catch(error){
        setError(error.response.data.message)
      }
    }
  }

  function onClear(){
    setIsLoading(false);
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModel onCancel={onClear} header="An Error Occurred!" show={error} footer={<button className="error-model-btn" onClick={onClear}>Okay</button>}>{error}</ErrorModel>
      <div className="authCon">
      {isLoading && <LoadingSpinner asOverlay />}
        <div className="authDiv">
          <div className="login-text blc">WELCOME</div>
          <hr />
          <div className="auth-form">
            {signup && <div className="blc auth-child">
              <Input
                  id = "name"
                  type="text" 
                  className="blc"
                  placeholder="Name"
                  validator = {[VALIDATOR_REQUIRE()]}
                  errorText = "Please enter a name"
                  onInput = {inputHandler}
                  />
            </div>}
            <div className="blc auth-child">
              <Input
                  id = "email"
                  type="text" 
                  className="blc"
                  placeholder="Email"
                  validator = {[VALIDATOR_EMAIL()]}
                  errorText = "Enter a valid email"
                  onInput = {inputHandler}
                  />
            </div>
            <div className="blc auth-child">
              <Input
                  id = "password"
                  type="password" 
                  className="blc" 
                  placeholder="Password" 
                  validator = {[VALIDATOR_MINLENGTH(5)]}
                  errorText = "Password should have minimum of 5 characters"
                  onInput = {inputHandler}
              />
            </div>
          </div>
          <div className="auth-submit">
            <button onClick={formState.isValid? handleFormSubmit: null}>{signup? 'SIGNUP' : 'LOGIN'}</button>
            <div>
              Not a member? <span onClick={switchModeHandler}>{signup? 'Signin' : 'Signup'}</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthPage;
