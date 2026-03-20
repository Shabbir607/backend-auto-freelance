"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ssr = require("../ssr.cjs");
const textarea = require("./textarea-CHua6wZE.cjs");
const contactService = require("./contactService-aAHkcRLN.cjs");
require("stream");
require("util");
function ContactPage() {
  const [formData, setFormData] = ssr.reactExports.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = ssr.reactExports.useState(false);
  const [submitMessage, setSubmitMessage] = ssr.reactExports.useState("");
  const [newsletterEmail, setNewsletterEmail] = ssr.reactExports.useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = ssr.reactExports.useState(false);
  const [newsletterMessage, setNewsletterMessage] = ssr.reactExports.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    const result = await contactService.contactService.submitContactForm(formData);
    if (result.success) {
      setSubmitMessage(result.message || "Thank you for your message! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setSubmitMessage(result.message || "Failed to send message. Please try again.");
    }
    setIsSubmitting(false);
  };
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);
    setNewsletterMessage("");
    const result = await contactService.contactService.subscribeNewsletter({ email: newsletterEmail });
    if (result.success) {
      setNewsletterMessage(result.message || "Subscribed successfully to our newsletter.");
      setNewsletterEmail("");
    } else {
      setNewsletterMessage(result.message || "Failed to subscribe. Please try again.");
    }
    setIsNewsletterSubmitting(false);
  };
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.PublicNavbarLayout, { children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "pt-32 pb-20 px-4", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Badge, { className: "mb-6 bg-white/5 text-cyan-400 border-cyan-500/30", children: "Contact Us" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6", children: "Get in Touch" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-400 max-w-2xl mx-auto", children: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible." })
    ] }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "p-6 bg-[#12121a] border-white/5", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Mail, { className: "w-6 h-6 text-cyan-400" }) }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white mb-1", children: "Email" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("a", { href: "mailto:contact@edgelancer.com", className: "text-cyan-400 text-sm hover:underline", children: "contact@edgelancer.com" })
          ] })
        ] }) }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "p-6 bg-[#12121a] border-white/5", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.MessageSquare, { className: "w-6 h-6 text-purple-400" }) }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white mb-1", children: "Live Chat" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Available 24/7 for Pro users" })
          ] })
        ] }) }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "p-6 bg-[#12121a] border-white/5", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Clock, { className: "w-6 h-6 text-green-400" }) }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white mb-1", children: "Response Time" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Usually within 24 hours" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.Card, { className: "p-8 bg-[#12121a] border-white/5", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-white mb-6", children: "Send us a Message" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Name" }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
                  ssr.Input,
                  {
                    value: formData.name,
                    onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                    placeholder: "Your name",
                    className: "bg-[#0a0a0f] border-white/10 text-white",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Email" }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
                  ssr.Input,
                  {
                    type: "email",
                    value: formData.email,
                    onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                    placeholder: "your@email.com",
                    className: "bg-[#0a0a0f] border-white/10 text-white",
                    required: true
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Subject" }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
                ssr.Input,
                {
                  value: formData.subject,
                  onChange: (e) => setFormData({ ...formData, subject: e.target.value }),
                  placeholder: "How can we help?",
                  className: "bg-[#0a0a0f] border-white/10 text-white",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Message" }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
                textarea.Textarea,
                {
                  value: formData.message,
                  onChange: (e) => setFormData({ ...formData, message: e.target.value }),
                  placeholder: "Tell us more about your inquiry...",
                  className: "bg-[#0a0a0f] border-white/10 text-white min-h-[150px]",
                  required: true
                }
              )
            ] }),
            submitMessage && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: `p-4 rounded-lg ${submitMessage.includes("Thank you") || submitMessage.includes("success") ? "bg-green-500/10 border border-green-500/30 text-green-300" : "bg-red-500/10 border border-red-500/30 text-red-300"}`, children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-sm", children: submitMessage }) }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(
              ssr.Button,
              {
                type: "submit",
                disabled: isSubmitting,
                className: "w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 gap-2 disabled:opacity-50",
                children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Send, { className: "w-4 h-4" }),
                  isSubmitting ? "Sending..." : "Send Message"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.Card, { className: "p-8 bg-[#12121a] border-white/5", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-white mb-2", children: "Newsletter" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("form", { onSubmit: handleNewsletterSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Email" }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
                ssr.Input,
                {
                  type: "email",
                  value: newsletterEmail,
                  onChange: (e) => setNewsletterEmail(e.target.value),
                  placeholder: "your@email.com",
                  className: "bg-[#0a0a0f] border-white/10 text-white",
                  required: true
                }
              )
            ] }),
            newsletterMessage && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: `p-4 rounded-lg ${newsletterMessage.toLowerCase().includes("success") ? "bg-green-500/10 border border-green-500/30 text-green-300" : "bg-red-500/10 border border-red-500/30 text-red-300"}`, children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-sm", children: newsletterMessage }) }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
              ssr.Button,
              {
                type: "submit",
                disabled: isNewsletterSubmitting,
                className: "w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 disabled:opacity-50",
                children: isNewsletterSubmitting ? "Subscribing..." : "Subscribe"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}
exports.default = ContactPage;
