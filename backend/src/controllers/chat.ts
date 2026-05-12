import { Request, Response } from "express";
import { ChatSession, IChatSession } from "../models/ChatSession";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import { inngest } from "../inngest/client";
import { User } from "../models/User";
import { InngestSessionResponse, InngestEvent } from "../types/inngest";
import { Types } from "mongoose";
import { getCurrentUser } from "../middleware/auth";
// Remove unused imports - using ChatSession model instead

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY ! //CHANGE -1 
);

// Create a new chat session
export const createChatSession = async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User not authenticated" });
    }

    const userId = new Types.ObjectId(req.user.id);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique sessionId
    const sessionId = uuidv4();

    const session = new ChatSession({
      sessionId,
      userId,
      startTime: new Date(),
      status: "active",
      messages: [],
    });

    await session.save();

    res.status(201).json({
      message: "Chat session created successfully",
      sessionId: session.sessionId,
    });
  } catch (error) {
    logger.error("Error creating chat session:", error);
    res.status(500).json({
      message: "Error creating chat session",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Send a message in the chat session
// Send a message in the chat session
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;
    const userId = new Types.ObjectId(req.user.id);

    logger.info("Processing message:", { sessionId, message });

    // Find session
    const session = await ChatSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Log event (still keep Inngest for analytics)
    const event: InngestEvent = {
      name: "therapy/session.message",
      data: { message, history: session.messages },
    };
    await inngest.send(event);

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 🔹 Ask for a direct therapeutic response (no strict JSON requirement)
    const responsePrompt = `
    You are a supportive AI therapist assistant. 
    Your role is to:
      - Provide empathetic and supportive responses.
      - Use evidence-based therapeutic techniques.
      - Maintain professional boundaries.
      - Monitor for risk factors, including periodic, gentle inquiry about mood and anxiety levels using concepts from established scales like the PHQ-9 (Patient Health Questionnaire-9), GAD-7 (Generalized Anxiety Disorder 7-item scale), and GHQ (General Health Questionnaire), when contextually appropriate. Do NOT administer the full questionnaire directly, but use the concepts to gauge symptom severity.
      - Guide users toward their therapeutic goals.

    User message: "${message}"

    Please respond naturally in a supportive tone. 
    Do NOT return JSON or code blocks — just plain text.
    `;

    const responseResult = await model.generateContent(responsePrompt);
    const response = responseResult.response.text().trim();

    logger.info("Generated response:", response);

    // Save messages in session
    session.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    session.messages.push({
      role: "assistant",
      content: response,
      timestamp: new Date(),
    });

    await session.save();

    res.json({ response, message: response });
  } catch (error) {
    logger.error("Error in sendMessage:", error);
    res.status(500).json({
      message: "Error processing message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get chat session history
export const getSessionHistory = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = new Types.ObjectId(req.user.id);

    const session = (await ChatSession.findById(
      sessionId
    ).exec()) as IChatSession;
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json({
      messages: session.messages,
      startTime: session.startTime,
      status: session.status,
    });
  } catch (error) {
    logger.error("Error fetching session history:", error);
    res.status(500).json({ message: "Error fetching session history" });
  }
};

export const getChatSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    logger.info(`Getting chat session: ${sessionId}`);
    const chatSession = await ChatSession.findOne({ sessionId });
    if (!chatSession) {
      logger.warn(`Chat session not found: ${sessionId}`);
      return res.status(404).json({ error: "Chat session not found" });
    }
    logger.info(`Found chat session: ${sessionId}`);
    res.json(chatSession);
  } catch (error) {
    logger.error("Failed to get chat session:", error);
    res.status(500).json({ error: "Failed to get chat session" });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = new Types.ObjectId(req.user.id);

    // Find session by sessionId instead of _id
    const session = await ChatSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(session.messages);
  } catch (error) {
    logger.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Error fetching chat history" });
  }
};
export async function getMedicalVoiceAgentSession(req: Request, res: Response) {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = new Types.ObjectId(req.user.id);

    // Find session using ChatSession model
    const session = await ChatSession.findOne({ 
      sessionId,
      userId 
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.json(session);
  } catch (error) {
    logger.error("Error fetching session:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}