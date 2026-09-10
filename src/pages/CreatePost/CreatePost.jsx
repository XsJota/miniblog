// imports hooks
import { useState } from 'react';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import {useAuthValue} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// import css
import styles from './CreatePost.module.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');
  const {user} = useAuthValue();
  const {insertDocument, response} = useInsertDocument('posts');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    try {
      new URL(image)
    } catch (error) {
      return setFormError('Insira uma URL válida!');
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !body || !tags) {
      return setFormError('Preencha todos os campos, por favor!')
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    navigate('/')
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>escreva o que quiser e compartilhe suas ideias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Pense em um bom título' required/>
        </label>
        <label>
          <span>URl da imagem:</span>
          <input type="text" name='image' value={image} onChange={(e) => setImage(e.target.value)} placeholder='Insira a URL da imagem' required/>
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} placeholder='Insira o conteúdo do post' required></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text" name='tags' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Insira tags separadas por vírgulas' required/>
        </label>
        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && <button className='btn' disabled>Aguarde</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost;