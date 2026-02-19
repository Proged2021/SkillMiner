"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./analysis.module.css";

interface HiddenSkill {
    name: string;
    category: string;
    confidence: number;
    description: string;
    revenueEstimate: string;
    demandLevel: "high" | "medium" | "low";
}

interface MatchedJob {
    title: string;
    company: string;
    matchRate: number;
    salary: string;
    difficulty: string;
    description: string;
    requiredSkills: string[];
}

interface RoadmapStep {
    week: number;
    title: string;
    description: string;
    milestone: string;
}

interface AnalysisResult {
    hiddenSkills: HiddenSkill[];
    matchedJobs: MatchedJob[];
    roadmap: RoadmapStep[];
}

const demandColors = { high: "#22c55e", medium: "#eab308", low: "#94a3b8" };
const demandLabels = { high: "高需要", medium: "中需要", low: "低需要" };
const categoryIcons: Record<string, string> = {
    Tech: "💻", Creative: "🎨", Business: "📊", Communication: "🗣️",
};

export default function AnalysisPage() {
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [mining, setMining] = useState(true);
    const [miningProgress, setMiningProgress] = useState(0);
    const [revealedSkills, setRevealedSkills] = useState(0);

    useEffect(() => {
        // Simulated mining animation
        const interval = setInterval(() => {
            setMiningProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 60);

        // Load results from sessionStorage or use defaults
        const timer = setTimeout(() => {
            const stored = sessionStorage.getItem("analysisResult");
            if (stored) {
                setResult(JSON.parse(stored));
            } else {
                // Fetch fresh analysis with defaults
                fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        skills: ["プログラミング", "データ分析"],
                        hobbies: ["読書", "ブログ"],
                        occupation: "エンジニア",
                    }),
                })
                    .then((res) => res.json())
                    .then(setResult)
                    .catch(() => {
                        // Use hardcoded fallback
                        setResult({
                            hiddenSkills: [],
                            matchedJobs: [],
                            roadmap: [],
                        });
                    });
            }
            setMining(false);
        }, 3500);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    // Reveal skills one by one
    useEffect(() => {
        if (!mining && result && revealedSkills < result.hiddenSkills.length) {
            const timer = setTimeout(() => {
                setRevealedSkills((prev) => prev + 1);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [mining, result, revealedSkills]);

    if (mining) {
        return (
            <div className={styles.page}>
                <div className={styles.miningScreen}>
                    <motion.div
                        className={styles.miningOrb}
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <span className={styles.miningIcon}>⛏️</span>
                    </motion.div>
                    <h2 className={styles.miningTitle}>スキルを採掘中...</h2>
                    <p className={styles.miningSubtitle}>
                        AIがあなたのデータを分析しています
                    </p>
                    <div className={styles.miningBarWrapper}>
                        <div className="progress-bar" style={{ height: "6px" }}>
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${miningProgress}%` }}
                            />
                        </div>
                        <span className={styles.miningPercent}>{miningProgress}%</span>
                    </div>
                    <div className={styles.miningSteps}>
                        {["SNSデータ分析中...", "スキルパターン検出中...", "案件マッチング中...", "ロードマップ生成中..."].map(
                            (text, i) => (
                                <motion.div
                                    key={text}
                                    className={styles.miningStep}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{
                                        opacity: miningProgress > i * 25 ? 1 : 0.3,
                                        x: 0,
                                    }}
                                    transition={{ delay: i * 0.3 }}
                                >
                                    {miningProgress > (i + 1) * 25 ? "✅" : "⏳"} {text}
                                </motion.div>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (!result || result.hiddenSkills.length === 0) {
        return (
            <div className={styles.page}>
                <div className={styles.emptyState}>
                    <h2>分析結果を生成できませんでした</h2>
                    <p>もう一度お試しください。</p>
                    <Link href="/onboarding" className="btn btn-primary">
                        再度分析する
                    </Link>
                </div>
            </div>
        );
    }

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

            <div className={styles.container}>
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link href="/" className={styles.logo}>
                        ⛏️ Skill<span className="text-gradient-gold">Miner</span>
                    </Link>
                </motion.div>

                {/* Results Header */}
                <motion.div
                    className={styles.resultsHeader}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className={styles.badge}>💎 分析完了</span>
                    <h1 className={styles.title}>
                        <span className="text-gradient-gold">{result.hiddenSkills.length}個</span>
                        の隠れたスキルを発見しました
                    </h1>
                    <p className={styles.subtitle}>
                        AIがあなたのデータを分析し、収益化可能なスキルを発見しました
                    </p>
                </motion.div>

                {/* Hidden Skills */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span>⛏️</span> 発見されたスキル
                    </h2>
                    <div className={styles.skillsGrid}>
                        <AnimatePresence>
                            {result.hiddenSkills.slice(0, revealedSkills).map((skill, i) => (
                                <motion.div
                                    key={skill.name}
                                    className={`glass-card ${styles.skillCard}`}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ type: "spring", delay: i * 0.1 }}
                                >
                                    <div className={styles.skillHeader}>
                                        <span className={styles.skillCategoryIcon}>
                                            {categoryIcons[skill.category] || "🔮"}
                                        </span>
                                        <div className={styles.skillMeta}>
                                            <span
                                                className={styles.demandBadge}
                                                style={{ color: demandColors[skill.demandLevel] }}
                                            >
                                                ● {demandLabels[skill.demandLevel]}
                                            </span>
                                            <span className={styles.confidence}>
                                                確信度 {Math.round(skill.confidence * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className={styles.skillName}>{skill.name}</h3>
                                    <p className={styles.skillDesc}>{skill.description}</p>
                                    <div className={styles.skillRevenue}>
                                        <span className={styles.revenueLabel}>推定月収</span>
                                        <span className={styles.revenueValue}>{skill.revenueEstimate}</span>
                                    </div>
                                    <div className={styles.confidenceBar}>
                                        <div
                                            className={styles.confidenceFill}
                                            style={{ width: `${skill.confidence * 100}%` }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* CTA Buttons */}
                <motion.div
                    className={styles.ctaSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: revealedSkills >= result.hiddenSkills.length ? 1 : 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/matching" className="btn btn-primary btn-lg">
                        🎯 マッチする案件を見る
                    </Link>
                    <Link href="/dashboard" className="btn btn-secondary btn-lg">
                        📊 ダッシュボードへ
                    </Link>
                </motion.div>

                {/* Roadmap Preview */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span>🗺️</span> スキル開発ロードマップ
                    </h2>
                    <div className={styles.roadmapGrid}>
                        {result.roadmap.slice(0, 4).map((step, i) => (
                            <motion.div
                                key={step.week}
                                className={styles.roadmapCard}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.15 }}
                            >
                                <div className={styles.weekBadge}>Week {step.week}</div>
                                <h3 className={styles.roadmapTitle}>{step.title}</h3>
                                <p className={styles.roadmapDesc}>{step.description}</p>
                                <div className={styles.milestone}>
                                    🎯 {step.milestone}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
