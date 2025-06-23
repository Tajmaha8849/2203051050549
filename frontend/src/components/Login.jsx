import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please enter email and password.')
      return
    }

    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      })

      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        alert('✅ Logged In Successfully.')
        navigate('/dashboard')
      } else {
        alert('❌ Invalid credentials.')
      }
    } catch (error) {
      alert(error.response?.data?.message || '❌ Error during login.')
    }
  }

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>

      <form method="POST" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#6b21a8',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
