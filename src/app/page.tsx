"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15 } },
};

const features = [
  {
    icon: "⛏️",
    title: "AI スキル採掘",
    description: "AIがあなたの経験・趣味・SNSを分析し、本人も気づいていない収益化可能なスキルを発見します。",
  },
  {
    icon: "🎯",
    title: "ニッチ案件マッチング",
    description: "競合が少ない注目案件を自動でマッチング。あなただけの副業チャンスを見つけます。",
  },
  {
    icon: "🗺️",
    title: "スキル開発ロードマップ",
    description: "8週間のカスタムロードマップで、発見したスキルを実際の収益に変えるまで完全サポート。",
  },
];

const steps = [
  { number: "01", title: "情報入力", description: "スキル・趣味・SNSアカウントを入力", icon: "📝" },
  { number: "02", title: "AI分析", description: "AIが隠れたスキルを採掘・分析", icon: "🤖" },
  { number: "03", title: "マッチング", description: "最適な案件を自動マッチング", icon: "💎" },
  { number: "04", title: "副業スタート", description: "ロードマップに沿って開始", icon: "🚀" },
];

const stats = [
  { value: "3,847+", label: "発見されたスキル" },
  { value: "92%", label: "マッチング精度" },
  { value: "¥85K", label: "平均月収増加" },
  { value: "2週間", label: "初収益までの期間" },
];

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Particle Background */}
      <div className="particles-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.1 + Math.random() * 0.3,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        className={styles.nav}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>⛏️</span>
            <span className={styles.logoText}>
              Skill<span className="text-gradient-gold">Miner</span>
            </span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>特徴</a>
            <a href="#how-it-works" className={styles.navLink}>使い方</a>
            <Link href="/auth/signin" className={styles.navLink}>ログイン</Link>
            <Link href="/onboarding" className="btn btn-primary">
              無料で始める
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            className={styles.heroContent}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div className={styles.heroBadge} variants={fadeInUp}>
              <span className={styles.heroBadgeDot} />
              AI-Powered Skill Discovery
            </motion.div>

            <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
              あなたの中に眠る
              <br />
              <span className="text-gradient-gold">収益化可能なスキル</span>
              <br />
              を採掘する
            </motion.h1>

            <motion.p className={styles.heroDescription} variants={fadeInUp}>
              AIがあなたのSNS・経歴・趣味を分析し、本人も気づいていない
              <br />
              収益化可能なスキルを発見。副業開始まで完全サポート。
            </motion.p>

            <motion.div className={styles.heroCTA} variants={fadeInUp}>
              <Link href="/onboarding" className="btn btn-primary btn-lg">
                <span>無料でスキルを採掘する</span>
                <span>→</span>
              </Link>
              <Link href="#how-it-works" className="btn btn-secondary btn-lg">
                使い方を見る
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div className={styles.statsGrid} variants={fadeInUp}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={styles.miningAnimation}>
              <div className={styles.miningOrb}>
                <span className={styles.miningIcon}>⛏️</span>
                <div className={styles.orbRing} />
                <div className={styles.orbRing} style={{ animationDelay: "1s" }} />
                <div className={styles.orbRing} style={{ animationDelay: "2s" }} />
              </div>
              <div className={styles.skillChips}>
                {["テクニカルライティング", "データ分析", "UI/UX", "コンサルティング", "教育コンテンツ"].map(
                  (skill, i) => (
                    <motion.div
                      key={skill}
                      className={styles.skillChip}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.2, type: "spring" }}
                    >
                      💎 {skill}
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionTag}>Features</span>
            <h2 className={styles.sectionTitle}>
              なぜ<span className="text-gradient-gold">SkillMiner</span>なのか
            </h2>
            <p className={styles.sectionDescription}>
              従来のスキルマッチングとは一線を画す、AI駆動のアプローチ
            </p>
          </motion.div>

          <div className={styles.featuresGrid}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className={`glass-card ${styles.featureCard}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionTag}>How It Works</span>
            <h2 className={styles.sectionTitle}>
              <span className="text-gradient-gold">4つのステップ</span>で副業開始
            </h2>
          </motion.div>

          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                {i < steps.length - 1 && <div className={styles.stepConnector} />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.ctaTitle}>
              あなたの
              <span className="text-gradient-gold">隠れたスキル</span>
              を発見しませんか？
            </h2>
            <p className={styles.ctaDescription}>
              無料で始められます。AIがあなたの可能性を最大限に引き出します。
            </p>
            <Link href="/onboarding" className="btn btn-primary btn-lg">
              <span>今すぐスキルを採掘する</span>
              <span>⛏️</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerContent}`}>
          <div className={styles.footerBrand}>
            <span className={styles.logoIcon}>⛏️</span>
            <span className={styles.logoText}>
              Skill<span className="text-gradient-gold">Miner</span>
            </span>
          </div>
          <p className={styles.footerText}>
            © 2026 SkillMiner. AI-Powered Skill Discovery Platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
