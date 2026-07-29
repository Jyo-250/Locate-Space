import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://locate-space-hzh1.onrender.com'

export default function JobDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/api/jobs/${id}`)
      .then(res => { setJob(res.data); setLoading(false) })
      .catch(() => { setLoading(false) })
  }, [id])

  if (loading) return <div style={styles.center}>Loading...</div>
  if (!job) return <div style={styles.center}>Job not found</div>

  return (
    <div style={styles.page}>
      <button style={styles.back} onClick={() => navigate('/jobs')}>← Back to Jobs</button>
      <div style={styles.card}>
        <div style={styles.badge}>{job.category}</div>
        <h1 style={styles.title}>{job.title}</h1>
        {(job.city || job.district) && <p style={styles.location}>📍 {job.city}{job.district ? `, ${job.district}` : ''}</p>}

        {job.description && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Job Description</h3>
            <p style={styles.desc}>{job.description}</p>
          </div>
        )}

        <div style={styles.contact}>
          <h3 style={styles.sectionTitle}>Contact</h3>
          {job.contactPhone && <p style={styles.contactInfo}>📞 {job.contactPhone}</p>}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { padding: '40px 32px', background: '#f5f5f5', minHeight: '100vh' },
  center: { textAlign: 'center', padding: '80px', fontSize: '18px', color: '#666' },
  back: { background: 'none', border: 'none', color: '#e94560', fontSize: '16px', cursor: 'pointer', marginBottom: '24px', padding: 0 },
  card: { background: '#fff', borderRadius: '16px', padding: '40px', maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  badge: { display: 'inline-block', background: '#1a1a2e', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '16px', textTransform: 'capitalize' },
  title: { fontSize: '32px', color: '#1a1a2e', marginBottom: '12px' },
  location: { color: '#666', fontSize: '16px', marginBottom: '32px' },
  section: { marginBottom: '32px' },
  sectionTitle: { fontSize: '18px', color: '#1a1a2e', marginBottom: '12px', borderBottom: '2px solid #f5f5f5', paddingBottom: '8px' },
  desc: { color: '#555', lineHeight: '1.7', fontSize: '15px' },
  contact: { background: '#f9f9f9', borderRadius: '12px', padding: '24px' },
  contactInfo: { color: '#333', fontSize: '16px', marginBottom: '8px' }
}