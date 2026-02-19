"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./onboarding.module.css";

const categories = [
    { id: "tech", label: "テクノロジー", icon: "💻", items: ["プログラミング", "データ分析", "クラウド", "AI/ML", "セキュリティ", "Web開発", "モバイル開発", "DevOps"] },
    { id: "creative", label: "クリエイティブ", icon: "🎨", items: ["デザイン", "動画編集", "写真撮影", "イラスト", "ライティング", "作曲", "3Dモデリング", "アニメーション"] },
    { id: "business", label: "ビジネス", icon: "📊", items: ["マーケティング", "営業", "財務", "プロジェクト管理", "戦略企画", "人事", "コンサルティング", "起業"] },
    { id: "communication", label: "コミュニケーション", icon: "🗣️", items: ["プレゼンテーション", "交渉", "翻訳", "カウンセリング", "講演", "ファシリテーション", "SNS運用", "コミュニティ運営"] },
];

const hobbyOptions = [
    "読書", "ゲーム", "料理", "旅行", "音楽", "スポーツ", "映画鑑賞", "DIY",
    "ガーデニング", "ヨガ/瞑想", "投資", "ブログ", "YouTube", "手芸", "プラモデル",
    "キャンプ", "自転車", "ランニング", "ボランティア", "語学学習",
];

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        name: "",
        occupation: "",
        skills: [] as string[],
        hobbies: [] as string[],
        twitterUsername: "",
        linkedinUsername: "",
        customSkill: "",
    });
    const [loading, setLoading] = useState(false);

    const totalSteps = 4;
    const progress = ((step + 1) / totalSteps) * 100;

    const toggleItem = (arr: string[], item: string) => {
        return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
    };

    const addCustomSkill = () => {
        if (form.customSkill.trim() && !form.skills.includes(form.customSkill.trim())) {
            setForm({
                ...form,
                skills: [...form.skills, form.customSkill.trim()],
                customSkill: "",
            });
        }
    };

    const handleAnalyze = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    skills: form.skills,
                    hobbies: form.hobbies,
                    occupation: form.occupation,
                    twitterUsername: form.twitterUsername,
                    linkedinUsername: form.linkedinUsername,
                }),
            });
            const data = await res.json();
            sessionStorage.setItem("analysisResult", JSON.stringify(data));
            router.push("/analysis");
        } catch (error) {
            console.error("Analysis failed:", error);
            router.push("/analysis");
        } finally {
            setLoading(false);
        }
    };

    const canProceed = () => {
        switch (step) {
            case 0: return form.name && form.occupation;
            case 1: return form.skills.length >= 1;
            case 2: return form.hobbies.length >= 1;
            case 3: return true;
            default: return false;
        }
    };

    const slideVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
    };

    return (
        <div className={styles.page}>
            <div className="particles-bg">
                {Array.from({ length: 20 }).map((_, i) => (
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

            <div className={styles.container}>
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link href="/" className={styles.logo}>
                        <span>⛏️</span>
                        Skill<span className="text-gradient-gold">Miner</span>
                    </Link>
                    <div className={styles.progressWrapper}>
                        <div className={styles.progressInfo}>
                            <span>ステップ {step + 1} / {totalSteps}</span>
                            <span className={styles.progressPercent}>{Math.round(progress)}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </motion.div>

                {/* Steps */}
                <div className={styles.content}>
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div key="step0" variants={slideVariants} initial="initial" animate="animate" exit="exit" className={styles.stepContent}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepIcon}>📝</span>
                                    <h2 className={styles.stepTitle}>基本情報を教えてください</h2>
                                    <p className={styles.stepDesc}>AIがあなたのスキルを正確に分析するための基本情報です</p>
                                </div>
                                <div className={styles.formGrid}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>お名前</label>
                                        <input
                                            className="input"
                                            placeholder="山田太郎"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>現在の職種・業界</label>
                                        <input
                                            className="input"
                                            placeholder="例: ソフトウェアエンジニア、マーケター、教師..."
                                            value={form.occupation}
                                            onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className={styles.stepContent}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepIcon}>🛠️</span>
                                    <h2 className={styles.stepTitle}>あなたのスキルを選択</h2>
                                    <p className={styles.stepDesc}>保有しているスキルを選んでください（複数選択可）</p>
                                </div>

                                {/* Selected skills */}
                                {form.skills.length > 0 && (
                                    <div className={styles.selectedTags}>
                                        {form.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="tag"
                                                onClick={() => setForm({ ...form, skills: form.skills.filter((s) => s !== skill) })}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {skill} ✕
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Custom skill input */}
                                <div className={styles.customInput}>
                                    <input
                                        className="input"
                                        placeholder="カスタムスキルを追加..."
                                        value={form.customSkill}
                                        onChange={(e) => setForm({ ...form, customSkill: e.target.value })}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())}
                                    />
                                    <button className="btn btn-secondary" onClick={addCustomSkill}>追加</button>
                                </div>

                                {/* Skill categories */}
                                <div className={styles.categories}>
                                    {categories.map((cat) => (
                                        <div key={cat.id} className={styles.category}>
                                            <h3 className={styles.categoryTitle}>
                                                <span>{cat.icon}</span> {cat.label}
                                            </h3>
                                            <div className={styles.tagGrid}>
                                                {cat.items.map((item) => (
                                                    <button
                                                        key={item}
                                                        className={`${styles.tagButton} ${form.skills.includes(item) ? styles.tagActive : ""}`}
                                                        onClick={() => setForm({ ...form, skills: toggleItem(form.skills, item) })}
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className={styles.stepContent}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepIcon}>🎯</span>
                                    <h2 className={styles.stepTitle}>趣味・興味を教えてください</h2>
                                    <p className={styles.stepDesc}>趣味の中に収益化のヒントが隠れています</p>
                                </div>

                                <div className={styles.hobbyGrid}>
                                    {hobbyOptions.map((hobby) => (
                                        <button
                                            key={hobby}
                                            className={`${styles.hobbyButton} ${form.hobbies.includes(hobby) ? styles.hobbyActive : ""}`}
                                            onClick={() => setForm({ ...form, hobbies: toggleItem(form.hobbies, hobby) })}
                                        >
                                            {hobby}
                                        </button>
                                    ))}
                                </div>

                                {form.hobbies.length > 0 && (
                                    <div className={styles.selectedCount}>
                                        <span className="text-gradient-gold">{form.hobbies.length}</span> 個選択中
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className={styles.stepContent}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepIcon}>🔗</span>
                                    <h2 className={styles.stepTitle}>SNSアカウント連携</h2>
                                    <p className={styles.stepDesc}>SNSの活動データからもスキルを分析します（任意）</p>
                                </div>

                                <div className={styles.snsGrid}>
                                    <div className={`glass-card ${styles.snsCard}`}>
                                        <div className={styles.snsHeader}>
                                            <span className={styles.snsIcon}>𝕏</span>
                                            <div>
                                                <h3 className={styles.snsName}>Twitter / X</h3>
                                                <p className={styles.snsDesc}>ツイート内容から興味・専門性を分析</p>
                                            </div>
                                        </div>
                                        <input
                                            className="input"
                                            placeholder="@username"
                                            value={form.twitterUsername}
                                            onChange={(e) => setForm({ ...form, twitterUsername: e.target.value })}
                                        />
                                    </div>

                                    <div className={`glass-card ${styles.snsCard}`}>
                                        <div className={styles.snsHeader}>
                                            <span className={styles.snsIcon}>in</span>
                                            <div>
                                                <h3 className={styles.snsName}>LinkedIn</h3>
                                                <p className={styles.snsDesc}>経歴・スキルエンドースメントを分析</p>
                                            </div>
                                        </div>
                                        <input
                                            className="input"
                                            placeholder="linkedin.com/in/username"
                                            value={form.linkedinUsername}
                                            onChange={(e) => setForm({ ...form, linkedinUsername: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <p className={styles.snsNote}>
                                    🔒 データはスキル分析にのみ使用され、第三者に共有されることはありません。
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Navigation */}
                <div className={styles.footer}>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        style={{ opacity: step === 0 ? 0.3 : 1 }}
                    >
                        ← 戻る
                    </button>

                    {step < totalSteps - 1 ? (
                        <button
                            className="btn btn-primary"
                            onClick={() => setStep(step + 1)}
                            disabled={!canProceed()}
                            style={{ opacity: canProceed() ? 1 : 0.5 }}
                        >
                            次へ →
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleAnalyze}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className={styles.spinner} />
                                    分析中...
                                </>
                            ) : (
                                <>
                                    ⛏️ スキルを採掘する
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
