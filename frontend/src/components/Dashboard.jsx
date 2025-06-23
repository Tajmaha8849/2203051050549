import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css' 

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setShortUrl('')

    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        'http://localhost:8000/api/shorturls',
        { url: originalUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setShortUrl(res.data.data.shortLink)
      setMessage(res.data.message)
    } catch (error) {
      console.error(error)
      setMessage(
        error.response?.data?.message ||
          'Something went wrong while shortening URL'
      )
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h2>URL Shortener</h2>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="url">Enter your URL to shorten</label>
          <input
            type="text"
            id="url"
            placeholder="https://example.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Create Short URL</button>
        </form>

        {message && (
          <p className={`message ${shortUrl ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        {shortUrl && (
          <p className="short-link">
            🔗 Short URL:{' '}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
