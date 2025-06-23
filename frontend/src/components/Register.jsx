import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Register.css'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('Please fill in all fields.')
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
        setError('⚠️ Something went wrong. Try again.')
      }
    } catch (error) {
      setError(error.response?.data?.message || '❌ Server error. Try again.')
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2>Register</h2>
        <p className="subtext">Create your account</p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Register</button>
        </form>

        <p className="login-note">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register
