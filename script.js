async function buscaEndereco(cep){
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""

    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json()
        if(consultaCEPConvertida.erro){
            throw Error('CEP inexistente!')
        }

        var cidade = document.getElementById('cidade')
        var logradouro = document.getElementById('endereco')
        var estado = document.getElementById('estado')

        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida

    } catch(erro){
        mensagemErro.innerHTML =
            `<p style="
                margin-top: 15px;
                color: red;
            ">
                CEP inválido. Tente novamente!
            </p>`
        console.log(erro)
    }
}

let ceps = ['01001000','01001001']
let conjuntoCeps = ceps.map((valores) => buscaEndereco(valores))
console.log(conjuntoCeps)
Promise.all(conjuntoCeps).then((respostas) => console.log(respostas))

var cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))