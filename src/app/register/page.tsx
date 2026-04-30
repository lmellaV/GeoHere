"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  MapPin,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { validateRut, formatRut } from "@/lib/rut";
import styles from "./Register.module.css";
import btnStyles from "@/components/ui/Button.module.css";
import inputStyles from "@/components/ui/Input.module.css";

const looksLikeRut = (val: string) => /^\d/.test(val.trim());

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Fetch companies
    fetch("/api/locations")
      .then((res) => res.json())
      .then(
        (data: {
          success?: boolean;
          companies?: Array<{ id: string; name: string }>;
        }) => {
          if (data.success && data.companies) {
            setCompanies(data.companies);
          }
        },
      )
      .catch(console.error);
  }, []);

  const handleRutChange = (val: string) => {
    setFieldErrors({ ...fieldErrors, rut: "" });
    const raw = val.replace(/[^0-9kK]/g, "");
    const formatted = raw.length > 1 ? formatRut(raw) : val;
    setRut(formatted);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) errors.fullName = "Nombre completo requerido";
    if (!rut.trim()) errors.rut = "RUT requerido";
    if (rut && !validateRut(rut)) errors.rut = "RUT inválido";
    if (!email.trim()) errors.email = "Correo requerido";
    if (!email.includes("@") || !email.includes("."))
      errors.email = "Correo inválido";
    if (!companyId) errors.companyId = "Empresa requerida";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMsg(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          rut,
          email,
          companyId,
          cargo: "Pendiente",
          jornada: "Pendiente",
        }),
      });
      const data = await response.json();

      if (data.success) {
        setSuccessMsg(
          "Registro completado. Tu cuenta está pendiente de aprobación por la empresa.",
        );
        // Reset form
        setFullName("");
        setRut("");
        setEmail("");
        setCompanyId("");
      } else {
        setServerError(data.message || "Error al registrar");
      }
    } catch {
      setServerError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <MapPin size={24} />
            </div>
            <h1 className={styles.brandName}>getinwork</h1>
          </div>
          <ThemeToggle />
        </header>

        <section className={styles.welcomeSection}>
          <h2 className={styles.welcomeTitle}>Registro de Trabajador</h2>
          <p className={styles.welcomeSubtitle}>
            Completa tus datos para solicitar acceso
          </p>
        </section>

        <button
          className={`${btnStyles.button} ${btnStyles.ghost} ${btnStyles.sm}`}
          onClick={() => router.push("/login")}
          style={{
            marginBottom: "1rem",
            width: "fit-content",
            padding: "0.25rem 0.5rem",
          }}
        >
          <ArrowLeft size={16} /> Volver al Login
        </button>

        {serverError && (
          <div className={styles.errorAlert}>
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        {successMsg && (
          <div
            className={`${styles.feedback} ${styles.feedbackSuccess}`}
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={inputStyles.inputGroup}>
            <label className={inputStyles.label}>Nombre Completo</label>
            <input
              className={`${inputStyles.input} ${fieldErrors.fullName ? inputStyles.error : ""}`}
              placeholder="Juan Pérez"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setFieldErrors({ ...fieldErrors, fullName: "" });
              }}
              aria-invalid={!!fieldErrors.fullName}
            />
            {fieldErrors.fullName && (
              <p className={inputStyles.errorMessage}>{fieldErrors.fullName}</p>
            )}
          </div>

          <div className={inputStyles.inputGroup}>
            <label className={inputStyles.label}>RUT</label>
            <input
              className={`${inputStyles.input} ${fieldErrors.rut ? inputStyles.error : ""}`}
              placeholder="12.345.678-9"
              value={rut}
              onChange={(e) => handleRutChange(e.target.value)}
              aria-invalid={!!fieldErrors.rut}
            />
            {fieldErrors.rut && (
              <p className={inputStyles.errorMessage}>{fieldErrors.rut}</p>
            )}
          </div>

          <div className={inputStyles.inputGroup}>
            <label className={inputStyles.label}>Correo Electrónico</label>
            <input
              className={`${inputStyles.input} ${fieldErrors.email ? inputStyles.error : ""}`}
              placeholder="juan@ejemplo.com"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors({ ...fieldErrors, email: "" });
              }}
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && (
              <p className={inputStyles.errorMessage}>{fieldErrors.email}</p>
            )}
          </div>

          <div className={inputStyles.inputGroup}>
            <label className={inputStyles.label}>Empresa</label>
            <div className={inputStyles.selectWrapper}>
              <Building2 size={18} className={inputStyles.selectIcon} />
              <select
                className={`${inputStyles.input} ${inputStyles.select} ${fieldErrors.companyId ? inputStyles.error : ""}`}
                value={companyId}
                onChange={(e) => {
                  setCompanyId(e.target.value);
                  setFieldErrors({ ...fieldErrors, companyId: "" });
                }}
                aria-invalid={!!fieldErrors.companyId}
              >
                <option value="">Selecciona una empresa</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            {fieldErrors.companyId && (
              <p className={inputStyles.errorMessage}>
                {fieldErrors.companyId}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`${btnStyles.button} ${btnStyles.primary} ${btnStyles.lg} ${btnStyles.fullWidth}`}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Registrarse"}
          </button>
        </form>

        <footer className={styles.footer}>
          <span>¿Ya tienes cuenta?</span>
          <button
            type="button"
            className={styles.forgotLink}
            onClick={() => router.push("/login")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Inicia sesión
          </button>
        </footer>
      </div>
    </div>
  );
}
