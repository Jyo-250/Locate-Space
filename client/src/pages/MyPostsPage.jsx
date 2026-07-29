import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API = 'https://locate-space-hzh1.onrender.com'

const emptyListing = { title: '', propertyType: 'house', city: '', district: '', price: '', priceUnit: 'month', description: '', bedrooms: '', bathrooms: '', area: '', contactName: '', contactPhone: '' }
const emptyJob = { title: '', category: 'technology',  city: '', district: '', description: '', contactPhone: '' }

export default function MyPostsPage() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [jobs, setJobs] = useState([])
  const [tab, setTab] = useState('listings')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [listingForm, setListingForm] = useState(emptyListing)
  const [jobForm, setJobForm] = useState(emptyJob)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    const headers = { Authorization: `Bearer ${token}` }
    axios.get(`${API}/api/listings/mine`, { headers }).then(res => setListings(res.data)).catch(() => {})
    axios.get(`${API}/api/jobs/mine`, { headers }).then(res => setJobs(res.data)).catch(() => {})
  }, [user])

  function handleDelete(id, type) {
    const headers = { Authorization: `Bearer ${token}` }
    const url = type === 'listing' ? `${API}/api/listings/${id}` : `${API}/api/jobs/${id}`
    axios.delete(url, { headers }).then(() => {
      if (type === 'listing') setListings(prev => prev.filter(l => l._id !== id))
      else setJobs(prev => prev.filter(j => j._id !== id))
    })
  }

  function handleEditListing(l) {
    setEditingId(l._id)
    setListingForm({ title: l.title, propertyType: l.propertyType, city: l.city, district: l.district, price: l.price, priceUnit: l.priceUnit, description: l.description, bedrooms: l.bedrooms || '', bathrooms: l.bathrooms || '', area: l.area || '', contactName: l.contactName || '', contactPhone: l.contactPhone || '' })
    setTab('listings')
    setShowForm(true)
  }

  function handleEditJob(j) {
    setEditingId(j._id)
    setJobForm({ title: j.title, category: j.category, city: j.city || '', district: j.district || '', description: j.description, contactPhone: j.contactPhone || '' })
    setTab('jobs')
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingId(null)
    setListingForm(emptyListing)
    setJobForm(emptyJob)
  }

  async function handleSubmitListing(e) {
    e.preventDefault()
    const headers = { Authorization: `Bearer ${token}` }
    if (editingId) {
        await axios.put(`${API}/api/listings/${editingId}`, listingForm, { headers })
        setListings(prev => prev.map(l => l._id === editingId ? { ...l, ...listingForm } : l))
    } else {
      const res = await axios.post(`${API}/api/listings`, listingForm, { headers })
      setListings(prev => [res.data, ...prev])
    }
    handleCancel()
  }

  async function handleSubmitJob(e) {
    e.preventDefault()
    const headers = { Authorization: `Bearer ${token}` }
    if (editingId) {
        await axios.put(`${API}/api/jobs/${editingId}`, jobForm, { headers })
        setJobs(prev => prev.map(j => j._id === editingId ? { ...j, ...jobForm } : j))
    } else {
      const res = await axios.post(`${API}/api/jobs`, jobForm, { headers })
      setJobs(prev => [res.data, ...prev])
    }
    handleCancel()
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.heading}>My Posts</h2>
        <button style={styles.newBtn} onClick={showForm ? handleCancel : () => { setEditingId(null); setShowForm(true) }}>
          {showForm ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {showForm && tab === 'listings' && (
        <form onSubmit={handleSubmitListing} style={styles.form}>
          <h3 style={styles.formTitle}>{editingId ? 'Edit Property' : 'Post a Property'}</h3>
          <div style={styles.formGrid}>
            <input style={styles.input} placeholder="Title" value={listingForm.title} onChange={e => setListingForm({...listingForm, title: e.target.value})} required />
            <select style={styles.input} value={listingForm.propertyType} onChange={e => setListingForm({...listingForm, propertyType: e.target.value})}>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="shop">Shop</option>
              <option value="rental">Rental</option>
            </select>
            <input style={styles.input} placeholder="City" value={listingForm.city} onChange={e => setListingForm({...listingForm, city: e.target.value})} />
            <input style={styles.input} placeholder="District" value={listingForm.district} onChange={e => setListingForm({...listingForm, district: e.target.value})} />
            <input style={styles.input} placeholder="Price" type="number" value={listingForm.price} onChange={e => setListingForm({...listingForm, price: e.target.value})} required />
            <select style={styles.input} value={listingForm.priceUnit} onChange={e => setListingForm({...listingForm, priceUnit: e.target.value})}>
              <option value="month">Per Month</option>
              <option value="year">Per Year</option>
              <option value="total">Total</option>
            </select>
            <input style={styles.input} placeholder="Bedrooms" value={listingForm.bedrooms} onChange={e => setListingForm({...listingForm, bedrooms: e.target.value})} />
            <input style={styles.input} placeholder="Bathrooms" value={listingForm.bathrooms} onChange={e => setListingForm({...listingForm, bathrooms: e.target.value})} />
            <input style={styles.input} placeholder="Area (sqft)" value={listingForm.area} onChange={e => setListingForm({...listingForm, area: e.target.value})} />
            <input style={styles.input} placeholder="Contact Name" value={listingForm.contactName} onChange={e => setListingForm({...listingForm, contactName: e.target.value})} />
            <input style={styles.input} placeholder="Contact Phone" value={listingForm.contactPhone} onChange={e => setListingForm({...listingForm, contactPhone: e.target.value})} />
          </div>
          <textarea style={styles.textarea} placeholder="Description" value={listingForm.description} onChange={e => setListingForm({...listingForm, description: e.target.value})} />
          <button style={styles.submitBtn} type="submit">{editingId ? 'Update Property' : 'Post Property'}</button>
        </form>
      )}

      {showForm && tab === 'jobs' && (
        <form onSubmit={handleSubmitJob} style={styles.form}>
          <h3 style={styles.formTitle}>{editingId ? 'Edit Job' : 'Post a Job'}</h3>
          <div style={styles.formGrid}>
            <input style={styles.input} placeholder="Job Title" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} required />
            <select style={styles.input} value={jobForm.category} onChange={e => setJobForm({...jobForm, category: e.target.value})}>
              {['technology','healthcare','education','finance','marketing','design','sales','engineering','hospitality','other'].map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
            <input style={styles.input} placeholder="City" value={jobForm.city} onChange={e => setJobForm({...jobForm, city: e.target.value})} />
            <input style={styles.input} placeholder="District" value={jobForm.district} onChange={e => setJobForm({...jobForm, district: e.target.value})} />
            <input style={styles.input} placeholder="Contact Phone" value={jobForm.contactPhone} onChange={e => setJobForm({...jobForm, contactPhone: e.target.value})} />
          </div>
          <textarea style={styles.textarea} placeholder="Job Description" value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} />
          <button style={styles.submitBtn} type="submit">{editingId ? 'Update Job' : 'Post Job'}</button>
        </form>
      )}

      <div style={styles.tabs}>
        <button style={{ ...styles.tab, ...(tab === 'listings' ? styles.tabActive : {}) }} onClick={() => setTab('listings')}>Properties ({listings.length})</button>
        <button style={{ ...styles.tab, ...(tab === 'jobs' ? styles.tabActive : {}) }} onClick={() => setTab('jobs')}>Jobs ({jobs.length})</button>
      </div>

      {tab === 'listings' && (
        <div style={styles.grid}>
          {listings.length === 0 ? <p style={styles.msg}>No properties posted yet</p> : listings.map(l => (
            <div key={l._id} style={styles.card}>
              <div style={styles.cardType}>{l.propertyType}</div>
              <h3 style={styles.cardTitle}>{l.title}</h3>
              <p style={styles.cardCity}>📍 {l.city}, {l.district}</p>
              <p style={styles.cardPrice}>₹{l.price} / {l.priceUnit}</p>
              <div style={styles.btnRow}>
                <button style={styles.editBtn} onClick={() => handleEditListing(l)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(l._id, 'listing')}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'jobs' && (
        <div style={styles.grid}>
          {jobs.length === 0 ? <p style={styles.msg}>No jobs posted yet</p> : jobs.map(j => (
            <div key={j._id} style={styles.card}>
              <div style={styles.cardCat}>{j.category}</div>
              <h3 style={styles.cardTitle}>{j.title}</h3>
              {(j.city || j.district) && <p style={styles.cardCity}>📍 {j.city}{j.district ? `, ${j.district}` : ''}</p>}
              <div style={styles.btnRow}>
                <button style={styles.editBtn} onClick={() => handleEditJob(j)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(j._id, 'job')}>Delete</button>
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
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  heading: { fontSize: '32px', color: '#1a1a2e', margin: 0 },
  newBtn: { padding: '10px 24px', background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' },
  form: { background: '#fff', padding: '32px', borderRadius: '12px', marginBottom: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  formTitle: { color: '#1a1a2e', marginBottom: '20px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
  input: { padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' },
  textarea: { width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', height: '100px', boxSizing: 'border-box', marginBottom: '16px' },
  submitBtn: { padding: '12px 32px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' },
  tabs: { display: 'flex', gap: '12px', marginBottom: '32px' },
  tab: { padding: '10px 24px', border: '2px solid #1a1a2e', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontSize: '15px' },
  tabActive: { background: '#1a1a2e', color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' },
  card: { background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  cardType: { display: 'inline-block', background: '#e94560', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginBottom: '12px', textTransform: 'capitalize' },
  cardCat: { display: 'inline-block', background: '#1a1a2e', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginBottom: '12px', textTransform: 'capitalize' },
  cardTitle: { fontSize: '18px', color: '#1a1a2e', marginBottom: '8px' },
  cardCity: { color: '#666', fontSize: '14px', marginBottom: '8px' },
  cardPrice: { color: '#e94560', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' },
  btnRow: { display: 'flex', gap: '8px' },
  editBtn: { padding: '8px 16px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  deleteBtn: { padding: '8px 16px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  msg: { color: '#888', fontSize: '16px' }
}