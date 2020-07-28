function handleSubmit(pagina){
    event.preventDefault();

    const form = event.target;
    let storage = JSON.parse(localStorage.getItem('mensagens')) || false;    
    
    const dados = {
        pagina: pagina,
        nome: form.nome.value,
        email: form.email.value,
        endereco: form.endereco.value,
        telefone: form.tel.value,
        horario: form.horario.value,
        pergunta: form.pergunta.value,
    }
    
    if(!storage){
        localStorage.setItem('mensagens', JSON.stringify([dados]));
    }else{        
        localStorage.setItem('mensagens', JSON.stringify([...storage, dados]));
    }

    alert('Enviado!');
}

function handleLogin(){
    event.preventDefault();

    const form = event.target;

    if(form.login.value === 'admin' && form.senha.value === 'admin'){
        form.setAttribute('style', 'display: none');
        document.querySelector('.mensagens').setAttribute('style', 'display: flex');
        exibirMensagens();
    }else{
        alert('login o senha icorretos\nlogin: admin\nsenha: admin');
    }

}

function exibirMensagens(){
    let div = document.querySelector('.mensagens');
    const mensagens = JSON.parse(localStorage.getItem('mensagens'));
    
    if(!mensagens){
        div.innerHTML = "<p>Caixa de mensagens vazia. Cadastre mensagens nas paginas de contato para fazer o teste</p>";
        return;
    }        

    for(let mensagem of mensagens){
        const textEmail = document.createTextNode('E-mail: '+mensagem.email);
        const textEndenreco = document.createTextNode('Endereço: '+mensagem.endenreco);
        const textHorario = document.createTextNode('Horario: '+mensagem.horario);
        const textNome = document.createTextNode('Nome: '+mensagem.nome);
        const textPaginha = document.createTextNode('Pagina: '+mensagem.paginha);
        const textPergunta = document.createTextNode('Pergunta: '+mensagem.pergunta);
        const textTelefone = document.createTextNode('Telefone: '+mensagem.telefone);

        let pEmail = document.createElement('p');        
        pEmail.appendChild(textEmail);

        let pEndenreco = document.createElement('p');
        pEndenreco.appendChild(textEndenreco);

        let pHorario = document.createElement('p');
        pHorario.appendChild(textHorario);

        let pNome = document.createElement('p');
        pNome.appendChild(textNome);

        let pPaginha = document.createElement('p');
        pPaginha.appendChild(textPaginha);
               
        let pPergunta = document.createElement('p');
        pPergunta.appendChild(textPergunta);

        let pTelefone = document.createElement('p');
        pTelefone.appendChild(textTelefone);

        let divMensagem = document.createElement('div');
        divMensagem.appendChild(pEmail);
        divMensagem.appendChild(pEndenreco);
        divMensagem.appendChild(pHorario);
        divMensagem.appendChild(pNome);
        divMensagem.appendChild(pPaginha);
        divMensagem.appendChild(pPergunta);
        divMensagem.appendChild(pTelefone);

        div.appendChild(divMensagem);
    }

    let btnLimpar = document.createElement('button');
    btnLimpar.setAttribute('class', 'btn');
    btnLimpar.appendChild(document.createTextNode('Lipar Mensagens'));
    btnLimpar.addEventListener('click', limparMensagens);

    div.appendChild(btnLimpar);
}

function limparMensagens(){
    localStorage.removeItem('mensagens');
    alert('Mensagens deletadas');
    history.back();
}