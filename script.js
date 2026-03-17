const login = document.getElementById("login")
const cadastro = document.getElementById("cadastro")

function mostrarCadastro() {
  login.classList.add("hidden");
  cadastro.classList.remove("hidden");
}

function mostrarLogin() {
  cadastro.classList.add("hidden");
  login.classList.remove("hidden");
}

function cadastrar() {
  const user = newUser.value;
  const pass = newPass.value;
  const tipo = tipoUser.value;

  if (!user || !pass) return alert("Preencha tudo!");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push({ user, pass, tipo });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Conta criada!");
  mostrarLogin();
}

function login() {
  const user = loginUser.value;
  const pass = loginPass.value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const encontrado = usuarios.find(u => u.user === user && u.pass === pass);

  if (encontrado) {
    login.classList.add("hidden");
    dashboard.classList.remove("hidden");
    usuarioLogado.innerText = user;

    carregarUsuarios();
  } else {
    alert("Login inválido");
  }
}

function logout() {
  dashboard.classList.add("hidden");
  login.classList.remove("hidden");
}

/* MENU */
function mostrarPagina(pagina) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pagina).classList.remove("hidden");
}

/* NOTAS */
function addNota() {
  const nota = novaNota.value;
  if (!nota) return;

  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  notas.push(nota);

  localStorage.setItem("notas", JSON.stringify(notas));
  novaNota.value = "";
  carregarNotas();
}

function carregarNotas() {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  listaNotas.innerHTML = "";

  notas.forEach(n => {
    let li = document.createElement("li");
    li.textContent = n;
    listaNotas.appendChild(li);
  });
}

/* USUÁRIOS */
function carregarUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  listaUsuarios.innerHTML = "";

  usuarios.forEach(u => {
    let li = document.createElement("li");
    li.textContent = `${u.user} (${u.tipo})`;
    listaUsuarios.appendChild(li);
  });
}
