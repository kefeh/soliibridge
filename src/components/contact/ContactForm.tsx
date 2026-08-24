"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { labelClass, inputClass, errorClass } from "@/components/ui/formStyles";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(6, "Enter a valid phone number"),
  subject: z.enum(["General", "ArcLocal Support", "OfficeTrail Order"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
  company: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "General" },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.company) {
      setSubmitted(true);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border-gray bg-surface-white p-10 text-center">
        <CheckCircle2 size={40} strokeWidth={1.5} className="text-corporate-blue" />
        <h3 className="font-display text-xl font-bold text-slate-gray-dark">
          Message Sent
        </h3>
        <p className="text-sm text-slate-gray">
          Thanks for reaching out. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-2xl border border-border-gray bg-surface-white p-8 sm:p-10"
      noValidate
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
        {...register("company")}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" className={inputClass} {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input id="phone" type="tel" className={inputClass} {...register("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" type="email" className={inputClass} {...register("email")} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <select id="subject" className={inputClass} {...register("subject")}>
          <option value="General">General</option>
          <option value="ArcLocal Support">ArcLocal Support</option>
          <option value="OfficeTrail Order">OfficeTrail Order</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" rows={5} className={inputClass} {...register("message")} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        tone="accent"
        disabled={isSubmitting}
        className="w-full disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
