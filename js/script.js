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
    setInterval(Online, 5000);
    atualizarMensagens();
    setInterval(atualizarMensagens, 3000);
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
    console.log('online');
}

//Mensagens

function atualizarMensagens(){
    const promiseMSG = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promiseMSG.then( atualizarHTML );
    promiseMSG.catch(erro => {console.log('Erro ao acessar as mensagens');atualizarMensagens()})
    console.log('atualizou');
}
function atualizarHTML(mensagens){
    //console.log(mensagens);
    const feed = document.querySelector('.corpo');
    let msg = mensagens.data;
    //console.log(msg);
    feed.innerHTML = '';
    for(let i=0; i < msg.length; i++){
        feed.innerHTML += `
        <div data-test="message" class="mensagem">
         <p class="time">(${msg[i].time})</p>
         <p class="user">${msg[i].from}</p>
         <p class="destino">para <p class="bold">${msg[i].to}</p></p>
         <p class="msg">: ${msg[i].text}</p>    
         </div>
        `
    }

}

//Enviar mensagens 

function enviar(){
    const txt = document.querySelector(".textoMensagem").value;
    console.log(txt);
    console.log(nome.name);
    let envio = {
        from: nome.name,
        to: 'Todos',
        text: txt,
        type: 'message'
    };

    const promese = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', envio);
    promese.then(enviou);
    promese.catch(erro => {console.log('Erro ao enviar a mensagem'); window.location.reload()});
}
function enviou(deuCerto){
    console.log(deuCerto);
    atualizarMensagens();
    const txt = document.querySelector(".textoMensagem");
    txt.value = '';
}




pedirNome();
setInterval(Online, 5000);
atualizarMensagens();
setInterval(atualizarMensagens, 3000);
