import React from "react";

import {
  Jumbotron,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import Menu from "../components/Menu";

function Home({ data }) {
  return (
    <>
      <Menu />
      <Jumbotron fluid className="list">
        <style>
          {`.list{
          background-color:#4B0082 ;
          color:#8b1a1a;
          padding-top:30px;
          padding-bottom:150px;
          margin-bottom: 0rem !important;
        }.title-top{
          color:#8B0000 
        }.list-meta{
          background-color:#f8f9fa !important;
          color:#4B0082 !important;
          border-color:#4B0082 !important;
        }`}
        </style>
        <Container>
          <h1 className="display-4 text-center title-top"> Minhas Metas! </h1>
          <hr />
          <ListGroup>
           
            {data.metas.map((
              meta //map vai percorrer cada meta
            ) => (
              <div key={meta._id}>
               
                {/*chave é igual propriedade e seu a id */}
                <ListGroupItem className="list-meta active">
                  <ListGroupItemHeading> {meta.name} </ListGroupItemHeading>
                  <ListGroupItemText> {meta.description} </ListGroupItemText>
                  <ListGroupItemText> {meta.status} </ListGroupItemText>
                </ListGroupItem>
              </div>
            ))}
          </ListGroup>
        </Container>
      </Jumbotron>
    </>
  );
}

/* getServerSideProps = o projeto é executado no servidor, após essa execução , o servidor enviar
   o navegador o html, dessa forma os navegadores conseguem ler a página*/
export async function getServerSideProps() {
  //a funçao está pré-renderizar a pagina a cada solicitação
  const response = await fetch(`http://localhost:3002/metas`); //enquanto não processa essa parte,não prossegue
  const data = await response.json(); // após ler os dados , atribuo a const data
  return {
    props: {
      data,
    },
  }; // retorna dados
}

export default Home;
