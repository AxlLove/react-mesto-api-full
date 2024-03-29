const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/regExp');
const { NotFoundError } = require('../errors/NotFoundError');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
  }),
}), createUser);
router.use(auth);
router.use('/', userRouter);
router.use('/', cardRouter);

router.all('*', (_req, _res) => {
  throw new NotFoundError('Не существующий адрес');
});

module.exports = router;
