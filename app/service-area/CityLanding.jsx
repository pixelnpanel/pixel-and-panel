import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function CityLanding({ city }) {
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="bg-[#0C1E3C] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="section-label" style={{ color: "#F59E0B" }}>
            Service Area
          </p>
          <h1 style={{ color: "white" }}>{city.h1}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            {city.intro}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/quote-request" className="btn-amber">
              Get a Free Quote <ArrowRight size={16} />
            </Link>
            <Link href="/signage" className="btn-ghost">
              View Signage & Print
            </Link>
          </div>
        </div>
      </section>

      <section className="section-base">
        <div className="container-px grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[#0369A1]">
              <MapPin size={22} />
              <span className="font-bold">Serving Beaumont, Nederland & Port Arthur, TX</span>
            </div>
            <h2 className="mb-4">Local Visibility for {city.name} Businesses</h2>
            <p className="text-slate-600">{city.body}</p>
            <p className="mt-5 text-slate-600">
              Pixel & Panel helps local businesses connect the pieces customers see
              in person with the places they search online. That includes signs,
              print materials, websites, local SEO, Google Business Profile work,
              and QR code campaigns.
            </p>
          </div>

          <div className="white-card p-7">
            <h2 className="mb-5">How We Can Help</h2>
            <ul className="space-y-4 text-slate-600">
              {city.services.map((service) => (
                <li key={service} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#F59E0B]" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row">
          <Link href="/digital" className="btn-outline">
            Explore Digital Services
          </Link>
          <Link href="/signage" className="btn-outline">
            Browse Signage Services
          </Link>
          <Link href="/quote-request" className="btn-amber">
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
