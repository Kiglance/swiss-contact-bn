export default function checkToken(req) {
  const Token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  return Token;
}
