const Document = require('../models').documents;

module.exports = {
  create(req, res) {
    if (!req.body.title || !req.body.content || !req.body.access) {
      return res.status(406).send({ message: 'Fill all fields' });
    }
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.decoded.id
      })
      .then(doc => res.status(201).send({
        doc,
        message: 'Document Created Successfully',
      }))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    if (req.query.offset || req.query.limit) {
      return Document
        .findAll({
          offset: req.query.offset,
          limit: req.query.limit,
          order: '"createdAt" ASC',
          where: {
            access: 'public'
          }
        })
        .then((doc) => {
          if (!doc || doc.length < 1) {
            return res.status(404).send({
              message: 'Documents not found',
            });
          }
          return res.status(200).send({ doc, message: 'Request Successful' });
        })
        .catch(error => res.status(400).send(error));
    }
    return Document
      .findAll({
        where: {
          access: 'public'
        }
      })
      .then((doc) => {
        if (doc.length < 1) {
          return res.status(404).send({
            message: 'There are no documents created.',
          });
        }
        return res.status(200).send(doc);
      })
      .catch(error => res.status(400).send(error));
  },

  count(req, res) {
    return Document
      .findAndCountAll()
      .then((doc) => {
        if (!doc || doc.length < 1) {
          return res.status(404).send({
            message: 'Documents not found',
          });
        }
        const count = doc.count;
        console.log(count);
        return res.status(200).send({ doc });
      })
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Document
      .findById(req.params.documentId)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return res.status(200).send(doc);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    if (!req.params) {
      return res.status(404).send({
        message: 'Document Not Found',
      });
    }
    return Document
      .findById(req.params.documentId)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return doc
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedDocument => res.status(200).send({
            message: 'Document updated Successfully.',
            updatedDocument
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  searchDocument(req, res) {
    return Document
      .findAll({
        where: {
          title: {
            $ilike: `%${req.query.q}%`,
          },
          access: 'public'
        },
        order: '"createdAt" DESC'
      })
      .then((doc) => {
        if (doc.length < 1) {
          return res.status(404).send({
            message: 'No Document found'
          });
        }
        return res.status(200).send(doc);
      });
  },

  getUserRoleDocuments(req, res) {
    return Document
      .findAll({
        where: {
          access: req.params.role
        }
      })
      .then((docs) => {
        if (!docs) {
          return res.status(404).send({
            message: 'That role has no documents',
          });
        }
        return res.status(200).send({ docs });
      })
      .catch(error => res.status(400).send(error));
  },


  delete(req, res) {
    return Document
      .find({
        where: {
          id: req.params.documentId,
        },
      })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return doc
          .destroy()
          .then(() => res.status(200).send({
            message: 'Document Deleted Successfully'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
