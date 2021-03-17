const urlRegex = require("url-regex");
const { nanoid } = require("nanoid");
const Short = require("../models/Short");

const shortenPostController = (req, res, next) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ msg: "missing parameters" });
  } else {
    if (urlRegex({ exact: true, strict: false }).test(url)) {
      const id = nanoid(5);
      const obj = new Short({
        nanoid: id,
        ogUrl: url,
      });
      obj
        .save()
        .then((response) => {
          res.json(response);
        })
        .catch((err) => res.json(err));
    } else {
      res.status(400).json({ msg: "invalid url" });
    }
  }
};

const shortenGetController = (req, res, next) => {
  Short.findOne({ nanoid: req.params.id })
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        res.status(404).json({ msg: "not found" });
      }
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  shortenPostController,
  shortenGetController,
};
