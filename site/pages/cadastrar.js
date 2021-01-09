import React, {useState} from 'react';

import Menu from '../components/Menu'

import {Jumbotron,Container, Button, Form, FormGroup, Label, Input,Alert} from 'reactstrap'

function Cadastrar() {
  const [meta, setMeta] = useState({
    /** objeto de posição  */
     name: "",
    description: "",
    status: "",
  });

  const [response, setResponse] = useState({
    // usar para infomar o erro na tela
    formSave: false,
    type: "",
    message: "",
  });

  const onChangeInput = (e) =>
    setMeta({ ...meta, [e.target.name]: e.target.value });

  const sendMeta = async (e) => {
    // async = espera
    e.preventDefault(); // para não atualizar a página

    setResponse({ formSave: true });

    try {
      const res = await fetch("http://localhost:3002/metas", {
        //enviando metas
        method: "POST",
        body: JSON.stringify(meta), // enviando metas em json
        headers: { "Content-Type": "application/json" },
      });

      const responseEnv = await res.json();

      if (responseEnv.error) {
        setResponse({
          formSave: false,
          type: "error",
          message: responseEnv.message,
        });
      } else {
        setResponse({
          formSave: false,
          type: "sucess",
          message: responseEnv.message,
        });
      }
    } catch (err) {
      //não conseguindo acessa a api , acessa o catch
      setResponse({
        formSave: false,
        type: "error",
        message: "Erro meta não cadastrada",
      });
    }
  };

  return (
    <>
      {/* div vazia por causa de duas linhas */}

      <Menu/>
      <Jumbotron fluid className="form">
        <style>
          {`.form{
                    background-color:#4B0082;
                    color:#8B0000;
                    padding-top: 30px;
                    padding-bottom:150px;
                    margin-bottom:0rem !important;
                }`}
        </style>
        <Container>
          <h1 className="display-4 text-center">Cadastrar Minha Meta</h1>
          <hr />

          {response.type === "error" ? (
            <Alert color="danger">
              <p>{response.message}</p>
            </Alert>
          ) : ("" )}
          {response.type === "success" ? (
            <Alert color="success">
              <p>{response.message}</p>{" "}
            </Alert>
          ) : ("")}

          <Form onSubmit={sendMeta}>
            <FormGroup>
              <Label>Nome</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nome de meta"
                onChange={onChangeInput}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Descrição </Label>
              <Input
                type="text"
                name="description"
                id=""
                placeholder="Descrição da meta"
                onChange={onChangeInput}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Status</Label>
              <Input
                type="textarea"
                name="status"
                id="status"
                placeholder="Status de meta"
                onChange={onChangeInput}
              ></Input>
            </FormGroup>
            {response.formSave ? (
              <Button type="submit" color="danger" disabled>
                Enviando...
              </Button>
            ) : (
              <Button type="submit" outline color="secondary">
                Cadastrar
              </Button>
            )}
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
}

export default Cadastrar;