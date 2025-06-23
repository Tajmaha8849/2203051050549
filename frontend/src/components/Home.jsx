import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6b21a8, #3b0764)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀 Welcome to ShortURL</h1>
      <p style={{ marginBottom: '2rem' }}>Your smart link shortener</p>

      <div>
        <button
          style={{
            marginRight: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '999px',
            backgroundColor: 'white',
            color: '#6b21a8',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/register')}
        >
          Register
        </button>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '999px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Home
