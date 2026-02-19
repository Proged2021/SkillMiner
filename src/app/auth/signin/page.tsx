"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./signin.module.css";

export default function SignInPage() {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isRegister) {
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
            }

            // For demo purposes, go directly to onboarding
            router.push("/onboarding");
        } catch (err) {
            setError(err instanceof Error ? err.message : "エラーが発生しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className="particles-bg">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${4 + Math.random() * 6}s`,
                            animationDelay: `${Math.random() * 4}s`,
                            opacity: 0.1 + Math.random() * 0.2,
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/" className={styles.logo}>
                    <span>⛏️</span>
                    <span className={styles.logoText}>
                        Skill<span className="text-gradient-gold">Miner</span>
                    </span>
                </Link>

                <h1 className={styles.title}>
                    {isRegister ? "アカウント作成" : "ログイン"}
                </h1>
                <p className={styles.subtitle}>
                    {isRegister
                        ? "あなたの隠れたスキルを発見しましょう"
                        : "おかえりなさい。スキル採掘を続けましょう。"}
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {isRegister && (
                        <div className={styles.field}>
                            <label className={styles.label}>名前</label>
                            <input
                                className="input"
                                type="text"
                                placeholder="山田太郎"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                    )}
                    <div className={styles.field}>
                        <label className={styles.label}>メールアドレス</label>
                        <input
                            className="input"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>パスワード</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "100%" }}
                        disabled={loading}
                    >
                        {loading ? "処理中..." : isRegister ? "登録する" : "ログイン"}
                    </button>
                </form>

                <p className={styles.switch}>
                    {isRegister ? "すでにアカウントをお持ちですか？" : "アカウントをお持ちでないですか？"}
                    <button
                        className={styles.switchBtn}
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? "ログイン" : "新規登録"}
                    </button>
                </p>

                <div className={styles.divider}>
                    <span>または</span>
                </div>

                <Link href="/onboarding" className="btn btn-secondary" style={{ width: "100%" }}>
                    ゲストとして体験する →
                </Link>
            </motion.div>
        </div>
    );
}
