class AuthController {
  constructor({ user, role }) {
    this.user = user;
    this.role = role;
  }

  registerUser(req, res) {
    const { username, password, role } = req.body;
    const user = new this.user({ username, role });

    this.user.register(user, password, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'User registered successfully' });
    });
  }

  loginUser(req, res) {
    const { username, password } = req.body;

    this.user.authenticate(username, password, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Create a new session and store user id
      req.session.userId = user._id;
      res.json({ message: 'Login successful' });
    });
  }
}

module.exports = AuthController;
