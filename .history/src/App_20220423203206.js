import { useState } from 'react';
import firebase from './firebaseConnection'

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')

  function handleAdd(){
    alert('clicou')
  }

  return (
    <div className="App">
      <h1>ReactJS + Firebase</h1><br/>

      <div className='container'>

      <label>Titulo: </label>
      <textarea type='text' value={titulo} onChange={(e)=>setTitulo(e.target.value)}/>

      <label>Autor: </label>
      <textarea type='text' value={autor} onChange={(e)=>setAutor(e.target.value)}/>

      <button onClick={ handleAdd }>Cadastrar</button>

      </div>
    </div>
  );
}

export default App;
