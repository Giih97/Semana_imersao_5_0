
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Metas');

const Meta = mongoose.model('Meta');
const app = express();

app.use(express.json());
app.use((req,res, next) => {  //next para continuar o processamento
    res.header("Access-Control-Allow-Origin", "*");  // * qualquer site pode fazer a requisição
    res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers","X-PINGOTHER,Content-Type,Authorization");
    app.use(cors());
    next();
});   

// conexao com banco de dados
mongoose.connect('mongodb://localhost/gilda',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('conectado');
}).catch((err)=>{
    console.log('erro na conexão'+ err);
});


app.get('/metas', async (req, res) => {
    await Meta.find({}).then((metas)=>{
        return res.json({  // sem status, retona o padrão
            error:false,
            metas
    });
}).catch((err) => {
    return res.status(400).json({
    error:true,
    message:"nenhum registro encontrado"
  });
});
});
  app.post('/metas', async (req, res) => {              // cadastrar
      await sleep(3000);                  // pausa a api em 3mse
      function sleep(ms){
          return new Promise((resolve) =>{
              setTimeout(resolve,ms);
          });
      }
    await Meta.create(req.body, (err)=>{  // inserir no bd, await aguarda o processamento
        if(err) return res.status(400).json({  // se houve algum erro através da fn , retorno um status 400
        error:true,             // houve um erro ,sim
        message:"Erro: meta não cadastrada com sucesso" // informa o erro atravé do retorno
    });
});

   return res.json({   // não houve erro
       error:false,
       message:"Meta cadastrada com sucesso"
   });
});



  app.listen(3002,function(){
      console.log('funcionando no : http://localhost:3002!')
  });