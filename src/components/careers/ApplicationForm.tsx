"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, UploadCloud } from "lucide-react";
import Button from "@/components/ui/Button";
import { labelClass, inputClass, errorClass } from "@/components/ui/formStyles";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024;

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(6, "Enter a valid phone number"),
  coverLetter: z
    .string()
    .min(20, "Tell us a bit about yourself (at least 20 characters)"),
  resume: z
    .custom<FileList>((val) => val instanceof FileList)
    .refine((files) => files.length === 1, "Please attach your resume")
    .refine(
      (files) => files[0] && files[0].size <= MAX_SIZE,
      "File must be 5MB or smaller"
    )
    .refine(
      (files) => files[0] && ALLOWED_TYPES.includes(files[0].type),
      "Only PDF, DOC, or DOCX files are accepted"
    ),
});

type FormValues = z.infer<typeof schema>;

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const resumeFile = watch("resume");
  const resumeName = resumeFile?.[0]?.name;

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-border-gray bg-surface-white p-10 text-center">
        <CheckCircle2 size={40} strokeWidth={1.5} className="text-arclocal-green" />
        <h3 className="font-display text-xl font-bold text-slate-gray-dark">
          Application Received
        </h3>
        <p className="text-sm text-slate-gray">
          Thank you for applying. Our team will review your application and reach
          out if there&apos;s a match.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-lg flex-col gap-6 rounded-2xl border border-border-gray bg-surface-white p-8 sm:p-10"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={labelClass}>
          Full Name
        </label>
        <input id="name" className={inputClass} {...register("name")} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" type="email" className={inputClass} {...register("email")} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>
        <input id="phone" type="tel" className={inputClass} {...register("phone")} />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="coverLetter" className={labelClass}>
          Cover Letter
        </label>
        <textarea
          id="coverLetter"
          rows={5}
          className={inputClass}
          {...register("coverLetter")}
        />
        {errors.coverLetter && <p className={errorClass}>{errors.coverLetter.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="resume" className={labelClass}>
          Resume
        </label>
        <label
          htmlFor="resume"
          className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border-gray bg-cloud-gray px-4 py-4 text-sm text-slate-gray transition-colors hover:border-[var(--color-accent)]"
        >
          <UploadCloud size={20} strokeWidth={1.5} className="shrink-0" />
          {resumeName ?? "Upload PDF, DOC, or DOCX (max 5MB)"}
        </label>
        <input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          {...register("resume")}
        />
        {errors.resume && <p className={errorClass}>{errors.resume.message as string}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        tone="accent"
        disabled={isSubmitting}
        className="mt-2 w-full disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Apply Online"}
      </Button>
    </form>
  );
}
