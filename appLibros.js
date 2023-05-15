const titulo = document.getElementById("titulo")
const autor = document.getElementById("autor")
const listadoLibros = document.getElementById("listaLibros")
const btnGuardarL = document.getElementById("btnGuardarL")
const btnEditarL = document.getElementById("btnEditarL")
const btnCancelarL = document.getElementById("btnCancelarL")

let auxiliar
listaLibros()

function guardarLibro(){
    axios.post("http://localhost:3000/libros", {titulo: titulo.value, autor: autor.value})
    .then(function(res){
        listaLibros()
    })
    .catch(function(error){
        alert("Los datos no se guardaron")
        alert(error)
    })
}

function listaLibros(){
    axios.get("http://localhost:3000/libros")
    .then(function(res){
        listadoLibros.innerHTML = ""
        res.data.forEach(elemento => {
            listadoLibros.innerHTML += '<button onclick="borrarLibros('+ elemento.id +')">X</button>' + '<button onclick="mostrarLibro('+ elemento.id +')">Editar</button>' + "   " + elemento.titulo + " - " + elemento.autor + "<br>"
        });
    })
    .catch(function(error){
        alert("Error al mostrar libros")
        alert(error)
    })
}

function borrarLibros(id){
    axios.delete("http://localhost:3000/libros/" + id)
    .then(function(res){
        listaLibros()
    })
    .catch(function(error){
        alert("No se pudo eliminar")
        alert(error)
    })
}

function mostrarLibros(id){
    axios.get("http://localhost:3000/libros/" + id)
    .then(function(res){
        auxiliar = id
        btnGuardarL.disabled = true
        btnEditarL.disabled = false
        btnCancelarL.disabled = false
        btnCancelarL.hidden = false
        titulo.value = res.data.titulo
        autor.value = res.data.autor
    })
    .catch(function(error){
        alert(error)
    })
}

function editarLibros(){
    axios.put("http://localhost:3000/libros/" + auxiliar, {titulo: titulo.value, autor: autor.value})
    .then(function(res){
        alert("Los datos se modificaron correctamente")
        listaLibros()
        btnGuardarL.disabled = false
        btnEditarL.disabled = true
        btnCancelarL.disabled = true
        btnCancelarL.hidden = true
    })
    .catch(function(error){
        alert("No se modificaron los datos")
        alert(error)
    })
}

function cancelarEditarL(){
    titulo.value =""
    autor.value = ""
    btnGuardarL.disabled = false
    btnEditarL.disabled = true
    btnCancelarL.disabled = true
    btnCancelarL.hidden = true
}
