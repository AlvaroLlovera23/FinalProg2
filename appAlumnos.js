const dni = document.getElementById("dni")
const nombre = document.getElementById("nombre")
const domicilio = document.getElementById("domicilio")
const listadoAlumnos = document.getElementById("listadoAlumnos")
const btnGuardarA = document.getElementById("btnGuardarA")
const btnEditarA = document.getElementById("btnEditarA")
const btnCancelarA = document.getElementById("btnCancelarA")

let auxiliar
let idAux
let deudores = []
listaAlumnos()

function guardarAlumnos() {

    axios.post("http://localhost:3000/alumnos", { dni: dni.value, nombre: nombre.value, domicilio: domicilio.value })
        .then(function (res) {
            listaAlumnos()
        })
        .catch(function (error) {
            alert("Error al guardar alumnos")
            alert(error)
        })
}

function listaAlumnos() {
    axios.get("http://localhost:3000/alumnos")
        .then(function (res) {
            listadoAlumnos.innerHTML = ""
            res.data.forEach(elemento => {
                listadoAlumnos.innerHTML += '<button onclick="borrarAlumnos(' + elemento.id + ')">X</button>' + '<button onclick="mostrarAlumnos(' + elemento.id + ')">Editar</button>' + " - " + elemento.dni + " - " + elemento.nombre + " - " + elemento.domicilio + "<br>"
            });
        })
        .catch(function (error) {
            alert("Error al mostrar alumnos")
            alert(error)
        })
}

function borrarAlumnos(id){

    axios.delete("http://localhost:3000/alumnos/" + id)
            listaAlumnos()
    /*
    buscarAlumnos(id)
    buscarDeudores()
    if(deudores.includes(indAux) == true){
        alert("No se puede borrar un alumno con deuda")
    }
    else{
       if(deudores.includes(indAux) == false){
           axios.delete("http://localhost:3000/alumnos/" + id)
            listaAlumnos()
       }
    }*/
}