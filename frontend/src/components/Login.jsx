import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      })

      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        setError('')
        alert('✅ Logged In Successfully.')
        navigate('/dashboard')
      } else {
        setError('❌ Invalid credentials.')
      }
    } catch (error) {
      setError(error.response?.data?.message || '❌ Error during login.')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtext">Login to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="login-note">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  )
}

export default Login
