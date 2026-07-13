"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SleepingCat } from "@/components/decorations/sleeping-cat";

function generateCaptcha(): string { return String(Math.floor(1000 + Math.random() * 9000)); }

function LoginForm() {
  const [identifier, setIdentifier] = useState("");
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
    const res = await fetch("/api/auth/user/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password, captcha, captchaAnswer }),
    });
    if (res.ok) { router.push(from); router.refresh(); }
    else {
      const data = await res.json();
      setError(data.error || "登录失败");
      refreshCaptcha(); setCaptcha("");
    }
    setLoading(false);
  };

  const inputClass = "w-full rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[var(--accent-subtle)] opacity-30" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--accent-subtle)] opacity-20" />
      <div className="relative z-10 w-full max-w-sm rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-6 w-px bg-[var(--accent)]" />
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">欢迎回来</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            还没有账号？<Link href="/auth/register" className="ml-1 text-[var(--accent)] hover:text-[var(--accent-hover)]">注册</Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} className={inputClass} placeholder="用户名或邮箱" autoFocus />
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="密码" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors" tabIndex={-1}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} className="flex-1 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none tracking-[0.3em] text-center text-lg font-mono" placeholder="验证码" maxLength={4} />
            <button type="button" onClick={refreshCaptcha} className="shrink-0 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--accent-subtle)] px-4 py-2.5 text-lg font-mono font-bold text-[var(--accent)] tracking-[0.2em] select-none hover:bg-[var(--bg-elevated)] transition-colors">{captchaAnswer}</button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !identifier || !password || !captcha}>
            {loading ? "登录中..." : "登录"}
          </Button>
        </form>
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-center">
          <p className="text-xs text-[var(--text-tertiary)] mb-3">不想登录？</p>
          <Link href={from.startsWith("/works/") ? "/works" : "/"} className="inline-flex h-9 items-center rounded-[6px] bg-[var(--bg-elevated)] px-5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
            以游客身份继续浏览
          </Link>
        </div>
      </div>
      <SleepingCat />
    </div>
  );
}

export default function LoginPage() { return <Suspense><LoginForm /></Suspense>; }
