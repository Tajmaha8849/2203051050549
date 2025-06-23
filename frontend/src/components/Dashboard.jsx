import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
        error.response?.data?.message || 'Something went wrong while shortening URL'
      )
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">URL Shortener</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              Enter your URL to shorten
            </label>
            <input
              type="text"
              id="url"
              placeholder="https://example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Short URL
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${shortUrl ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        {shortUrl && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">
              🔗 Short URL:{" "}
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {shortUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard