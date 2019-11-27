const express = require("express");

const server = express();

server.use(express.json());

var requestCounter = 0;
var projects = [];

function checkProjectInArray(req, res, next) {
  const { id } = req.params;

  const projectIndex = projects.findIndex(
    (project, index, projects) => project.id == id
  );

  if (projectIndex == -1) {
    return res.sendStatus(404);
  }

  return next();
}

server.use((req, res, next) => {
  console.log(++requestCounter);

  return next();
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const requestBody = req.body;

  const project = { ...requestBody, tasks: [] };

  projects.push(project);

  return res.status(201).json(project);
});

server.put("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const project = req.body;

  const projectIndex = projects.findIndex(
    (project, index, projects) => project.id == id
  );

  projects[projectIndex].title = project.title;

  return res.json(projects[projectIndex]);
});

server.delete("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id == id);
  projects.splice(projectIndex, 1);

  return res.sendStatus(204);
});

server.post("/projects/:id/tasks", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const task = req.body;

  const projectIndex = projects.findIndex(
    (project, index, projects) => project.id == id
  );

  projects[projectIndex].tasks.push(task.title);

  return res.status(201).json(task.title);
});

server.listen(3000);
