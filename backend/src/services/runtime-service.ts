import { execFile } from "child_process";
import { writeFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export interface RunResult {
  output: string;
  errors: string[];
  memoryUsage?: number;
}

const RUNTIME_BINARY = process.env.RUNTIME_BINARY_PATH || null;
const EXECUTION_TIMEOUT = 5000; // 5 seconds

/**
 * Run JavaScript code through the JSForge runtime.
 * If RUNTIME_BINARY_PATH is set, it executes the real C++ binary.
 * Otherwise it falls back to a mock interpreter for demo purposes.
 */
export async function runCode(code: string, language: string = "javascript"): Promise<RunResult> {
  if (RUNTIME_BINARY) {
    return runWithBinary(code);
  }
  return mockRun(code);
}

async function runWithBinary(code: string): Promise<RunResult> {
  const tmpFile = join(tmpdir(), `jsforge_${Date.now()}.js`);

  try {
    await writeFile(tmpFile, code, "utf8");

    const { stdout, stderr } = await execFileAsync(
      RUNTIME_BINARY!,
      [tmpFile],
      { timeout: EXECUTION_TIMEOUT }
    );

    return {
      output: stdout,
      errors: stderr ? [stderr] : [],
    };
  } catch (err: any) {
    if (err.killed) {
      return { output: "", errors: ["Execution timed out (5s limit)"] };
    }
    return {
      output: err.stdout || "",
      errors: [err.stderr || err.message || "Unknown runtime error"],
    };
  } finally {
    await unlink(tmpFile).catch(() => {});
  }
}

/**
 * Mock runtime — simulates basic JS execution for demo/development.
 */
function mockRun(code: string): RunResult {
  const output: string[] = [];
  const errors: string[] = [];

  try {
    // Simple console.log extraction for demo
    const lines = code.split("\n");

    for (const line of lines) {
      const trimmed = line.trim();

      // Mock console.log
      const logMatch = trimmed.match(/^console\.log\((.+)\);?$/);
      if (logMatch) {
        const arg = logMatch[1].trim();
        try {
          // Try to evaluate simple expressions
          const result = safeEval(arg);
          output.push(String(result));
        } catch {
          output.push(`[log] ${arg}`);
        }
        continue;
      }

      // Detect syntax errors
      if (trimmed.startsWith("function(") && !trimmed.includes("=>")) {
        errors.push("SyntaxError: Unexpected token 'function'");
      }
    }

    if (output.length === 0 && errors.length === 0) {
      output.push("[JSForge Runtime] Code executed successfully with no output.");
      output.push("Tip: Use console.log() to print values.");
      output.push("");
      output.push("// Connect RUNTIME_BINARY_PATH in .env to use the real C++ runtime.");
    }
  } catch (err: any) {
    errors.push(err.message || "Unknown error");
  }

  return {
    output: output.join("\n"),
    errors,
    memoryUsage: Math.floor(Math.random() * 2048 + 256),
  };
}

function safeEval(expr: string): unknown {
  // Evaluate only safe literals and basic arithmetic
  const safe = expr.replace(/[^0-9+\-*/.() "'",\[\]{}:truefalsn\s]/g, "");
  // eslint-disable-next-line no-new-func
  return new Function(`"use strict"; return (${safe})`)();
}
