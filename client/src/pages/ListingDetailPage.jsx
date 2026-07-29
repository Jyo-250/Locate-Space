import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://locate-space-hzh1.onrender.com'

export default function ListingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/api/listings/${id}`)
      .then(res => { setListing(res.data); setLoading(false) })
      .catch(() => { setLoading(false) })
  }, [id])

  if (loading) return <div style={styles.center}>Loading...</div>
  if (!listing) return <div style={styles.center}>Listing not found</div>

  return (
    <div style={styles.page}>
      <button style={styles.back} onClick={() => navigate('/listings')}>← Back to Listings</button>
      <div style={styles.card}>
        <div style={styles.badge}>{listing.propertyType}</div>
        <h1 style={styles.title}>{listing.title}</h1>
        <p style={styles.location}>📍 {listing.city}, {listing.district}</p>
        <p style={styles.price}>₹{listing.price} / {listing.priceUnit}</p>

        <div style={styles.grid}>
          {listing.bedrooms && <div style={styles.stat}><span style={styles.label}>Bedrooms</span><span style={styles.val}>{listing.bedrooms}</span></div>}
          {listing.bathrooms && <div style={styles.stat}><span style={styles.label}>Bathrooms</span><span style={styles.val}>{listing.bathrooms}</span></div>}
          {listing.area && <div style={styles.stat}><span style={styles.label}>Area</span><span style={styles.val}>{listing.area} sqft</span></div>}
        </div>

        {listing.description && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <p style={styles.desc}>{listing.description}</p>
          </div>
        )}

        <div style={styles.contact}>
          <h3 style={styles.sectionTitle}>Contact</h3>
          {listing.contactName && <p style={styles.contactInfo}>👤 {listing.contactName}</p>}
          {listing.contactPhone && <p style={styles.contactInfo}>📞 {listing.contactPhone}</p>}
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
  badge: { display: 'inline-block', background: '#e94560', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '16px', textTransform: 'capitalize' },
  title: { fontSize: '32px', color: '#1a1a2e', marginBottom: '12px' },
  location: { color: '#666', fontSize: '16px', marginBottom: '8px' },
  price: { color: '#e94560', fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' },
  grid: { display: 'flex', gap: '24px', marginBottom: '32px' },
  stat: { background: '#f5f5f5', borderRadius: '12px', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '12px', color: '#888', textTransform: 'uppercase' },
  val: { fontSize: '20px', fontWeight: 'bold', color: '#1a1a2e' },
  section: { marginBottom: '32px' },
  sectionTitle: { fontSize: '18px', color: '#1a1a2e', marginBottom: '12px', borderBottom: '2px solid #f5f5f5', paddingBottom: '8px' },
  desc: { color: '#555', lineHeight: '1.7', fontSize: '15px' },
  contact: { background: '#f9f9f9', borderRadius: '12px', padding: '24px' },
  contactInfo: { color: '#333', fontSize: '16px', marginBottom: '8px' }
}