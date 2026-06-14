"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useRef } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
}: CodeEditorProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("jsforge-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "8B92A8", fontStyle: "italic" },
        { token: "keyword", foreground: "A855F7" },
        { token: "string", foreground: "22D3EE" },
        { token: "number", foreground: "3B82F6" },
        { token: "identifier", foreground: "E6E9F2" },
      ],
      colors: {
        "editor.background": "#0B0E16",
        "editor.foreground": "#E6E9F2",
        "editor.lineHighlightBackground": "#10141F",
        "editorLineNumber.foreground": "#4B5263",
        "editorCursor.foreground": "#22D3EE",
        "editor.selectionBackground": "#3B82F633",
      },
    });

    monaco.editor.setTheme("jsforge-dark");
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={(v) => onChange(v ?? "")}
      onMount={handleMount}
      theme="jsforge-dark"
      options={{
        fontSize: 14,
        fontFamily: "var(--font-mono), monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 16, bottom: 16 },
        smoothScrolling: true,
        cursorBlinking: "smooth",
        renderLineHighlight: "all",
        tabSize: 2,
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
}
