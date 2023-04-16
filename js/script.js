axios.defaults.headers.common['Authorization'] = 'T1lcCkB3UReZRGRtdg4R6lEG';
//--------------------------------------------------------------------------------------------------------------------------------//

let nome = {
    name: ''
};
function pedirNome(){
    nome.name = prompt('Informe seu nome:');
    //enviar para API o nome
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nome);
    promise.then(nomeSucesso);
    promise.catch(nomeErro);
}
function nomeSucesso(retorno){
    console.log('Nome cadastrado com sucesso!');
}
function nomeErro(retorno){
    console.log("Erro ao cadastrar o nome");
    const statusErro = retorno.response.status;
    console.log(statusErro);
    pedirNome();
}

//manter o user online;
function Online(){
    const online = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nome);
    //online.then((resp) => console.log(resp));
}

//Mensagens

function atualizarMensagens(){
    const promiseMSG = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promiseMSG.then( atualizarHTML );
    promiseMSG.catch(erro => {console.log('Erro ao acessar as mensagens');atualizarMensagens()})
    
}
function atualizarHTML(mensagens){
    //console.log(mensagens);
    const feed = document.querySelector('.corpo');
    let msg = mensagens.data;
    //console.log(msg);
    feed.innerHTML = '';
    for(let i=0; i < msg.length; i++){
        feed.innerHTML += `
        <div class="mensagem">
         <p class="time">(${msg[i].time})</p>
         <p class="user">${msg[i].from}</p>
         <p class="destino">para <p class="bold">${msg[i].to}</p>: </p>
         <p class="msg">${msg[i].text}</p>    
         </div>
        `
    }

}

pedirNome();
setInterval(Online, 5000);
atualizarMensagens();
setInterval(atualizarMensagens, 3000);