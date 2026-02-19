export interface SnsProfileData {
    platform: string;
    username: string;
    bio: string;
    followers: number;
    interests: string[];
    topTopics: string[];
    activityLevel: "high" | "medium" | "low";
}

function generateMockTwitterProfile(username: string): SnsProfileData {
    return {
        platform: "twitter",
        username: username || "@demo_user",
        bio: "テクノロジーと教育に興味があるエンジニア。週末はDIYと写真撮影。",
        followers: 1247,
        interests: ["テクノロジー", "教育", "写真", "DIY", "AI"],
        topTopics: ["プログラミング", "AI/ML", "生産性向上", "ガジェット", "自己啓発"],
        activityLevel: "high",
    };
}

function generateMockLinkedInProfile(username: string): SnsProfileData {
    return {
        platform: "linkedin",
        username: username || "demo-professional",
        bio: "5年以上のIT業界経験。プロジェクトマネジメントとシステム設計が得意。",
        followers: 523,
        interests: ["プロジェクトマネジメント", "アジャイル開発", "DX推進", "チームビルディング"],
        topTopics: ["リーダーシップ", "デジタルトランスフォーメーション", "クラウド技術", "チームマネジメント"],
        activityLevel: "medium",
    };
}

export async function fetchTwitterProfile(apiKey: string, username: string): Promise<SnsProfileData> {
    if (!apiKey) {
        return generateMockTwitterProfile(username);
    }
    // Real Twitter API integration would go here
    // For demo, return mock data
    return generateMockTwitterProfile(username);
}

export async function fetchLinkedInProfile(apiKey: string, username: string): Promise<SnsProfileData> {
    if (!apiKey) {
        return generateMockLinkedInProfile(username);
    }
    // Real LinkedIn API integration would go here
    // For demo, return mock data  
    return generateMockLinkedInProfile(username);
}

export async function analyzeSnsProfiles(
    twitterUsername?: string,
    linkedinUsername?: string
): Promise<SnsProfileData[]> {
    const profiles: SnsProfileData[] = [];

    if (twitterUsername) {
        const twitter = await fetchTwitterProfile(
            process.env.TWITTER_API_KEY || "",
            twitterUsername
        );
        profiles.push(twitter);
    }

    if (linkedinUsername) {
        const linkedin = await fetchLinkedInProfile(
            process.env.LINKEDIN_CLIENT_ID || "",
            linkedinUsername
        );
        profiles.push(linkedin);
    }

    return profiles;
}
