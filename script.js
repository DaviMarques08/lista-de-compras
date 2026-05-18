const inputMercadoria = document.getElementById("mercadoria")
const inputValor = document.getElementById("valor")
const botaoCalcular = document.getElementById("btn-cal")
const listaUl = document.getElementById("lista-produtos")
const campoTotal = document.getElementById("total")
const quantia = document.getElementById("qntd")

let totalGeral = []
totalGeral = JSON.parse(localStorage.getItem("minhaLista")) || []

botaoCalcular.addEventListener("click", () => {
    const produto = inputMercadoria.value
    const quantidade = parseFloat(quantia.value)
    const preco = parseFloat(inputValor.value)

    if(produto === "" || isNaN(quantidade) || isNaN(preco)) {
        alert("Preencha os campos corretamente antes de continuar")
        return;
    }

    const novoProduto = {
        id: Date.now(),
        produto: produto,
        quantidade: quantidade,
        preco: preco
    }

    totalGeral.push(novoProduto);
    renderizarProduto()
    limparCampos()
})

function renderizarProduto(){
    listaUl.innerHTML = ""
    let somaP = 0

    totalGeral.forEach((almnt) => {
        const novaLi = document.createElement("li");

        const spanTexto = document.createElement("span")
        spanTexto.innerText = `${almnt.produto} - R$ ${almnt.preco.toFixed(2)} [x${almnt.quantidade}]`

        const btnExcluir = document.createElement("button")
        btnExcluir.innerText = "❌"
        btnExcluir.classList.add("btn-del")

        btnExcluir.addEventListener("click", () => {
            totalGeral = totalGeral.filter(item => item.id !== almnt.id);

            listaUl.innerHTML = ""
            renderizarProduto();
            inputMercadoria.focus()
        })
        
        const btnEditar = document.createElement("button")
        btnEditar.innerText = "✏️"
        btnEditar.classList.add("btn-edit")

        btnEditar.addEventListener("click", () => {
            inputMercadoria.value = almnt.produto
            quantia.value = almnt.quantidade
            inputValor.value = almnt.preco

            totalGeral = totalGeral.filter(item => item.id !== almnt.id);
            renderizarProduto()
            inputMercadoria.focus()
        })

        novaLi.appendChild(btnEditar)
        novaLi.appendChild(btnExcluir)
        novaLi.appendChild(spanTexto)
        listaUl.appendChild(novaLi)

        somaP += (almnt.preco * almnt.quantidade)
    })

    campoTotal.innerText = `Total: R$ ${somaP.toFixed(2)}`
    localStorage.setItem("minhaLista", JSON.stringify(totalGeral));
}

function limparCampos() {
    inputMercadoria.value = ""
    inputValor.value = ""
    quantia.value = ""
    inputMercadoria.focus()
}

renderizarProduto()