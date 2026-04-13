'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import styles from './AdminLogs.module.css'
import tableStyles from '../ui/Table.module.css'
import badgeStyles from '../ui/Badge.module.css'

export function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('geo_token')
        const res = await fetch('/api/admin/logs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        if (data.success) {
          setLogs(data.logs)
        }
      } catch (err) {
        console.error('Error fetching logs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div className="spinner">Cargando...</div>
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No hay registros de marcación aún.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={tableStyles.tableContainer}>
        <table className={tableStyles.table}>
          <thead className={tableStyles.thead}>
            <tr className={tableStyles.tr}>
              <th className={tableStyles.th}>Usuario</th>
              <th className={tableStyles.th}>Ubicación</th>
              <th className={tableStyles.th}>Acción</th>
              <th className={tableStyles.th}>Distancia</th>
              <th className={tableStyles.th}>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody className={tableStyles.tbody}>
            {logs.map((log) => (
              <tr className={tableStyles.tr} key={log.id}>
                <td className={tableStyles.td} data-label="Usuario">
                  <div className={styles.userName}>{log.user_name}</div>
                </td>
                <td className={tableStyles.td} data-label="Ubicación">{log.location_name}</td>
                <td className={tableStyles.td} data-label="Acción">
                  <span className={`${badgeStyles.badge} ${log.action === 'checkin' ? badgeStyles.success : badgeStyles.danger}`}>
                    {log.action === 'checkin' ? 'ENTRADA' : 'SALIDA'}
                  </span>
                </td>
                <td className={tableStyles.td} data-label="Distancia">
                  <div className={`${styles.distance} ${log.distance <= 50 ? styles.distanceOk : styles.distanceWarn}`}>
                    {Math.round(log.distance)}m
                  </div>
                </td>
                <td className={tableStyles.td} data-label="Fecha y Hora">
                  <div className={styles.time}>
                    {format(new Date(log.action_time), "d 'de' MMMM, HH:mm", { locale: es })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
