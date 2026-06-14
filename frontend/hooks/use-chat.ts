"use client";

import { useState, useCallback, useRef } from "react";
import { Message } from "@/components/chat-window";
import { MentorMode } from "@/components/mode-selector";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function buildSystemPrompt(mode: MentorMode, learningLevel?: string): string {
  const base = `You are Runtime Mentor, an expert AI assistant for JSForge Runtime — a JavaScript interpreter built in C++. You are friendly, technical, and educational. You love explaining how compilers, parsers, ASTs, and runtimes work. Always format your responses with markdown. Use code blocks with language tags. Be precise and practical.`;

  switch (mode) {
    case "tutor":
      return `${base}\n\nYou are in TUTOR mode. Help users understand:\n- JavaScript language concepts\n- Lexer / Tokenizer internals\n- Parser and grammar rules\n- Abstract Syntax Trees (AST)\n- Interpreter and evaluation logic\n- Memory model and scoping\n- C++ implementation patterns for a JS runtime\n\nAlways give clear explanations with code examples.`;

    case "debugger":
      return `${base}\n\nYou are in DEBUGGER mode. The user will paste code (C++ or JavaScript). Your job:\n1. Identify bugs, errors, or issues\n2. Explain WHY it's a bug\n3. Suggest a fix with corrected code\n4. Analyze time/space complexity if relevant\n5. Note any edge cases or improvements\n\nFormat your response with clear sections: ## Bug Analysis, ## Fix, ## Explanation.`;

    case "learning":
      return `${base}\n\nYou are in LEARNING MODE at level: ${learningLevel || "Intermediate"}.\n\n${
        learningLevel === "ELI5"
          ? "Explain everything as if talking to a 5-year-old. Use simple analogies, avoid jargon, and make it fun."
          : learningLevel === "Beginner"
          ? "Explain concepts simply. Avoid deep technical jargon. Use real-world analogies."
          : learningLevel === "Advanced"
          ? "Go deep. Use technical language, discuss edge cases, implementation tradeoffs, and link to CS theory."
          : "Balance technical accuracy with clear explanation. Assume some programming background."
      }`;

    case "challenge":
      return `${base}\n\nYou are in CHALLENGE mode. Generate practice challenges related to:\n- JavaScript runtime concepts\n- C++ implementation tasks\n- Compiler design problems\n- AST manipulation exercises\n\nFormat each challenge as:\n## Challenge: [Title]\n**Difficulty:** [Easy/Medium/Hard]\n**Description:** ...\n**Example Input:** ...\n**Expected Output:** ...\n**Hints:** (optional)\n**Solution Approach:** (give after user attempts)`;

    default:
      return base;
  }
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [mode, setMode] = useState<MentorMode>("tutor");
  const [learningLevel, setLearningLevel] = useState("Intermediate");
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);
    setStreamingContent("");

    const controller = new AbortController();
    abortRef.current = controller;

    const systemPrompt = buildSystemPrompt(mode, learningLevel);
    const historyForAPI = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: historyForAPI,
          systemPrompt,
          stream: true,
        }),
      });

      if (!res.ok || !res.body) throw new Error("Failed to connect to AI");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content || "";
              accumulated += delta;
              setStreamingContent(accumulated);
            } catch {}
          }
        }
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: accumulated || "I couldn't generate a response. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        // Fallback mock response when backend not available
        const mockResponse = generateMockResponse(userMessage.content, mode);
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: mockResponse,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
      abortRef.current = null;
    }
  }, [input, isStreaming, messages, mode, learningLevel]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setStreamingContent("");
    setIsStreaming(false);
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return {
    messages,
    input,
    setInput,
    isStreaming,
    streamingContent,
    mode,
    setMode,
    learningLevel,
    setLearningLevel,
    sendMessage,
    clearChat,
    stopStreaming,
  };
}

