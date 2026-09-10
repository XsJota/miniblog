// import css
import styles from './Login.module.css';

// import hooks
import { useEffect, useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {login, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const user = {
            email,
            password
        }

        const res = login(user);
    }

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError])

  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Cadastre-se para utilizar</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>E-mail:</span>
                <input type="email" name="email" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password" name="password" placeholder='Insira uma senha' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            {!loading && <button className='btn'>Entrar</button>}
            {loading && <button className='btn' disabled>Aguarde</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login;