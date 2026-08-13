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
    <div className="ask-widget">
      <div className="widget-header">
        <div className="window-controls" aria-hidden="true"><span /><span /><span /></div>
        <span>WORK_QUERY.EXE</span>
        <span className="widget-status"><i /> ONLINE</span>
      </div>

      <div className="widget-body" aria-live="polite">
        {messages.length === 0 ? (
          <div className="widget-intro">
            <span className="prompt-symbol">?</span>
            <h2>Ask about my work.</h2>
            <p>This AI is limited to the four case studies on this site. Ask how something was built, what changed, or what the result was.</p>
            <div className="suggestion-list">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => void ask(suggestion)} disabled={pending}>
                  <span>↳</span>{suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message, index) => (
              <div className={`message message-${message.role}`} key={`${message.role}-${index}`}>
                <span>{message.role === "user" ? "YOU" : "SYSTEM"}</span>
                <p>{message.content}</p>
              </div>
            ))}
            {pending && <div className="thinking"><span /><span /><span /> Reading case studies</div>}
          </div>
        )}
        {error && <p className="widget-error" role="alert">{error}</p>}
      </div>

      <form className="widget-form" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="work-question">Ask a question about Ab Singh’s work</label>
        <span aria-hidden="true">›</span>
        <input
          ref={inputRef}
          id="work-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={500}
          placeholder="Type a question..."
          disabled={pending}
          autoComplete="off"
        />
        <button type="submit" disabled={pending || !question.trim()} aria-label="Send question">SEND ↵</button>
      </form>

      <div className="widget-footer">
        <span>GROUNDED IN 4 CASE STUDIES</span>
        {messages.length > 0 && <button type="button" onClick={reset}>CLEAR LOG</button>}
      </div>
    </div>
  );
}
