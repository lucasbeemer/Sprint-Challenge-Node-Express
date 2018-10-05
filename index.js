const express = require('express');
const server = express();
const port = 9000;
const projectsDb = require('./data/helpers/projectModel.js');
const actionsDb = require('./data/helpers/actionModel.js');

server.use(express.json());

server.get('/', (req, res) => {
	res.send('<h2>Server is running.</h2>');
})

server.get('/api/projects', (req, res) => {
    projectsDb
        .get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ message: 'Cannot retrieve project data.' });
        });
});


server.listen(port, () => console.log(`server running on port ${port}`));