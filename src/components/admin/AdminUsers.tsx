"use client";

import { useEffect, useState } from "react";
import { UserPlus, Building, Edit, Trash2, X } from "lucide-react";
import s from "./Admin.module.css";

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [jornada, setJornada] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = () => localStorage.getItem("geo_token");

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token()}` },
    });
    const data = await res.json();
    if (data.success) setUsers(data.users);
  };
  const fetchCompanies = async () => {
    const res = await fetch("/api/admin/companies", {
      headers: { Authorization: `Bearer ${token()}` },
    });
    const data = await res.json();
    if (data.success) setCompanies(data.companies);
  };

  useEffect(() => {
    Promise.all([fetchUsers(), fetchCompanies()]).finally(() =>
      setLoading(false),
    );
  }, []);

  const handleAdd = async () => {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify({
        username,
        name,
        email,
        cargo,
        jornada,
        password,
        company_id: companyId,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setIsAdding(false);
      fetchUsers();
      setUsername("");
      setName("");
      setEmail("");
      setCargo("");
      setJornada("");
      setPassword("");
      setCompanyId("");
    } else alert(data.message);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token()}` },
    });
    const data = await res.json();
    if (data.success) fetchUsers();
    else alert(data.message);
  };

  const openEdit = (u: any) => {
    setSelectedUserId(u.id);
    setUsername(u.username);
    setName(u.name || "");
    setEmail(u.email || "");
    setCargo(u.cargo || "");
    setJornada(u.jornada || "");
    setPassword("");
    setCompanyId(u.companyId || "");
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;
    setIsSubmitting(true);
    try {
      const body: any = {
        username,
        name,
        email,
        cargo,
        jornada,
        company_id: companyId,
      };
      if (password) body.password = password;
      const res = await fetch(`/api/admin/users/${selectedUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setIsEditOpen(false);
        fetchUsers();
      } else alert(data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className={s.center}>
        <div className={s.spinner} />
      </div>
    );

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className={s.heading}>Gestión de Empleados</h2>
        <button
          className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
          onClick={() => setIsAdding(true)}
        >
          <UserPlus size={15} /> Agregar
        </button>
      </div>

      {isAdding && (
        <div className={s.addPanel}>
          <p className={s.addPanelTitle}>Nuevo Usuario</p>
          <div className={s.formRow}>
            <input
              className={s.input}
              placeholder="RUT (ej: 12345678-9)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={s.input}
              placeholder="Nombre Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={s.formRow} style={{ marginTop: "0.5rem" }}>
            <input
              className={s.input}
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={s.formRow} style={{ marginTop: "0.5rem" }}>
            <input
              className={s.input}
              placeholder="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
            <input
              className={s.input}
              placeholder="Jornada (ej: Completa, Parcial, Turno)"
              value={jornada}
              onChange={(e) => setJornada(e.target.value)}
            />
          </div>
          <div className={s.formRow} style={{ marginTop: "0.5rem" }}>
            <input
              className={s.input}
              type="password"
              placeholder="Contraseña inicial (8+, Mayúscula, minúscula y número)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              className={s.select}
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            >
              <option value="">— Empresa —</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className={s.formActions}>
            <button
              className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}
              onClick={() => setIsAdding(false)}
            >
              Cancelar
            </button>
            <button
              className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
              onClick={handleAdd}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>RUT / Username</th>
              <th>Correo</th>
              <th>Cargo</th>
              <th>Jornada</th>
              <th>Empresa</th>
              <th style={{ textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr className={s.emptyRow}>
                <td colSpan={7}>Sin usuarios</td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <span className={s.cellBold}>{u.name}</span>
                </td>
                <td className={s.cellMuted}>{u.username}</td>
                <td className={s.cellMuted}>{u.email}</td>
                <td className={s.cellMuted}>{u.cargo}</td>
                <td className={s.cellMuted}>{u.jornada}</td>
                <td>
                  <span className={s.iconRow}>
                    <Building
                      size={13}
                      style={{ color: "var(--text-muted)" }}
                    />
                    <span className={s.cellMuted}>{u.companyName || "—"}</span>
                  </span>
                </td>
                <td>
                  <div className={s.actions}>
                    <button
                      className={`${s.btn} ${s.btnGhostBlue} ${s.btnSm}`}
                      onClick={() => openEdit(u)}
                      title="Editar"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className={`${s.btn} ${s.btnGhostRed} ${s.btnSm}`}
                      onClick={() => handleDelete(u.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div
          className={s.overlay}
          onClick={(e) => e.target === e.currentTarget && setIsEditOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsEditOpen(false)}
          tabIndex={-1}
        >
          <div className={s.modal} role="dialog" aria-modal="true">
            <div className={s.modalHeader}>
              <span className={s.modalTitle}>Editar Usuario</span>
              <button
                className={s.modalClose}
                onClick={() => setIsEditOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className={s.modalBody}>
                <div>
                  <label className={s.label}>RUT / Username</label>
                  <input
                    className={s.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={s.label}>Nombre Completo</label>
                  <input
                    className={s.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={s.label}>Correo electrónico</label>
                  <input
                    className={s.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={s.label}>Cargo</label>
                  <input
                    className={s.input}
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={s.label}>Jornada</label>
                  <input
                    className={s.input}
                    value={jornada}
                    onChange={(e) => setJornada(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={s.label}>Nueva Contraseña (opcional)</label>
                  <input
                    className={s.input}
                    type="password"
                    placeholder="Dejar vacío para no cambiar (8+, Mayúscula, minúscula y número)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className={s.label}>Empresa</label>
                  <select
                    className={s.select}
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                  >
                    <option value="">— Empresa —</option>
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={s.modalFooter}>
                <button
                  type="submit"
                  className={`${s.btn} ${s.btnPrimary} ${isSubmitting ? s.btnLoading : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando…" : "Modificar"}
                </button>
                <button
                  type="button"
                  className={`${s.btn} ${s.btnGhost}`}
                  onClick={() => setIsEditOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
