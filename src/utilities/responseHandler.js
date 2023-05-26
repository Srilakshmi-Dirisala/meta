module.exports.errorResponse = (res, error) => {
  res.json({
    status: 400,
    success: false,
    message: error.message || error,
  });
};
module.exports.successResponse = (res, data, message = "Success") => {
  res.json({
    status: 200,
    success: true,
    data: data,
    message: message,
  });
};

module.exports.exceedResponse = (res, data, message = "Success") => {
  res.json({
    status: 300,
    success: "true",
    data: [],
    message: "limit doesn't exceeeded",
  });
};
