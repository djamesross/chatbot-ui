import { execFile } from "node:child_process";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { query, k = 10 } = req.body;
  if (!query) return res.status(400).json({ error: "query required" });

  execFile(
    "/usr/bin/env",
    ["python", `${process.env.HOME}/legal_corpus/embed/search.py`, query, k],
    { maxBuffer: 1024 * 1024 },
    (err, stdout, stderr) => {
      if (err) {
        return res.status(500).json({ error: stderr || err.message });
      }

      // ── no-match / low-confidence guard ───────────────────────────
      if (!stdout.trim()) {
        // empty snippets → model should answer “I don’t know”
        return res.status(200).json({ snippets: "" });
      }
      // ──────────────────────────────────────────────────────────────

      res.status(200).json({ snippets: stdout });
    }
  );
}