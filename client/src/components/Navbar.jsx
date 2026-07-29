import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>LocateSpace</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/listings" style={styles.link}>Properties</Link>
        <Link to="/jobs" style={styles.link}>Jobs</Link>
        {user ? (
          <>
            <Link to="/my-posts" style={styles.link}>My Posts</Link>
            <span style={styles.user}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.btn}>Login</Link>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 32px', background: '#1a1a2e', position: 'sticky', top: 0, zIndex: 100 },
  brand: { color: '#e94560', fontWeight: 'bold', fontSize: '22px', textDecoration: 'none' },
  links: { display: 'flex', alignItems: 'center', gap: '24px' },
  link: { color: '#fff', textDecoration: 'none', fontSize: '15px' },
  user: { color: '#aaa', fontSize: '14px' },
  btn: { background: '#e94560', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', textDecoration: 'none', fontSize: '14px' }
}