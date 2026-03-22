'use client'

import { useEffect, useState } from 'react'
import { Building2, Plus, Edit, Trash2, X } from 'lucide-react'
import s from './Admin.module.css'

export function AdminCompanies() {
  const [companies, setCompanies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const token = () => localStorage.getItem('geo_token')

  const fetchCompanies = async () => {
    const res = await fetch('/api/admin/companies', { headers: { Authorization: `Bearer ${token()}` } })
    const data = await res.json()
    if (data.success) setCompanies(data.companies)
  }

  useEffect(() => { fetchCompanies().finally(() => setLoading(false)) }, [])

  const handleAdd = async () => {
    const res = await fetch('/api/admin/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ name, password }),
    })
    const data = await res.json()
    if (data.success) { setIsAdding(false); fetchCompanies(); setName(''); setPassword('') }
    else alert(data.message)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta empresa?')) return
    const res = await fetch(`/api/admin/companies/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } })
    const data = await res.json()
    if (data.success) fetchCompanies(); else alert(data.message)
  }

  const openEdit = (c: any) => { setSelectedId(c.id); setName(c.name); setPassword(''); setIsEditOpen(true) }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!selectedId) return; setIsSubmitting(true)
    try {
      const body: any = { name }
      if (password) body.password = password
      const res = await fetch(`/api/admin/companies/${selectedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.success) { setIsEditOpen(false); fetchCompanies() } else alert(data.message)
    } finally { setIsSubmitting(false) }
  }

  if (loading) return <div className={s.center}><div className={s.spinner} /></div>

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className={s.heading}>Gestión de Empresas</h2>
        <button className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => setIsAdding(true)}>
          <Plus size={15} /> Agregar
        </button>
      </div>

      {isAdding && (
        <div className={s.addPanel}>
          <p className={s.addPanelTitle}>Nueva Empresa</p>
          <div className={s.formRow}>
            <input className={s.input} placeholder="Nombre de empresa" value={name} onChange={e => setName(e.target.value)} />
            <input className={s.input} type="password" placeholder="Contraseña de acceso" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className={s.formActions}>
            <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setIsAdding(false)}>Cancelar</button>
            <button className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={handleAdd}>Guardar</button>
          </div>
        </div>
      )}

      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead><tr><th>Empresa</th><th style={{ textAlign: 'right' }}>Acciones</th></tr></thead>
          <tbody>
            {companies.length === 0 && <tr className={s.emptyRow}><td colSpan={2}>Sin empresas</td></tr>}
            {companies.map(c => (
              <tr key={c.id}>
                <td><span className={s.iconRow}><Building2 size={15} style={{ color: 'var(--primary)' }} /><span className={s.cellBold}>{c.name}</span></span></td>
                <td>
                  <div className={s.actions}>
                    <button className={`${s.btn} ${s.btnGhostBlue} ${s.btnSm}`} onClick={() => openEdit(c)}><Edit size={14} /></button>
                    <button className={`${s.btn} ${s.btnGhostRed} ${s.btnSm}`} onClick={() => handleDelete(c.id)}><Trash2 size={14} /></button>
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
              <span className={s.modalTitle}>Editar Empresa</span>
              <button className={s.modalClose} onClick={() => setIsEditOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className={s.modalBody}>
                <div><label className={s.label}>Nombre</label><input className={s.input} value={name} onChange={e => setName(e.target.value)} required /></div>
                <div><label className={s.label}>Nueva Contraseña (opcional)</label><input className={s.input} type="password" placeholder="Dejar vacío para no cambiar" value={password} onChange={e => setPassword(e.target.value)} /></div>
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
