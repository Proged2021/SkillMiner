import { NextRequest, NextResponse } from "next/server";
import { analyzeSkills } from "@/lib/openai";
import { analyzeSnsProfiles } from "@/lib/sns";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, skills, hobbies, occupation, twitterUsername, linkedinUsername } = body;

        // Fetch SNS data if provided
        let snsData = "";
        const snsProfiles = await analyzeSnsProfiles(twitterUsername, linkedinUsername);
        if (snsProfiles.length > 0) {
            snsData = JSON.stringify(snsProfiles);

            // Save SNS profiles to DB if userId provided
            if (userId) {
                for (const profile of snsProfiles) {
                    await prisma.snsProfile.create({
                        data: {
                            platform: profile.platform,
                            profileData: JSON.stringify(profile),
                            userId,
                        },
                    });
                }
            }
        }

        // Run AI analysis
        const result = await analyzeSkills(skills, hobbies, occupation, snsData);

        // Save analysis to DB if userId provided
        if (userId) {
            await prisma.analysis.create({
                data: {
                    userId,
                    hiddenSkills: JSON.stringify(result.hiddenSkills),
                    matchedJobs: JSON.stringify(result.matchedJobs),
                    roadmap: JSON.stringify(result.roadmap),
                },
            });

            // Save discovered hidden skills
            for (const skill of result.hiddenSkills) {
                await prisma.skill.create({
                    data: {
                        name: skill.name,
                        category: skill.category,
                        level: Math.round(skill.confidence * 5),
                        isHidden: true,
                        userId,
                    },
                });
            }
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json(
            { error: "分析に失敗しました" },
            { status: 500 }
        );
    }
}
