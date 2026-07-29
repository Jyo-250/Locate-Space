import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000'

const CATEGORIES = ['All', 'technology', 'healthcare', 'education', 'finance', 'marketing', 'design', 'sales', 'engineering', 'hospitality', 'other']

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/api/jobs`)
      .then(res => setJobs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = jobs.filter(j => {
    const matchCat = category === 'All' || j.category === category
    const matchSearch = j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.location?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Job Listings</h2>

      <div style={styles.filters}>
        <input
          style={styles.search}
          placeholder="Search by title or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={styles.categories}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              style={{ ...styles.catBtn, ...(category === c ? styles.catBtnActive : {}) }}
              onClick={() => setCategory(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={styles.msg}>Loading...</p>
      ) : filtered.length === 0 ? (
        <p style={styles.msg}>No jobs found</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map(job => (
            <div key={job._id} style={styles.card}>
              <div style={styles.cardCat}>{job.category}</div>
              <h3 style={styles.cardTitle}>{job.title}</h3>
              <p style={styles.cardLocation}>📍 {job.location}</p>
              <p style={styles.cardDesc}>{job.description?.slice(0, 120)}...</p>
              <div style={styles.cardFooter}>
                <span style={styles.cardContact}>📞 {job.contactPhone}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  page: { padding: '40px 32px', background: '#f5f5f5', minHeight: '100vh' },
  heading: { fontSize: '32px', color: '#1a1a2e', marginBottom: '24px' },
  filters: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' },
  search: { padding: '12px 16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', maxWidth: '400px' },
  categories: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  catBtn: { padding: '8px 20px', border: '2px solid #1a1a2e', borderRadius: '20px', background: '#fff', cursor: 'pointer', fontSize: '14px' },
  catBtnActive: { background: '#1a1a2e', color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' },
  card: { background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  cardCat: { display: 'inline-block', background: '#1a1a2e', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginBottom: '12px', textTransform: 'capitalize' },
  cardTitle: { fontSize: '18px', color: '#1a1a2e', marginBottom: '8px' },
  cardLocation: { color: '#666', fontSize: '14px', marginBottom: '8px' },
  cardDesc: { color: '#888', fontSize: '14px', marginBottom: '12px' },
  cardFooter: { borderTop: '1px solid #eee', paddingTop: '12px' },
  cardContact: { fontSize: '13px', color: '#555' },
  msg: { textAlign: 'center', color: '#888', marginTop: '60px', fontSize: '18px' }
}