function generateMockResponse(userInput: string, mode: MentorMode): string {
  const lower = userInput.toLowerCase();

  if (mode === "challenge") {
    return `## Challenge: Implement a Simple Tokenizer\n\n**Difficulty:** Medium\n\n**Description:**\nWrite a C++ function that tokenizes a simple arithmetic expression like \`3 + 4 * 2\` into a list of tokens.\n\n**Example Input:**\n\`\`\`\n"3 + 4 * 2"\n\`\`\`\n\n**Expected Output:**\n\`\`\`\nNUMBER(3), PLUS, NUMBER(4), STAR, NUMBER(2)\n\`\`\`\n\n**Hints:**\n- Define a \`TokenType\` enum\n- Iterate character by character\n- Handle multi-digit numbers\n\n**Good luck! 🚀**`;
  }

  if (mode === "debugger") {
    return `## Bug Analysis\n\nI've reviewed the code you shared. Here are the findings:\n\n**Potential Issue:** Without seeing the actual code, common bugs in JS runtime implementations include:\n\n1. **Off-by-one errors** in lexer position tracking\n2. **Missing EOF token** at end of token stream\n3. **Operator precedence** not handled in parser\n\n## Fix\n\n\`\`\`cpp\n// Always add EOF token at the end of tokenization\ntokens.push_back(Token{TokenType::EOF_TOKEN, "", line});\n\`\`\`\n\n## Explanation\n\nPaste your specific code and I'll give you a precise analysis! 🔍`;
  }

  if (lower.includes("lexer") || lower.includes("token")) {
    return `## What is a Lexer?\n\nA **lexer** (also called a tokenizer or scanner) is the first phase of your JavaScript runtime. It converts raw source code text into a stream of **tokens**.\n\n### How it works:\n\n\`\`\`\nSource: "let x = 42;"\n\nTokens:\n  KEYWORD("let")\n  IDENTIFIER("x")\n  EQUALS("=")\n  NUMBER(42)\n  SEMICOLON(";")\n\`\`\`\n\n### C++ Implementation:\n\n\`\`\`cpp\nenum class TokenType {\n  LET, CONST, VAR,\n  IDENTIFIER, NUMBER, STRING,\n  PLUS, MINUS, STAR, SLASH,\n  EQUALS, SEMICOLON,\n  EOF_TOKEN\n};\n\nstruct Token {\n  TokenType type;\n  std::string value;\n  int line;\n};\n\`\`\`\n\nThe lexer reads characters one by one, groups them, and emits tokens. It ignores whitespace and handles string literals, numbers, and keywords. 🔬`;
  }

  if (lower.includes("ast") || lower.includes("abstract syntax")) {
    return `## Abstract Syntax Trees (AST)\n\nAn **AST** is a tree representation of your source code's structure — without the noise (whitespace, semicolons, etc.).\n\n### Example:\n\n\`\`\`javascript\nlet x = 3 + 4;\n\`\`\`\n\nBecomes:\n\n\`\`\`\nProgram\n└── VariableDeclaration (let)\n    ├── Identifier: x\n    └── BinaryExpression (+)\n        ├── NumericLiteral: 3\n        └── NumericLiteral: 4\n\`\`\`\n\n### C++ Node Structure:\n\n\`\`\`cpp\nstruct ASTNode {\n  std::string type;\n  std::string value;\n  std::vector<std::shared_ptr<ASTNode>> children;\n};\n\`\`\`\n\nThe **Parser** builds this tree from the token stream. The **Interpreter** then walks it to execute your code. 🌳`;
  }

  return `## Runtime Mentor 🤖\n\nGreat question! I'm here to help you with:\n\n- **JavaScript concepts** — variables, functions, closures, prototypes\n- **Lexer/Parser** — how source code becomes tokens and ASTs\n- **Interpreter** — how ASTs get evaluated\n- **C++ patterns** — implementing runtime internals\n- **Debugging** — finding and fixing bugs in your runtime\n\nTry asking something like:\n- *"How does the lexer tokenize a string?"*\n- *"Explain operator precedence in a parser"*\n- *"What is scope chain in a JS runtime?"*\n\nWhat would you like to explore? 🚀`;
}
