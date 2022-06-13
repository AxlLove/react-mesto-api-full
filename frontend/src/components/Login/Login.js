import React, { useState } from "react"
import { Link } from "react-router-dom"
const Login = ({handleLogin,}) => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setState((prev)=>({
            ...prev,
                [name]:value,
        }))
    }
        const handleSubmit = (e) => {
            e.preventDefault()
              const {email, password} = state
              if (!state.email || !state.password){
                  return;
              }
              handleLogin(password, email)
          }
    return (

            <div className="login">
                <div className="auth">
                    <form onSubmit={handleSubmit}  id='loginForm' className="form form_type_register" >
                        <h2 className="form__title form__title_type_register">Вход</h2>
                        <fieldset className="form__fieldset form__fieldset_type_register">
                            <div className="form__input-container">
                                <input id='loginEmail' required name="email" type="email"
                                       className="form__input form__input_type_register"
                                       placeholder="Email" minLength="2" maxLength="40"
                                       onChange={handleChange}
                                />
                                <span id="email-error" className="form__error-massage form__error-massage_hidden"></span>
                            </div>
                            <div className="form__input-container">
                                <input id="loginPassword" required name="password" type="password"
                                       className="form__input form__input_type_register"
                                       placeholder="Пароль" minLength="2" maxLength="200"
                                       onChange={handleChange}
                                />
                                <span id="pass-error" className="form__error-massage form__error-massage_hidden"></span>
                            </div>
                        </fieldset>
                        <button  type="submit" className="form__submit-button form__submit-button_type_register">Войти</button>
                    </form>
                </div>
            </div>

    )
}

export default Login