module.exports = function(app) {
    app.get('/', (req, res) => res.status(200).send());

    app.use('/api', require('./api'));

    // for clear logout
    app.get('/logout', function(req, res) {
        req.session.destroy(function() {
            res.status(201).sned();
        });
    });
};
