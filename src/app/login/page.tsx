'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MapPin, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { validateRut, formatRut } from '@/lib/rut'
import styles from './Login.module.css'
import btnStyles from '@/components/ui/Button.module.css'
import inputStyles from '@/components/ui/Input.module.css'

// A username starts with letters (e.g. "Casona Nueva")
// A RUT starts with digits (e.g. "12.345.678-9")
const looksLikeRut = (val: string) => /^\d/.test(val.trim())
const looksLikeUsername = (val: string) => /^[a-zA-ZÀ-ÿ]/.test(val.trim())

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'forgot'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [fieldHint, setFieldHint] = useState<string | null>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    let deviceId = localStorage.getItem('geo_device_id')
    if (!deviceId) {
      deviceId = `dev_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
      localStorage.setItem('geo_device_id', deviceId)
    }
  }, [])

  const handleUsernameChange = (val: string) => {
    setFieldError(null)
    setServerError(null)
    setFieldHint(null)

    // Auto-format if it looks like a RUT
    if (looksLikeRut(val)) {
      const raw = val.replace(/[^0-9kK]/g, '')
      const formatted = raw.length > 1 ? formatRut(raw) : val
      setUsername(formatted)
      setFieldHint('RUT detectado')

      // Debounced RUT validation
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        if (formatted.length > 6 && !validateRut(formatted)) {
          setFieldError('RUT inválido — verifica el dígito verificador')
        }
      }, 700)
    } else if (looksLikeUsername(val)) {
      setUsername(val)
      setFieldHint('Usuario o nombre de empresa detectado')
    } else {
      setUsername(val)
    }
  }

  const handlePasswordChange = (val: string) => {
    setPassword(val)
    setPasswordError(null)
    setServerError(null)
    if (val.length > 0 && val.length < 6) {
      setPasswordError('Mínimo 6 caracteres')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)
    setSuccessMsg(null)

    if (!username.trim()) { setFieldError('Ingresa tu RUT o usuario'); return }

    // Only validate RUT format if it looks like a RUT
    if (looksLikeRut(username) && !validateRut(username)) {
      setFieldError('RUT inválido')
      return
    }

    if (mode === 'login') {
      if (!password || password.length < 6) {
        setPasswordError('Mínimo 6 caracteres')
        return
      }

      setLoading(true)
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })
        const data = await response.json()

        if (data.success) {
          localStorage.setItem('geo_token', data.token)
          localStorage.setItem('geo_user', JSON.stringify(data.user))
          router.push('/')
        } else {
          setServerError(data.message || 'Error al iniciar sesión')
        }
      } catch {
        setServerError('No se pudo conectar con el servidor')
      } finally {
        setLoading(false)
      }
    } else {
      // Forgot password mode
      setLoading(true)
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        })
        const data = await response.json()

        if (data.success) {
          setSuccessMsg(data.message)
          // Keep the username visible or clear it based on preference
          // setUsername('')
        } else {
          setServerError(data.message || 'Error al procesar solicitud')
        }
      } catch {
        setServerError('No se pudo conectar con el servidor')
      } finally {
        setLoading(false)
      }
    }
  }

  if (!mounted) return null

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <MapPin size={24} />
            </div>
            <h1 className={styles.brandName}>GeoHere</h1>
          </div>
          <ThemeToggle />
        </header>

        <section className={styles.welcomeSection}>
          <h2 className={styles.welcomeTitle}>
            {mode === 'login' ? 'Bienvenido' : 'Recuperar Acceso'}
          </h2>
          <p className={styles.welcomeSubtitle}>
            {mode === 'login' 
              ? 'Ingresa tu RUT o nombre de usuario' 
              : 'Ingresa tu identificador para solicitar una nueva clave'
            }
          </p>
        </section>

        {mode === 'forgot' && (
          <button 
            className={`${btnStyles.button} ${btnStyles.ghost} ${btnStyles.sm}`}
            onClick={() => { setMode('login'); setServerError(null); setSuccessMsg(null); }}
            style={{ marginBottom: '1rem', width: 'fit-content', padding: '0.25rem 0.5rem' }}
          >
            <ArrowLeft size={16} /> Volver al Login
          </button>
        )}

        {serverError && (
            <div className={styles.errorAlert}>
              <AlertCircle size={18} />
              <span>{serverError}</span>
            </div>
          )}

        {successMsg && (
            <div className={`${styles.feedback} ${styles.feedbackSuccess}`} style={{ marginBottom: '1.5rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={inputStyles.inputGroup}>
            <div className={styles.inputHeader}>
              <label className={inputStyles.label}>RUT o Usuario</label>
              {fieldHint && !fieldError && (
                  <span className={styles.hint}>{fieldHint}</span>
                )}
            </div>
            <input 
              className={`${inputStyles.input} ${fieldError ? inputStyles.error : ''}`}
              placeholder="12.345.678-9 o nombre de empresa"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              aria-invalid={!!fieldError}
            />
            {fieldError && (
                <p className={inputStyles.errorMessage}>{fieldError}</p>
              )}
          </div>

          {mode === 'login' && (
            <div className={inputStyles.inputGroup}>
              <label className={inputStyles.label}>Contraseña</label>
              <input
                className={`${inputStyles.input} ${passwordError ? inputStyles.error : ''}`}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                aria-invalid={!!passwordError}
              />
              {passwordError && (
                  <p className={inputStyles.errorMessage}>{passwordError}</p>
                )}
            </div>
          )}

          <button
            type="submit"
            className={`${btnStyles.button} ${btnStyles.primary} ${btnStyles.lg} ${btnStyles.fullWidth}`}
            disabled={loading}
          >
            {loading ? 'Procesando...' : (mode === 'login' ? 'Iniciar Sesión' : 'Enviar Solicitud')}
          </button>
        </form>

        {mode === 'login' && (
          <footer className={styles.footer}>
            <span>¿Problemas para entrar? Contacta a soporte</span>
            <button 
              type="button" 
              className={styles.forgotLink}
              onClick={() => { setMode('forgot'); setServerError(null); setSuccessMsg(null); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Olvidé mi contraseña
            </button>
          </footer>
        )}
      </div>
    </div>
  )
}
