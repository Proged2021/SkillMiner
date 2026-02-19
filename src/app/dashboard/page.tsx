"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./dashboard.module.css";

interface HiddenSkill {
    name: string;
    category: string;
    confidence: number;
    revenueEstimate: string;
    demandLevel: string;
}

interface RoadmapStep {
    week: number;
    title: string;
    description: string;
    milestone: string;
}

export default function DashboardPage() {
    const [skills, setSkills] = useState<HiddenSkill[]>([]);
    const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
    const [jobCount, setJobCount] = useState(0);

    useEffect(() => {
        const stored = sessionStorage.getItem("analysisResult");
        if (stored) {
            const data = JSON.parse(stored);
            setSkills(data.hiddenSkills || []);
            setRoadmap(data.roadmap || []);
            setJobCount(data.matchedJobs?.length || 0);
        }
    }, []);

    const totalRevenue = "¥120,000〜¥450,000";
    const currentWeek = 1;

    return (
        <div className={styles.page}>
            <div className="particles-bg">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${4 + Math.random() * 6}s`,
                            animationDelay: `${Math.random() * 4}s`,
                            opacity: 0.1 + Math.random() * 0.15,
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            <div className={styles.layout}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <Link href="/" className={styles.logo}>
                        <span>⛏️</span>
                        <span>Skill<span className="text-gradient-gold">Miner</span></span>
                    </Link>
                    <nav className={styles.nav}>
                        <Link href="/dashboard" className={`${styles.navItem} ${styles.navActive}`}>
                            📊 ダッシュボード
                        </Link>
                        <Link href="/analysis" className={styles.navItem}>
                            ⛏️ スキル分析
                        </Link>
                        <Link href="/matching" className={styles.navItem}>
                            🎯 案件マッチング
                        </Link>
                        <Link href="/onboarding" className={styles.navItem}>
                            📝 再分析
                        </Link>
                    </nav>
                    <div className={styles.sidebarFooter}>
                        <Link href="/auth/signin" className={styles.navItem}>
                            🔑 ログイン
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={styles.main}>
                    {/* Page Header */}
                    <motion.div
                        className={styles.pageHeader}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div>
                            <h1 className={styles.pageTitle}>ダッシュボード</h1>
                            <p className={styles.pageSubtitle}>あなたのスキル採掘レポート</p>
                        </div>
                        <Link href="/onboarding" className="btn btn-primary">
                            ⛏️ 再分析する
                        </Link>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className={styles.statsGrid}>
                        {[
                            { icon: "💎", label: "発見スキル", value: `${skills.length}個`, color: "gold" },
                            { icon: "🎯", label: "マッチ案件", value: `${jobCount}件`, color: "purple" },
                            { icon: "💰", label: "推定月収レンジ", value: totalRevenue, color: "gold" },
                            { icon: "📅", label: "現在の週", value: `Week ${currentWeek}/8`, color: "cyan" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className={`glass-card ${styles.statCard}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className={styles.statIcon}>{stat.icon}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                                <span className={`${styles.statValue} ${styles[stat.color]}`}>{stat.value}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Content Grid */}
                    <div className={styles.contentGrid}>
                        {/* Skill Radar */}
                        <motion.div
                            className={`glass-card ${styles.radarCard}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className={styles.cardTitle}>🔍 スキルレーダー</h2>
                            <div className={styles.radarChart}>
                                <svg viewBox="0 0 300 300" className={styles.radarSvg}>
                                    {/* Background polygons */}
                                    {[1, 0.75, 0.5, 0.25].map((scale) => (
                                        <polygon
                                            key={scale}
                                            points={generatePolygonPoints(5, 130 * scale, 150)}
                                            fill="none"
                                            stroke="rgba(255,255,255,0.06)"
                                            strokeWidth="1"
                                        />
                                    ))}
                                    {/* Axes */}
                                    {Array.from({ length: 5 }).map((_, i) => {
                                        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                                        const x = 150 + 130 * Math.cos(angle);
                                        const y = 150 + 130 * Math.sin(angle);
                                        return (
                                            <line key={i} x1="150" y1="150" x2={x} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                                        );
                                    })}
                                    {/* Data polygon */}
                                    <polygon
                                        points={generateDataPoints(
                                            skills.map((s) => s.confidence),
                                            130,
                                            150
                                        )}
                                        fill="rgba(250, 204, 21, 0.1)"
                                        stroke="rgba(250, 204, 21, 0.6)"
                                        strokeWidth="2"
                                    />
                                    {/* Data points */}
                                    {skills.slice(0, 5).map((skill, i) => {
                                        const angle = (i * 2 * Math.PI) / Math.max(skills.length, 5) - Math.PI / 2;
                                        const r = skill.confidence * 130;
                                        const x = 150 + r * Math.cos(angle);
                                        const y = 150 + r * Math.sin(angle);
                                        return <circle key={i} cx={x} cy={y} r="4" fill="#facc15" />;
                                    })}
                                </svg>
                                {/* Labels */}
                                <div className={styles.radarLabels}>
                                    {skills.slice(0, 5).map((skill, i) => {
                                        const angle = (i * 2 * Math.PI) / Math.max(skills.length, 5) - Math.PI / 2;
                                        const labelR = 160;
                                        const x = 50 + ((150 + labelR * Math.cos(angle)) / 300) * 100;
                                        const y = 50 + ((150 + labelR * Math.sin(angle)) / 300) * 100;
                                        return (
                                            <span
                                                key={skill.name}
                                                className={styles.radarLabel}
                                                style={{ left: `${x}%`, top: `${y}%` }}
                                            >
                                                {skill.name}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>

                        {/* Roadmap Timeline */}
                        <motion.div
                            className={`glass-card ${styles.roadmapCard}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className={styles.cardTitle}>🗺️ ロードマップ</h2>
                            <div className={styles.timeline}>
                                {roadmap.map((step, i) => (
                                    <div
                                        key={step.week}
                                        className={`${styles.timelineItem} ${i < currentWeek ? styles.timelineCompleted : i === currentWeek ? styles.timelineCurrent : ""}`}
                                    >
                                        <div className={styles.timelineDot} />
                                        <div className={styles.timelineContent}>
                                            <span className={styles.timelineWeek}>Week {step.week}</span>
                                            <h3 className={styles.timelineTitle}>{step.title}</h3>
                                            <p className={styles.timelineDesc}>{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Recommended Actions */}
                    <motion.div
                        className={`glass-card ${styles.actionsCard}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className={styles.cardTitle}>🚀 推奨アクション</h2>
                        <div className={styles.actionsGrid}>
                            {[
                                { icon: "📝", title: "ポートフォリオを作成", desc: "発見されたスキルを証明するサンプル作品を準備しましょう", priority: "高" },
                                { icon: "🔗", title: "プラットフォームに登録", desc: "クラウドソーシングサイトにプロフィールを作成しましょう", priority: "高" },
                                { icon: "📚", title: "スキルアップ教材を確認", desc: "推奨リソースで知識をブラッシュアップしましょう", priority: "中" },
                                { icon: "🤝", title: "コミュニティに参加", desc: "同じ分野のプロフェッショナルとつながりましょう", priority: "低" },
                            ].map((action, i) => (
                                <div key={action.title} className={styles.actionItem}>
                                    <span className={styles.actionIcon}>{action.icon}</span>
                                    <div className={styles.actionContent}>
                                        <h3 className={styles.actionTitle}>{action.title}</h3>
                                        <p className={styles.actionDesc}>{action.desc}</p>
                                    </div>
                                    <span className={`${styles.actionPriority} ${styles[`priority${action.priority}`]}`}>
                                        {action.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}

function generatePolygonPoints(sides: number, radius: number, center: number): string {
    return Array.from({ length: sides })
        .map((_, i) => {
            const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
            return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
        })
        .join(" ");
}

function generateDataPoints(values: number[], maxRadius: number, center: number): string {
    const sides = Math.max(values.length, 5);
    return Array.from({ length: sides })
        .map((_, i) => {
            const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
            const r = (values[i] || 0.3) * maxRadius;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
        })
        .join(" ");
}
