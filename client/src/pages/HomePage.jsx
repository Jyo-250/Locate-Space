import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Your Ideal Space</h1>
        <p style={styles.heroSub}>Browse property listings and job opportunities in one place</p>
        <div style={styles.heroButtons}>
          <button style={styles.btnPrimary} onClick={() => navigate('/listings')}>Browse Properties</button>
          <button style={styles.btnOutline} onClick={() => navigate('/jobs')}>Browse Jobs</button>
        </div>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.icon}>🏠</div>
          <h3>House Vacancy</h3>
          <p>Find residential properties available for rent or sale</p>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>🏪</div>
          <h3>Shop Vacancy</h3>
          <p>Discover commercial spaces for your business needs</p>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>💼</div>
          <h3>Job Finder</h3>
          <p>Explore job opportunities across multiple categories</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  hero: { background: '#1a1a2e', color: '#fff', padding: '100px 32px', textAlign: 'center' },
  heroTitle: { fontSize: '48px', marginBottom: '16px', color: '#fff' },
  heroSub: { fontSize: '18px', color: '#aaa', marginBottom: '40px' },
  heroButtons: { display: 'flex', gap: '16px', justifyContent: 'center' },
  btnPrimary: { padding: '14px 32px', background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' },
  btnOutline: { padding: '14px 32px', background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' },
  cards: { display: 'flex', gap: '24px', padding: '60px 32px', justifyContent: 'center', background: '#f5f5f5' },
  card: { background: '#fff', padding: '40px', borderRadius: '12px', textAlign: 'center', flex: 1, maxWidth: '300px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  icon: { fontSize: '48px', marginBottom: '16px' }
}