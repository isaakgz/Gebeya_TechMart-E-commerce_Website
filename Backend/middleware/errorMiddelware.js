const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalURL}`);
  res.status(404).json({ error: "Not Found" });
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //check mongooses bad boject id

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "resourse not found";
    statusCode = 404;
  }

  res
    .status(statusCode)
    .json({
      message,
      stack: (process.env.NODE_ENV = "production" ? "🥞" : err.stack),
    });
};

export {notFound, errorHandler}