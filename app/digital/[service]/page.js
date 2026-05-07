import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import { digitalServices, getDigitalService, getRelatedDigitalServices } from "@/lib/digital-services";

function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}

export function generateStaticParams() {
    return digitalServices.map((service) => ({
        service: service.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { service: serviceSlug } = await params;
    const service = getDigitalService(serviceSlug);

    if (!service) {
        return {
            title: "Digital Services",
        };
    }

    return {
        title: service.title,
        description: service.description,
        alternates: {
            canonical: `/digital/${service.slug}`,
        },
        openGraph: {
            title: `${service.title} | Pixel & Panel`,
            description: service.description,
            url: `/digital/${service.slug}`,
        },
    };
}

export default async function DigitalServicePage({ params }) {
    const { service: serviceSlug } = await params;
    const service = getDigitalService(serviceSlug);

    if (!service) notFound();

    const quoteHref = `/quote-request?product=${encodeURIComponent(service.name)}&category=${encodeURIComponent("Digital Services")}`;
    const related = getRelatedDigitalServices(service);
    const breadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://pixelnpanel.com" },
            { "@type": "ListItem", position: 2, name: "Digital Services", item: "https://pixelnpanel.com/digital" },
            { "@type": "ListItem", position: 3, name: service.name, item: `https://pixelnpanel.com/digital/${service.slug}` },
        ],
    };
    const faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
                "@type": "Answer",
                text: answer,
            },
        })),
    };

    return (
        <>
            <JsonLd data={breadcrumbs} />
            <JsonLd data={faq} />

            <div className="bg-[#FAF8F4] text-[#1C1917]">
                <section className="bg-[#0C1E3C] px-6 py-24 text-white">
                    <div className="mx-auto max-w-5xl">
                        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="Breadcrumb">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <span>/</span>
                            <Link href="/digital" className="hover:text-white">Digital Services</Link>
                            <span>/</span>
                            <span className="text-white">{service.name}</span>
                        </nav>
                        <p className="section-label" style={{ color: "#F59E0B" }}>Serving Beaumont, Nederland & Port Arthur, TX</p>
                        <h1 style={{ color: "white" }}>{service.h1}</h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{service.intro}</p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link href={quoteHref} className="btn-amber">
                                Get a Website Quote <ArrowRight size={16} />
                            </Link>
                            <Link href="/digital" className="btn-ghost">
                                View Digital Services
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="section-base">
                    <div className="container-px grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                        <div>
                            <h2 className="mb-4">What This Includes</h2>
                            <div className="grid gap-3">
                                {service.includes.map((item) => (
                                    <div key={item} className="white-card flex items-start gap-3 p-4">
                                        <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#0369A1]" />
                                        <span className="text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="white-card p-7">
                            <h2 className="mb-4">Built for Local Business Results</h2>
                            <p className="text-slate-600">
                                Pixel & Panel keeps digital work plain-English and action-focused.
                                The goal is better visibility, better trust, and more useful ways
                                for customers to contact your business.
                            </p>
                            <p className="mt-5 text-slate-600">
                                Serving Beaumont, Nederland & Port Arthur, TX.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white px-6 py-16">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-8 text-center">Questions About {service.name}</h2>
                        <div className="grid gap-4">
                            {service.faqs.map(([question, answer]) => (
                                <div key={question} className="rounded-2xl border border-slate-200 bg-[#FAF8F4] p-5">
                                    <h3 className="mb-2">{question}</h3>
                                    <p className="text-slate-600">{answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-base">
                    <div className="container-px">
                        <h2 className="mb-8">Related Digital Services</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            {related.map((item) => (
                                <Link key={item.slug} href={`/digital/${item.slug}`} className="white-card p-5 transition hover:-translate-y-1 hover:shadow-lg">
                                    <h3 className="mb-2">{item.name}</h3>
                                    <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-10 rounded-2xl bg-[#0C1E3C] p-8 text-center text-white">
                            <h2 style={{ color: "white" }}>Want help choosing the right next step?</h2>
                            <p className="mx-auto mt-3 max-w-2xl text-white/70">
                                Tell us what you are trying to improve and we will recommend a practical starting point.
                            </p>
                            <Link href={quoteHref} className="btn-amber mt-6">
                                Start a Project <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
