import CheckinForm from "@/components/CheckinForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <Link href="/company-login">
        <button
          className="fixed top-6 right-6 px-4 py-2 border transition btn-minimal-outline"
          style={{
            borderColor: "var(--login-border)",
            color: "var(--login-text)",
          }}
        >
          Acceso Empresa
        </button>
      </Link>
      <CheckinForm />
    </main>
  );
}
