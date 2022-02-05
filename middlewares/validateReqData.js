const validateReqData = (schema) => async (req, res, next) => {
  const body = req.body
  try {
    await schema.validate(body)
    return next()
  } catch(e) {
    return res.status(400).json({ "validation error": e })
  }
}

module.exports = validateReqData