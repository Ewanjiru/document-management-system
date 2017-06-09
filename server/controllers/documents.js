const Document = require('../models').documents;
const User = require('../models/').users;

module.exports = {
  create(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.body.userId,
      })
      .then(doc => res.status(201).send(doc))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Document
      .findAll()
      .then(doc => {
         if ( doc.length < 1 ) {
          return res.status(404).send({
            message: 'There are no documents created.',
          });
        }
        return res.status(200).send(doc);
      })
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Document
      .findById(req.params.documentId)
      .then(doc => {
        if (!doc) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return res.status(200).send(doc);
      })
      .catch(error => res.status(400).send(error));
  },

  getUserDocuments(req, res) {
    return Document
      .findAll({
        where: { userId: req.params.userId }
      })
      .then(doc => {
        if (!doc || doc.length < 1) {
          return res.status(404).send({
            message: 'That user either does not exist or has no documents',
          })
        }
        return res.status(200).send(doc)
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Document
      .findById(req.params.documentId)
      .then(doc => {
        if (doc == []) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return doc
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedDocument => res.status(200).send({
            message: 'Document updated Successfully.'
          }))
          .catch(error => res.status(400).send(error))
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
      .then(doc => {
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
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

  retrieveLimited(req, res) {
    if (req.query.offset || req.query.limit) {
      return Document
        .findAll({
            offset: req.query.offset,
            limit: req.query.limit
        })
        .then(doc => {
          if (!doc) {
            return res.status(404).send({
              message: 'Documents not found',
            })
          }
          return res.status(200).send(doc)
        })
        .catch(error => res.status(400).send(error))
    }
  },

  searchDocument(req, res) {
    return Document
      .findAll({
        where: {
            title: {
              $ilike: '%' + req.query.q + '%',
            }
        },
        order: '"createdAt" DESC'
      })
      .then(doc => {
        if (doc.length < 1) {
          return res.status(404).send({
            message: 'No Document found'
          })
        }
        return res.status(200).send(doc)
      })
  }
};