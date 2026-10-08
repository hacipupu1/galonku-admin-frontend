"use client";

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

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!username || !password) {
      setError("Username dan kata sandi wajib diisi.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    if (
      username.trim().toLowerCase() === "admin@galonku.id" &&
      password === "admin123"
    ) {
      setSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } else {
      setError("Username atau kata sandi salah.");
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      {/* =====================================================
          BRAND KIRI ATAS
      ====================================================== */}
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

      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}
      <div className="background-glow glow-left" />
      <div className="background-glow glow-right" />

      {/* =====================================================
          LOGIN AREA
      ====================================================== */}
      <section className="login-wrapper">
        <div className="login-card">
          {/* =================================================
              LOGO / RIDER
              Dibuat lebih besar dan tidak ter-zoom.
              object-fit: contain memastikan seluruh gambar
              tetap terlihat.
          ================================================== */}
          <div className="rider-circle">
            <img
              src="/login-galonku.png"
              alt="GalonKu Delivery"
              className="rider-image"
            />
          </div>

          {/* =================================================
              TITLE
          ================================================== */}
          <div className="login-heading">
            <h1>GalonKu Admin</h1>

            <p>
              Silakan masuk untuk mengakses dashboard admin.
            </p>
          </div>

          {/* =================================================
              FORM
          ================================================== */}
          <form onSubmit={handleLogin} className="login-form">
            {/* USERNAME */}
            <div className="field-group">
              <div className="field-header">
                <label htmlFor="username">
                  Username / Email / ID Staff
                </label>

                <span className="required-text">Wajib</span>
              </div>

              <div className="input-wrapper">
                <UserRound
                  className="input-icon"
                  size={21}
                  strokeWidth={1.8}
                />

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

            {/* PASSWORD */}
            <div className="field-group password-group">
              <div className="field-header">
                <label htmlFor="password">
                  Kata Sandi / Password
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() => {
                    alert(
                      "Silakan hubungi administrator untuk reset kata sandi."
                    );
                  }}
                >
                  Lupa Kata Sandi?
                </button>
              </div>

              <div className="input-wrapper">
                <LockKeyhole
                  className="input-icon"
                  size={21}
                  strokeWidth={1.8}
                />

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
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* REMEMBER */}
            <label className="remember-row">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(e.target.checked)
                }
              />

              <span className="custom-checkbox">
                {remember && "✓"}
              </span>

              <span>Ingat saya di perangkat ini</span>
            </label>

            {/* ERROR */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="success-message">
                Login berhasil. Mengarahkan ke dashboard...
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className={`login-button ${
                loading ? "is-loading" : ""
              } ${success ? "is-success" : ""}`}
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
                  <ArrowRight
                    size={21}
                    strokeWidth={2}
                  />
                </>
              )}
            </button>
          </form>

          {/* =================================================
              DRIVER LINK
          ================================================== */}
          <div className="access-link">
            <span>Butuh akses kurir lapangan?</span>

            <button type="button">
              Aplikasi Driver
              <ExternalLink size={13} />
            </button>
          </div>

          {/* =================================================
              VERSION
          ================================================== */}
          <div className="card-version">
            <span>
              GalonKu v4.12.0 (Build 2026.04)
            </span>

            <span className="version-dot">•</span>

            <span>
              Server: jkt01-depo.internal
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="page-footer">
        <div className="footer-security">
          <ShieldCheck size={15} />

          <span>
            Enkripsi Operasional End-to-End • Wilayah
            Logistik Jabodetabek
          </span>
        </div>

        <div className="footer-links">
          <button type="button">
            Pusat Bantuan
          </button>

          <span>•</span>

          <button type="button">
            Privasi &amp; Kebijakan Internal
          </button>
        </div>
      </footer>
    </main>
  );
}