import { useMediaQuery } from 'react-responsive'
import {useState} from "react";
import {Switch, Route} from "react-router-dom";


function Header ({children}) {
    const isMobile = useMediaQuery({
        query: '(max-width: 600px)'
    })

    const [isOpen, setIsOpen] = useState(false)
    const handleOpenInfo = () =>{
        setIsOpen(true)
    }
    const handleCloseInfo = () =>{
        setIsOpen(false)
    }


return <header className="header">
    <Switch>
        <Route exact path={'/'}>
            {isMobile?
                <>
                    <div className="header__mobile-container">
                        <div className= {`header__mobile-info-container ${isOpen ? 'header__mobile-info-container_type_open': ''}`}>
                            {children}
                        </div>
                        <div className="header__main-mobile">
                            <div className="header__logo"/>
                            {!isOpen ?
                                <button onClick={handleOpenInfo} className="header__info-button"/>
                                :
                                <button onClick={handleCloseInfo} className="header__info-button header__info-button_type_close"/>
                            }

                        </div>
                    </div>

                </> :
                <>
                    <div className="header__logo"/>
                    <div className='header__info-container'>
                        {children}
                    </div>
                </>
            }
        </Route >
        <Route path="/sign-in">
            <div className="header__logo"/>
            <div className='header__info-container'>
                {children}
            </div>
        </Route>
        <Route path="/sign-up">
            <div className="header__logo"/>
            <div className='header__info-container'>
                {children}
            </div>
        </Route>
    </Switch>

</header>
}

export default Header