//Carga de Datos //
function producto() {
    recarga();
    const options1 = { method: 'GET' };
  
    fetch('http://164.90.186.2:2911/api/articulo', options1)
      .then(response => response.json())
      .then(json => json.forEach(mostrarDatos1))
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  // Muestra los datos en la tabla aqui se incluye modal boton eliminar y modal boton actualizar//
  function mostrarDatos1(elemento, i, arr) {
    arr[i] = document.querySelector('.producto').innerHTML +=
      `
      <tr>
      <td>${elemento.descripcion}</td>
      <td>${elemento.stock}</td>
      <td>${elemento.precio_costo}</td>
      <td>${elemento.precio_venta}</td>
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
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="eliminarProducto(${elemento.idarticulo}, ${i})">Eliminar</button>
            </div>
          </div>
        </div>
      </div></td>
      <td class="text-start">
        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#actualizarproducto${i}" onclick="abrirModalActualizar(${elemento.idarticulo}, '${elemento.descripcion}', '${elemento.stock}', '${elemento.precio_costo}', '${elemento.precio_venta}', ${i})"><i class="bi bi-pencil-square"></button></i>
        <div class="modal fade" id="actualizarproducto${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="actualizartitulo" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header" id="actualizar">
                <h5 class="modal-title" id="actualizartitulo">Actualizar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="ps-2 pe-4">
                  <div class="mb-3">
                    <label for="txt_descripcion_articulo_actualiza${i}" class="form-label">Nombre Producto</label>
                    <input type="text" class="form-control campoTexto" id="txt_descripcion_articulo_actualiza${i}" name="Nombre" placeholder="Nombre Producto">
                  </div>
                  <div class="mb-3">
                    <label for="txt_stock_articulo_actualiza${i}" class="form-label">Stock Producto</label>
                    <input type='number' class="form-control campoNumerico" id="txt_stock_articulo_actualiza${i}" name="Stock" placeholder="Stock Producto"></input>
                  </div>
                  <div class="mb-3">
                  <label for="txt_precio_costo_articulo_actualiza${i}" class="form-label">Precio Costo Producto</label>
                  <input type='number' class="form-control campoNumerico" id="txt_precio_costo_articulo_actualiza${i}" name="Precio Costo" placeholder="Precio Costo Producto"></input>
                </div>
                <div class="mb-3">
                <label for="txt_precio_venta_articulo_actualiza${i}" class="form-label">Precio Venta Producto</label>
                <input type='number' class="form-control campoNumerico" id="txt_precio_venta_articulo_actualiza${i}" name="Precio Venta" placeholder="Precio Venta Producto"></input>
              </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="actualizarProducto(${elemento.idarticulo}, ${i})">Actualizar</button>
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
    document.querySelector('tbody.producto').innerHTML = '';
  }
  //Agregar Datos Nuevos//
  function agregarProducto() {
    recarga();
    if (validarFormulario()) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var nombre_producto = document.getElementById("txt_descripcion_articulo").value;
      var stock_producto = document.getElementById("txt_stock_articulo").value;
      var precio_costo_producto = document.getElementById("txt_precio_costo_articulo").value;
      var precio_venta_producto = document.getElementById("txt_precio_venta_articulo").value;
    
      var raw = JSON.stringify({
        "descripcion": nombre_producto,
        "stock": stock_producto,
        "precio_costo": precio_costo_producto,
        "precio_venta": precio_venta_producto
      });
    
      var options3 = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }
    
      fetch('http://164.90.186.2:2911/api/articulo', options3)
        .then(response => {
          if (response.status == 200) {
            alert('Se agregó correctamente...');
            producto();
            limpiarFormulario();
          } else {
            alert('Error al agregar los datos...');
            limpiarFormulario();
          }
        })
        .catch(err => console.error(err));
    }
  }
  
  //Elimina los datos//
  function eliminarProducto(idarticulo) {
    var options6 = {
      method: 'DELETE',
      redirect: 'follow'
    }
  
    fetch(`http://164.90.186.2:2911/api/articulo/${idarticulo}`, options6)
      .then(response => {
        if (response.status == 200) {
          alert('Se eliminó correctamente...');
          producto();
        } else {
          alert('Error al eliminar los datos...');
          
        }
      })
      .catch(err => console.error(err));
  }

  //Actualiza los datos//
  function actualizarProducto(idarticulo, index) {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var nombre_producto = document.getElementById(`txt_descripcion_articulo_actualiza${index}`).value;
    var stock_producto = document.getElementById(`txt_stock_articulo_actualiza${index}`).value;
    var precio_costo_producto = document.getElementById(`txt_precio_costo_articulo_actualiza${index}`).value;
    var precio_venta_producto = document.getElementById(`txt_precio_venta_articulo_actualiza${index}`).value;

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
    if (nombre_producto.trim() === '') {
      alert('Advertencia: El campo "Nombre Producto" no puede estar en blanco.');
      return;
    }
  
    if (stock_producto.trim() === '') {
      alert('Advertencia: El campo "stock" no puede estar en blanco.');
      return;
    }
  
    if (precio_costo_producto.trim() === '') {
      alert('Advertencia: El campo "precio_costo" no puede estar en blanco.');
      return;
    }
  
    if (precio_venta_producto.trim() === '') {
      alert('Advertencia: El campo "precio_venta" no puede estar en blanco.');
      return;
    }
  
    var raw = JSON.stringify({
        "descripcion": nombre_producto,
        "stock": stock_producto,
        "precio_costo": precio_costo_producto,
        "precio_venta": precio_venta_producto
    });
  
    var options31 = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
  
    fetch(`http://164.90.186.2:2911/api/articulo/${idarticulo}`, options31)
      .then(response => {
        if (response.status == 200) {
          alert('Se actualizó correctamente...');
          producto();
        } else {
          alert('Error al actualizar los datos...');
        }
      })
      .catch(err => console.error(err));
  }
  //Abrir el modal actualizar precargando datos//
  function abrirModalActualizar(id, descripcion, stock, precio_costo, precio_venta, index) {
    document.getElementById(`txt_descripcion_articulo_actualiza${index}`).value = descripcion;
    document.getElementById(`txt_stock_articulo_actualiza${index}`).value = stock;
    document.getElementById(`txt_precio_costo_articulo_actualiza${index}`).value = precio_costo;
    document.getElementById(`txt_precio_venta_articulo_actualiza${index}`).value = precio_venta;
    
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
    document.getElementById("txt_descripcion_articulo").value = "";
    document.getElementById("txt_stock_articulo").value = "";
    document.getElementById("txt_precio_costo_articulo").value = "";
    document.getElementById("txt_precio_venta_articulo").value = "";
    
  }
  

  
  

