const User = require('../models').users;
const jwt = require('jsonwebtoken');

const secret = 'docmanagementsystem';
const Document = require('../models').documents;

module.exports = {
  create(req, res) {
    const emailRegex = /\S+@\S+\.\S+/;
    const paswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password ||
      !req.body.roleType) {
      return res.status(422).send({ message: 'Fill all fields' });
    } else if (!(req.body.password).match(paswordRegex)) {
      return res.status(409).send({
        message: 'Password must contain:one digit from 0-9, one lowercase characters, one uppercase characters, one special symbols and at least 8 characters'
      });
    } else if (!emailRegex.test(req.body.email)) {
      return res.status(406).send({ message: 'Email format is incorrect' });
    }
    console.log('this is the request', req.body);
    return User
      .create(req.body)
      .then(user => res.status(201).send({
        message: 'User Created Successfully',
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
      }))
      .catch(error => res.status(400).send(error.errors));
  },

  login(req, res) {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      return User
        .findOne({ where: { email } })
        .then((user) => {
          if (user) {
            if (User.isPassword(user.password, password)) {
              const payload = { id: user.id, roleType: user.roleType };
              const token = jwt.sign(payload, secret, { expiresIn: 25740 });
              return res.status(200).send({ message: 'Loggin Successful.', email: user.email, Token: token });
            }
            return res.status(401).send({
              message: 'Reconfirm Your password.',
            });
          }
          return res.status(404).send({ message: 'That user email does not exist' });
        })
        .catch(error => res.status(400).send(error));
    }
  },

  logout(req, res) {
    req.body = null;
    const token = req.body;
    return res.status(200).send(token);
  },

  list(req, res) {
    if (req.query.limit || req.query.offset) {
      return User
        .findAll({
          limit: req.query.limit,
          offset: req.query.offset,
          order: '"createdAt" ASC',
        })
        .then((user) => {
          if (!user || user.length < 1) {
            return res.status(404).send({
              message: 'user not found',
            });
          }
          return res.status(200).send(user);
        })
        .catch(error => res.status(400).send({
          error,
          message: 'There was a problem with the query params check if they are all numbers',
        }));
    }
    User
      .findAll()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },

  count(req, res) {
    return User
      .findAndCountAll()
      .then((user) => {
        if (!user || user.length < 1) {
          return res.status(404).send({
            message: 'Users not found',
          });
        }
        return res.status(200).send({ user });
      })
      .catch(error => res.status(400).send(error));
  },

  retrieveOne(req, res) {
    if (req.body) {
      return User
        .findById(req.params.userId)
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'Sorry. User not found',
            });
          }
          return res.status(200).send({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });
        })
        .catch(error => res.status(400).send(error));
    }
  },

  update(req, res) {
    if (req.params.userId) {
      return User
        .findById(req.params.userId)
        .then((user) => {
          if (!user || user.length < 1) {
            return res.status(404).send({
              message: 'Sorry. User Not Found',
            });
          }
          return user
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedUser => res.status(200).send({
              message: 'user updated Successfully.',
              firstName: req.body.firstName
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
  },

  searchUser(req, res) {
    return User
      .findAll({
        where: {
          firstName: {
            $ilike: `%${req.query.q}%`,
          }
        },
        order: '"createdAt" DESC'
      })
      .then((doc) => {
        if (doc.length < 1) {
          return res.status(404).send({
            message: 'No User found'
          });
        }
        return res.status(200).send(doc);
      });
  },

  getUserDocuments(req, res) {
    if (req.query.limit || req.query.offset) {
      return User
      .findById(req.params.userId, {
        limit: req.query.limit,
        offset: req.query.offset,
        include: [{
          model: Document,
          as: 'userDocuments'
        }],
      })
      .then((Users) => {
        if (!Users) {
          return res.status(404).send({
            message: 'That user  does not exist',
          });
        }
        return res.status(200).send({ userDocuments: Users.userDocuments });
      })
      .catch(error => res.status(400).send(error));
    }
  },

  delete(req, res) {
    return User
      .find({
        where: {
          id: req.params.userId,
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Sorry.User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            message: 'user Deleted Successfully'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
