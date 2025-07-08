const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('admin1234', 10) }
];

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username, password);  // <- para depurar

  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
