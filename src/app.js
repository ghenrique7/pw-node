const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');
const req = require("express/lib/request");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json( repositories );
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  
  repositories.push( repository );

  return response.json( repository );

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const newRepository = {
    id,
    url,
    title,
    techs
  };

  const findRepositoryIndex = repositories.findIndex(repository => 
    repository.id == id);

  if(findRepositoryIndex < 0) {
    return response.status(400).send();
  }

  repositories[findRepositoryIndex] = newRepository;

  return response.json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex( 
    repository => repository.id == id );

  if( findRepositoryIndex >= 0 ){
    repositories.splice( findRepositoryIndex, 1 )
  }
  else {
    return response.status( 400 ).json( {error: 'Repositório inexistente!'} );
  }
  
  return response.status( 204 ).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const { likes } = request.body;

  const findRepositoryIndex = repositories.findIndex(repository => 
    repository.id == id);

  if(findRepositoryIndex < 0) {
    response.status(400).send();
  }

  repositories[findRepositoryIndex].likes++;

  if(likes) {
    return response.status(400).send();
  }

  const likesArray = repositories.map(repo => ({ likes: repo.likes }));
  return response.json({likes: likesArray[findRepositoryIndex].likes});
});

module.exports = app;
