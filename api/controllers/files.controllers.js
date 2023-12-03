

export const uploadSingleFiles = async (req, res, next) => {
  try {
    if (!req.file) {
      return console.log(
        "You have not Select any Image, Please Select any Image on Your Computer"
      );
    }
    const currentUrl = req.protocol + "://" + req.get("host") + "/images/";
    let fileUrl = currentUrl + req.file.filename
    return res.status(201).json(fileUrl);
  } catch (err) {
    return next(err);
  }
};

export const uploadMultipleFiles = async (req, res, next) => {
  try {
    let UrlArray = []
    req.files.forEach((singale_image) => {
      const currentUrl = req.protocol + "://" + req.get("host") + "/images/";
      let fileUrl = currentUrl + singale_image.filename
      UrlArray.push(fileUrl)
    })

    return res.status(201).json(UrlArray);
  } catch (err) {
    return next(err);
  }
};
