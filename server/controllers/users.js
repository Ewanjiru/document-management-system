const User = require('../models').users;
const jwt = require('jsonwebtoken');

module.exports = {
  create(req, res) {
    return User
      .create(req.body)
      .then((user) => res.status(201).send({
        message: 'User Created Successfully',
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
      }))
      .catch(error => res.status(400).send(error.errors));
  },
  
  // login(req, res) {
  //   User
  //     .findOne({
  //       where: {
  //         email: req.body.email,
  //         password: req.body.password
  //       }
  //     })
  //     .then(user => {
  //       const token = jwt.sign(user.email, process.env.SECRET_KEY = 'superSecretString');
  //       if (!user) {
  //         return res.status(404).send({
  //           message: 'user not found'
  //         })
  //       }
  //       return res.status(200).send(token);
  //     })
  // },

  list(req, res) {
    return User
      .findAll()
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  retrieveOne(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'Sorry. User not found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  retrieveLimited(req, res) {
      return User
        .findAll({
          limit: req.query.limit,
          offset: req.query.offset,
        })
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: 'user not found',
            })
          }
          return res.status(200).send(user)
        })
        .catch(error => res.status(400).send({
          error,
          message: 'There was a problem with the query params check if they are all numbers',
         }))
  },

  update(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'Sorry. User Not Found',
          });
        }
        return user
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedUser => res.status(200).send({
            message: 'user updated Successfully.'
          }))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error));
  },

  searchUser(req, res) {
    return User
      .findAll({
        where: {
            firstName: {
              $ilike: '%' + req.query.q + '%',
            }
        },
        order: '"createdAt" DESC'
      })
      .then(doc => {
        if (doc.length < 1) {
          return res.status(404).send({
            message: 'No User found'
          })
        }
        return res.status(200).send(doc)
      })
  },

  delete(req, res) {
    return User
      .find({
        where: {
          id: req.params.userId,
        },
      })
      .then(user => {
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
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

};