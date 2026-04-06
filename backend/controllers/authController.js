const registerUser = (req, res) => {
    console.log(req.body);

    res.status(201).json({
        message: "User registered (dummy)",
    });
};

module.exports = { registerUser };