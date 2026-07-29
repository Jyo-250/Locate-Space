import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://locate-space-hzh1.onrender.com'

const TYPES = ['All', 'house', 'apartment', 'shop', 'rental']

export default function ListingsPage() {
  const [listings, setListings] = useState([])
  const [type, setType] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API}/api/listings`)
      .then(res => setListings(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = listings.filter(l => {
    const matchType = type === 'All' || l.propertyType === type
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.city?.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Property Listings</h2>

      <div style={styles.filters}>
        <input
          style={styles.search}
          placeholder="Search by title or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={styles.types}>
          {TYPES.map(t => (
            <button
              key={t}
              style={{ ...styles.typeBtn, ...(type === t ? styles.typeBtnActive : {}) }}
              onClick={() => setType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={styles.msg}>Loading...</p>
      ) : filtered.length === 0 ? (
        <p style={styles.msg}>No listings found</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map(listing => (
            <div key={listing._id} style={styles.card}>
              <div style={styles.cardType}>{listing.propertyType}</div>
              <h3 style={styles.cardTitle}>{listing.title}</h3>
              <p style={styles.cardCity}>📍 {listing.city}, {listing.district}</p>
              <p style={styles.cardPrice}>₹{listing.price} / {listing.priceUnit}</p>
              <p style={styles.cardDesc}>{listing.description?.slice(0, 100)}...</p>
              <div style={styles.cardMeta}>
                {listing.bedrooms && <span>🛏 {listing.bedrooms}</span>}
                {listing.bathrooms && <span>🚿 {listing.bathrooms}</span>}
                {listing.area && <span>📐 {listing.area} sqft</span>}
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
  types: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  typeBtn: { padding: '8px 20px', border: '2px solid #1a1a2e', borderRadius: '20px', background: '#fff', cursor: 'pointer', fontSize: '14px' },
  typeBtnActive: { background: '#1a1a2e', color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' },
  card: { background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  cardType: { display: 'inline-block', background: '#e94560', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginBottom: '12px', textTransform: 'capitalize' },
  cardTitle: { fontSize: '18px', color: '#1a1a2e', marginBottom: '8px' },
  cardCity: { color: '#666', fontSize: '14px', marginBottom: '8px' },
  cardPrice: { color: '#e94560', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' },
  cardDesc: { color: '#888', fontSize: '14px', marginBottom: '12px' },
  cardMeta: { display: 'flex', gap: '16px', fontSize: '13px', color: '#555' },
  msg: { textAlign: 'center', color: '#888', marginTop: '60px', fontSize: '18px' }
}