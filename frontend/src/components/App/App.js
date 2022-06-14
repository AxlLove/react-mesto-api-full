import logo from '../../logo.svg';
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import {Route, Switch, Link, useHistory} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import * as mestoAuth from "../utils/mestoAuth";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [successfully, setSuccessfully] = useState(true)
    const [userEmail, setUserEmail] = useState('')

    const history = useHistory()

    useEffect(()=>{
        if (loggedIn) {
            api.getProfile()
                .then((res)=> {
                    setCurrentUser(res)
                }).catch(console.log);
            api.getInitialCards().then((res)=>{
                setCards(res);
            })
                .catch(console.log);
        }
    },[loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch(console.log);
    }

    function handleCardDelete (card) {
        api.deleteCard(card._id).then((newCard)=> {
            setCards((state)=> state.filter((c) =>c._id !== card._id))
        }).catch(console.log)
    }

    function handleEditAvatarClick () {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick () {
        setEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick () {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick (link, name) {
    setSelectedCard({open: true, link: link, name: name})
    }


    function closeAllPopups () {
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setInfoToolTipOpen(false)
        setSelectedCard({})
    }

    function handleUpdateUser (info) {
        api.editProfile(info).then((res)=>{
            setCurrentUser(res)
            closeAllPopups ()
        }).catch(console.log)
    }
    function handleUpdateAvatar ({avatar}) {
        api.editAvatar(avatar).then((res)=>{
            setCurrentUser(res)
            closeAllPopups ()
        }).catch(console.log)
    }
    function  handleAddPlaceSubmit (newCard) {
        api.addCard(newCard).then((res)=>{
             setCards([res, ...cards])
            closeAllPopups ()
        }).catch(console.log)
    }

    const handleRegister = (password, email) => {
        return mestoAuth
            .register(password, email)
            .then(()=>{
                    setSuccessfully(true)
            }
            )
            .catch(res=>{
                setSuccessfully(false)
            })
            .finally(()=>{
                setInfoToolTipOpen(true)
            })
    }

    const handleLogin = (password, email) => {
        return mestoAuth
            .authorize(password, email)
            .then((data)=>{
                if(!data.token){
                return;
            }
            localStorage.setItem("jwt", data.token)
            setLoggedIn(true)
        })
        .catch(res=>{
            console.log(res)
            setSuccessfully(false)
            setInfoToolTipOpen(true)
        })
    }

    const tokenCheck = () =>{
        if (localStorage.getItem("jwt")){
            const jwt = localStorage.getItem("jwt")
            mestoAuth.getContent(jwt)
                .then(data=>{
             setUserEmail(data.email)
             setLoggedIn(true)
            })
            .catch(console.log)
        }
    }

    useEffect(()=>{
        tokenCheck()
    },[loggedIn])

    useEffect(()=>{
        if(loggedIn) {
            history.push('/')
            return;
        }
        history.push('/sign-up')
    }, [loggedIn])

    const handleSignOut =  ()=> {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
    }

    return (
        <Switch>
            <ProtectedRoute exact path = '/' loggedIn ={loggedIn}>
                <CurrentUserContext.Provider value ={currentUser}>
                    <div className="page">
                        <EditProfilePopup onUpdateUser = {handleUpdateUser}
                                          onClose = { closeAllPopups }
                                          isOpen = {isEditProfilePopupOpen}/>

                        <AddPlacePopup onAddPlace = {handleAddPlaceSubmit}
                                       onClose = { closeAllPopups }
                                       isOpen = {isAddPlacePopupOpen}/>

                        <EditAvatarPopup onUpdateAvatar ={handleUpdateAvatar}
                                         isOpen={isEditAvatarPopupOpen}
                                         onClose={closeAllPopups} />

                        <PopupWithForm onClose = { closeAllPopups } name = "confirm"   title = "Вы уверены?" buttonName = "Да"/>

                        <ImagePopup card = { selectedCard } onClose = { closeAllPopups } />

                        <Header >
                            <p className='header__info'>{userEmail}</p> 
                            <p onClick={handleSignOut} className='header__link header__link_type_main-content'>Выйти</p>
                        </Header>
                        <Main onEditProfile = {handleEditProfileClick}
                              onAddPlace = {handleAddPlaceClick}
                              onEditAvatar = {handleEditAvatarClick}
                              onCardClick = {handleCardClick}
                              cards = {cards}
                              onCardLike = {handleCardLike}
                              onCardDelete ={handleCardDelete}
                              
                        />
                        <Footer />
                    </div>
                </CurrentUserContext.Provider>
            </ProtectedRoute>
            <Route path="/sign-in" loggedIn = {loggedIn} >
                <div className="page">
                    <Header>
                        <Link to='/sign-up' className='header__link'>Регистрация</Link>
                    </Header>
                    <Login  handleLogin={handleLogin}/>
                    <InfoTooltip onClose={closeAllPopups} isOpen={isInfoToolTipOpen} successfully={successfully}
                                 successMassage = 'Вы успешно зарегистрировались'
                    failMassage = 'Что-то пошло не так! Попробуйте ещё раз.'/>

                </div>

            </Route>
            <Route path='/sign-up' loggedIn = {loggedIn}>
                <div className='page'>
                    <Header>
                        <Link to='/sign-in' className='header__link'>Войти</Link>
                    </Header>
                    <Register handleRegister = {handleRegister}/>
                    <InfoTooltip onClose={closeAllPopups} isOpen={isInfoToolTipOpen} successfully={successfully}
                                 successMassage = 'Вы успешно зарегистрировались'
                                 failMassage = 'Что-то пошло не так! Попробуйте ещё раз.'/>
                </div>

</Route>
        </Switch>
  );
}

export default App;
