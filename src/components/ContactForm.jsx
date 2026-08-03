import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState("");   // message status
  const [loading, setLoading] = useState(false); // loading spinner

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        "service_qt25q7q", // Your Service ID
        "template_ugqjetd", // Your Template ID
        form.current,
        "EOVnL8sExFIi9D7Y9" // Your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setStatus("success");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
          setStatus("error");
        }
      );
  };

  return (
    // Note: We removed the padding and title from here as they are handled in the parent Contact.jsx
    <form
      ref={form}
      onSubmit={sendEmail}
      className="space-y-5"
    >
      <input
        type="text"
        name="user_name"
        placeholder="Your Name"
        className="w-full bg-[var(--color-surface)] text-white border border-[#3b82f6]/20 p-4 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all outline-none placeholder-gray-500 hover:border-[#3b82f6]/50 shadow-sm"
        required
      />
      <input
        type="email"
        name="user_email"
        placeholder="Your Email"
        className="w-full bg-[var(--color-surface)] text-white border border-[#3b82f6]/20 p-4 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all outline-none placeholder-gray-500 hover:border-[#3b82f6]/50 shadow-sm"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        className="w-full bg-[var(--color-surface)] text-white border border-[#3b82f6]/20 p-4 rounded-xl h-40 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all outline-none placeholder-gray-500 hover:border-[#3b82f6]/50 shadow-sm resize-none"
        required
      ></textarea>

      {/* Button with animated gradient */}
      <button
        type="submit"
        className="flex justify-center items-center gap-2 w-full text-white px-4 py-3 rounded-lg 
                   transition hover:scale-105 button-gradient-animated disabled:opacity-70"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      {/* Success / Error messages */}
      {status === "success" && (
        <p className="mt-4 text-[#3b82f6] bg-[#3b82f6]/10 border border-[#3b82f6]/20 p-4 rounded-xl text-sm text-center font-medium animate-pulse">
          ✅ Message sent successfully! I'll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-400 bg-red-400/10 border border-red-400/20 p-4 rounded-xl text-sm text-center font-medium">
          ❌ Oops! Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
};

export default ContactForm;