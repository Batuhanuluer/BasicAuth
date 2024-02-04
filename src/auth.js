const base64 = require('base-64');

function decadeCredentials(authHeader) {
    if (!authHeader) {
        return [null, null];
    }
    // Auth header format: "Basic <base64_encoded_credentials>"
    const encodedCredentials = authHeader.replace('Basic ', '');

    // Decode base64 to get username:password string
    const decodedCredentials = base64.decode(encodedCredentials);

    // Split the string into an array of [username, password]
    const [username, password] = decodedCredentials.split(':');

    return [username, password];
}

module.exports = function authMiddleware(req, res, next) {
    const [username, password] = decadeCredentials(req.headers.authorization || '');

    if (username === 'admin' && password === 'admin') {
        return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="user_pages"');
    res.status(401).send('Authentication required.');
}
