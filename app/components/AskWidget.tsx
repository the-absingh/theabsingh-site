"use client";

import { FormEvent, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "How did the support agent work?",
  "What changed in the accounting workflow?",
  "How were 2,000+ products priced?",
];

export function AskWidget() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function ask(value: string) {
    const cleanQuestion = value.trim();
    if (!cleanQuestion || pending) return;

    setMessages((current) => [...current, { role: "user", content: cleanQuestion }]);
    setQuestion("");
    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !data.answer) throw new Error(data.error || "The system did not return an answer.");
      setMessages((current) => [...current, { role: "assistant", content: data.answer! }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The system is unavailable right now.");
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(question);
  }

  function reset() {
    setMessages([]);
    setError("");
    setQuestion("");
    inputRef.current?.focus();
  }

  return (
    <div className="console-frame">
      <div className="console-reflection" aria-hidden="true" />
      <div className="ask-widget">
        <div className="widget-header">
          <div className="console-brand"><span className="console-mark">A</span><span>Systems archive</span></div>
          <span className="widget-status"><i /> Live · Grounded</span>
        </div>

        <div className="widget-content">
          <div className="widget-body" aria-live="polite">
            {messages.length === 0 ? (
              <div className="widget-intro">
                <p className="console-kicker">Ask the work, not a sales page</p>
                <h2>See how the systems<br />actually work.</h2>
                <p>Ask about architecture, constraints or measurable outcomes. Answers stay grounded in verified project records.</p>
                <div className="suggestion-list">
                  {suggestions.map((suggestion, index) => (
                    <button key={suggestion} type="button" onClick={() => void ask(suggestion)} disabled={pending}>
                      <span>0{index + 1}</span><b>{suggestion}</b><i>↗</i>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="messages">
                {messages.map((message, index) => (
                  <div className={`message message-${message.role}`} key={`${message.role}-${index}`}>
                    <span>{message.role === "user" ? "Your question" : "System answer"}</span>
                    <p>{message.content}</p>
                  </div>
                ))}
                {pending && <div className="thinking"><span /><span /><span /> Reading the build archive</div>}
              </div>
            )}
            {error && <p className="widget-error" role="alert">{error}</p>}
          </div>

          <aside className="console-meta" aria-label="AI system status">
            <div><span>Knowledge</span><strong>Verified work</strong></div>
            <div><span>Scope</span><strong>Work only</strong></div>
            <div><span>Access</span><strong>Live</strong></div>
            <p>No generic answers.<br />No invented claims.</p>
          </aside>
        </div>

        <form className="widget-form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="work-question">Ask a question about Ab Singh’s work</label>
          <span aria-hidden="true">⌘</span>
          <input
            ref={inputRef}
            id="work-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={500}
            placeholder="Ask how a system was built..."
            disabled={pending}
            autoComplete="off"
          />
          <button type="submit" disabled={pending || !question.trim()} aria-label="Send question"><span>Ask</span> ↗</button>
        </form>

        <div className="widget-footer">
          <span>OPENAI · SERVER-SIDE · PROJECT-GROUNDED</span>
          {messages.length > 0 && <button type="button" onClick={reset}>Clear conversation</button>}
        </div>
      </div>
    </div>
  );
}
