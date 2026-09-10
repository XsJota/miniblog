// import hooks
import { useQuery } from "../../hooks/useQuery"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// import
import { Link } from "react-router-dom";

// import component
import PostDetails from "../../components/PostDetails";

//import css
import styles from './Search.module.css';

const Search = () => {
    const query = useQuery();
    const search = query.get('q')
    const {documents: posts} = useFetchDocuments('posts', search)

  return (
    <div className={styles.search_conteiner}>
        {posts && posts.map((post) => (
          <PostDetails key={post.id} post={post}/>
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to='/' className='btn btn-outline'>Voltar</Link>
          </div>
        )}
    </div>
  )
}

export default Search;