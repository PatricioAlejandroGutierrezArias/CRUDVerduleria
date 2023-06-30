//Carga de Datos //

function formaPago() {
    recarga();
    const options1 = { method: 'GET' };
  
    fetch('http://164.90.186.2:2911/api/forma_pago', options1)
      .then(response => response.json())
      .then(json => json.forEach(mostrarDatos2))
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  // Muestra los datos en la tabla aqui se incluye modal boton eliminar y modal boton actualizar//
  function mostrarDatos2(elemento, i, arr) {
    arr[i] = document.querySelector('.formapago').innerHTML +=
      `
      <tr>
      
      <td>${elemento.nombre_form_pago}</td>
   
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
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="eliminarFormaPago(${elemento.idforma_pago}, ${i})">Eliminar</button>
            </div>
          </div>
        </div>
      </div></td>
      <td class="text-start">
      <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#actualizarpago${i}" onclick="abrirModalActualizar(${elemento.idforma_pago}, '${elemento.nombre_form_pago}', ${i})"><i class="bi bi-pencil-square"></button></i>
        <div class="modal fade" id="actualizarpago${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="actualizartitulo" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header" id="actualizar">
                <h5 class="modal-title" id="actualizartitulo">Actualizar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="formPersonas" class="ps-2 pe-4">
                  <div class="mb-3">
                    <label for="txt_nombre_form_pago_actualiza${i}" class="form-label" id="formapago">Nombre Forma Pago</label>
                    <input type="text" class="form-control" id="txt_nombre_form_pago_actualiza${i}" placeholder="Nombre Forma Pago">
                  </div>
                  
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="actualizarFormaPago(${elemento.idforma_pago}, ${i})">Actualizar</button>
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
    document.querySelector('tbody.formapago').innerHTML = '';
  }
  //Agregar Datos Nuevos//
  function agregarFormaPago() {
      recarga();
      if (validarFormulario()) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var nombre_forma_pago = document.getElementById("txt_nombre_form_pago").value;
   
  
    var raw = JSON.stringify({
        "nombre_form_pago": nombre_forma_pago
        
      
    });
  
    var options3 = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
  
    fetch('http://164.90.186.2:2911/api/forma_pago', options3)
      .then(response => {
        if (response.status == 200) {
          alert('Se agregó correctamente...');
          formaPago();
          limpiarFormulario();
        } else {
          alert('Error al agregar los datos...');
          limpiarFormulario();
          
        }
      })
      .catch(err => console.error(err));
  }}
  //Elimina los datos//
  function eliminarFormaPago(idforma_pago) {
    var options6 = {
      method: 'DELETE',
      redirect: 'follow'
    }
  
    fetch(`http://164.90.186.2:2911/api/forma_pago/${idforma_pago}`, options6)
      .then(response => {
        if (response.status == 200) {
          alert('Se eliminó correctamente...');
          formaPago();
        } else {
          alert('Error al eliminar los datos...');
          
        }
      })
      .catch(err => console.error(err));
  }

  //Actualiza los datos//
  function actualizarFormaPago(idforma_pago, index) {
    if (validarCamposEnBlancoActualizar(index)) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var nombre_forma_pago = document.getElementById(`txt_nombre_form_pago_actualiza${index}`).value;
   
  
    var raw = JSON.stringify({
        "nombre_form_pago": nombre_forma_pago
        
    });
  
    var options31 = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
  
    fetch(`http://164.90.186.2:2911/api/forma_pago/${idforma_pago}`, options31)
      .then(response => {
        if (response.status == 200) {
          alert('Se actualizó correctamente...');
          formaPago();
        } else {
          alert('Error al actualizar los datos...');
        }
      })
      .catch(err => console.error(err));
  }}
  //Abrir el modal actualizar precargando datos//
  function abrirModalActualizar(id, nombre, index) {
    document.getElementById(`txt_nombre_form_pago_actualiza${index}`).value = nombre;
  }
  // Restablecer el valor del campo de nombre Restablecer otros campos si los hay//
  function limpiarFormulario() {
    document.getElementById("txt_nombre_form_pago").value = ""; 
    
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
  //Validar campos en blanco para el modal actualizar//
  function validarCamposEnBlancoActualizar(index) {
    var nombre_forma_pago = document.getElementById(`txt_nombre_form_pago_actualiza${index}`).value;
    
    if (nombre_forma_pago.trim() === '') {
      alert('Por favor, complete todos los campos.');
      return false;
    }
    
    return true;
  }