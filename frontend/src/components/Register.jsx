import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      alert('Please fill in all fields.')
      return
    }

    try {
      const res = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      })

      if (res.data.message) {
        alert('✅ Registration Successful.')
        navigate('/login')
      } else {
        alert('⚠️ Error while registering.')
      }
    } catch (error) {
      alert(
        error.response?.data?.message || '❌ Something went wrong. Try again.'
      )
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
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
