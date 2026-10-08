"use client";

import { useState, type FormEvent } from "react";
import { EMAIL } from "@/lib/content";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const EMAIL_RE = /.+@.+\..+/;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? ""); // honeypot

    if (!name || !EMAIL_RE.test(email) || !message) {
      setStatus({
        kind: "error",
        message: "Add your name, a valid email address and a message first.",
      });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reason?: string;
      };

      if (res.ok && body.ok) {
        form.reset();
        setStatus({ kind: "sent" });
      } else if (body.reason === "not_configured") {
        setStatus({
          kind: "error",
          message: `Messages can’t be delivered from this site yet, so nothing was sent. Please email us at ${EMAIL}.`,
        });
      } else {
        setStatus({
          kind: "error",
          message: `Something went wrong and your message wasn’t sent. Please email us at ${EMAIL}.`,
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: `Couldn’t reach the server. Please email us at ${EMAIL}.`,
      });
    }
  };

  const busy = status.kind === "sending";

  return (
    <form id="form" onSubmit={onSubmit} noValidate>
      <span className="mono" style={{ color: "var(--sig)" }}>
        Send us a message
      </span>

      <div className="fld">
        <label className="mono" htmlFor="fn">
          Your name
        </label>
        <input
          id="fn"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Developer"
          required
          maxLength={120}
        />
      </div>
      <div className="fld">
        <label className="mono" htmlFor="fe">
          Email address
        </label>
        <input
          id="fe"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          required
          maxLength={200}
        />
      </div>
      <div className="fld">
        <label className="mono" htmlFor="fm">
          What’s on your mind?
        </label>
        <textarea
          id="fm"
          name="message"
          placeholder="Tell us about the problem you’re losing sleep over…"
          required
          maxLength={4000}
        />
      </div>

      {/* Honeypot: humans never see or fill this. */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="btn sig" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Send message →"}
      </button>

      <div className="notice" role="status" hidden={status.kind !== "error" && status.kind !== "sent"}>
        {status.kind === "sent" && "Thanks — your message is in. We’ll reply within 24 hours."}
        {status.kind === "error" && status.message}
      </div>
      <p className="note">We reply within 24 hours, usually much sooner.</p>
    </form>
  );
}
