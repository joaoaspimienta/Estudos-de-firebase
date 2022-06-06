import { useState } from 'react';
import firebase from './firebaseConnection'
import './style.css'

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')

  async function handleAdd(){    
    await firebase.firestore().collection('posts')
    .add({
      titulo: titulo,
      autor: autor,
    })
    .then(()=>{
      alert('Dados cadastrados com sucesso!')
      setTitulo('')
      setAutor('')
    })
    .catch((error)=>{
      alert('GEROU ALGUM ERRO: ' + error)
    })
  }

  async function buscaPost(){
    await firebase.firestore().collection('posts')
    .doc('tuTKEq4Gtc2iEI9BXEGe')
    .get()
    .then((snapshot)=>{
      setTitulo(snapshot.data().titulo)
      setAutor(snapshot.data().autor)
    })
    .catch(()=>{
      console.log('Deu algum erro')
    })
  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1><br/>

      <div className='container'>

      <label>Titulo: </label>
      <textarea type='text' value={titulo} onChange={(e)=>setTitulo(e.target.value)}/>

      <label>Autor: </label>
      <textarea type='text' value={autor} onChange={(e)=>setAutor(e.target.value)}/>

      <button onClick={ handleAdd }>Cadastrar</button>
      <button onClick={ buscaPost }>Buscar Post</button>

      </div>
    </div>
  );
}

export default App;