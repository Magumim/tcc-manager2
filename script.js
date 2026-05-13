import { db, collection, addDoc } from "./firebase.js";

async function salvarParte() {
  const nome = document.getElementById("nome").value.trim();
  const parte = document.getElementById("parte").value.trim();
  const texto = document.getElementById("texto").value.trim();
  const status = document.getElementById("status").value;

  if (!nome || !parte || !texto) {
    alert("Preenche tudo aí, gênio do TCC. O site não lê pensamento ainda.");
    return;
  }

  const lista = document.getElementById("lista");

  const inicial = nome.charAt(0).toUpperCase();

  let classeStatus = "pendente";

  if (status === "Fazendo") {
    classeStatus = "fazendo";
  } else if (status === "Concluído") {
    classeStatus = "concluido";
  }

  const data = new Date().toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });

  try {
    await addDoc(collection(db, "tcc"), {
      nome: nome,
      parte: parte,
      texto: texto,
      status: status,
      data: new Date()
    });

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
        <small>📅 ${data}</small>
      </div>

      <div class="actions">
        <button class="edit">✏️</button>
        <button class="delete" onclick="this.closest('.item-card').remove()">🗑️</button>
      </div>
    `;

    lista.prepend(card);

    document.getElementById("parte").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("status").value = "Pendente";

    alert("Parte salva no Firebase com sucesso!");
  } catch (erro) {
    console.error("Erro ao salvar no Firebase:", erro);
    alert("Deu erro ao salvar no Firebase. Abre o console com F12 pra ver o drama.");
  }
}

window.salvarParte = salvarParte;