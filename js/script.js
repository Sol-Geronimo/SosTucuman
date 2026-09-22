document.addEventListener("DOMContentLoaded", () => {
  // Constantes de almacenamiento
  const CLAVE_NOMBRE = "sostucumanNombre";
  const CLAVE_EMAIL = "sostucumanEmail";

  // Elementos DOM
  const formLogin = document.getElementById("formLogin");
  const formRegistro = document.getElementById("formRegistro");
  const modalAuthEl = document.getElementById("modalAuth");
  const modalAuth = modalAuthEl ? new bootstrap.Modal(modalAuthEl) : null;

  /* ==========================================
     Validation & Error Helpers
     ========================================== */
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
    if (!form) return;
    form.reset();
    form.querySelectorAll(".is-invalid").forEach((input) => {
      input.classList.remove("is-invalid");
    });
    form.querySelectorAll(".invalid-feedback").forEach((el) => {
      el.textContent = "";
    });
  }

  /* ==========================================
     Manejo de sesión (localStorage)
     ========================================== */
  window.obtenerUsuario = function () {
    const nombreGuardado = localStorage.getItem(CLAVE_NOMBRE);
    const emailGuardado = localStorage.getItem(CLAVE_EMAIL);

    if (!nombreGuardado) return null;
    return { nombre: nombreGuardado, email: emailGuardado };
  };

  function guardarUsuario(nombre, email) {
    localStorage.setItem(CLAVE_NOMBRE, nombre);
    localStorage.setItem(CLAVE_EMAIL, email);
    if (typeof renderizarNavbar === "function") {
      renderizarNavbar();
    }
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_NOMBRE);
    localStorage.removeItem(CLAVE_EMAIL);
    if (typeof renderizarNavbar === "function") {
      renderizarNavbar();
    }
  }

  /* ==========================================
     Interceptador de clics (Botones protegidos)
     ========================================== */
  document.addEventListener("click", (e) => {
    // Verificamos si el elemento (o ancestro) tiene la clase 'btn-requiere-auth'
    const btnProtegido = e.target.closest(".btn-requiere-auth");

    if (btnProtegido) {
      const usuarioLogeado = obtenerUsuario();

      // Si NO está logeado, interceptamos la acción y abrimos el modal de autenticación
      if (!usuarioLogeado) {
        e.preventDefault();
        e.stopPropagation();

        console.log("Acción interceptada: Se requiere iniciar sesión.");

        if (modalAuth) {
          modalAuth.show();
        }
      } else {
        // Si SÍ está logeado, ejecutamos la acción privada
        const accion = btnProtegido.getAttribute("data-action");
        ejecutarAccionPrivada(accion, btnProtegido);
      }
    }
  });

  /* ==========================================
     Acciones para usuarios autenticados
     ========================================== */
  function ejecutarAccionPrivada(accion, elemento) {
    switch (accion) {
      case "crear-reporte":
        const modalReporteEl = document.getElementById("modalNuevoReporte");
        if (modalReporteEl) {
          const modalReporte =
            bootstrap.Modal.getInstance(modalReporteEl) ||
            new bootstrap.Modal(modalReporteEl);
          modalReporte.show();
        }
        break;

      case "votar-reporte":
        gestionarVotoReporte(elemento);
        break;

      default:
        console.log("Acción permitida.");
    }
  }

  /* Render de navbar */
  function renderizarNavbar() {
    const usuario = obtenerUsuario();
    const btnHamburguesa = document.getElementById("btnHamburguesa");
    const navbarContent = document.getElementById("navbarContent");
    const navAreaAuth = document.getElementById("navAreaAuth");
    const navAreaUser = document.getElementById("navAreaUser");

    if (!usuario) {
      if (btnHamburguesa) btnHamburguesa.classList.remove("d-none");
      if (navbarContent) navbarContent.classList.add("collapse");
      if (navAreaUser) {
        navAreaUser.classList.add("d-none");
        navAreaUser.innerHTML = "";
      }

      if (navAreaAuth) {
        navAreaAuth.innerHTML = `
        <button type="button" id="btnAbrirLogin"
          class="btn btn-outline-primary px-3 py-1.5 rounded-3 fw-semibold text-nowrap" data-bs-toggle="modal"
          data-bs-target="#modalAuth" data-auth-tab="login">
          Iniciar sesión
        </button>
        <button type="button" id="btnAbrirRegistro"
          class="btn btn-primary px-3 py-1.5 rounded-3 fw-semibold text-white text-nowrap" data-bs-toggle="modal"
          data-bs-target="#modalAuth" data-auth-tab="registro">
          Registrarse
        </button>
      `;
      }
      return;
    }

    if (btnHamburguesa) btnHamburguesa.classList.add("d-none");
    if (navbarContent) navbarContent.classList.remove("show");
    if (navAreaAuth) navAreaAuth.innerHTML = "";

    const inicial = usuario.nombre.trim().charAt(0).toUpperCase();

    if (navAreaUser) {
      navAreaUser.classList.remove("d-none");
      navAreaUser.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-light border shadow-sm dropdown-toggle rounded-pill px-2 px-sm-3 py-1 fw-semibold d-flex align-items-center gap-2"
          type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #f8f9fa;">
          
          <span class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm"
            style="width: 35px; height: 35px; font-size: 0.95rem; min-width: 35px;">
            ${inicial}
          </span>
          
          <span class="text-dark d-none d-sm-inline-block text-truncate" style="max-width: 120px;">
            ${usuario.nombre.split(" ")[0]}
          </span>
        </button>
        
        <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 rounded-4 overflow-hidden" style="min-width: 240px;">
          <li class="bg-light px-3 py-3 border-bottom">
            <div class="d-flex align-items-center gap-2">
              <span class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0"
                style="width: 40px; height: 40px; font-size: 1.1rem;">
                ${inicial}
              </span>
              <div class="overflow-hidden">
                <p class="mb-0 fw-bold text-dark text-truncate" style="font-size: 0.95rem;">${usuario.nombre}</p>
                <small class="text-muted text-truncate d-block" style="font-size: 0.8rem;">${usuario.email}</small>
              </div>
            </div>
          </li>
          <li class="pt-1">
            <a class="dropdown-item py-2 px-3 d-flex align-items-center gap-2 fw-medium" href="#reportes">
              <i class="bi bi-journal-text text-primary fs-5"></i> Mis reportes
            </a>
          </li>
          <li><hr class="dropdown-divider my-1" /></li>
          <li class="pb-1">
            <button class="dropdown-item text-danger py-2 px-3 d-flex align-items-center gap-2 fw-medium" id="btnCerrarSesion" type="button">
              <i class="bi bi-box-arrow-right fs-5"></i> Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    `;

      const btnCerrar = document.getElementById("btnCerrarSesion");
      if (btnCerrar) btnCerrar.addEventListener("click", cerrarSesion);
    }
  }

  /* Formulario Login */
  if (formLogin) {
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
        mostrarError(
          inputEmail,
          errorEmail,
          "Ingresá un correo electrónico válido.",
        );
        esValido = false;
      }
      if (inputPassword.value.trim().length < 4) {
        mostrarError(
          inputPassword,
          errorPassword,
          "La contraseña debe tener al menos 4 caracteres.",
        );
        esValido = false;
      }

      if (!esValido) return;

      const nombreSimulado = inputEmail.value.split("@")[0];
      guardarUsuario(nombreSimulado, inputEmail.value.trim());
      renderizarNavbar();
      limpiarFormulario(formLogin);
      if (modalAuth) modalAuth.hide();
    });
  }

  /* Formulario Registro */
  if (formRegistro) {
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
        mostrarError(
          inputEmail,
          errorEmail,
          "Ingresá un correo electrónico válido.",
        );
        esValido = false;
      }
      if (inputPassword.value.length < 6) {
        mostrarError(
          inputPassword,
          errorPassword,
          "La contraseña debe tener al menos 6 caracteres.",
        );
        esValido = false;
      }
      if (
        inputConfirm.value !== inputPassword.value ||
        inputConfirm.value === ""
      ) {
        mostrarError(
          inputConfirm,
          errorConfirm,
          "Las contraseñas no coinciden.",
        );
        esValido = false;
      }

      if (!esValido) return;

      guardarUsuario(inputNombre.value.trim(), inputEmail.value.trim());
      renderizarNavbar();
      limpiarFormulario(formRegistro);
      if (modalAuth) modalAuth.hide();
    });
  }

  if (modalAuthEl) {
    modalAuthEl.addEventListener("hidden.bs.modal", () => {
      limpiarFormulario(formLogin);
      limpiarFormulario(formRegistro);
    });
  }

  renderizarNavbar();
});

/* ========================================================
   LÓGICA DEL MODAL DE NUEVO REPORTE Y MAPA INTEGRADOR
   ======================================================== */

const formNuevoReporte = document.getElementById("formNuevoReporte");
const inputFoto = document.getElementById("inputFoto");
const previewContainer = document.getElementById("previewContainer");
const imgPreview = document.getElementById("imgPreview");
const btnQuitarFoto = document.getElementById("btnQuitarFoto");
const btnGeolocalizar = document.getElementById("btnGeolocalizar");
const inputUbicacion = document.getElementById("inputUbicacion");
const mapContainer = document.getElementById("mapContainer");
const googleMapIframe = document.getElementById("googleMapIframe");
const alertaNuevoReporte = document.getElementById("alertaNuevoReporte");

let fotoBase64 = "";

function actualizarMapaGoogle(query) {
  if (!query || query.trim() === "") {
    mapContainer.style.display = "none";
    return;
  }
  const ubicacionEncoded = encodeURIComponent(query.trim());
  googleMapIframe.src = `https://maps.google.com/maps?q=${ubicacionEncoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  mapContainer.style.display = "block";
}

if (inputUbicacion) {
  inputUbicacion.addEventListener("change", (e) => {
    actualizarMapaGoogle(e.target.value);
  });
}

if (btnGeolocalizar) {
  btnGeolocalizar.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      btnGeolocalizar.disabled = true;
      btnGeolocalizar.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords = `${latitude},${longitude}`;

          inputUbicacion.value = coords;
          actualizarMapaGoogle(coords);

          btnGeolocalizar.disabled = false;
          btnGeolocalizar.innerHTML = `<i class="bi bi-check-lg text-success"></i> <span class="d-none d-sm-inline">Ubicado</span>`;
        },
        () => {
          btnGeolocalizar.disabled = false;
          btnGeolocalizar.innerHTML = `<i class="bi bi-crosshair"></i> <span class="d-none d-sm-inline">Mi ubicación</span>`;
          alert("No se pudo obtener la ubicación automáticamente.");
        },
      );
    }
  });
}

