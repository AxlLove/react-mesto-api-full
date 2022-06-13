import successImage from '../../images/succes.svg'
import failImage from  '../../images/fail.svg'
import {useHistory} from "react-router-dom";
function InfoTooltip  ({isOpen, onClose, successfully, successMassage, failMassage}) {
    const history = useHistory();
     const registerRedirect = () => {
         if (successfully) {
             history.push("/sign-in");
         }
         onClose()
     }
    return <section  className={`pop-up ${isOpen ? 'pop-up_opened': ''}`} >
        <div className="pop-up__form-container">
            <button onClick={registerRedirect} type="button" className="pop-up__close-button"/>
            {successfully?
                <>
                    <img className='pop-up__info-tool-image' src={successImage} alt={successMassage}/>
                    <p className="pop-up__info-tool-massage">{successMassage}</p>
                </>
                :
                <>
                    <img className='pop-up__info-tool-image' src={failImage} alt={failMassage}/>
                    <p className="pop-up__info-tool-massage">{failMassage}</p>
                </>}
        </div>
    </section>
}
export default InfoTooltip
