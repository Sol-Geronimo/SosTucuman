document.addEventListener("DOMContentLoaded", () => {
  const CLAVE_NOMBRE = "sostucumanNombre";
  const CLAVE_EMAIL = "sostucumanEmail";

  const navArea = document.getElementById("navArea");
  const formLogin = document.getElementById("formLogin");
  const formRegistro = document.getElementById("formRegistro");
  const modalAuthEl = document.getElementById("modalAuth");
  const modalAuth = new bootstrap.Modal(modalAuthEl);

  /* Validación de campos*/

  function esEmailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
  }

  function mostrarError(input, elementoError, mensaje) {
    input.classList.add("is-invalid");
    elementoError.textContent = mensaje;
  }

  function limpiarError(input, elementoError) {
    input.classList.remove("is-invalid");
    elementoError.textContent = "";
  }

  function limpiarFormulario(form) {
    form.reset();
    form.querySelectorAll(".is-invalid").forEach((input) => {
      input.classList.remove("is-invalid");
    });
    form.querySelectorAll(".invalid-feedback").forEach((el) => {
      el.textContent = "";
    });
  }

  /*Manejo de sesión localStorage */

  function obtenerUsuario() {
    const nombreGuardado = localStorage.getItem(CLAVE_NOMBRE);
    const emailGuardado = localStorage.getItem(CLAVE_EMAIL);

    if (!nombreGuardado) {
      return null; // no hay nadie logueado
    }

    return { nombre: nombreGuardado, email: emailGuardado };
  }

  function guardarUsuario(nombre, email) {
    localStorage.setItem(CLAVE_NOMBRE, nombre);
    localStorage.setItem(CLAVE_EMAIL, email);
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_NOMBRE);
    localStorage.removeItem(CLAVE_EMAIL);
    renderizarNavbar();
  }

  /* Render de navbar */

  function renderizarNavbar() {
    const usuario = obtenerUsuario();

    if (!usuario) {
      navArea.innerHTML = `
        <button type="button" id="btnAbrirLogin"
          class="btn btn-outline-primary px-3 py-2 rounded-3 fw-semibold" data-bs-toggle="modal"
          data-bs-target="#modalAuth" data-auth-tab="login">
          Iniciar sesión
        </button>
        <button type="button" id="btnAbrirRegistro"
          class="btn btn-primary px-3 py-2 rounded-3 fw-semibold text-white" data-bs-toggle="modal"
          data-bs-target="#modalAuth" data-auth-tab="registro">
          Registrarse
        </button>
      `;
      return;
    }

    const inicial = usuario.nombre.trim().charAt(0).toUpperCase();

    navArea.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle rounded-3 fw-semibold d-flex align-items-center gap-2"
          type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold"
            style="width: 28px; height: 28px; font-size: 0.85rem;">
            ${inicial}
          </span>
          ${usuario.nombre.split(" ")[0]}
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
          <li><h6 class="dropdown-header">${usuario.email}</h6></li>
          <li><a class="dropdown-item" href="#reportes"><i class="bi bi-clipboard-check me-2"></i>Mis reportes</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <button class="dropdown-item text-danger" id="btnCerrarSesion" type="button">
              <i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    `;

    document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
  }

  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-auth-tab]");
    if (!boton) return;

    const idPestaña = boton.dataset.authTab === "registro" ? "tab-registro-btn" : "tab-login-btn";
    const pestaña = document.getElementById(idPestaña);
    bootstrap.Tab.getOrCreateInstance(pestaña).show();
  });

  /*  Validación y envío: LOGIN */

  formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const inputEmail = document.getElementById("loginEmail");
    const inputPassword = document.getElementById("loginPassword");
    const errorEmail = document.getElementById("loginEmailError");
    const errorPassword = document.getElementById("loginPasswordError");

    limpiarError(inputEmail, errorEmail);
    limpiarError(inputPassword, errorPassword);

    let esValido = true;

    if (!esEmailValido(inputEmail.value)) {
      mostrarError(inputEmail, errorEmail, "Ingresá un correo electrónico válido.");
      esValido = false;
    }

    if (inputPassword.value.trim().length < 4) {
      mostrarError(inputPassword, errorPassword, "La contraseña debe tener al menos 4 caracteres.");
      esValido = false;
    }

    if (!esValido) return;

    // Sin backend real: tomamos el nombre a partir del email para simular el login
    const nombreSimulado = inputEmail.value.split("@")[0];
    guardarUsuario(nombreSimulado, inputEmail.value.trim());

    renderizarNavbar();
    limpiarFormulario(formLogin);
    modalAuth.hide();
  });

  /* Validación y envío: REGISTRO */

  formRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const inputNombre = document.getElementById("regNombre");
    const inputEmail = document.getElementById("regEmail");
    const inputPassword = document.getElementById("regPassword");
    const inputConfirm = document.getElementById("regPasswordConfirm");

    const errorNombre = document.getElementById("regNombreError");
    const errorEmail = document.getElementById("regEmailError");
    const errorPassword = document.getElementById("regPasswordError");
    const errorConfirm = document.getElementById("regPasswordConfirmError");

    limpiarError(inputNombre, errorNombre);
    limpiarError(inputEmail, errorEmail);
    limpiarError(inputPassword, errorPassword);
    limpiarError(inputConfirm, errorConfirm);

    let esValido = true;

    if (inputNombre.value.trim().length < 3) {
      mostrarError(inputNombre, errorNombre, "Ingresá tu nombre completo.");
      esValido = false;
    }

    if (!esEmailValido(inputEmail.value)) {
      mostrarError(inputEmail, errorEmail, "Ingresá un correo electrónico válido.");
      esValido = false;
    }

    if (inputPassword.value.length < 6) {
      mostrarError(inputPassword, errorPassword, "La contraseña debe tener al menos 6 caracteres.");
      esValido = false;
    }

    if (inputConfirm.value !== inputPassword.value || inputConfirm.value === "") {
      mostrarError(inputConfirm, errorConfirm, "Las contraseñas no coinciden.");
      esValido = false;
    }

    if (!esValido) return;

    guardarUsuario(inputNombre.value.trim(), inputEmail.value.trim());

    renderizarNavbar();
    limpiarFormulario(formRegistro);
    modalAuth.hide();
  });

  /* ---------- Limpieza al cerrar el modal ---------- */

  modalAuthEl.addEventListener("hidden.bs.modal", () => {
    limpiarFormulario(formLogin);
    limpiarFormulario(formRegistro);
  });

  /* ---------- Estado inicial al cargar la página ---------- */

  renderizarNavbar();
});