if (inputFoto) {
  inputFoto.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        fotoBase64 = event.target.result;
        imgPreview.src = fotoBase64;
        previewContainer.classList.remove("d-none");
      };
      reader.readAsDataURL(file);
    }
  });
}

if (btnQuitarFoto) {
  btnQuitarFoto.addEventListener("click", () => {
    inputFoto.value = "";
    fotoBase64 = "";
    imgPreview.src = "";
    previewContainer.classList.add("d-none");
  });
}

if (formNuevoReporte) {
  formNuevoReporte.addEventListener("submit", (e) => {
    e.preventDefault();

    if (alertaNuevoReporte) {
      alertaNuevoReporte.textContent = "";
      alertaNuevoReporte.classList.add("d-none");
    }

    if (!formNuevoReporte.checkValidity()) {
      e.stopPropagation();
      formNuevoReporte.classList.add("was-validated");
      return;
    }

    // Acceso seguro a la función expuesta
    const usuario =
      typeof window.obtenerUsuario === "function"
        ? window.obtenerUsuario()
        : null;

    if (!usuario) {
      if (alertaNuevoReporte) {
        alertaNuevoReporte.textContent =
          "Debes iniciar sesión para publicar un reporte.";
        alertaNuevoReporte.classList.remove("d-none");
      }
      return;
    }

    const nuevoReporte = {
      id: "REP-" + Date.now(),
      categoria: document.getElementById("selectCategoria").value,
      titulo: document.getElementById("inputTitulo").value.trim(),
      ubicacion: document.getElementById("inputUbicacion").value.trim(),
      descripcion: document.getElementById("textareaDescripcion").value.trim(),
      foto: fotoBase64,
      usuario: usuario.nombre,
      usuarioEmail: usuario.email,
      fecha: new Date().toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      estado: "Pendiente",
    };

    const reportesExistentes = JSON.parse(
      localStorage.getItem("reportes_sos") || "[]",
    );
    reportesExistentes.unshift(nuevoReporte);
    localStorage.setItem("reportes_sos", JSON.stringify(reportesExistentes));

    // 1. Cerrar el modal
    const modalElement = document.getElementById("modalNuevoReporte");
    if (modalElement) {
      const modalBootstrap =
        bootstrap.Modal.getInstance(modalElement) ||
        new bootstrap.Modal(modalElement);
      modalBootstrap.hide();
    }

    // 2. Reiniciar formulario e interfaz
    formNuevoReporte.reset();
    formNuevoReporte.classList.remove("was-validated");
    fotoBase64 = "";

    if (previewContainer) previewContainer.classList.add("d-none");
    if (mapContainer) mapContainer.style.display = "none";
    if (googleMapIframe) googleMapIframe.src = "";

    if (btnGeolocalizar) {
      btnGeolocalizar.disabled = false;
      btnGeolocalizar.innerHTML = `<i class="bi bi-crosshair"></i> <span class="d-none d-sm-inline">Mi ubicación</span>`;
    }

    // 3. Recargar el Feed
    if (typeof cargarReportes === "function") {
      cargarReportes();
    }
  });
}

