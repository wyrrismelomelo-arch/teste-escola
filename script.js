document.addEventListener("DOMContentLoaded", function () {

    const loginDiv = document.getElementById("login");
    const cadastroDiv = document.getElementById("cadastro");
    const sistemaDiv = document.getElementById("sistema");

    // MOSTRAR CADASTRO
    window.mostrarCadastro = function () {
        loginDiv.classList.add("hidden");
        cadastroDiv.classList.remove("hidden");
    }

    // VOLTAR LOGIN
    window.mostrarLogin = function () {
        cadastroDiv.classList.add("hidden");
        loginDiv.classList.remove("hidden");
    }

    // CADASTRAR
    window.cadastrar = function () {
        const user = document.getElementById("newUser").value;
        const pass = document.getElementById("newPass").value;
        const tipo = document.getElementById("tipoUser")?.value || "aluno";

        if (!user || !pass) {
            alert("Preencha tudo!");
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        usuarios.push({ user, pass, tipo });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Conta criada!");

        mostrarLogin();
    }

    // LOGIN
    window.login = function () {
        const user = document.getElementById("loginUser").value;
        const pass = document.getElementById("loginPass").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const encontrado = usuarios.find(u => u.user === user && u.pass === pass);

        if (!encontrado) {
            alert("Usuário inválido!");
            return;
        }

        localStorage.setItem("logado", JSON.stringify(encontrado));

        loginDiv.classList.add("hidden");
        sistemaDiv.classList.remove("hidden");

        document.getElementById("usuarioLogado").innerText = user;

        carregarUsuarios();
    }

    // LOGOUT
    window.logout = function () {
        localStorage.removeItem("logado");
        sistemaDiv.classList.add("hidden");
        loginDiv.classList.remove("hidden");
    }

    // TROCAR PÁGINA
    window.mostrarPagina = function (pagina) {
        document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
        document.getElementById(pagina).classList.remove("hidden");
    }

    // ADICIONAR NOTA
    window.addNota = function () {
        const nota = document.getElementById("novaNota").value;

        if (!nota) return;

        const li = document.createElement("li");
        li.innerText = nota;

        document.getElementById("listaNotas").appendChild(li);
    }

    // LISTAR USUÁRIOS
    function carregarUsuarios() {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const lista = document.getElementById("listaUsuarios");

        if (!lista) return;

        lista.innerHTML = "";

        usuarios.forEach(u => {
            const li = document.createElement("li");
            li.innerText = `${u.user} (${u.tipo})`;
            lista.appendChild(li);
        });
    }

});
