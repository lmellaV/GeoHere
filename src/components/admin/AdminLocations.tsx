'use client'

import { useEffect, useState } from 'react'
import { MapPin, Plus, Edit, Trash2, X } from 'lucide-react'
import s from './Admin.module.css'

export function AdminLocations() {
  const [locations, setLocations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [radius, setRadius] = useState('50')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const token = () => localStorage.getItem('geo_token')

  const fetchLocations = async () => {
    const res = await fetch('/api/admin/locations', { headers: { Authorization: `Bearer ${token()}` } })
    const data = await res.json()
    if (data.success) setLocations(data.locations)
  }

  useEffect(() => { fetchLocations().finally(() => setLoading(false)) }, [])

  const handleAdd = async () => {
    const res = await fetch('/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ name, latitude: parseFloat(latitude), longitude: parseFloat(longitude), radius: parseInt(radius) }),
    })
    const data = await res.json()
    if (data.success) { setIsAdding(false); fetchLocations(); setName(''); setLatitude(''); setLongitude(''); setRadius('50') }
    else alert(data.message)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta ubicación?')) return
    const res = await fetch(`/api/locations/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } })
    const data = await res.json()
    if (data.success) fetchLocations(); else alert(data.message || 'Error al eliminar')
  }

  const openEdit = (loc: any) => {
    setSelectedId(loc.id); setName(loc.name)
    setLatitude(loc.latitude.toString()); setLongitude(loc.longitude.toString())
    setRadius(loc.radius.toString()); setIsEditOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!selectedId) return; setIsSubmitting(true)
    try {
      const res = await fetch(`/api/locations/${selectedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ name, latitude: parseFloat(latitude), longitude: parseFloat(longitude), radius: parseInt(radius) }),
      })
      const data = await res.json()
      if (data.success) { setIsEditOpen(false); fetchLocations() } else alert(data.message)
    } finally { setIsSubmitting(false) }
  }

  if (loading) return <div className={s.center}><div className={s.spinner} /></div>

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className={s.heading}>Gestión de Sucursales</h2>
        <button className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => setIsAdding(true)}>
          <Plus size={15} /> Agregar
        </button>
      </div>

      {isAdding && (
        <div className={s.addPanel}>
          <p className={s.addPanelTitle}>Nueva Ubicación</p>
          <div className={s.formRow}>
            <input className={s.input} placeholder="Nombre de sucursal" value={name} onChange={e => setName(e.target.value)} />
            <input className={s.input} type="number" placeholder="Radio (metros)" value={radius} onChange={e => setRadius(e.target.value)} />
          </div>
          <div className={s.formRow} style={{ marginTop: '0.5rem' }}>
            <input className={s.input} type="number" step="any" placeholder="Latitud (ej: -33.42)" value={latitude} onChange={e => setLatitude(e.target.value)} />
            <input className={s.input} type="number" step="any" placeholder="Longitud (ej: -70.61)" value={longitude} onChange={e => setLongitude(e.target.value)} />
          </div>
          <div className={s.formActions}>
            <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setIsAdding(false)}>Cancelar</button>
            <button className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={handleAdd}>Guardar</button>
          </div>
        </div>
      )}

      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead><tr><th>Sucursal</th><th>Coordenadas</th><th>Radio</th><th style={{ textAlign: 'right' }}>Acciones</th></tr></thead>
          <tbody>
            {locations.length === 0 && <tr className={s.emptyRow}><td colSpan={4}>Sin ubicaciones</td></tr>}
            {locations.map(loc => (
              <tr key={loc.id}>
                <td><span className={s.iconRow}><MapPin size={14} style={{ color: 'var(--primary)' }} /><span className={s.cellBold}>{loc.name}</span></span></td>
                <td><span className={s.cellMuted}>{Number(loc.latitude).toFixed(4)}, {Number(loc.longitude).toFixed(4)}</span></td>
                <td><span className={s.cellMuted}>{loc.radius}m</span></td>
                <td>
                  <div className={s.actions}>
                    <button className={`${s.btn} ${s.btnGhostBlue} ${s.btnSm}`} onClick={() => openEdit(loc)}><Edit size={14} /></button>
                    <button className={`${s.btn} ${s.btnGhostRed} ${s.btnSm}`} onClick={() => handleDelete(loc.id)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditOpen && (
        <div className={s.overlay} onClick={e => e.target === e.currentTarget && setIsEditOpen(false)}
          onKeyDown={e => e.key === 'Escape' && setIsEditOpen(false)} tabIndex={-1}>
          <div className={s.modal} role="dialog" aria-modal="true">
            <div className={s.modalHeader}>
              <span className={s.modalTitle}>Editar Ubicación</span>
              <button className={s.modalClose} onClick={() => setIsEditOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className={s.modalBody}>
                <div><label className={s.label}>Nombre</label><input className={s.input} value={name} onChange={e => setName(e.target.value)} required /></div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}><label className={s.label}>Latitud</label><input className={s.input} type="number" step="any" value={latitude} onChange={e => setLatitude(e.target.value)} required /></div>
                  <div style={{ flex: 1 }}><label className={s.label}>Longitud</label><input className={s.input} type="number" step="any" value={longitude} onChange={e => setLongitude(e.target.value)} required /></div>
                </div>
                <div><label className={s.label}>Radio (metros)</label><input className={s.input} type="number" value={radius} onChange={e => setRadius(e.target.value)} required /></div>
              </div>
              <div className={s.modalFooter}>
                <button type="submit" className={`${s.btn} ${s.btnPrimary} ${isSubmitting ? s.btnLoading : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? 'Guardando…' : 'Modificar'}
                </button>
                <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setIsEditOpen(false)}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
