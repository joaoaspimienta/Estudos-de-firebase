import { useEffect, useState } from "react";
import firebase from "./firebaseConnection";
import "./style.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [edit, setEdit] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      await firebase
        .firestore()
        .collection("posts")
        .onSnapshot((doc) => {
          let meusPosts = [];

          doc.forEach((item) => {
            meusPosts.push({
              id: item.id,
              titulo: item.data().titulo,
              autor: item.data().autor,
            });
          });
          setPosts(meusPosts);
        });
    }
    loadPosts();
  }, []);

  async function handleAdd() {
    await firebase
      .firestore()
      .collection("posts")
      .add({
        titulo: titulo,
        autor: autor,
      })
      .then(() => {
        alert("Dados cadastrados com sucesso!");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        alert("GEROU ALGUM ERRO: " + error);
      });
  }
  /*  async function handleAdd(){    
    await firebase.firestore().collection('posts')
    .doc('12345')
    .set({
      titulo: titulo,
      autor: autor,
    })
    .then(()=>{
      alert('Dados cadastrados com sucesso!')
    })
    .catch((error)=>{
      alert('GEROU ALGUM ERRO: ' + error)
    })
  } */

  async function buscaPost() {
    await firebase
      .firestore()
      .collection("posts")
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(lista);
      })
      .catch();

    /*     await firebase.firestore().collection('posts')
    .doc('tuTKEq4Gtc2iEI9BXEGe')
    .get()
    .then((snapshot)=>{
      setTitulo(snapshot.data().titulo)
      setAutor(snapshot.data().autor)
    })
    .catch(()=>{
      console.log('Deu algum erro')
    }) */
  }

  async function editarPost() {
    firebase.firestore().collection("posts").doc();
  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>
      <br />

      <div className="container">
        <label>ID:</label>
        <textarea
          type="text"
          value={edit}
          onChange={(e) => setEdit(e.target.value)}
        />
        <label>Titulo: </label>
        <textarea
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label>Autor: </label>
        <textarea
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscaPost}>Buscar Post</button>
        <button onClick={editarPost}>Editar Post</button> <br />
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>ID: {post.id}</span>
                <br />
                <span>Titulo: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br />
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
