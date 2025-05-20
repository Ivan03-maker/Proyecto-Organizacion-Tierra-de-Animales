import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [animales, setAnimales] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    especie: '',
    edad: '',
    genero: '',
    salud: '',
    condicion: '',
    tratamiento: ''
  });

  // Cargar animales desde localStorage al iniciar
  useEffect(() => {
    const data = localStorage.getItem('animales');
    if (data) setAnimales(JSON.parse(data));
  }, []);

  // Guardar animales en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('animales', JSON.stringify(animales));
  }, [animales]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoAnimal = {
      ...form,
      id: Date.now()
    };
    setAnimales([...animales, nuevoAnimal]);
    setForm({
      nombre: '',
      especie: '',
      edad: '',
      genero: '',
      salud: '',
      condicion: '',
      tratamiento: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este registro?')) {
      setAnimales(animales.filter(animal => animal.id !== id));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>Sistema de Registro de Animales Rescatados</h1>
          {/* Formulario de registro */}
          <div className="form-container">
            <h2>Registrar Nuevo Animal</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="especie">Especie:</label>
                <select
                  id="especie"
                  name="especie"
                  value={form.especie}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una especie</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Reptil">Reptil</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="edad">Edad (años):</label>
                <input
                  type="number"
                  id="edad"
                  name="edad"
                  min="0"
                  step="0.5"
                  value={form.edad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Género:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="genero"
                      value="Macho"
                      checked={form.genero === "Macho"}
                      onChange={handleChange}
                      required
                    /> Macho
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="genero"
                      value="Hembra"
                      checked={form.genero === "Hembra"}
                      onChange={handleChange}
                    /> Hembra
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="salud">Estado de salud:</label>
                <select
                  id="salud"
                  name="salud"
                  value={form.salud}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione estado</option>
                  <option value="Crítico">Crítico</option>
                  <option value="Grave">Grave</option>
                  <option value="Estable">Estable</option>
                  <option value="Bueno">Bueno</option>
                  <option value="Excelente">Excelente</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="condicion">Condición actual:</label>
                <textarea
                  id="condicion"
                  name="condicion"
                  rows="3"
                  value={form.condicion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tratamiento">Tratamiento a seguir:</label>
                <textarea
                  id="tratamiento"
                  name="tratamiento"
                  rows="3"
                  value={form.tratamiento}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Guardar</button>
                <button type="reset" className="btn btn-secondary" onClick={() => setForm({
                  nombre: '',
                  especie: '',
                  edad: '',
                  genero: '',
                  salud: '',
                  condicion: '',
                  tratamiento: ''
                })}>Limpiar</button>
              </div>
            </form>
          </div>
          {/* Tabla de registros */}
          <div className="table-container">
            <h2>Animales Registrados</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Especie</th>
                  <th>Edad</th>
                  <th>Género</th>
                  <th>Salud</th>
                  <th>Condición</th>
                  <th>Tratamiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {animales.map(animal => (
                  <tr key={animal.id}>
                    <td>{animal.nombre}</td>
                    <td>{animal.especie}</td>
                    <td>{animal.edad}</td>
                    <td>{animal.genero}</td>
                    <td>{animal.salud}</td>
                    <td>{animal.condicion}</td>
                    <td>{animal.tratamiento}</td>
                    <td className="actions-cell">
                      <button className="btn btn-danger" onClick={() => handleDelete(animal.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
                {animales.length === 0 && (
                  <tr>
                    <td colSpan="8">No hay animales registrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
