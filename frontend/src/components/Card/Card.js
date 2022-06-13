import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import React  from "react";

function Card ({onCardClick, onCardLike,onCardDelete , card}) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`places__delete-button ${isOwn ? 'places__delete-button_visible' : 'places__delete-button_hidden'}`)

    const isLiked = card.likes.some(like => like._id === currentUser._id)
    const cardLikeButtonClassName = (`places__like-button ${isLiked ? 'places__like-button_active' : ''}`)
    function handleClick() {
        onCardClick(card.link, card.name);
    }
    function handleLikeClick () {
        onCardLike(card)
    }
    function handleDeleteClick () {
        onCardDelete(card)
    }
    return (
    <li className="places__item">
        <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName}/>
        <img onClick={handleClick} src = {card.link} alt={card.name} className="places__image"/>
            <div className="places__text">
                <h2 className="places__name">{card.name}</h2>
                <div className="places__like-container">
                    <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}/>
                    <span className="places__like-count">{card.likes.length}</span>
                </div>
            </div>
    </li>);
};

export default Card;