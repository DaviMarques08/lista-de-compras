const inputMercadoria = document.getElementById("mercadoria")
const inputValor = document.getElementById("valor")
const botaoCalcular = document.getElementById("btn-cal")
const listaUl = document.getElementById("lista-produtos")
const campoTotal = document.getElementById("total")
const quantia = document.getElementById("qntd")
const botaoResetar = document.getElementById("btn-res")

let totalGeral = 0

botaoCalcular.addEventListener ("click", () => {
    const mercadoria = inputMercadoria.value;
    const valor = parseFloat(inputValor.value)
    const qntd = parseInt(quantia.value)

    if (mercadoria === "" || isNaN(valor) || isNaN(qntd)) {
        alert("Preencha os campos corretamente");
        return;
    }

    const subtotal = valor * qntd
    totalGeral = totalGeral + subtotal

    const novaLi = document.createElement("li")
    novaLi.innerText = `${mercadoria} (x${qntd}) - Subtotal: R$ ${subtotal.toFixed(2)}`;

    listaUl.appendChild(novaLi);

    campoTotal.innerText = `TOTAL: R$ ${totalGeral.toFixed(2)}`;

    limparCampos()
    botaoResetar.style.display = 'block'
})

botaoResetar.addEventListener ("click", () => {
    listaUl.innerHTML = ""
    totalGeral = 0
    campoTotal.innerHTML = "TOTAL: R$ 0.00"
    botaoResetar.style.display = 'none';
})

function limparCampos() {
    inputMercadoria.value = ""
    inputValor.value = ""
    quantia.value = ""
    inputMercadoria.focus();
}