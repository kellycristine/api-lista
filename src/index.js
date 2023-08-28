import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (request, response) => {
  return response.json("OK");
});
app.listen(5555, () => console.log("Servidor rodando, PORT: 5555"));

// CRUD PARA CRIAR RECADO
let recados = [];
let ultimoId = 0;
let usuarios = [
  { acesso: "marcelo", nome: "Marcelo Eltz", senha: "123123" },
  { acesso: "andrea", nome: "Andrea Noer", senha: "123456" },
  { acesso: "kelly", nome: "Kelly Cristine", senha: "123456"},
  { acesso: "exemplo@exemplo.com", nome: "exemplo", senha: "123456"}
];

//Login - POST
app.post("/login", (request, response) => {
  const dados = request.body;

  const usuarioLogado = usuarios.find(
    (item) => item.acesso === dados.acesso && item.senha === dados.senha
  );

  if (usuarioLogado) {
    return response
      .status(200)
      .json({ msg: "Usuário autenticado", usuario: usuarioLogado });
  }

  return response.status(401).json("Usuário sem acesso");
});

//Create - POST
app.post("/recados", (request, response) => {
  const recado = request.body;

  const novoRecado = {
    id: (ultimoId += 1),
    titulo: recado.titulo,
    descricao: recado.descricao,
  };

  recados.push(novoRecado);

  return response.status(200).json("Recado criado com sucesso");
});

//List - GET
app.get("/recados", (request, response) => {
  return response.status(200).json(recados);
});

// Delete
app.delete("/recados/:idRecado", (request, response) => {
  const recadoId = Number(request.params.idRecado);

  const indiceRecado = recados.findIndex((recado) => recado.id === recadoId);

  if (indiceRecado === -1) {
    return response.status(404).json("Recado não encontrado.");
  }

  recados.splice(indiceRecado, 1);

  return response.status(200).json("Recado excluído com sucesso.");
});
