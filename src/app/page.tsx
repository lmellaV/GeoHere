'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  LogOut,
  MapPin,
  Navigation,
  RefreshCcw,
  CheckCircle2,
  AlertTriangle,
  User,
  ChevronRight,
} from 'lucide-react'
import styles from './Dashboard.module.css'
import btnStyles from '@/components/ui/Button.module.css'

// Haversine formula — local visual feedback only; backend does the authoritative check
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3
  const p1 = (lat1 * Math.PI) / 180
  const p2 = (lat2 * Math.PI) / 180
  const dp = ((lat2 - lat1) * Math.PI) / 180
  const dl = ((lon2 - lon1) * Math.PI) / 180
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

type Msg = { text: string; type: 'success' | 'error' | 'info' }

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [locations, setLocations] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [gettingGps, setGettingGps] = useState(false)
  const [marking, setMarking] = useState(false)
  const [msg, setMsg] = useState<Msg | null>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem('geo_token')
    const userData = localStorage.getItem('geo_user')
    if (!token || !userData) { router.push('/login'); return }
    setUser(JSON.parse(userData))
    fetchLocations()
  }, [router])

  useEffect(() => {
    if (!coords || !selectedId) { setDistance(null); return }
    const loc = locations.find((l) => l.id === selectedId)
    if (loc) setDistance(haversine(coords.lat, coords.lng, loc.latitude, loc.longitude))
  }, [selectedId, coords, locations])

  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/locations')
      const data = await res.json()
      if (data.success) setLocations(data.locations)
    } catch { /* silent */ }
  }

  const getGps = () => {
    setMsg(null)
    setGettingGps(true)
    if (!navigator.geolocation) {
      setMsg({ text: 'GPS no disponible en este navegador.', type: 'error' })
      setGettingGps(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: c }) => {
        setCoords({ lat: c.latitude, lng: c.longitude })
        setGettingGps(false)
      },
      (err) => {
        setGettingGps(false)
        const msgs: Record<number, string> = {
          1: 'Permiso de ubicación denegado.',
          2: 'Señal GPS no disponible.',
          3: 'Tiempo de espera agotado al obtener el GPS.',
        }
        setMsg({ text: msgs[err.code] ?? 'Error al obtener el GPS.', type: 'error' })
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    )
  }

  const handleAction = async (action: 'checkin' | 'checkout') => {
    if (!coords || !selectedId) return
    setMarking(true)
    setMsg(null)
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          locationId: selectedId,
          userLatitude: coords.lat,
          userLongitude: coords.lng,
          action,
        }),
      })
      const data = await res.json()
      setMsg({ text: data.message, type: data.success ? 'success' : 'error' })
    } catch {
      setMsg({ text: 'No se pudo conectar con el servidor.', type: 'error' })
    } finally {
      setMarking(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('geo_token')
    localStorage.removeItem('geo_user')
    router.push('/login')
  }

  if (!mounted || !user) return null

  const selectedLoc = locations.find((l) => l.id === selectedId)
  const inRange = distance !== null && selectedLoc && distance <= selectedLoc.radius
  const canMark = !!inRange && !marking

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.logoArea}>
              <div className={styles.logoIcon}>
                <MapPin size={22} />
              </div>
              <h1 className={styles.brandName}>GeoHere</h1>
            </div>

            <div className={styles.headerActions}>
              <ThemeToggle />
              
              {user.role === 'admin' && (
                <button
                  className={styles.adminLink}
                  onClick={() => router.push('/admin')}
                >
                  Admin <ChevronRight size={16} />
                </button>
              )}

              <button
                className={`${btnStyles.button} ${btnStyles.outline} ${btnStyles.sm}`}
                onClick={handleLogout}
              >
                <LogOut size={15} />
                <span style={{ marginLeft: '0.25rem' }}>Salir</span>
              </button>
            </div>
          </header>

          {/* Main Card */}
          <main className={styles.card}>
            {/* User Info */}
            <div className={styles.userInfo}>
              <div className={styles.userIcon}>
                <User size={24} />
              </div>
              <div className={styles.userMeta}>
                <span className={styles.userLabel}>Conectado como</span>
                <span className={styles.userName}>{user.name || user.username}</span>
                {user.name !== user.username && (
                  <span className={styles.userHandle}>{user.username}</span>
                )}
              </div>
            </div>

            <div className={styles.divider} />

            {/* Actions Section */}
            <div className={styles.actionsSection}>
              {/* Location Selector */}
              <div>
                <label className={styles.fieldLabel}>Selecciona la sucursal</label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className={styles.select}
                >
                  <option value="" disabled>— Elige una ubicación —</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} (Radio: {loc.radius}m)
                    </option>
                  ))}
                </select>
              </div>

              {/* GPS Status */}
              <div className={styles.gpsStatus}>
                <div className={styles.gpsRow}>
                  <div className={styles.gpsInfo}>
                    <Navigation size={18} color={coords ? 'var(--primary)' : 'var(--text-soft)'} />
                    <span>{coords ? 'GPS capturado' : 'GPS requerido'}</span>
                  </div>
                  <button
                    onClick={getGps}
                    disabled={gettingGps}
                    className={`${btnStyles.button} ${btnStyles.outline} ${btnStyles.sm}`}
                    style={{ height: '2.5rem', padding: '0 1rem' }}
                  >
                    {gettingGps ? '...' : <RefreshCcw size={13} style={{ marginRight: '6px' }} />}
                    {coords ? 'Actualizar' : 'Obtener'}
                  </button>
                </div>

                {!coords && !gettingGps && (
                  <p className={styles.gpsHint}>
                    Tu ubicación se usará solo para verificar la asistencia.
                  </p>
                )}

                {distance !== null && selectedLoc && (
                    <div className={`${styles.rangeBadge} ${inRange ? styles.rangeOk : styles.rangeWarn}`}>
                        {inRange ? (
                          <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                        ) : (
                          <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                        )}
                        <div>
                          <div className={styles.rangeTitle}>
                            {inRange ? '¡Estás dentro del rango!' : 'Fuera del rango permitido'}
                          </div>
                          <div className={styles.rangeDist}>
                            Distancia: <strong>{distance.toFixed(0)} m</strong> — Radio: {selectedLoc.radius} m
                          </div>
                        </div>
                      </div>
                  )}
              </div>

              {/* Feedback Message */}
              {msg && (
                  <div className={`${styles.feedback} ${msg.type === 'success' ? styles.feedbackSuccess : styles.feedbackError}`}>
                    {msg.text}
                  </div>
                )}

              <div className={styles.divider} />

              {/* Action Buttons */}
              <div className={styles.buttonGrid}>
                <button
                  className={`${btnStyles.button} ${btnStyles.primary} ${btnStyles.lg}`}
                  style={{ flex: 1, height: '4rem', fontSize: '1.125rem', backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}
                  onClick={() => handleAction('checkin')}
                  disabled={!canMark}
                >
                  {marking ? '...' : '✓ Llegada'}
                </button>
                <button
                  className={`${btnStyles.button} ${btnStyles.primary} ${btnStyles.lg}`}
                  style={{ flex: 1, height: '4rem', fontSize: '1.125rem', backgroundColor: 'var(--danger)', borderColor: 'var(--danger)' }}
                  onClick={() => handleAction('checkout')}
                  disabled={!canMark}
                >
                  {marking ? '...' : '✕ Salida'}
                </button>
              </div>
            </div>
          </main>

          <footer className={styles.footerText}>
            GeoHere v1.0.0 · Verificación de asistencia por geolocalización
          </footer>
        </div>
      </div>
    </div>
  )
}
