const express = require("express");

const server = express();

server.use(express.json());

var projects = [];

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const project = req.body;

  projects.push(project);

  return res.status(201).json(project);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const projectUpdate = req.body;

  const projectIndex = projects.findIndex(
    (project, index, projects) => project.id == id
  );

  projects[projectIndex] = projectUpdate;

  return res.json(projectUpdate);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id == id);
  projects.splice(projectIndex, 1);

  return res.send(204);
});

server.listen(3000);
