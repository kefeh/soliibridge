import { after } from "next/server";
import { sendSubmissionEmail } from "@/lib/mail";
import { getSubmission, setEmailStatus } from "@/lib/submissions";

/** Email the saved submission after the response is sent; the inbox row is the source of truth. */
export function emailInBackground(
  id: number,
  attachment?: { filename: string; content: Buffer; contentType?: string }
) {
  after(async () => {
    const submission = getSubmission(id);
    if (!submission) return;
    try {
      const result = await sendSubmissionEmail(submission, attachment);
      if (result.ok) setEmailStatus(id, "sent");
      else if (result.reason === "not_configured") setEmailStatus(id, "not_configured");
      else setEmailStatus(id, "failed", result.error);
    } catch (err) {
      setEmailStatus(id, "failed", err instanceof Error ? err.message : String(err));
    }
  });
}
