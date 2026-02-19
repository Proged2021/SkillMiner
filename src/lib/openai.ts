import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

export interface HiddenSkill {
    name: string;
    category: string;
    confidence: number;
    description: string;
    revenueEstimate: string;
    demandLevel: "high" | "medium" | "low";
}

export interface MatchedJob {
    title: string;
    company: string;
    matchRate: number;
    salary: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    description: string;
    requiredSkills: string[];
    url: string;
}

export interface RoadmapStep {
    week: number;
    title: string;
    description: string;
    resources: string[];
    milestone: string;
}

export interface AnalysisResult {
    hiddenSkills: HiddenSkill[];
    matchedJobs: MatchedJob[];
    roadmap: RoadmapStep[];
}

const SYSTEM_PROMPT = `あなたはSkillMinerのAIスキルアナリストです。
ユーザーの入力情報（スキル、経歴、趣味、SNS活動）を分析し、
本人も気づいていない収益化可能なスキルを発見してください。

以下のJSON形式で回答してください：
{
  "hiddenSkills": [
    {
      "name": "スキル名",
      "category": "カテゴリ (Tech/Creative/Business/Communication)",
      "confidence": 0.85,
      "description": "なぜこのスキルがあると分析したか",
      "revenueEstimate": "月額推定収入 (例: ¥50,000〜¥150,000)",
      "demandLevel": "high/medium/low"
    }
  ],
  "matchedJobs": [
    {
      "title": "案件名",
      "company": "企業/プラットフォーム名",
      "matchRate": 92,
      "salary": "報酬レンジ (例: ¥30,000〜¥80,000/月)",
      "difficulty": "beginner/intermediate/advanced",
      "description": "案件の説明",
      "requiredSkills": ["必要スキル1", "必要スキル2"],
      "url": "#"
    }
  ],
  "roadmap": [
    {
      "week": 1,
      "title": "ステップタイトル",
      "description": "このステップで何をするか",
      "resources": ["リソースURL1"],
      "milestone": "達成目標"
    }
  ]
}

ルール:
- hiddenSkillsは3〜5個発見すること
- matchedJobsは4〜6個提案すること
- roadmapは8週間分を提案すること
- 日本語で回答すること
- ニッチで競合の少ない案件を優先すること
- 収益推定は現実的な金額にすること`;

