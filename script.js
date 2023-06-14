const formulario = document.getElementById("formulario");
const txtPuesto = document.getElementById("txtPuesto");
const txtNombre = document.getElementById("txtNombre");
const btnAgregar = document.getElementById("btnAgregar");
const divEmpleados = document.getElementById("divEmpleados")

let listaEmpleados= [];
const objEmpleado = {id:"", nombre:"", puesto:""};
formulario.addEventListener("submit",validarFormulario);

let editando = false;

function agregarEmpleado() {
    const nuevoEmpleado = {
      id: objEmpleado.id,
      nombre: objEmpleado.nombre,
      puesto: objEmpleado.puesto
    };
  
    listaEmpleados.push(nuevoEmpleado);
  
    mostrarEmpleados();
  
    formulario.reset();
    limpiarObjeto();
  }

function limpiarHTML() {    
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

function limpiarObjeto(){
    objEmpleado.id="";
    objEmpleado.nombre="";
    objEmpleado.puesto="";
}


function mostrarEmpleados() {
    limpiarHTML()
    // Añadir el empleado a la lista
    //listaEmpleados.forEach(function(emp) { 
    for (const emp of listaEmpleados) {  
        const parrafoEmpleado = document.createElement("p");
        parrafoEmpleado.textContent = ("Nombre: " + emp.nombre + " Puesto: " + emp.puesto);     
        
        const editarBoton = document.createElement('button');
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        editarBoton.addEventListener("click", () => cargarEmpleado(emp));
        parrafoEmpleado.appendChild(editarBoton);
    
        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        eliminarBoton.addEventListener("click", () => eliminarEmpleado(emp.id));
        parrafoEmpleado.appendChild(eliminarBoton);
    
        const hr = document.createElement('hr');
    
        divEmpleados.appendChild(parrafoEmpleado);
        divEmpleados.appendChild(hr);  
    }
}

function validarFormulario(e){
    /*
    e.preventDefault();// cancela el evento si es cancelable

    if(txtNombre.value != "" && txtPuesto.value != "" && !editando){
        objEmpleado.id = Date.now();
        objEmpleado.nombre = txtNombre.value;
        objEmpleado.puesto = txtPuesto.value;
        console.log(objEmpleado);
        agregarEmpleado();
    }else{
        alert("LLena correctamente los datos");
        return;
    }
    */
    e.preventDefault();

    if (txtNombre.value === '' || txtPuesto.value === '') {
      alert('Todos los campos se deben llenar');
      return;
    }
  
    if (editando) {
      editarEmpleado();
      editando = false;
      formulario.reset()
      limpiarHTML();
      mostrarEmpleados();
      btnAgregar.textContent = "Agregar";
    } else {
      objEmpleado.id = Date.now();
      objEmpleado.nombre = txtNombre.value;
      objEmpleado.puesto = txtPuesto.value;
  
      agregarEmpleado();
    }

}

function cargarEmpleado(emp){
    btnAgregar.textContent = "Actualizar";
    txtNombre.value  = emp.nombre;
    txtPuesto.value = emp.puesto;
    objEmpleado.id = emp.id
    editando = true;
}

function eliminarEmpleado(id){
    console.log(id)
    if(confirm("¿Estás seguro que deseas eliminar el empleado?")) {        
        listaEmpleados = listaEmpleados.filter(checkID)
        
        function checkID(data) {
            return data.id !== id;
        }

        mostrarEmpleados(); 
    }
    else {
        alert("Cancelado")
    }
    
}

function editarEmpleado() {
    objEmpleado.nombre = txtNombre.value
    objEmpleado.puesto = txtPuesto.value
    for (const emp of listaEmpleados) {
        if(emp.id == objEmpleado.id) {
            emp.nombre = objEmpleado.nombre
            emp.puesto = objEmpleado.puesto
        }
    }
}