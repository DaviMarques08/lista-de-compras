const inputMercadoria = document.getElementById("mercadoria")
const inputValor = document.getElementById("valor")
const botaoCalcular = document.getElementById("btn-cal")
const listaUl = document.getElementById("lista-produtos")
const campoTotal = document.getElementById("total")
const quantia = document.getElementById("qntd")
const btnsalvar = document.getElementById("salvarL");

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

    if(totalGeral.length > 0) {
        btnsalvar.style.display = "block"
    } else {
        btnsalvar.style.display = "none"
    }
}

function limparCampos() {
    inputMercadoria.value = ""
    inputValor.value = ""
    quantia.value = ""
    inputMercadoria.focus()
}


    btnsalvar.addEventListener("click", () => {
        if(totalGeral.length === 0) return;

        let textoArquivo = "=== MINHA LISTA DE MERCADO ===\n\n"
        let valorTotalGeral = 0;

        totalGeral.forEach ((item) => {
            const totalItem = item.preco * item.quantidade;
            textoArquivo += `- ${item.produto} | Qtd: ${item.quantidade} | Preço Un: ${item.preco.toFixed(2)} | Total Item: R$ ${totalItem.toFixed(2)} \n`;
            valorTotalGeral += totalItem;  
        })

        textoArquivo += `\n=============================\n`
        textoArquivo += `TOTAL DA COMPRA: R$ ${valorTotalGeral.toFixed(2)}`

        const blob = new Blob([textoArquivo], { type: "text/plain;charset=utf-8" });
        const linkinvisivel = document.createElement("a");
        linkinvisivel.href = URL.createObjectURL(blob);
        linkinvisivel.download = "LISTA-DE-COMPRAS.txt";

        linkinvisivel.click();
        URL.revokeObjectURL(linkinvisivel.href);
    })

renderizarProduto()