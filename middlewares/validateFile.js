const validateFile = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
    return res.status(400).json({ msg: "No files were uploaded." });
  }

  next();
};

export default validateFile;
