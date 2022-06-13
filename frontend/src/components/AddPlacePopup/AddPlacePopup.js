import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useState, useEffect } from "react";

function AddPlacePopup  ({isOpen, onAddPlace, onClose}) {
    const [cardName, setCardName] = useState('')
    const [cardLink, setCardLink] = useState('')

    useEffect(() => {
        setCardName('');
        setCardLink('');
    }, [isOpen]);

    function handleCardNameChange(e) {
        setCardName(e.target.value);
    }
    function handleCardLinkChange(e) {
        setCardLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
         onAddPlace({
            name: cardName,
            link: cardLink,
        });
    }

    return   <PopupWithForm onSubmit ={handleSubmit} onClose = { onClose } isOpen = { isOpen } name = "card-edit"   title = "Новое место" buttonName = "Сохранить">
        <fieldset className="form__fieldset form__fieldset_type_profile">
            <div className="form__input-container">
                <input onChange={handleCardNameChange} id="card-name" required name="name" type="text" value={cardName}
                       className="form__input form__input_type_card-name" placeholder="Название" minLength="2"
                       maxLength="30"/>
                <span id="card-name-error" className="form__error-massage form__error-massage_hidden"></span>
            </div>
            <div className="form__input-container">
                <input onChange={handleCardLinkChange} id="link" required name="link" type="url" value={cardLink}
                       className="form__input form__input_type_card-link"
                       placeholder="Ссылка на картинку"/>
                <span id="link-error" className="form__error-massage form__error-massage_hidden"></span>
            </div>
        </fieldset>
    </PopupWithForm>

}
export default AddPlacePopup