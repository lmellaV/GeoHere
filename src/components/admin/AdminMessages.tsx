'use client'

import { useState, useEffect } from 'react'
import { MailWarning, Check, X } from 'lucide-react'
import s from './Admin.module.css'

interface Msg {
  id: string; username: string; name: string | null; type: string
  status: 'pending' | 'resolved'
  createdAt: string; resolvedAt: string | null
}

export function AdminMessages() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Msg | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [resolving, setResolving] = useState(false)

  const token = () => localStorage.getItem('geo_token')

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/messages', { headers: { Authorization: `Bearer ${token()}` } })
      const data = await res.json()
      if (data.success) setMessages(data.messages)
      else setError(data.message)
    } catch { setError('Error al cargar mensajes') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchMessages() }, [])

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected || !newPassword) return
    setResolving(true)
    try {
      const res = await fetch(`/api/admin/messages/${selected.id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ newPassword }),
      })
      const data = await res.json()
      if (data.success) { setIsOpen(false); setNewPassword(''); fetchMessages() }
      else alert(data.message)
    } finally { setResolving(false) }
  }

  if (loading) return <div className={s.center}><div className={s.spinner} /></div>

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className={s.heading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MailWarning size={18} /> Solicitudes de Contraseña
        </h2>
      </div>

      {error && <p className={s.errorMsg}>{error}</p>}

      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Usuario (RUT/Login)</th>
              <th>Estado</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 && <tr className={s.emptyRow}><td colSpan={4}>Sin solicitudes</td></tr>}
            {messages.map(msg => (
              <tr key={msg.id}>
                <td className={s.cellMuted}>{new Date(msg.createdAt).toLocaleString('es-CL')}</td>
                <td className={s.cellBold}>{msg.name || '---'}</td>
                <td className={s.cellBold}>{msg.username}</td>
                <td>
                  <span className={`${s.badge} ${msg.status === 'pending' ? s.badgeYellow : s.badgeGreen}`}>
                    {msg.status === 'pending' ? 'Pendiente' : 'Resuelta'}
                  </span>
                </td>
                <td>
                  <div className={s.actions}>
                    <button
                      className={`${s.btn} ${msg.status === 'pending' ? s.btnGhostBlue : s.btnGhost} ${s.btnSm}`}
                      disabled={msg.status === 'resolved'}
                      onClick={() => { setSelected(msg); setIsOpen(true) }}
                    >
                      <Check size={14} /> {msg.status === 'pending' ? 'Resolver' : 'Resuelto'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className={s.overlay} onClick={e => e.target === e.currentTarget && setIsOpen(false)}
          onKeyDown={e => e.key === 'Escape' && setIsOpen(false)} tabIndex={-1}>
          <div className={s.modal} role="dialog" aria-modal="true">
            <div className={s.modalHeader}>
              <span className={s.modalTitle}>Resolver Solicitud</span>
              <button className={s.modalClose} onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleResolve}>
              <div className={s.modalBody}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label className={s.label}>Nombre</label>
                    <input className={s.input} value={selected?.name || '---'} disabled />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className={s.label}>RUT/Login</label>
                    <input className={s.input} value={selected?.username || ''} disabled />
                  </div>
                </div>
                <div>
                  <label className={s.label}>Nueva Contraseña</label>
                  <input className={s.input} type="password" placeholder="Ingrese la nueva contraseña" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                </div>
              </div>
              <div className={s.modalFooter}>
                <button type="submit" className={`${s.btn} ${s.btnPrimary} ${resolving ? s.btnLoading : ''}`} disabled={resolving}>
                  {resolving ? 'Aplicando…' : 'Modificar (Resolver)'}
                </button>
                <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setIsOpen(false)}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
