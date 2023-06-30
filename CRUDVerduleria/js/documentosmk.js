//Carga de Datos //
let formaPagoOptions = [];
function compraVenta() {
    recarga();
    const options1 = { method: 'GET' };
  
    fetch('http://164.90.186.2:2911/api/documentos_marketing', options1)
      .then(response => response.json())
      .then(json => json.forEach(mostrarDatos12))
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  // Muestra los datos en la tabla aqui se incluye modal boton eliminar y modal boton actualizar//
  function mostrarDatos12(elemento, i, arr) {
    fetch('http://164.90.186.2:2911/api/socio_negocio')
      .then(response => response.json())
      .then(sociosNegocio => {
        const idsSociosNegocio = sociosNegocio.reduce((acc, socio) => {
          acc[socio.idsocio_negocio] = socio.nombre;
          return acc;
        }, {});

      fetch('http://164.90.186.2:2911/api/forma_pago')
      .then(response => response.json())
      .then(formaPago => {
        const idsFormaPago = formaPago.reduce((acc, forma_pago) => {
          acc[forma_pago.idforma_pago] = forma_pago.nombre_form_pago; 
          return acc;
        }, {});

        // Guardar los datos de forma de pago en un array global//
        formaPagoOptions = formaPago;
  
        fetch('http://164.90.186.2:2911/api/articulo')
          .then(response => response.json())
          .then(articulos => {
            const idsArticulos = articulos.reduce((acc, articulo) => {
              acc[articulo.idarticulo] = articulo.descripcion;
              return acc;
            }, {});

            const nombreSocioNegocio = idsSociosNegocio[elemento.idsocio_negocio];
            const nombreArticulo = idsArticulos[elemento.idarticulo];
            const formaPago = idsFormaPago[elemento.idforma_pago];

            
            arr[i] = document.querySelector('.compraventa').innerHTML +=
              `
              <tr>
              
              <td>${elemento.numero_documento}</td>
              <td>${elemento.tipo_documento}</td>
              <td>${nombreSocioNegocio}</td>
              <td>${nombreArticulo}</td>
              <td>${elemento.cantidad}</td>
              <td>${elemento.precio}</td>
              <td>${elemento.total}</td>
              <td>${formaPago}</td>
              
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
                      ¿Está seguro de eliminar este Documento?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="eliminarCompraVenta(${elemento.idcompra}, ${i})">Eliminar</button>
                    </div>
                  </div>
                </div>
              </div></td>
              <td class="text-start">
                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#actualizarcompraventa${i}" onclick="abrirModalActualizar(${elemento.idcompra}, '${elemento.numero_documento}', '${elemento.tipo_documento}', '${nombreSocioNegocio}', '${nombreArticulo}', '${elemento.cantidad}', '${elemento.precio}', '${elemento.total}', '${elemento.idforma_pago}', ${i})"><i class="bi bi-pencil-square"></button></i>
                  <div class="modal fade" id="actualizarcompraventa${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="actualizartitulo" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header" id="actualizar">
                        <h5 class="modal-title" id="actualizartitulo">Actualizar</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form class="ps-2 pe-4">
                          <div class="mb-3">
                            <label for="txt_numero_documento_actualiza${i}" class="form-label">Numero Documento</label>
                            <input type="number" class="form-control campoNumerico" id="txt_numero_documento_actualiza${i}" placeholder="N° Boleta o Factura" value="${elemento.numero_documento}">
                          </div>
                          <div class="mb-3">
                            <label for="txt_tipo_documento_actualiza${i}" class="form-label">Tipo Documento</label>
                            <input type="text" class="form-control campoTexto" id="txt_tipo_documento_actualiza${i}" placeholder="Compra o Venta" value="${elemento.tipo_documento}">
                          </div>
                          <div class="mb-3">
                            <label for="txt_nombre_socio_negocio_actualiza${i}" class="form-label">Nombre Socio Negocio</label>
                            <input type="text" class="form-control" id="txt_nombre_socio_negocio_actualiza${i}" placeholder="Nombre SN" value="${nombreSocioNegocio}" disabled>
                          </div>
                          <div class="mb-3">
                            <label for="txt_nombre_articulo_actualiza${i}" class="form-label">Nombre Articulo</label>
                            <input type="text" class="form-control" id="txt_nombre_articulo_actualiza${i}" placeholder="Nombre Articulo" value="${nombreArticulo}" disabled>
                          </div>
                          <div class="mb-3">
                            <label for="txt_cantidad_actualiza${i}" class="form-label">Cantidad</label>
                            <input type="number" class="form-control campoNumerico" id="txt_cantidad_actualiza${i}" placeholder="Cantidad" value="${elemento.cantidad}">
                          </div>
                          <div class="mb-3">
                            <label for="txt_precio_actualiza${i}" class="form-label">Precio</label>
                            <input type="number" class="form-control campoNumerico" id="txt_precio_actualiza${i}" placeholder="Precio" value="${elemento.precio}">
                          </div>
                          <div class="mb-3">
                            <label for="txt_total_actualiza${i}" class="form-label">Total</label>
                            <input type="number" class="form-control campoNumerico" id="txt_total_actualiza${i}" placeholder="Total" value="${elemento.total}">
                          </div>
                          <div class="mb-3">
                          <label for="select_formapago_actualiza${i}" class="form-label">Forma Pago</label>
                          <select class="form-select" id="select_formapago_actualiza${i}">
                        </select>
                        </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="actualizarCompraVenta(${elemento.idcompra}, ${i})">Actualizar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              </tr>
              
              `
          });
      });
    });
  }
  
  //Recarga la tabla para que no se duplique//
  function recarga() {
    document.querySelector('tbody.compraventa').innerHTML = '';
  }
  //Agregar Datos Nuevos//
  function agregarCompraVenta() {
    if(validarFormulario()) {
    const numeroDocumento = document.querySelector('#txt_numero_documento_compraventa').value;
    const tipoDocumento = document.querySelector('#txt_tipo_compraventa').value;
    const selectSocioNegocio = document.querySelector('#select_socio_negocio');
    const idSocioNegocio = selectSocioNegocio.value;
    const selectArticulo = document.querySelector('#select_Articulo');
    const articulo = selectArticulo.value;
    const cantidad = document.querySelector('#txt_cantidad_compraventa').value;
    const precio = document.querySelector('#txt_precio_compraventa').value;
    const total = document.querySelector('#txt_total_compraventa').value;
    const selectFormaPago = document.querySelector(`#select_FormaPago`);
    const formaPago = selectFormaPago.value;
  
    // Realiza la petición para agregar la compra/venta a la base de datos//
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero_documento: numeroDocumento,
        tipo_documento: tipoDocumento,
        idsocio_negocio: idSocioNegocio,
        idarticulo: articulo,
        cantidad: cantidad,
        precio: precio,
        total: total,
        idforma_pago: formaPago
      })
    };
  
    fetch('http://164.90.186.2:2911/api/documentos_marketing', options)
      .then(response => response.json())
      .then(data => {
        // Verificar si se agregó correctamente//
        if (data.error) {
          console.error('Error al agregar Documento:', data.error);
        } else {
          console.log('Documento agregado correctamente:', data);
          compraVenta();
          // Mostrar advertencia de agregado correctamente//
          alert('Documento agregado correctamente');
        }
      })
      .catch(err => console.error(err));
  }}
  
