// imports hooks
import { useEffect, useState } from 'react';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import {useAuthValue} from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

// import css
import styles from './EditPost.module.css';

const EditPost = () => {
  const {id} = useParams();
  const {document: post} = useFetchDocument('posts', id);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');
  const {user} = useAuthValue();
  const {updateDocument, response} = useUpdateDocument('posts');
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setImage(post.image)
      setBody(post.body)
      const textTags = post.tagsArray.join(', ');
      setTags(textTags)
    }
  }, [post])

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    navigate('/dashboard')
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando o post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Pense em um bom título' required/>
            </label>
            <label>
              <span>URl da imagem:</span>
              <input type="text" name='image' value={image} onChange={(e) => setImage(e.target.value)} placeholder='Insira a URL da imagem' required/>
            </label>
            <p className={styles.preview_title}>Preview da imagem:</p>
            <img src={post.image} alt={post.title} className={styles.image_preview}/>
            <label>
              <span>Conteúdo:</span>
              <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} placeholder='Insira o conteúdo do post' required></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input type="text" name='tags' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Insira tags separadas por vírgulas' required/>
            </label>
            {!response.loading && <button className='btn'>Editar</button>}
            {response.loading && <button className='btn' disabled>Aguarde</button>}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost;