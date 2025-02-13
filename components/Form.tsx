'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRef, useState } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import useMeasure from "react-use-measure";
import useClickOutside from "@/hooks/useClickOutside"
 
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(800, {
    message: "Message must be less than 800 characters.",
  }),
})

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
};

export default function EmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  const buttonText = ["Write me a note", "Next", "Submit", "Thanks!"][step];

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sendContattaci', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setStep(3);
        setIsOpen(false);
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    if (step === 3) {
      return;
    }

    if (!isOpen && step === 0) {
      setIsOpen(true);
      setStep(1);
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      return;
    }

    if (step === 1) {
      const nameValid = await form.trigger('name');
      const emailValid = await form.trigger('email');
      
      if (!nameValid || !emailValid) {
        setErrors({ form: ['pls fill out all fields'] });
        return;
      }
      setErrors(null);
    }

    if (step === 2) {
      const messageValid = await form.trigger('message');
      
      if (!messageValid) {
        setErrors({ form: ['pls fill out all fields'] });
        return;
      }
      setErrors(null);
      form.handleSubmit(handleSubmit)();
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const stepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <>
            <motion.div
              className={cn(
                "absolute -top-[4.5rem] w-full left-0 bg-[#101B1D] text-[1rem] rounded-6 shadow-lg px-4 py-2 font-medium text-center transition",
                errors?.form && "ring-2 ring-[#F04F1F]/60"
              )}
              style={{
                textWrap: "balance",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={errors?.form ? "error" : "default"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {errors?.form ? errors.form[0] : `tnx for visiting! leave ur name and email <3`}
                </motion.p>
              </AnimatePresence>
            </motion.div>
            <div className="flex flex-col gap-y-4 px-6 py-4">
              <div className="space-y-2 w-full">
                <label className="text-gray-1 text-sm">Name</label>
                <input
                  {...form.register("name")}
                  className="bg-[#101B1D]/30 focus:bg-gray-1 transition-all focus:placeholder:text-gray-9 text-[16px] outline-hidden text-gray-2 focus:text-gray-12 font-normal rounded-[6px] p-3 w-full placeholder:text-[white]/40 "
                  placeholder="Your name"
                />
                {form.formState.errors.name && (
                  <p className="text-gray-1 text-[12px] mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2 w-full">
                <label className="text-gray-1 text-sm">Email</label>
                <input
                  {...form.register("email")}
                  className="bg-[#101B1D]/30 focus:bg-gray-1 transition-all focus:placeholder:text-gray-9 text-[16px] outline-hidden text-gray-2 focus:text-gray-12 font-normal rounded-[6px] p-3 w-full placeholder:text-[white]/40 "
                  placeholder="Your email"
                />
                {form.formState.errors.email && (
                  <p className="text-gray-1 text-[12px] mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <motion.div
              className={cn(
                "absolute -top-[4.5rem] w-full left-0 bg-[#101B1D] text-[1rem] rounded-6 shadow-lg px-4 py-2 font-medium text-center transition",
                errors?.form && "ring-2 ring-[#F04F1F]/60"
              )}
              style={{
                textWrap: "balance",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={errors?.form ? "error" : "default"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {errors?.form ? errors.form[0] : `why not write a little message as well! be creative!!`}
                </motion.p>
              </AnimatePresence>
            </motion.div>
            <div className="px-6 py-4">
              <div className="flex items-center mb-4">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="text-gray-1 text-sm hover:opacity-80 transition-opacity flex items-center gap-x-1"
                >
                  ← Back
                </button>
              </div>
              <div className="space-y-2 w-full">
                <label className="text-gray-1 text-sm">Message</label>
                <textarea
                  {...form.register("message")}
                  className="bg-[#101B1D]/30 focus:bg-gray-1 transition-all focus:placeholder:text-gray-9 text-[16px] outline-hidden text-gray-2 focus:text-gray-12 font-normal rounded-[6px] p-3 w-full placeholder:text-[white]/40 "
                  placeholder="Your message"
                />
                {form.formState.errors.message && (
                  <p className="text-gray-1 text-[12px] mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="bottom-10 left-1/2 -translate-x-1/2 absolute z-300">
        <div className="rounded-6 bg-[#F04F1F] px-4 py-3 text-center w-72">
          <h2 className="text-gray-1 text-lg font-medium">Thank you!</h2>
          <p className="text-gray-1/90 text-sm mt-1">I'll get back to you in the next 24hrs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bottom-10 left-1/2 -translate-x-1/2 absolute z-300 px-4">
      <div className="rounded-6 bg-[#F04F1F] transition text-[1.5rem] flex gap-x-1.5 items-center justify-center text-gray-1 font-semibold h-fit w-72 visitors_homeBtn__X_zZC ">
        <MotionConfig transition={transition}>
          <div className="h-full w-full" ref={ref}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="overflow-hidden w-full">
                <AnimatePresence initial={false} mode="sync">
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0 }}
                      animate={{ height: heightContent || 0 }}
                      exit={{ height: 0 }}
                    >
                      <div ref={contentRef} className="w-full">
                        {stepContent(step)}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <button
                className={cn(
                  "relative flex py-4 w-full shrink-0 scale-100 select-none appearance-none items-center justify-center transition focus-visible:ring-2 active:scale-[0.98] lowercase cursor-pointer",
                  isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                )}
                type="button"
                disabled={isLoading}
                onClick={handleClick}
              >
                {isOpen || step === 3 ? buttonText : "Contact me"}
              </button>
            </form>
          </div>
        </MotionConfig>
      </div>
    </div>
  );
}
