const express = require('express');
const {agregarCancion, obtenerCanciones, editarCancion, eliminarCancion} = require('./db');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Escuchando el puerto ${port}!`));

//Middleware para recibir datos en formato JSON
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Agregar una canción
app.post('/cancion', async (req, res) => {
    const payload = req.body;
    console.log(payload);
    try {
        const result = await agregarCancion(payload);
        res.json(result.rows);
    } catch (error) {
        res.statusCode = 500;
        res.json({error:'Algo salió mal, inténtalo más tarde'})
    }
});

//Obtener todas las canciones
app.get('/canciones', async (req, res) => {
    try {
        const result = await obtenerCanciones();
        res.json(result.rows);
    } catch (error) {
        res.statusCode = 500;
        res.json({error:'Algo salió mal, inténtalo más tarde'})
    }
});

//Editar una canción
app.put('/cancion/:id', async (req, res) => {
    //console.log(req.params.id);
    //console.log(req.body);
    const id = req.params.id;
    const {titulo,artista,tono} = req.body;
    const payload = {id, titulo, artista, tono};
    try {
        const result = await editarCancion(payload);
        res.json(result.rows);
    } catch (error) {
        res.statusCode = 500;
        res.json({error:'Algo salió mal, inténtalo más tarde'})
    }
});

//Eliminar una canción
app.delete('/cancion', async (req, res) => {
    const {id} = req.query;
    console.log(id);
    try {
        const result = await eliminarCancion(id);
        res.json(result.rows);
    } catch (error) {
        res.statusCode = 500;
        res.json({error:'Algo salió mal, inténtalo más tarde'})
    }
});