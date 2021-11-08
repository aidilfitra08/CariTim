// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

exports.verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Unauthorized
      res.status(401).send({
        success: false,
        error: "please fill the user authentication information",
      });
    }
}