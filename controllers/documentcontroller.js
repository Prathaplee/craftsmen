const Document = require("../model/document");
const path = require("path");
const fs = require("fs");

exports.uploadDocument = async (req, res, next) => {
  try {
    const newDocument = new Document({
      user: req.user.id,
      type: req.body.type,
      filePath: req.file.path,
    });
    await newDocument.save();
    res.status(201).json({ message: "Document uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({ user: req.user.id });
    res.json(documents);
  } catch (error) {
    next(error);
  }
};
