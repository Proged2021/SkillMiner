"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./matching.module.css";

interface MatchedJob {
    title: string;
    company: string;
    matchRate: number;
    salary: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    description: string;
    requiredSkills: string[];
}

const difficultyLabels = { beginner: "初心者OK", intermediate: "中級者向け", advanced: "上級者向け" };
const difficultyColors = { beginner: "#22c55e", intermediate: "#eab308", advanced: "#ef4444" };

export default function MatchingPage() {
    const [jobs, setJobs] = useState<MatchedJob[]>([]);
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("matchRate");
    const [selectedJob, setSelectedJob] = useState<MatchedJob | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("analysisResult");
        if (stored) {
            const data = JSON.parse(stored);
            setJobs(data.matchedJobs || []);
        } else {
            fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    skills: ["プログラミング", "データ分析"],
                    hobbies: ["読書", "ブログ"],
                    occupation: "エンジニア",
                }),
            })
                .then((r) => r.json())
                .then((data) => setJobs(data.matchedJobs || []))
                .catch(() => { });
        }
    }, []);

    const filteredJobs = jobs
        .filter((j) => filter === "all" || j.difficulty === filter)
        .sort((a, b) => {
            if (sortBy === "matchRate") return b.matchRate - a.matchRate;
            return 0;
        });

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

            <div className={styles.container}>
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.headerLeft}>
                        <Link href="/" className={styles.logo}>
                            ⛏️ Skill<span className="text-gradient-gold">Miner</span>
                        </Link>
                        <nav className={styles.breadcrumb}>
                            <Link href="/analysis">分析結果</Link>
                            <span>/</span>
                            <span className={styles.breadcrumbActive}>案件マッチング</span>
                        </nav>
                    </div>
                    <Link href="/dashboard" className="btn btn-secondary">
                        📊 ダッシュボード
                    </Link>
                </motion.div>

                {/* Page Title */}
                <motion.div
                    className={styles.pageHeader}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className={styles.pageTitle}>
                        🎯 マッチした案件 <span className="text-gradient-gold">{jobs.length}件</span>
                    </h1>
                    <p className={styles.pageSubtitle}>
                        あなたの隠れたスキルにマッチするニッチ案件を発見しました
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className={styles.filters}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>難易度:</span>
                        {[
                            { value: "all", label: "すべて" },
                            { value: "beginner", label: "初心者OK" },
                            { value: "intermediate", label: "中級者" },
                            { value: "advanced", label: "上級者" },
                        ].map((f) => (
                            <button
                                key={f.value}
                                className={`${styles.filterBtn} ${filter === f.value ? styles.filterActive : ""}`}
                                onClick={() => setFilter(f.value)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>並び替え:</span>
                        <select
                            className={styles.sortSelect}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="matchRate">マッチ率</option>
                        </select>
                    </div>
                </motion.div>

                {/* Job Cards */}
                <div className={styles.jobsGrid}>
                    {filteredJobs.map((job, i) => (
                        <motion.div
                            key={`${job.title}-${i}`}
                            className={`glass-card ${styles.jobCard}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                        >
                            <div className={styles.jobHeader}>
                                <div className={styles.matchBadge}>
                                    <svg className={styles.matchRing} width="52" height="52" viewBox="0 0 52 52">
                                        <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                                        <circle
                                            cx="26" cy="26" r="22" fill="none"
                                            stroke={job.matchRate >= 85 ? "#facc15" : job.matchRate >= 70 ? "#a855f7" : "#94a3b8"}
                                            strokeWidth="4"
                                            strokeDasharray={`${(job.matchRate / 100) * 138.2} 138.2`}
                                            strokeLinecap="round"
                                            transform="rotate(-90 26 26)"
                                        />
                                    </svg>
                                    <span className={styles.matchPercent}>{job.matchRate}%</span>
                                </div>
                                <div className={styles.jobInfo}>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <p className={styles.jobCompany}>{job.company}</p>
                                </div>
                            </div>

                            <p className={styles.jobDesc}>{job.description}</p>

                            <div className={styles.jobDetails}>
                                <div className={styles.jobDetail}>
                                    <span className={styles.detailLabel}>報酬</span>
                                    <span className={styles.detailValue}>{job.salary}</span>
                                </div>
                                <div className={styles.jobDetail}>
                                    <span className={styles.detailLabel}>難易度</span>
                                    <span
                                        className={styles.detailValue}
                                        style={{ color: difficultyColors[job.difficulty] }}
                                    >
                                        {difficultyLabels[job.difficulty]}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.jobSkills}>
                                {job.requiredSkills.map((skill) => (
                                    <span key={skill} className="tag">{skill}</span>
                                ))}
                            </div>

                            <button
                                className="btn btn-primary"
                                style={{ width: "100%", marginTop: "1rem" }}
                                onClick={() => setSelectedJob(job)}
                            >
                                詳細を見る →
                            </button>
                        </motion.div>
                    ))}
                </div>

                {filteredJobs.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>該当する案件がありません</p>
                        <button className="btn btn-secondary" onClick={() => setFilter("all")}>
                            フィルターをリセット
                        </button>
                    </div>
                )}
            </div>

            {/* Job Detail Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedJob(null)}
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.modalClose} onClick={() => setSelectedJob(null)}>✕</button>

                            <div className={styles.modalHeader}>
                                <div className={styles.modalMatchBadge}>
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                                        <circle
                                            cx="40" cy="40" r="34" fill="none"
                                            stroke={selectedJob.matchRate >= 85 ? "#facc15" : selectedJob.matchRate >= 70 ? "#a855f7" : "#94a3b8"}
                                            strokeWidth="5"
                                            strokeDasharray={`${(selectedJob.matchRate / 100) * 213.6} 213.6`}
                                            strokeLinecap="round"
                                            transform="rotate(-90 40 40)"
                                        />
                                    </svg>
                                    <span className={styles.modalMatchPercent}>{selectedJob.matchRate}%</span>
                                </div>
                                <div>
                                    <h2 className={styles.modalTitle}>{selectedJob.title}</h2>
                                    <p className={styles.modalCompany}>{selectedJob.company}</p>
                                </div>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.modalSection}>
                                    <h3>📋 案件概要</h3>
                                    <p>{selectedJob.description}</p>
                                </div>

                                <div className={styles.modalDetailsGrid}>
                                    <div className={styles.modalDetailItem}>
                                        <span className={styles.modalDetailLabel}>💰 報酬</span>
                                        <span className={styles.modalDetailValue}>{selectedJob.salary}</span>
                                    </div>
                                    <div className={styles.modalDetailItem}>
                                        <span className={styles.modalDetailLabel}>📊 難易度</span>
                                        <span className={styles.modalDetailValue} style={{ color: difficultyColors[selectedJob.difficulty] }}>
                                            {difficultyLabels[selectedJob.difficulty]}
                                        </span>
                                    </div>
                                    <div className={styles.modalDetailItem}>
                                        <span className={styles.modalDetailLabel}>🎯 マッチ率</span>
                                        <span className={styles.modalDetailValue} style={{ color: "#facc15" }}>
                                            {selectedJob.matchRate}%
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.modalSection}>
                                    <h3>🛠️ 必要スキル</h3>
                                    <div className={styles.modalSkills}>
                                        {selectedJob.requiredSkills.map((skill) => (
                                            <span key={skill} className="tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.modalSection}>
                                    <h3>📝 応募のポイント</h3>
                                    <ul className={styles.modalTips}>
                                        <li>ポートフォリオや実績を準備しておくと採用率が上がります</li>
                                        <li>まずは小さな案件から始めて実績を積みましょう</li>
                                        <li>プロフィールに関連スキルを明記しましょう</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button className="btn btn-primary" style={{ flex: 1 }}>
                                    🚀 応募する
                                </button>
                                <button className="btn btn-secondary" onClick={() => setSelectedJob(null)}>
                                    💾 保存する
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
