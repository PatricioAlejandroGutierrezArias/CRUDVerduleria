//cargar datos//
function socioNegocio() {
    recarga();
    const options1 = { method: 'GET' };
  
    fetch('http://164.90.186.2:2911/api/socio_negocio', options1)
      .then(response => response.json())
      .then(json => json.forEach(mostrarDatos11))
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  // Muestra los datos en la tabla aqui se incluye modal boton eliminar y modal boton actualizar//
  function mostrarDatos11(elemento, i, arr) {
    arr[i] = document.querySelector('.socionegocio').innerHTML +=
      `
      <tr>
      
      <td>${elemento.rut}</td>
      <td>${elemento.dv}</td>
      <td>${elemento.nombre}</td>
      <td>${elemento.apepater}</td>
      <td>${elemento.apemater}</td>
      <td>${elemento.tipo_socio_negocio}</td>
      <td>${elemento.telefono}</td>
      <td>${elemento.direccion}</td>
      <td>${elemento.comuna}</td>
      <td>${elemento.ciudad}</td>
      <td>${elemento.email}</td>
      <td class="text-end"><!-- Button trigger modal -->
      <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#eliminar${i}"><i class="bi bi-trash3-fill"></button></i>
      
      <!-- Modal -->
      <div class="modal fade" id="eliminar${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="eliminar" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header" id="eliminar">
              <h5 class="modal-title" id="eliminar">Eliminar Registro</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="eliminar">
              Esta seguro de eliminar el registro?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="eliminarSocioNegocio(${elemento.idsocio_negocio}, ${i})">Eliminar</button>
            </div>
          </div>
        </div>
      </div></td>
      <td class"text-start">
      <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#actualizarsocionegocio${i}" onclick="abrirModalActualizar(${elemento.idsocio_negocio}, '${elemento.rut}', '${elemento.dv}', '${elemento.nombre}', '${elemento.apepater}', '${elemento.apemater}', '${elemento.tipo_socio_negocio}', '${elemento.telefono}', '${elemento.direccion}', '${elemento.comuna}', '${elemento.ciudad}', '${elemento.email}', ${i})"><i class="bi bi-pencil-square"></button></i>
        <div class="modal fade" id="actualizarsocionegocio${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="actualizartitulo" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header" id="actualizar">
                <h5 class="modal-title" id="actualizartitulo">Actualizar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="ps-2 pe-4">
                  <div class="mb-3">
                    <label for="txt_rut_socio_negocio_actualiza${i}" class="form-label">Rut</label>
                    <input type="number" class="form-control campoNumerico" id="txt_rut_socio_negocio_actualiza${i}" name="Rut" placeholder="Rut sin punto ni Digito Verificador">
                  </div>
                  <div class="mb-3">
                    <label for="txt_dv_socio_negocio_actualiza${i}" class="form-label">DV</label>
                    <input type='number' class="form-control campoNumerico" id="txt_dv_socio_negocio_actualiza${i}" name="DV" placeholder="Digito Verificador"></input>
                  </div>
                  <div class="mb-3">
                  <label for="txt_nombre_socio_negocio_actualiza${i}" class="form-label">Nombre</label>
                  <input type='text' class="form-control campoTexto" id="txt_nombre_socio_negocio_actualiza${i}" name="Nombre" placeholder="Nombres"></input>
                </div>
                <div class="mb-3">
                <label for="txt_apepater_socio_negocio_actualiza${i}" class="form-label">Apellido Paterno</label>
                <input type='text' class="form-control campoTexto" id="txt_apepater_socio_negocio_actualiza${i}" name="Apellido Paterno" placeholder="Apellido Paterno"></input>
              </div>
              <div class="mb-3">
                <label for="txt_apemater_socio_negocio_actualiza${i}" class="form-label">Apellido Materno</label>
                <input type='text' class="form-control campoTexto" id="txt_apemater_socio_negocio_actualiza${i}" name="Apellido Materno" placeholder="Apellido Materno"></input>
              </div>
              <div class="mb-3">
                <label for="txt_tipo_socio_negocio_actualiza${i}" class="form-label">Tipo Socio</label>
                <input type='text' class="form-control campoTexto" id="txt_tipo_socio_negocio_actualiza${i}" name="Tipo Socio" placeholder="Cliente o Proveedor"></input>
              </div>
              <div class="mb-3">
                <label for="txt_telefono_socio_negocio_actualiza${i}" class="form-label">Telefono</label>
                <input type='number' class="form-control campoNumerico" id="txt_telefono_socio_negocio_actualiza${i}" name="Telefono" placeholder="Telefono"></input>
              </div>
              <div class="mb-3">
                <label for="txt_direccion_socio_negocio_actualiza${i}" class="form-label">Direccion</label>
                <input type='text' class="form-control" id="txt_direccion_socio_negocio_actualiza${i}" name="Direccion" placeholder="Direccion"></input>
              </div>
              <div class="mb-3">
                <label for="txt_comuna_socio_negocio_actualiza${i}" class="form-label">Comuna</label>
                <input type='text' class="form-control campoTexto" id="txt_comuna_socio_negocio_actualiza${i}" name="Comuna" placeholder="Comuna"></input>
              </div>
              <div class="mb-3">
                <label for="txt_ciudad_socio_negocio_actualiza${i}" class="form-label">Ciudad</label>
                <input type='text' class="form-control campoTexto" id="txt_ciudad_socio_negocio_actualiza${i}" name="Ciudad" placeholder="Ciudad"></input>
              </div>
              <div class="mb-3">
                <label for="txt_email_socio_negocio_actualiza${i}" class="form-label">Correo</label>
                <input type='email' class="form-control" id="txt_email_socio_negocio_actualiza${i}" name="Correo Electronico" placeholder="Correo Electronico"></input>
              </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="actualizarSocioNegocio(${elemento.idsocio_negocio}, ${i})">Actualizar</button>
              </div>
            </div>
          </div>
        </div>
      </td>
      </tr>
      
      `
  }
  //Recarga la tabla para que no se duplique//
  function recarga() {
    document.querySelector('tbody.socionegocio').innerHTML = '';
  }
  //Agregar Datos Nuevos//
  function agregarSocioNegocio() {
    recarga();
    if(validarFormulario()) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var rut_socionegocio = document.getElementById("txt_rut_socio_negocio").value;
    var dv_socionegocio = document.getElementById("txt_dv_socio_negocio").value;
    var nombre_socionegocio = document.getElementById("txt_nombre_socio_negocio").value;
    var apepater_socionegocio = document.getElementById("txt_apepater_socio_negocio").value;
    var apemater_socionegocio = document.getElementById("txt_apemater_socio_negocio").value;
    var tipo_socionegocio = document.getElementById("txt_tipo_socio_negocio").value;
    var telefono_socionegocio = document.getElementById("txt_telefono_socio_negocio").value;
    var direccion_socionegocio = document.getElementById("txt_direccion_socio_negocio").value;
    var comuna_socionegocio = document.getElementById("txt_comuna_socio_negocio").value;
    var ciudad_socionegocio = document.getElementById("txt_ciudad_socio_negocio").value;
    var email_socionegocio = document.getElementById("txt_email_socio_negocio").value;
    
    // Valida el RUT antes de agregar el socio negocio//
    if (!validarRut(rut_socionegocio, dv_socionegocio)) {
    alert("El RUT ingresado no es válido");
    return;
    }

    // Valida el correo electrónico antes de agregar el socio negocio//
    if (!validarEmail(email_socionegocio)) {
      alert("El correo electrónico ingresado no es válido");
      return;
    }

  
  
    var raw = JSON.stringify({
        "rut": rut_socionegocio,
        "dv": dv_socionegocio,
        "nombre": nombre_socionegocio,
        "apepater": apepater_socionegocio ,
        "apemater": apemater_socionegocio ,
        "tipo_socio_negocio": tipo_socionegocio,
        "telefono": telefono_socionegocio,
        "direccion": direccion_socionegocio,
        "comuna": comuna_socionegocio,
        "ciudad": ciudad_socionegocio,
        "email": email_socionegocio
        
      
    });
  
    var options3 = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
  
    fetch('http://164.90.186.2:2911/api/socio_negocio', options3)
      .then(response => {
        if (response.status == 200) {
          alert('Se agregó correctamente...');
          socioNegocio();
          limpiarFormulario();
        } else {
          alert('Error al agregar los datos...');
          limpiarFormulario();
        }
      })
      .catch(err => console.error(err));
  }}
  //Elimina los datos//
  function eliminarSocioNegocio(idsocio_negocio) {
    var options6 = {
      method: 'DELETE',
      redirect: 'follow'
    }
  
    fetch(`http://164.90.186.2:2911/api/socio_negocio/${idsocio_negocio}`, options6)
      .then(response => {
        if (response.status == 200) {
          alert('Se eliminó correctamente...');
          socioNegocio();
        } else {
          alert('Error al eliminar los datos...');
          
        }
      })
      .catch(err => console.error(err));
  }

  //Actualiza los datos//
  function actualizarSocioNegocio(idsocio_negocio, index) {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var rut_socionegocio_actualizar = document.getElementById(`txt_rut_socio_negocio_actualiza${index}`).value;
    var dv_socionegocio_actualizar = document.getElementById(`txt_dv_socio_negocio_actualiza${index}`).value;
    var nombre_socionegocio_actualizar = document.getElementById(`txt_nombre_socio_negocio_actualiza${index}`).value;
    var apepater_socionegocio_actualizar = document.getElementById(`txt_apepater_socio_negocio_actualiza${index}`).value;
    var apemater_socionegocio_actualizar = document.getElementById(`txt_apemater_socio_negocio_actualiza${index}`).value;
    var tipo_socionegocio_actualizar = document.getElementById(`txt_tipo_socio_negocio_actualiza${index}`).value;
    var telefono_socionegocio_actualizar = document.getElementById(`txt_telefono_socio_negocio_actualiza${index}`).value;
    var direccion_socionegocio_actualizar = document.getElementById(`txt_direccion_socio_negocio_actualiza${index}`).value;
    var comuna_socionegocio_actualizar = document.getElementById(`txt_comuna_socio_negocio_actualiza${index}`).value;
    var ciudad_socionegocio_actualizar = document.getElementById(`txt_ciudad_socio_negocio_actualiza${index}`).value;
    var email_socionegocio_actualizar = document.getElementById(`txt_email_socio_negocio_actualiza${index}`).value;

    // Valida el RUT antes de actualizar el socio negocio//
    if (!validarRut(rut_socionegocio_actualizar, dv_socionegocio_actualizar)) {
    alert("El RUT ingresado no es válido");
    return;
    }

    // Valida el correo electrónico antes de actualizar el socio negocio//
    if (!validarEmail(email_socionegocio_actualizar)) {
    alert("El correo electrónico ingresado no es válido");
    return;
    }

    // Validar que los campos cumplan las restricciones de clase//
  var campoTextoElements = document.getElementsByClassName('campoTexto');
  var campoNumericoElements = document.getElementsByClassName('campoNumerico');
  var isValid = true;

// Validar campos de texto//
for (var i = 0; i < campoTextoElements.length; i++) {
  var campoTexto = campoTextoElements[i];
  if (campoTexto.value !== '' && !/^\D+$/.test(campoTexto.value)) {
    var nombreCampo = campoTexto.name || campoTexto.getAttribute('label') || 'Campo';
    alert(`Advertencia: El campo "${nombreCampo}" solo permite letras.`);
    isValid = false;
    break;
  }
}

if (!isValid) {
  return;
}

// Validar campos numéricos//
for (var i = 0; i < campoNumericoElements.length; i++) {
  var campoNumerico = campoNumericoElements[i];
  if (campoNumerico.value !== '' && !/^\d+$/.test(campoNumerico.value)) {
    var nombreCampo = campoNumerico.id || campoNumerico.getAttribute('label') || 'Campo';
    alert(`Advertencia: El campo "${nombreCampo}" solo permite números.`);
    isValid = false;
    break;
  }
}

if (!isValid) {
  return;
}

   //Valida campo a campo si estan en blanco//
    if (rut_socionegocio_actualizar.trim() === '') {
      alert('Advertencia: El campo "Rut" no puede estar en blanco.');
      return;
    }
  
    if (dv_socionegocio_actualizar.trim() === '') {
      alert('Advertencia: El campo "dv" no puede estar en blanco.');
      return;
    }
  
    if (nombre_socionegocio_actualizar.trim() === '') {
      alert('Advertencia: El campo "Nombre" no puede estar en blanco.');
      return;
    }
  
    if (apepater_socionegocio_actualizar.trim() === '') {
      alert('Advertencia: El campo "Apellido Paterno" no puede estar en blanco.');
      return;
    }

    if (apemater_socionegocio_actualizar .trim() === '') {
      alert('Advertencia: El campo "Apellido Materno" no puede estar en blanco.');
      return;
    }

    if (tipo_socionegocio_actualizar.trim() === '') {
      alert('Advertencia: El campo "Tipo Socio" no puede estar en blanco.');
      return;
    }

    if (telefono_socionegocio_actualizar.trim() === '') {
      alert('Advertencia: El campo "Telefono" no puede estar en blanco.');
      return;
    }

    if (direccion_socionegocio_actualizar.trim() === '') {
      alert('Advertencia: El campo "Direccion" no puede estar en blanco.');
      return;
    }

    if (comuna_socionegocio_actualizar.trim() === '') {
      alert('Advertencia: El campo "Comuna" no puede estar en blanco.');
      return;
    }

    if (ciudad_socionegocio_actualizar .trim() === '') {
      alert('Advertencia: El campo "Ciudad" no puede estar en blanco.');
      return;
    }

    if (email_socionegocio_actualizar.trim() === '') {
      alert('Advertencia: El campo "Correo" no puede estar en blanco.');
      return;
    }
     
  
    var raw = JSON.stringify({
        "rut": rut_socionegocio_actualizar,
        "dv": dv_socionegocio_actualizar,
        "nombre": nombre_socionegocio_actualizar,
        "apepater": apepater_socionegocio_actualizar ,
        "apemater": apemater_socionegocio_actualizar ,
        "tipo_socio_negocio": tipo_socionegocio_actualizar,
        "telefono": telefono_socionegocio_actualizar,
        "direccion": direccion_socionegocio_actualizar,
        "comuna": comuna_socionegocio_actualizar,
        "ciudad": ciudad_socionegocio_actualizar,
        "email": email_socionegocio_actualizar
    });
  
    var options41 = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
  
    fetch(`http://164.90.186.2:2911/api/socio_negocio/${idsocio_negocio}`, options41)
      .then(response => {
        if (response.status == 200) {
          alert('Se actualizó correctamente...');
          socioNegocio();
        } else {
          alert('Error al actualizar los datos...');
        }
      })
      .catch(err => console.error(err));
  }
  //Abrir el modal actualizar precargando datos//
  function abrirModalActualizar(id, rut, dv, nombre, apepater, apemater, tipo, telefono, direccion, comuna, ciudad, email, index) {
    document.getElementById(`txt_rut_socio_negocio_actualiza${index}`).value = rut;
    document.getElementById(`txt_dv_socio_negocio_actualiza${index}`).value = dv;
    document.getElementById(`txt_nombre_socio_negocio_actualiza${index}`).value = nombre;
    document.getElementById(`txt_apepater_socio_negocio_actualiza${index}`).value = apepater;
    document.getElementById(`txt_apemater_socio_negocio_actualiza${index}`).value = apemater;
    document.getElementById(`txt_tipo_socio_negocio_actualiza${index}`).value = tipo;
    document.getElementById(`txt_telefono_socio_negocio_actualiza${index}`).value = telefono;
    document.getElementById(`txt_direccion_socio_negocio_actualiza${index}`).value = direccion;
    document.getElementById(`txt_comuna_socio_negocio_actualiza${index}`).value = comuna;
    document.getElementById(`txt_ciudad_socio_negocio_actualiza${index}`).value = ciudad;
    document.getElementById(`txt_email_socio_negocio_actualiza${index}`).value = email;
  }
  //Valida que el rut sea correcto//
  function validarRut(rut, dv) {
    let rutNumerico = parseInt(rut, 10);
    let M = 0;
    let S = 1;
    while (rutNumerico > 0) {
      S = (S + rutNumerico % 10 * (9 - (M++ % 6))) % 11;
      rutNumerico = Math.floor(rutNumerico / 10);
    }
    let digitoVerificadorCalculado = S > 0 ? String(S - 1) : "K";
    return digitoVerificadorCalculado === dv.toUpperCase();
  }
  //valida formato de email//
  function validarEmail(email) {
    // Expresión regular para validar el formato del email
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  //Valida que los campos no esten vacios//
  function validarCamposEnBlanco() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return false;
      }
    }
    return true;
  }
  //Validar campos Numericos//
  function validarCamposNumericos() {
    var inputsNumericos = document.getElementsByClassName('campoNumerico');
    for (var i = 0; i < inputsNumericos.length; i++) {
      if (isNaN(inputsNumericos[i].value)) {
        alert('Por favor, ingrese solo valores numéricos en los campos correspondientes.');
        return false;
      }
    }
    return true;
  }
  //Validar campos de texto//
  function validarCamposDeTexto() {
    var inputsTexto = document.getElementsByClassName('campoTexto');
    for (var i = 0; i < inputsTexto.length; i++) {
      if (!isNaN(inputsTexto[i].value)) {
        alert('Por favor, ingrese solo caracteres en los campos de texto.');
        return false;
      }
    }
    return true;
  }
  //Agrupacion de Validaciones//
  function validarFormulario() {
    if (validarCamposEnBlanco() && validarCamposNumericos() && validarCamposDeTexto()) {
      alert('Formulario válido. Se puede enviar.');
      return true;
    } else {
      alert('Hay errores en el formulario. Revise los campos e inténtelo nuevamente.');
      return false;
    }
  }
  //Agrupacion de Validaciones para el modal actualizar donde no hay campos en blancos//
  function validarFormularioActualizar() {
    if (validarCamposNumericos() && validarCamposDeTexto()) {
      alert('Formulario válido. Se puede enviar.');
      return true;
    } else {
      alert('Hay errores en el formulario. Revise los campos e inténtelo nuevamente.');
      return false;
    }
  }
  //Limpiar Formulario para que al abrir no muestre registro al agregar//
  function limpiarFormulario() {
    document.getElementById("txt_rut_socio_negocio").value = "";
    document.getElementById("txt_dv_socio_negocio").value = "";
    document.getElementById("txt_nombre_socio_negocio").value = "";
    document.getElementById("txt_apepater_socio_negocio").value = "";
    document.getElementById("txt_apemater_socio_negocio").value = "";
    document.getElementById("txt_tipo_socio_negocio").value = "";
    document.getElementById("txt_telefono_socio_negocio").value = "";
    document.getElementById("txt_direccion_socio_negocio").value = "";
    document.getElementById("txt_comuna_socio_negocio").value = "";
    document.getElementById("txt_ciudad_socio_negocio").value = "";
    document.getElementById("txt_email_socio_negocio").value = "";
    
  }
  



  
  