function generateMockAnalysis(
    skills: string[],
    hobbies: string[],
    occupation: string
): AnalysisResult {
    const mockHiddenSkills: HiddenSkill[] = [
        {
            name: "テクニカルライティング",
            category: "Communication",
            confidence: 0.91,
            description: `${occupation}の経験と${skills[0] || "IT"}の知識を組み合わせることで、専門的な技術文書やブログ記事を執筆できる能力があると分析しました。`,
            revenueEstimate: "¥50,000〜¥150,000/月",
            demandLevel: "high",
        },
        {
            name: "オンライン教育コンテンツ制作",
            category: "Creative",
            confidence: 0.87,
            description: `${hobbies[0] || "趣味"}への深い知識と${skills[0] || "専門スキル"}を活かし、Udemy等でのオンラインコース制作が可能です。`,
            revenueEstimate: "¥30,000〜¥200,000/月",
            demandLevel: "high",
        },
        {
            name: "プロセス最適化コンサルティング",
            category: "Business",
            confidence: 0.83,
            description: `${occupation}で培った業務効率化の経験を、中小企業向けのコンサルティングとして提供できます。`,
            revenueEstimate: "¥80,000〜¥300,000/月",
            demandLevel: "medium",
        },
        {
            name: "データ可視化",
            category: "Tech",
            confidence: 0.79,
            description: `${skills.slice(0, 2).join("と")}のスキルを組み合わせ、ビジネスデータの可視化レポート作成が可能です。`,
            revenueEstimate: "¥40,000〜¥120,000/月",
            demandLevel: "high",
        },
        {
            name: "コミュニティマネジメント",
            category: "Communication",
            confidence: 0.75,
            description: `${hobbies.join("や")}への情熱を活かし、オンラインコミュニティの運営・マネジメントが可能です。`,
            revenueEstimate: "¥20,000〜¥80,000/月",
            demandLevel: "medium",
        },
    ];

    const mockMatchedJobs: MatchedJob[] = [
        {
            title: "技術ブログ記事執筆",
            company: "TechWrite Pro",
            matchRate: 95,
            salary: "¥5,000〜¥30,000/記事",
            difficulty: "beginner",
            description: "IT系メディアの技術記事執筆。あなたの専門知識を記事として発信しませんか？",
            requiredSkills: ["ライティング", skills[0] || "IT知識"],
            url: "#",
        },
        {
            title: "Udemyコース制作パートナー",
            company: "EduCreate Labs",
            matchRate: 88,
            salary: "¥100,000〜¥500,000/コース",
            difficulty: "intermediate",
            description: `${hobbies[0] || "専門分野"}に関するオンライン学習コースの企画・制作`,
            requiredSkills: ["プレゼンテーション", "コンテンツ制作"],
            url: "#",
        },
        {
            title: "業務効率化コンサルタント",
            company: "OptimizeHub",
            matchRate: 84,
            salary: "¥50,000〜¥200,000/プロジェクト",
            difficulty: "intermediate",
            description: "中小企業のDX推進・業務プロセス改善のコンサルティング",
            requiredSkills: ["問題解決", "プロジェクト管理"],
            url: "#",
        },
        {
            title: "データダッシュボード制作",
            company: "DataViz Japan",
            matchRate: 81,
            salary: "¥30,000〜¥100,000/案件",
            difficulty: "beginner",
            description: "企業向けのデータ可視化ダッシュボードの設計・制作",
            requiredSkills: ["データ分析", "可視化ツール"],
            url: "#",
        },
        {
            title: "オンラインコミュニティ運営",
            company: "Community First",
            matchRate: 76,
            salary: "¥30,000〜¥80,000/月",
            difficulty: "beginner",
            description: `${hobbies[0] || "趣味"}関連のオンラインコミュニティのモデレーション・運営`,
            requiredSkills: ["コミュニケーション", "SNS運用"],
            url: "#",
        },
    ];

    const mockRoadmap: RoadmapStep[] = [
        {
            week: 1,
            title: "スキル棚卸しと目標設定",
            description: "発見されたスキルの中から最も収益性の高いものを選び、具体的な目標を設定します。",
            resources: ["https://example.com/goal-setting"],
            milestone: "3ヶ月後の収益目標を設定",
        },
        {
            week: 2,
            title: "ポートフォリオ作成",
            description: "選んだスキルを証明するためのサンプル作品やポートフォリオを作成します。",
            resources: ["https://example.com/portfolio-tips"],
            milestone: "ポートフォリオサイト公開",
        },
        {
            week: 3,
            title: "プラットフォーム登録",
            description: "クラウドソーシングやフリーランスプラットフォームにプロフィールを登録します。",
            resources: ["https://example.com/platforms"],
            milestone: "3つ以上のプラットフォームに登録",
        },
        {
            week: 4,
            title: "最初の案件獲得",
            description: "小さな案件から始めて実績を積みます。価格は低めでも経験を優先。",
            resources: ["https://example.com/first-gig"],
            milestone: "初めての案件を受注",
        },
        {
            week: 5,
            title: "スキルアップ & フィードバック",
            description: "最初の案件のフィードバックを元に、スキルを改善します。",
            resources: ["https://example.com/improvement"],
            milestone: "クライアントから高評価を獲得",
        },
        {
            week: 6,
            title: "価格戦略の見直し",
            description: "実績ができたら、適正な価格に調整します。",
            resources: ["https://example.com/pricing"],
            milestone: "単価を20%アップ",
        },
        {
            week: 7,
            title: "継続案件の確保",
            description: "リピートクライアントを獲得し、安定的な収入源を作ります。",
            resources: ["https://example.com/retention"],
            milestone: "月額契約を1件獲得",
        },
        {
            week: 8,
            title: "スケールアップ計画",
            description: "収益を拡大するための次のステップを計画します。",
            resources: ["https://example.com/scaling"],
            milestone: "月収目標の50%達成",
        },
    ];

    return {
        hiddenSkills: mockHiddenSkills,
        matchedJobs: mockMatchedJobs,
        roadmap: mockRoadmap,
    };
}

export async function analyzeSkills(
    skills: string[],
    hobbies: string[],
    occupation: string,
    snsData?: string
): Promise<AnalysisResult> {
    if (!openai) {
        console.log("OpenAI API key not set, using mock data");
        return generateMockAnalysis(skills, hobbies, occupation);
    }

    try {
        const userPrompt = `
以下のユーザー情報を分析して、隠れた収益化可能なスキルを発見してください：

職種: ${occupation}
保有スキル: ${skills.join(", ")}
趣味・興味: ${hobbies.join(", ")}
${snsData ? `SNSデータ: ${snsData}` : ""}
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            response_format: { type: "json_object" },
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error("Empty response from OpenAI");

        return JSON.parse(content) as AnalysisResult;
    } catch (error) {
        console.error("OpenAI analysis failed, falling back to mock:", error);
        return generateMockAnalysis(skills, hobbies, occupation);
    }
}

export default openai;
