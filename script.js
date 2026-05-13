import { db, collection, addDoc, getDocs } from "./firebase.js";

function criarCard(nome, parte, texto, status, dataFormatada) {
  const lista = document.getElementById("lista");
  const inicial = nome.charAt(0).toUpperCase();

  let classeStatus = "pendente";

  if (status === "Fazendo") {
    classeStatus = "fazendo";
  } else if (status === "Concluído") {
    classeStatus = "concluido";
  }

  const card = document.createElement("div");
  card.className = "item-card";

  card.innerHTML = `
    <div class="avatar">${inicial}</div>

    <div class="info">
      <h3>${nome}</h3>
      <p>${parte}</p>
    </div>

    <div class="preview">
      <p>${texto}</p>
    </div>

    <div class="status-area">
      <span class="badge ${classeStatus}">${status}</span>
      <small>📅 ${dataFormatada}</small>
    </div>

    <div class="actions">
      <button class="edit">✏️</button>
      <button class="delete" onclick="this.closest('.item-card').remove()">🗑️</button>
    </div>
  `;

  lista.prepend(card);
}

async function salvarParte() {
  const nome = document.getElementById("nome").value.trim();
  const parte = document.getElementById("parte").value.trim();
  const texto = document.getElementById("texto").value.trim();
  const status = document.getElementById("status").value;

  if (!nome || !parte || !texto) {
    alert("Preenche tudo aí, gênio do TCC. O site não lê pensamento ainda.");
    return;
  }

  const dataAtual = new Date();

  const dataFormatada = dataAtual.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });

  try {
    await addDoc(collection(db, "tcc"), {
      nome,
      parte,
      texto,
      status,
      data: dataAtual
    });

    criarCard(nome, parte, texto, status, dataFormatada);

    document.getElementById("parte").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("status").value = "Pendente";

    alert("Parte salva no Firebase com sucesso!");
  } catch (erro) {
    console.error("Erro ao salvar no Firebase:", erro);
    alert("Deu erro ao salvar no Firebase. Abre o console com F12.");
  }
}

async function carregarPartes() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "tcc"));

    querySnapshot.forEach((documento) => {
      const dados = documento.data();

      let dataFormatada = "Sem data";

      if (dados.data) {
        dataFormatada = dados.data.toDate().toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short"
        });
      }

      criarCard(
        dados.nome,
        dados.parte,
        dados.texto,
        dados.status,
        dataFormatada
      );
    });
  } catch (erro) {
    console.error("Erro ao carregar dados:", erro);
    alert("Erro ao carregar dados do Firebase.");
  }
}

window.salvarParte = salvarParte;

carregarPartes();
