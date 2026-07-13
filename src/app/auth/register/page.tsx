"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SleepingCat } from "@/components/decorations/sleeping-cat";

function generateCaptcha(): string { return String(Math.floor(1000 + Math.random() * 9000)); }

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(generateCaptcha());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const refreshCaptcha = useCallback(() => setCaptchaAnswer(generateCaptcha()), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const res = await fetch("/api/auth/user/register", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, captcha, captchaAnswer }),
    });
    if (res.ok) { router.push(`/auth/login?from=${encodeURIComponent(from)}&registered=1`); }
    else {
      const data = await res.json();
      setError(data.error || "注册失败");
      refreshCaptcha(); setCaptcha("");
    }
    setLoading(false);
  };

  const inputClass = "w-full rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--accent-subtle)] opacity-30" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[var(--accent-subtle)] opacity-20" />
      <div className="relative z-10 w-full max-w-sm rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-6 w-px bg-[var(--accent)]" />
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">注册账号</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            已有账号？<Link href="/auth/login" className="ml-1 text-[var(--accent)] hover:text-[var(--accent-hover)]">登录</Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} placeholder="用户名" autoFocus />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="邮箱" />
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="密码（至少6位）" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors" tabIndex={-1}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} className="flex-1 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none tracking-[0.3em] text-center text-lg font-mono" placeholder="验证码" maxLength={4} />
            <button type="button" onClick={refreshCaptcha} className="shrink-0 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--accent-subtle)] px-4 py-2.5 text-lg font-mono font-bold text-[var(--accent)] tracking-[0.2em] select-none hover:bg-[var(--bg-elevated)] transition-colors">{captchaAnswer}</button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !username || !email || !password || !captcha}>
            {loading ? "注册中..." : "注册"}
          </Button>
        </form>
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-center">
          <p className="text-xs text-[var(--text-tertiary)] mb-3">不想注册？</p>
          <Link href={from.startsWith("/works/") ? "/works" : "/"} className="inline-flex h-9 items-center rounded-[6px] bg-[var(--bg-elevated)] px-5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
            以游客身份继续浏览
          </Link>
        </div>
      </div>
      <SleepingCat />
    </div>
  );
}

export default function RegisterPage() { return <Suspense><RegisterForm /></Suspense>; }