//Cargo los datos del Socio de Negocios//
function cargarSocioNegocio() {
  fetch('http://164.90.186.2:2911/api/socio_negocio')
    .then(response => response.json())
    .then(data => {
      const selectSocioNegocio = document.querySelector('#select_socio_negocio');

      // Limpiar opciones existentes//
      selectSocioNegocio.innerHTML = '';

      // Agregar nuevas opciones
      data.forEach(socio => {
        const option = document.createElement('option');
        option.value = socio.idsocio_negocio;
        option.textContent = socio.nombre;
        selectSocioNegocio.appendChild(option);
      });
    })
    .catch(err => console.error(err));
}
//Cargo los datos del Articulo//
function cargarArticulo() {
  fetch('http://164.90.186.2:2911/api/articulo')
    .then(response => response.json())
    .then(data => {
      const selectArticulo = document.querySelector('#select_Articulo');

      // Limpiar opciones existentes//
      selectArticulo.innerHTML = '';

      // Agregar nuevas opciones
      data.forEach(articulo => {
        const option = document.createElement('option');
        option.value = articulo.idarticulo;
        option.textContent = articulo.descripcion;
        selectArticulo.appendChild(option);
      });
    })
    .catch(err => console.error(err));
}
//Cargo los datos de la Forma de Pago//
function cargarFormaPago() {
  fetch('http://164.90.186.2:2911/api/forma_pago')
    .then(response => response.json())
    .then(data => {
      const selectFormaPago = document.querySelector('#select_FormaPago');

      // Limpiar opciones existentes
      selectFormaPago.innerHTML = '';

      // Agregar nuevas opciones
      data.forEach(forma_pago => {
        const option = document.createElement('option');
        option.value = forma_pago.idforma_pago;
        option.textContent = forma_pago.nombre_form_pago;
        selectFormaPago.appendChild(option);
      });
    })
    .catch(err => console.error(err));
}




  //Elimina los datos//
  function eliminarCompraVenta(idcompra) {
    var options6 = {
      method: 'DELETE',
      redirect: 'follow'
    }
  
    fetch(`http://164.90.186.2:2911/api/documentos_marketing/${idcompra}`, options6)
      .then(response => {
        if (response.status == 200) {
          alert('Se eliminó correctamente...');
          compraVenta();
        } else {
          alert('Error al eliminar los datos...');
          
        }
      })
      .catch(err => console.error(err));
  }

  //Actualiza los datos//
  function actualizarCompraVenta(idcompra, index) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const numero_documento = document.getElementById(`txt_numero_documento_actualiza${index}`).value;
    const tipo_documento = document.getElementById(`txt_tipo_documento_actualiza${index}`).value;
    const idsocio_negocio = document.getElementById(`txt_nombre_socio_negocio_actualiza${index}`).value;
    const idarticulo = document.getElementById(`txt_nombre_articulo_actualiza${index}`).value;
    const cantidad = document.getElementById(`txt_cantidad_actualiza${index}`).value;
    const precio = document.getElementById(`txt_precio_actualiza${index}`).value;
    const total = document.getElementById(`txt_total_actualiza${index}`).value;
    const selectFormaPago = document.querySelector(`#select_formapago_actualiza${index}`);
    const idforma_pago = selectFormaPago.value
  

    // Traer los datos de las otras tablas//
      fetch('http://164.90.186.2:2911/api/socio_negocio')
      .then(response => response.json())
      .then(sociosNegocio => {
      const idsSociosNegocio2 = sociosNegocio.reduce((acc, socio) => {
      acc[socio.idsocio_negocio] = socio.nombre;
      return acc;
      }, {});

    
      fetch('http://164.90.186.2:2911/api/articulo')
      .then(response => response.json())
      .then(articulos => {
      const idsArticulos2 = articulos.reduce((acc, articulo) => {
      acc[articulo.idarticulo] = articulo.descripcion;
      return acc;
      }, {});

          
      const idSocioNegocio2 = idsSociosNegocio2[idsocio_negocio];
      const idArticulo2 = idsArticulos2[idarticulo];
      


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
  if (numero_documento.trim() === '') {
    alert('Advertencia: El campo "N° Documento" no puede estar en blanco.');
    return;
  }

  if (tipo_documento.trim() === '') {
    alert('Advertencia: El campo "Tipo Documento" no puede estar en blanco.');
    return;
  }

  if (idsocio_negocio.trim() === '') {
    alert('Advertencia: El campo "Nombre Socio" no puede estar en blanco.');
    return;
  }

  if (idarticulo.trim() === '') {
    alert('Advertencia: El campo "Nombre Articulo" no puede estar en blanco.');
    return;
  }

  if (cantidad.trim() === '') {
    alert('Advertencia: El campo "Cantidad" no puede estar en blanco.');
    return;
  }

  if (precio.trim() === '') {
    alert('Advertencia: El campo "Precio" no puede estar en blanco.');
    return;
  }
  if (total.trim() === '') {
    alert('Advertencia: El campo "Total" no puede estar en blanco.');
    return;
  }

  if (idforma_pago.trim() === '') {
    alert('Advertencia: El campo "Forma Pago" no puede estar en blanco.');
    return;
  }

  
    var raw = JSON.stringify({
        "numero_documento": numero_documento,
        "tipo_documento": tipo_documento,   
        "idsocio_negocio": idSocioNegocio2,
        "idarticulo": idArticulo2,
        "cantidad": cantidad,
        "precio": precio,
        "total": total,
        "idforma_pago": idforma_pago
    });
  
    var options41 = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch(`http://164.90.186.2:2911/api/documentos_marketing/${idcompra}`, options41)
      .then(response => {
        if (response.status == 200) {
          alert('Se actualizó correctamente...');
          compraVenta();
        } else {
          alert('Error al actualizar los datos...');
        }
      })
      .catch(err => console.error(err));
  });
  });
   }
  //Abre el modal para actualizar los datos//
  function abrirModalActualizar(idcompra, numero_documento, tipo_documento, nombreSocioNegocio, nombreArticulo, cantidad, precio, total, idforma_pago, index) {
    const selectFormaPago = document.querySelector(`#select_formapago_actualiza${index}`);
  
    // Limpiar opciones existentes//
    selectFormaPago.innerHTML = '';
  
    // Agregar nuevas opciones//
    formaPagoOptions.forEach(formaPago => {
      const option = document.createElement('option');
      option.value = formaPago.idforma_pago;
      option.textContent = formaPago.nombre_form_pago;
      selectFormaPago.appendChild(option);
    });
  
    // Establecer los valores actuales en el modal//
    document.getElementById(`txt_numero_documento_actualiza${index}`).value = numero_documento;
    document.getElementById(`txt_tipo_documento_actualiza${index}`).value = tipo_documento;
    document.getElementById(`txt_nombre_socio_negocio_actualiza${index}`).value = nombreSocioNegocio;
    document.getElementById(`txt_nombre_articulo_actualiza${index}`).value = nombreArticulo;
    document.getElementById(`txt_cantidad_actualiza${index}`).value = cantidad;
    document.getElementById(`txt_precio_actualiza${index}`).value = precio;
    document.getElementById(`txt_total_actualiza${index}`).value = total;
    selectFormaPago.value = idforma_pago;
     
  }
  
    
  
//Valida campo si estan en blanco//
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
  //Valida campo si son numericos//
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
  //Valida campo si son de texto//
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
  //Agrupa las validaciones//
  function validarFormulario() {
    if (validarCamposEnBlanco() && validarCamposNumericos() && validarCamposDeTexto()) {
      alert('Formulario válido. Se puede enviar.');
      return true;
    } else {
      alert('Hay errores en el formulario. Revise los campos e inténtelo nuevamente.');
      return false;
    }
  }
  //Agrupa las validaciones para actualizar//
  function validarFormularioActualizar() {
    if (validarCamposNumericos() && validarCamposDeTexto()) {
      alert('Formulario válido. Se puede enviar.');
      return true;
    } else {
      alert('Hay errores en el formulario. Revise los campos e inténtelo nuevamente.');
      return false;
    }
  }


  // Llamada a la función para cargar las tablas relacionadas //
window.addEventListener('DOMContentLoaded', cargarSocioNegocio);
window.addEventListener('DOMContentLoaded', cargarArticulo);
window.addEventListener('DOMContentLoaded', cargarFormaPago);