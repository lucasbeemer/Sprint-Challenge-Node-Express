const express = require('express');
const server = express();
const port = 9000;
const projectsDb = require('./data/helpers/projectModel.js');
const actionsDb = require('./data/helpers/actionModel.js');

server.use(express.json());

server.get('/', (req, res) => {
	res.send('<h2>Server is running.</h2>');
})

server.get('/api/projects/', (req, res) => {
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

//// POST ////
server.post('/api/projects/', (req, res) => {
    const add = req.body;
    projectsDb.insert(add)
        .then(res => res.status(201).json(res))
        .catch(err => res.status(500).json(err));
});

//// PUT ////
server.put('/api/projects/:id/', (req, res) => {
    projectsDb.update(req.params.id, req.body)
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json(err));
});

//// DELETE ////
server.delete('/api/projects/:id/', (req, res) => {
    const id = req.params.id;
    projectsDb.remove(id, req.body)
        .then(res => res.status(200).json(res))
        .catch(err => res.status(500).json(err));
});

server.get('/api/actions/', (req, res) => {
    actionsDb
        .get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ message: 'Cannot retrieve action data.'});
        });
});

server.post('/api/actions/', (req, res) => {
    const add = req.body;
    actionsDb.insert(add)
        .then(res => res.status(201).json(res))
        .catch(err => res.status(500).json(err));
});

server.put('/api/actions/:id', (req, res) => {
    actionsDb.update(req.params.id, req.body)
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json(err));
});

server.delete('/api/actions/:id', (req, res) => {
    const id = req.params.id;
    actionsDb.remove(id, req.body)
        .then(res => res.status(200).json(res))
        .catch(err => res.status(500).json(err));
});

server.listen(port, () => console.log(`SERVER RUNNING ON ${port}`));