function ImagePopup ({card,onClose}) {
  return(
      <section className={`pop-up pop-up_type_image ${card.open ? 'pop-up_opened': ''}`}>
        <figure className="pop-up__image-container">
            <button onClick={onClose} type="button" className="pop-up__close-button"/>
            <img src= {card.link} alt={card.name} className="pop-up__image"/>
                <figcaption className="pop-up__image-title">{card.name}</figcaption>
        </figure>
    </section>
);
}
export default ImagePopup