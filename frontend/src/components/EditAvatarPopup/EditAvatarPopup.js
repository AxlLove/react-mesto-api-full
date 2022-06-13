import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useState, useEffect, useRef } from "react";
function EditProfilePopup ({isOpen, onUpdateAvatar, onClose}) {

    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.value=''
    }, [isOpen]);
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }
    return  <PopupWithForm onSubmit = {handleSubmit}  onClose = { onClose } isOpen = {isOpen} name = "avatar-edit"   title = "Обновить Аватар" buttonName = "Сохранить">
        <fieldset className="form__fieldset form__fieldset_type_avatar">
            <div className="form__input-container">
                <input ref={inputRef}   id="avatar-link" required name="link" type="url"
                       className="form__input form__input_type_link" placeholder="Введите ссылку"
                       minLength="2"
                       maxLength="200"/>
                <span id="avatar-link-error" className="form__error-massage form__error-massage_hidden"></span>
            </div>
        </fieldset>
    </PopupWithForm>

}
export default EditProfilePopup