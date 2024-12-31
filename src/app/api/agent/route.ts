import { NextResponse } from "next/server";
import { AgentService } from "../../../lib/agent";

const agentService = new AgentService();

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await agentService.processMessage(message);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in agent route:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
} 