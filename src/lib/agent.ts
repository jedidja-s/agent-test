import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor } from "langchain/agents";
import { WebCrawlerTool } from "./tools/web-crawler";
import { BaseMessage } from '@langchain/core/messages';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

export class AgentService {
  private model: ChatOpenAI;
  private executor: AgentExecutor;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0,
    });

    // Initialize the agent with tools
    this.initializeAgent();
  }

  private async initializeAgent() {
    const tools = [new WebCrawlerTool()];

    const systemMessage = `You are an advanced web research assistant capable of crawling websites and extracting specific information.

Instructions for using websites:
- When asked to analyze a website, use the web_crawler tool
- You can extract articles, product information, and general content
- Always verify the URL before crawling
- Summarize the extracted information in a clear, structured way

Please format your responses in a clean, readable manner.`;

    this.executor = await initializeAgentExecutorWithOptions(
      tools,
      this.model,
      {
        agentType: "openai-functions",
        verbose: true,
        agentArgs: {
          prefix: systemMessage
        }
      }
    );
  }

  async processMessage(message: string, chatHistory: BaseMessage[] = []) {
    try {
      const response = await this.executor.invoke({
        input: message,
        chat_history: chatHistory,
      });

      return response.output;
    } catch (error) {
      console.error("Error processing message:", error);
      throw error;
    }
  }

  async getLastMessage(chatHistory: BaseMessage[]): Promise<string | null> {
    if (chatHistory.length > 0) {
      const lastMessage = chatHistory[chatHistory.length - 1];
      return typeof lastMessage.content === 'string' ? lastMessage.content : null;
    }
    return null;
  }
} 