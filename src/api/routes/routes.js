let routes;

module.exports = (app) => {
    app.get('/api', (req, res) => {
        return res.status(200).json({routes});
    });
};

routes = {

};