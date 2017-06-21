const Role = require('../models').roles;

module.exports = {
  create(req, res) {
    return Role
      .create({
        role: req.body.role,
      })
      .then(arole => res.status(201).send(arole))
      .catch(error => res.status(400).send({
        error,
        message: 'Sorry an error occured.Confirm your input is correct else contact admin'
      }));
  },
  list(req, res) {
    return Role
      .findAll()
      .then(arole => res.status(200).send(arole))
      .catch(error => res.status(400).send({
        error,
        message: 'Sorry, an error occured. Try again'
      }));
  },
  delete(req, res) {
    return Role
      .find({
        where: {
          id: req.params.roleId,
        },
      })
      .then((arole) => {
        if (!arole) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return arole
          .destroy()
          .then(() => res.status(200).send({
            message: 'Role Deleted Successfully'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
