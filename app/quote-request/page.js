import { CheckCircle2, ArrowRight, Package } from "lucide-react";

export const metadata = {
    title: "Request a Quote | Pixel & Panel",
    description:
        "Request a free quote from Pixel & Panel for signage, print, websites, local SEO, QR campaigns, and branding services.",
};

export default async function QuoteRequestPage({ searchParams }) {
    const params = await searchParams;

    const selectedProduct = params?.product || "";
    const selectedCategory = params?.category || "";

    const hasSelectedProduct = Boolean(selectedProduct);

    const hiddenProductValue = hasSelectedProduct
        ? selectedCategory
            ? `${selectedCategory} — ${selectedProduct}`
            : selectedProduct
        : "General Quote";

    const defaultMessage = hasSelectedProduct
        ? `I would like a quote for ${selectedProduct}.`
        : "";

    return (
        <main className="min-h-screen bg-[#0369A1] bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.65),transparent_32%),linear-gradient(135deg,#06213f_0%,#0369A1_48%,#0EA5E9_100%)] text-white">
            <section className="relative overflow-hidden px-6 py-24 sm:py-28 lg:px-8">
                <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
                </div>

                <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
                    {/* LEFT CONTENT */}
                    <div>
                        <p className="mb-5 text-sm font-black uppercase tracking-[0.32em] text-[#0EA5E9]">
                            Free Quote
                        </p>

                        <h1 className="max-w-xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
                            Tell Us About{" "}
                            <span className="text-[#F59E0B]">Your Business.</span>
                        </h1>

                        <p className="mt-8 max-w-lg text-lg leading-8 text-slate-200">
                            Fill in the form and we will get back to you within 1 business
                            day with a custom quote — no pressure, no obligation.
                        </p>

                        <div className="mt-10 grid gap-4 text-sm text-slate-200">
                            {[
                                "Response within 1 business day",
                                "No contracts or commitments",
                                "Plain English — no jargon",
                                "Free consultation included",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FORM CARD */}
                    <div className="rounded-[2rem] bg-white p-8 text-[#1C1917] shadow-2xl sm:p-10">
                        <h2 className="text-3xl font-black tracking-tight">
                            Get a Free Quote
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Takes less than 2 minutes to fill out.
                        </p>

                        {/* PRODUCT SELECTED CARD */}
                        {hasSelectedProduct && (
                            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/10 p-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F59E0B] text-[#1C1917]">
                                    <Package className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#1C1917]">
                                        Product Selected
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {selectedCategory
                                            ? `${selectedCategory} — ${selectedProduct}`
                                            : selectedProduct}
                                    </p>
                                </div>
                            </div>
                        )}

                        <form className="mt-8 space-y-5">
                            {/* HIDDEN PRODUCT VALUE — customer does not see this */}
                            <input
                                type="hidden"
                                name="productService"
                                value={hiddenProductValue}
                            />

                            <div>
                                <label className="mb-2 block text-xs font-black uppercase tracking-wide">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Martinez"
                                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-black uppercase tracking-wide">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@email.com"
                                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-black uppercase tracking-wide">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="(555) 000-0000"
                                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-black uppercase tracking-wide">
                                    What Do You Need? *
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    defaultValue={defaultMessage}
                                    placeholder="Tell us size, quantity, deadline, material, location, or anything you already know."
                                    rows={5}
                                    className="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#F59E0B] px-6 py-4 text-sm font-black uppercase tracking-widest text-[#1C1917] transition hover:-translate-y-0.5 hover:bg-[#f7aa24] hover:shadow-xl"
                            >
                                Send My Request
                                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                            </button>

                            <p className="text-center text-xs text-slate-400">
                                We respond within 1 business day. No spam, ever.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}