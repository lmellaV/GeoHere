'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  ArrowLeft,
  ClipboardList,
  Users,
  MapPin,
  Building2,
  MailWarning,
  Bell
} from 'lucide-react'

import styles from './AdminShell.module.css'

// CRUD Components
import { AdminCompanies } from '../../components/admin/AdminCompanies'
import { AdminUsers } from '../../components/admin/AdminUsers'
import { AdminLocations } from '../../components/admin/AdminLocations'
import { AdminLogs } from '../../components/admin/AdminLogs'
import { AdminMessages } from '../../components/admin/AdminMessages'

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('logs')
  const [pendingCount, setPendingCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem('geo_token')
    const userData = localStorage.getItem('geo_user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/')
      return
    }

    setUser(parsedUser)

    // Recover last tab
    const savedTab = localStorage.getItem('geo_admin_tab')
    if (savedTab) {
      setActiveTab(savedTab)
    }

    // Initial fetch for notifications
    fetchNotifications(token)

    // Polling notifications
    const interval = setInterval(() => fetchNotifications(token), 30000)
    return () => clearInterval(interval)
  }, [router])

  const fetchNotifications = async (token: string) => {
    try {
      const res = await fetch('/api/admin/messages/count', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setPendingCount(data.count)
      }
    } catch (err) {
      console.error('Error fetching notifications:', err)
    }
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    localStorage.setItem('geo_admin_tab', tabId)
  }

  if (!mounted || !user) return null

  const tabs = [
    { id: 'logs', label: 'Logs de Marcación', icon: <ClipboardList size={18} /> },
    { id: 'users', label: 'Usuarios', icon: <Users size={18} /> },
    { id: 'locations', label: 'Ubicaciones', icon: <MapPin size={18} /> },
    { id: 'companies', label: 'Empresas', icon: <Building2 size={18} /> },
    { id: 'messages', label: 'Solicitudes', icon: <MailWarning size={18} /> },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'logs': return <AdminLogs />
      case 'users': return <AdminUsers />
      case 'locations': return <AdminLocations />
      case 'companies': return <AdminCompanies />
      case 'messages': return <AdminMessages />
      default: return <AdminLogs />
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <button
                className={styles.backBtn}
                onClick={() => router.push('/')}
              >
                <ArrowLeft size={20} />
              </button>
              <div className={styles.titleArea}>
                <h1 className={styles.title}>Panel de Administración</h1>
                <p className={styles.subtitle}>Gestión de recursos y logs de getinwork</p>
              </div>
            </div>
            <div className={styles.headerRight}>
              <button 
                className={styles.notificationBell}
                onClick={() => handleTabChange('messages')}
                title="Ver solicitudes pendientes"
              >
                <Bell size={20} />
                {pendingCount > 0 && <span className={styles.badge} />}
              </button>
              <ThemeToggle />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userRole}>Administrador</span>
              </div>
            </div>
          </header>

          {/* Main Content Card */}
          <main className={styles.mainCard}>
            <div className={styles.tabsList}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tabTrigger} ${activeTab === tab.id ? styles.tabActive : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.tabContent}>
              <div
                key={activeTab}
              >
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
