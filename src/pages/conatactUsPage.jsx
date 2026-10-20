
import { useState } from "react";
import {
  IoArrowForwardOutline,
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoChevronDownOutline,
  IoLocationOutline,
  IoMailOutline,
  IoSendOutline,
  IoTimeOutline,
  IoChatbubbleEllipsesOutline,
  IoHeadsetOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

const contactDetails = {
  email: "sachithrehan578@gmail.com",
  phone: "+94 776346955",
  address: "Your store address, Sri Lanka",
  hours: "Monday – Saturday, 9 AM – 6 PM",
};

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Contact our support team with your order number, and we'll help you check the latest status of your purchase.",
  },
  {
    question: "Can I get help choosing a computer?",
    answer:
      "Absolutely. Tell us your budget, preferred specifications, and how you plan to use your computer. Our team can help you explore suitable options.",
  },
  {
    question: "Do you offer warranty support?",
    answer:
      "You can contact us about warranty-related questions. Please include your product details and purchase information so our team can assist you.",
  },
  {
    question: "Can I ask about product availability?",
    answer:
      "Yes! Send us the name or model of the product you're interested in, and our team can help you check its availability.",
  },
];

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactInfoCard({ icon: Icon, title, value, description, href }) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <Icon />
      </div>

      <div className="min-w-0">
        <h3 className="mb-1 text-sm font-semibold text-slate-900">
          {title}
        </h3>

        {href ? (
          <a
            href={href}
            className="break-words text-sm font-medium text-slate-700 transition hover:text-blue-600 sm:text-base"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-slate-700 sm:text-base">
            {value}
          </p>
        )}

        <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormField({ label, required = true, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-blue-600">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactUsPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const inputStyle =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status) setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = form;

    if (
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      setStatus("Please complete all required fields.");
      return;
    }

    const emailSubject = encodeURIComponent(
      `[iComputers Contact] ${subject}`
    );

    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${contactDetails.email}?subject=${emailSubject}&body=${emailBody}`;

    setStatus(
      "Your email application should open with your message ready to send."
    );
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#080d1b]">
        <div className="pointer-events-none absolute -right-32 -top-48 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-52 left-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-24 lg:px-12 lg:pb-36 lg:pt-28">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              iCOMPUTERS SUPPORT CENTER
            </div>

            <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[76px]">
              Let's start a
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                conversation.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Have a question about a product, need technical
              guidance, or simply want to say hello? We're here
              to help you make the right choice.
            </p>

            <a
              href="#contact-form"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
            >
              Get in touch
              <IoArrowForwardOutline className="text-lg" />
            </a>
          </div>

          <div className="pointer-events-none absolute bottom-12 right-12 hidden h-52 w-52 items-center justify-center rounded-full border border-white/10 lg:flex">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <IoHeadsetOutline className="text-6xl text-blue-400/70" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="relative bg-[#f8fafc] px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">

          {/* INTRO */}
          <div className="py-14 sm:py-20">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Connect with us
              </span>
            </div>

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                We're always happy
                <br />
                to hear from you.
              </h2>

              <p className="max-w-sm text-sm leading-7 text-slate-500">
                Choose the way that works best for you. Our team
                is ready to assist with your questions.
              </p>
            </div>
          </div>

          {/* CONTACT DETAILS */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ContactInfoCard
              icon={IoMailOutline}
              title="Email us"
              value={contactDetails.email}
              description="Send us your questions anytime."
              href={`mailto:${contactDetails.email}`}
            />

            <ContactInfoCard
              icon={IoCallOutline}
              title="Call us"
              value={contactDetails.phone}
              description="Speak directly with our team."
            />

            <ContactInfoCard
              icon={IoLocationOutline}
              title="Visit our store"
              value={contactDetails.address}
              description="Find us at our physical location."
            />

            <ContactInfoCard
              icon={IoTimeOutline}
              title="Working hours"
              value={contactDetails.hours}
              description="Our regular support hours."
            />
          </div>

          {/* FORM + SIDE PANEL */}
          <div
            id="contact-form"
            className="mt-16 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/5 lg:grid-cols-[1.25fr_0.75fr]"
          >

            {/* FORM */}
            <div className="p-6 sm:p-10 lg:p-14">
              <div className="mb-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
                  <IoChatbubbleEllipsesOutline className="text-base" />
                  SEND US A MESSAGE
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  How can we help?
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Fill out the form below and tell us what you need.
                  We'll be happy to assist you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField label="Full name">
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputStyle}
                    />
                  </FormField>

                  <FormField label="Email address">
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputStyle}
                    />
                  </FormField>
                </div>

                <FormField label="Subject">
                  <div className="relative">
                    <select
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className={`${inputStyle} appearance-none pr-12 ${
                        !form.subject ? "text-slate-400" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="Product Inquiry">
                        Product inquiry
                      </option>
                      <option value="Order Support">
                        Order support
                      </option>
                      <option value="Technical Support">
                        Technical support
                      </option>
                      <option value="Warranty Inquiry">
                        Warranty inquiry
                      </option>
                      <option value="Business Inquiry">
                        Business inquiry
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>

                    <IoChevronDownOutline className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </FormField>

                <FormField label="Your message">
                  <textarea
                    name="message"
                    required
                    maxLength={3000}
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us a little about how we can help you..."
                    className={`${inputStyle} resize-y`}
                  />
                  <div className="mt-2 text-right text-xs text-slate-400">
                    {form.message.length} / 3000
                  </div>
                </FormField>

                {status && (
                  <div
                    role="status"
                    className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700"
                  >
                    {status}
                  </div>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.99] sm:w-auto"
                >
                  <IoSendOutline className="text-lg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  Prepare Email
                  <IoArrowForwardOutline className="text-lg" />
                </button>

                <p className="text-xs leading-6 text-slate-400">
                  This form opens your email application with
                  the message prepared for sending.
                </p>
              </form>
            </div>

            {/* SIDE PANEL */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-[#0b1223] p-8 text-white sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full bg-blue-600/20 blur-[80px]" />

              <div className="relative">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-3xl text-blue-300">
                  <IoHeadsetOutline />
                </div>

                <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-tight">
                  Good technology.
                  <br />
                  Great support.
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                  At iComputers, we believe a great experience
                  goes beyond finding the right product. We're
                  here to guide you whenever you need assistance.
                </p>

                <div className="my-10 h-px bg-white/10" />

                <div className="space-y-7">
                  <div className="flex items-start gap-4">
                    <IoCheckmarkCircleOutline className="mt-0.5 shrink-0 text-2xl text-blue-400" />
                    <div>
                      <h4 className="text-sm font-semibold">
                        Product guidance
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Get help choosing the right tech for
                        your needs and budget.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <IoShieldCheckmarkOutline className="mt-0.5 shrink-0 text-2xl text-blue-400" />
                    <div>
                      <h4 className="text-sm font-semibold">
                        Purchase assistance
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Ask about orders, product details,
                        and warranty-related questions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <IoChatbubbleEllipsesOutline className="mt-0.5 shrink-0 text-2xl text-blue-400" />
                    <div>
                      <h4 className="text-sm font-semibold">
                        Friendly communication
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Clear answers and helpful guidance
                        from our team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-16 border-t border-white/10 pt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  iCOMPUTERS
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Your technology journey starts here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-blue-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  FAQ
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Frequently asked
                <br />
                questions.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
                Find quick answers to some common questions
                about shopping with iComputers.
              </p>

              <a
                href="#contact-form"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:gap-3 hover:text-blue-700"
              >
                Still have questions?
                <IoArrowForwardOutline />
              </a>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => (
                <div key={faq.question}>
                  <button
                    type="button"
                    aria-expanded={openFaq === index}
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  >
                    <span className="text-sm font-semibold text-slate-900 sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                        openFaq === index
                          ? "rotate-180 bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <IoChevronDownOutline />
                    </span>
                  </button>

                  {openFaq === index && (
                    <p className="max-w-xl pb-6 pr-8 text-sm leading-7 text-slate-500">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#f8fafc] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-[#0b1223] p-8 sm:p-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Ready to find your next upgrade?
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Discover technology that matches your needs.
            </p>
          </div>

          <a
            href="/products"
            className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-blue-50"
          >
            Explore Products
            <IoArrowForwardOutline className="text-lg" />
          </a>
        </div>
      </section>
    </main>
  );
}
