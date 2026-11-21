'use client';

import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { FormEvent, useState } from "react";
import {
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

function LoginFormContent() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const saveSession = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    const maxAge = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 24;
    document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
  };

  // 1. Login Email & Password ke Backend MySQL
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!username || !password) {
      setError("Username dan kata sandi wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Username atau kata sandi salah.");
        setLoading(false);
        return;
      }

      saveSession(data.token, data.user);
      setSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err) {
      setError("Gagal terhubung ke server backend (localhost:5001).");
      setLoading(false);
    }
  };

  // 2. Login dengan Google OAuth
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError("");
      setSuccess(false);
      setLoading(true);

      try {
        const res = await fetch(`${API_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessToken: tokenResponse.access_token,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.message || "Autentikasi Google gagal.");
          setLoading(false);
          return;
        }

        saveSession(data.token, data.user);
        setSuccess(true);

        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } catch (err) {
        setError("Gagal terhubung ke server backend (localhost:5001).");
        setLoading(false);
      }
    },
    onError: () => {
      setError("Login dengan Google dibatalkan atau gagal.");
    },
  });

  return (
    <main className="login-page" style={{ zoom: "55%", minHeight: "100vh" }}>
      {/* BRAND KIRI ATAS */}
      <header className="brand">
        <div className="brand-icon">
          <div className="brand-drop">◇</div>
        </div>

        <div className="brand-text">
          <div className="brand-name">GalonKu</div>

          <div className="brand-admin">
            <span>ADMIN</span>
            <span>PORTAL</span>
          </div>
        </div>
      </header>

      {/* BACKGROUND GLOW */}
      <div className="background-glow glow-left" />
      <div className="background-glow glow-right" />

      {/* LOGIN AREA */}
      <section className="login-wrapper">
        <div className="login-card">
          <div className="rider-circle">
            <img
              src="/login-galonku.png"
              alt="GalonKu Delivery"
              className="rider-image"
            />
          </div>

          <div className="login-heading">
            <h1>GalonKu Admin</h1>
            <p>Silakan masuk untuk mengakses dashboard admin.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="field-group">
              <div className="field-header">
                <label htmlFor="username">Username / Email / ID Staff</label>
                <span className="required-text">Wajib</span>
              </div>

              <div className="input-wrapper">
                <UserRound className="input-icon" size={21} strokeWidth={1.8} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  placeholder="Masukkan username atau email"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="field-group password-group">
              <div className="field-header">
                <label htmlFor="password">Kata Sandi / Password</label>
                <button
                  type="button"
                  className="forgot-button"
                  onClick={() => {
                    alert("Silakan hubungi administrator untuk reset kata sandi.");
                  }}
                >
                  Lupa Kata Sandi?
                </button>
              </div>

              <div className="input-wrapper">
                <LockKeyhole className="input-icon" size={21} strokeWidth={1.8} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Masukkan kata sandi"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                  }
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <label className="remember-row">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="custom-checkbox">{remember && "✓"}</span>
              <span>Ingat saya di perangkat ini</span>
            </label>

            {error && <div className="error-message">{error}</div>}

            {success && (
              <div className="success-message">
                Login berhasil. Mengarahkan ke dashboard...
              </div>
            )}

            <button
              type="submit"
              className={`login-button ${loading ? "is-loading" : ""} ${
                success ? "is-success" : ""
              }`}
              disabled={loading || success}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Memproses...
                </>
              ) : success ? (
                "Login Berhasil ✓"
              ) : (
                <>
                  <span>Masuk ke Dashboard Admin</span>
                  <ArrowRight size={21} strokeWidth={2} />
                </>
              )}
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                margin: "6px 0",
              }}
            >
              <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
              <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 500 }}>
                atau
              </span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
            </div>

            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              disabled={loading || success}
              className="login-button"
              style={{
                background: "#ffffff",
                color: "#1e293b",
                border: "1.5px solid #cbd5e1",
                boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
                />
              </svg>
              <span>Masuk dengan Google</span>
            </button>
          </form>

          <div className="access-link">
            <span>Butuh akses kurir lapangan?</span>
            <button type="button">
              Aplikasi Driver
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="card-version">
            <span>GalonKu v4.12.0 (Build 2026.04)</span>
            <span className="version-dot">•</span>
            <span>Server: jkt01-depo.internal</span>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <div className="footer-security">
          <ShieldCheck size={15} />
          <span>
            Enkripsi Operasional End-to-End • Wilayah Logistik Jabodetabek
          </span>
        </div>

        <div className="footer-links">
          <button type="button">Pusat Bantuan</button>
          <span>•</span>
          <button type="button">Privasi &amp; Kebijakan Internal</button>
        </div>
      </footer>
    </main>
  );
}

export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <LoginFormContent />
    </GoogleOAuthProvider>
  );
}