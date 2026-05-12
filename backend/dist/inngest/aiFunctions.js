"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.generateActivityRecommendations = exports.analyzeTherapySession = exports.processChatMessage = void 0;
const client_1 = require("./client");
const openai_1 = __importDefault(require("openai"));
const logger_1 = require("../utils/logger");
// Initialize OpenAI
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
// Utility: call OpenAI with a system+user prompt
async function callOpenAI(systemPrompt, userPrompt) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // or "gpt-4o" / "gpt-4.1" depending on your use case
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
    });
    return response.choices[0]?.message?.content?.trim() || "";
}
// Function to handle chat message processing
exports.processChatMessage = client_1.inngest.createFunction({
    id: "process-chat-message",
}, { event: "therapy/session.message" }, async ({ event, step }) => {
    try {
        const { message, history, memory = {
            userProfile: {
                emotionalState: [],
                riskLevel: 0,
                preferences: {},
            },
            sessionContext: {
                conversationThemes: [],
                currentTechnique: null,
            },
        }, goals = [], systemPrompt, } = event.data;
        logger_1.logger.info("Processing chat message:", {
            message,
            historyLength: history?.length,
        });
        // Analyze the message
        const analysis = await step.run("analyze-message", async () => {
            try {
                const userPrompt = `Analyze this therapy message and provide insights. 
Return ONLY a valid JSON object with no markdown formatting or extra text.
Message: ${message}
Context: ${JSON.stringify({ memory, goals })}

Required JSON structure:
{
  "emotionalState": "string",
  "themes": ["string"],
  "riskLevel": number,
  "recommendedApproach": "string",
  "progressIndicators": ["string"]
}`;
                const text = await callOpenAI("You are a therapy session analysis assistant.", userPrompt);
                logger_1.logger.info("Received analysis from OpenAI:", { text });
                const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
                const parsedAnalysis = JSON.parse(cleanText);
                logger_1.logger.info("Successfully parsed analysis:", parsedAnalysis);
                return parsedAnalysis;
            }
            catch (error) {
                logger_1.logger.error("Error in message analysis:", { error, message });
                return {
                    emotionalState: "neutral",
                    themes: [],
                    riskLevel: 0,
                    recommendedApproach: "supportive",
                    progressIndicators: [],
                };
            }
        });
        // Update memory based on analysis
        const updatedMemory = await step.run("update-memory", async () => {
            if (analysis.emotionalState) {
                memory.userProfile.emotionalState.push(analysis.emotionalState);
            }
            if (analysis.themes) {
                memory.sessionContext.conversationThemes.push(...analysis.themes);
            }
            if (analysis.riskLevel) {
                memory.userProfile.riskLevel = analysis.riskLevel;
            }
            return memory;
        });
        // If high risk is detected, trigger an alert
        if (analysis.riskLevel > 4) {
            await step.run("trigger-risk-alert", async () => {
                logger_1.logger.warn("High risk level detected in chat message", {
                    message,
                    riskLevel: analysis.riskLevel,
                });
            });
        }
        // Generate therapeutic response
        const response = await step.run("generate-response", async () => {
            try {
                const userPrompt = `${systemPrompt}

Based on the following context, generate a therapeutic response:
Message: ${message}
Analysis: ${JSON.stringify(analysis)}
Memory: ${JSON.stringify(memory)}
Goals: ${JSON.stringify(goals)}

Provide a response that:
1. Addresses the immediate emotional needs
2. Uses appropriate therapeutic techniques
3. Shows empathy and understanding
4. Maintains professional boundaries
5. Considers safety and well-being`;
                const responseText = await callOpenAI("You are a supportive AI therapist.", userPrompt);
                logger_1.logger.info("Generated response:", { responseText });
                return responseText;
            }
            catch (error) {
                logger_1.logger.error("Error generating response:", { error, message });
                return "I'm here to support you. Could you tell me more about what's on your mind?";
            }
        });
        return {
            response,
            analysis,
            updatedMemory,
        };
    }
    catch (error) {
        logger_1.logger.error("Error in chat message processing:", {
            error,
            message: event.data.message,
        });
        return {
            response: "I'm here to support you. Could you tell me more about what's on your mind?",
            analysis: {
                emotionalState: "neutral",
                themes: [],
                riskLevel: 0,
                recommendedApproach: "supportive",
                progressIndicators: [],
            },
            updatedMemory: event.data.memory,
        };
    }
});
// Function to analyze therapy session content
exports.analyzeTherapySession = client_1.inngest.createFunction({ id: "analyze-therapy-session" }, { event: "therapy/session.created" }, async ({ event, step }) => {
    try {
        const sessionContent = await step.run("get-session-content", async () => {
            return event.data.notes || event.data.transcript;
        });
        const analysis = await step.run("analyze-with-openai", async () => {
            const userPrompt = `Analyze this therapy session and provide insights:
Session Content: ${sessionContent}

Please provide:
1. Key themes and topics discussed
2. Emotional state analysis
3. Potential areas of concern
4. Recommendations for follow-up
5. Progress indicators

Format the response as a JSON object.`;
            const text = await callOpenAI("You are a therapy session analysis assistant.", userPrompt);
            const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
            return JSON.parse(cleanText);
        });
        await step.run("store-analysis", async () => {
            logger_1.logger.info("Session analysis stored successfully");
            return analysis;
        });
        if (analysis.areasOfConcern?.length > 0) {
            await step.run("trigger-concern-alert", async () => {
                logger_1.logger.warn("Concerning indicators detected in session analysis", {
                    sessionId: event.data.sessionId,
                    concerns: analysis.areasOfConcern,
                });
            });
        }
        return {
            message: "Session analysis completed",
            analysis,
        };
    }
    catch (error) {
        logger_1.logger.error("Error in therapy session analysis:", error);
        throw error;
    }
});
// Function to generate personalized activity recommendations
exports.generateActivityRecommendations = client_1.inngest.createFunction({ id: "generate-activity-recommendations" }, { event: "mood/updated" }, async ({ event, step }) => {
    try {
        const userContext = await step.run("get-user-context", async () => {
            return {
                recentMoods: event.data.recentMoods,
                completedActivities: event.data.completedActivities,
                preferences: event.data.preferences,
            };
        });
        const recommendations = await step.run("generate-recommendations", async () => {
            const userPrompt = `Based on the following user context, generate personalized activity recommendations:
User Context: ${JSON.stringify(userContext)}

Please provide:
1. 3-5 personalized activity recommendations
2. Reasoning for each recommendation
3. Expected benefits
4. Difficulty level
5. Estimated duration

Format the response as a JSON object.`;
            const text = await callOpenAI("You are a well-being activity recommender.", userPrompt);
            const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
            return JSON.parse(cleanText);
        });
        await step.run("store-recommendations", async () => {
            logger_1.logger.info("Activity recommendations stored successfully");
            return recommendations;
        });
        return {
            message: "Activity recommendations generated",
            recommendations,
        };
    }
    catch (error) {
        logger_1.logger.error("Error generating activity recommendations:", error);
        throw error;
    }
});
exports.functions = [
    exports.processChatMessage,
    exports.analyzeTherapySession,
    exports.generateActivityRecommendations,
];
