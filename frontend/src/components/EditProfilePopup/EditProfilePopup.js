import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useState, useEffect, useContext } from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
function EditProfilePopup ({isOpen, onUpdateUser, onClose}) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const currentUser = useContext(CurrentUserContext)
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);
    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
         onUpdateUser({
            name,
            about: description,
        });
    }
    return  <PopupWithForm onSubmit = {handleSubmit} onClose = { onClose } isOpen = {isOpen} name = 'profile-edit' title = "Редактировать профиль" buttonName = "Сохранить">
        <fieldset className="form__fieldset form__fieldset_type_profile">
            <div className="form__input-container">
                <input id='name' required name="name" type="text" value={name}
                       className="form__input form__input_type_name"
                       placeholder="Введите имя" minLength="2" maxLength="40"
                        onChange={handleNameChange}/>
                <span id="name-error" className="form__error-massage form__error-massage_hidden"></span>
            </div>
            <div className="form__input-container">
                <input id="title" required name="title" type="text" value={description}
                       className="form__input form__input_type_title"
                       placeholder="Введите профессию" minLength="2" maxLength="200"
                       onChange={handleDescriptionChange}/>
                <span id="title-error" className="form__error-massage form__error-massage_hidden"></span>
            </div>
        </fieldset>
    </PopupWithForm>
}
export default EditProfilePopup