/*Lógica de Votación (Likes / Dislikes)*/
function gestionarVotoReporte(btnAccionado) {
  // Busco el boton correcto al presionar en una <i> por ejemplo
  const btn = btnAccionado.closest("[data-voto]");
  if (!btn) return;

  // Se requiere que haya un usuario autenticado para registrar el voto.
  const usuario = obtenerUsuario();
  if (!usuario) return;

  const tipoVoto = btn.getAttribute("data-voto"); // Retorna "like" o "dislike"
  const reporteId = btn.getAttribute("data-reporte-id"); // ID único del reporte

  // Buscar la tarjeta contenedora (.card) para manipular sus botones
  const contenedor = btn.closest(".card");
  if (!contenedor) return;

  const btnLike = contenedor.querySelector('[data-voto="like"]');
  const btnDislike = contenedor.querySelector('[data-voto="dislike"]');

  // Seleccionar los spans encargados de mostrar los contadores numéricos
  const spanLike = btnLike.querySelector(".count-like");
  const spanDislike = btnDislike.querySelector(".count-dislike");

  if (!spanLike || !spanDislike) return;

  let likes = parseInt(spanLike.innerText) || 0;
  let dislikes = parseInt(spanDislike.innerText) || 0;

  const claveVotoUsuario = "voto_" + usuario.email + "_" + reporteId; // Guarda qué votó este usuario específico
  const claveLikesTotal = "likes_total_" + reporteId; // Guarda el total acumulado de likes del reporte
  const claveDislikesTotal = "dislikes_total_" + reporteId; // Guarda el total acumulado de dislikes del reporte

  // Obtener el voto registrado previamente por el usuario (si existe)
  const votoPrevio = localStorage.getItem(claveVotoUsuario);

  // 6. Lógica de votación:

  if (votoPrevio === tipoVoto) {
    localStorage.removeItem(claveVotoUsuario);
    if (tipoVoto === "like") {
      likes = Math.max(0, likes - 1);
      btnLike.classList.remove("btn-success");
      btnLike.classList.add("btn-outline-success");
    } else {
      dislikes = Math.max(0, dislikes - 1);
      btnDislike.classList.remove("btn-danger");
      btnDislike.classList.add("btn-outline-danger");
    }
  } else {
    // Si ya tenía un voto previo diferente, se descuenta de su opción anterior
    if (votoPrevio === "like") {
      likes = Math.max(0, likes - 1);
      btnLike.classList.remove("btn-success");
      btnLike.classList.add("btn-outline-success");
    } else if (votoPrevio === "dislike") {
      dislikes = Math.max(0, dislikes - 1);
      btnDislike.classList.remove("btn-danger");
      btnDislike.classList.add("btn-outline-danger");
    }

    // Registrar la nueva elección del usuario en localStorage
    localStorage.setItem(claveVotoUsuario, tipoVoto);

    // Sumar el nuevo voto y resaltar visualmente el botón seleccionado
    if (tipoVoto === "like") {
      likes++;
      btnLike.classList.remove("btn-outline-success");
      btnLike.classList.add("btn-success");
    } else {
      dislikes++;
      btnDislike.classList.remove("btn-outline-danger");
      btnDislike.classList.add("btn-danger");
    }
  }

  // Actualizar la interfaz de usuario
  spanLike.innerText = likes;
  spanDislike.innerText = dislikes;

  // 8. Guardar el estado actualizado de los contadores en localStorage
  localStorage.setItem(claveLikesTotal, likes);
  localStorage.setItem(claveDislikesTotal, dislikes);
}
