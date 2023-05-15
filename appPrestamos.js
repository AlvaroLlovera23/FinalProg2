const fechaEntrega = document.getElementById("fechaEntrega")
const fechaDevolucion = document.getElementById("fechaDevolucion")
const libroId = document.getElementById("libroId")
const alumnoId = document.getElementById("alumnoId")
const listaP = document.getElementById("listaP")
const btnGuardarP = document.getElementById("btnGuardarP")
const btnEditarP = document.getElementById("btnEditarP")
const btnCancelarP = document.getElementById("btnCancelarP")

let auxiliar
listarPrestamos()
cargarSelectLibro()
cargarSelectAlumno()

async function cargarSelectLibro(){
    res = await axios.get("http://localhost:3000/libros")
    res.data.forEach(elemento => {
        libroId.innerHTML += '<option value='+ elemento.id +'>'+ elemento.titulo +'</option>'
    });
}

async function cargarSelectAlumno(){
    res = await axios.get("http://localhost:3000/alumnos")
    res.data.forEach(elemento => {
        alumnoId.innerHTML += '<option value='+ elemento.id +'>'+ elemento.nombre +'</option>'
    })
}


async function guardarP() {
    try {
        if(fechaDevolucion.value === ""){
            fechaDevolucion.value = "NO DEVUELTO"
            res = await axios.post("http://localhost:3000/prestamos", { fechaEntrega: fechaEntrega.value, fechaDevolucion: fechaDevolucion.value, libroId: libroId.value, alumnoId: alumnoId.value})
            listaPrestamos()
        }
        else{
            res = await axios.post("http://localhost:3000/prestamos", { fechaEntrega: fechaEntrega.value, fechaDevolucion: fechaDevolucion.value, libroId: libroId.value, alumnoId: alumnoId.value})
            listaPrestamos()
        }
    } catch (error) {
        alert("No se pudo agregar")
        alert(error)
    }

}

async function listarPrestamos() {
    try {
        res = await axios.get("http://localhost:3000/prestamos")
        listaP.innerHTML = ""
        for (let i = 0; i < res.data.length; i++) {
            listaP.innerHTML += '<button onclick="borrarP(' + res.data[i].id + ')">X</button>' + '<button onclick="mostrarP(' + res.data[i].id + ')">Editar</button>' + " - " + "Fecha Ent.: " +res.data[i].fechaEntrega + " - " + "Fecha Dev.: " + res.data[i].fechaDevolucion + " - " + "ID-Libro: " + res.data[i].libroId + " - " + "ID-Alumno: " +res.data[i].alumnoId + "<br>"
        }
    } catch (error) {
        alert("No se pudo mostrar la lista")
        alert(error)
    }

}

async function borrarP(id) {
    try {
        await axios.delete("http://localhost:3000/prestamos/" + id)
        listaPrestamos()
    } catch (error) {
        alert("No se pudo borrar")
        alert(error)
    }

}

async function mostrarP(id) {
    try {
        auxiliar = id
        res = await axios.get("http://localhost:3000/prestamos/" + id)
        fechaEntrega.value = res.data.fechaEntrega
        fechaDevolucion.value = res.data.fechaDevolucion
        libroId.value = res.data.libroId
        alumnoId.value = res.data.alumnoId
        btnGuardarP.disabled = true
        btnEditarP.disabled = false
        btnCancelarP.hidden = false
        btnCancelarP.disabled = false
        listaPrestamos()
    } catch (error) {
        alert(error)
    }

}

async function modificarP() {
    try {
        res = await axios.put("http://localhost:3000/prestamos/" + auxiliar, {fechaEntrega: fechaEntrega.value, fechaDevolucion: fechaDevolucion.value, libroId: libroId.value, alumnoId: alumnoId.value
        })
        btnGuardarP.disabled = false
        btnEditarP.disabled = true
        btnCancelarP.hidden = true
        btnCancelarP.disabled = true
        listaPrestamos()
    } catch (error) {
        alert("No se pudo actualizar")
        alert(error)
    }

}

function cancelarEditarP() {
    fechaEntrega.value = ""
    fechaDevolucion.value = ""
    libroId.value = ""
    alumnoId.value = ""
    btnGuardarP.disabled = false
    btnEditarP.disabled = true
    btnCancelarP.hidden = true
    btnCancelarP.disabled = true

}