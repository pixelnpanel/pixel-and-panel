import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, MapPin, Star } from "lucide-react";
import { portfolioProjects } from "@/lib/portfolio-projects";
import { portfolioProjectsEs } from "@/lib/portfolio-projects-es";
import { GOOGLE_REVIEWS } from "@/lib/reviews";

const COPY = {
  en: {
    heading: "Custom signs & print that get your business noticed.",
    intro: "From banners and yard signs to business printing and displays, Pixel & Panel helps businesses stand out. Serving Houston and Southeast Texas, with nationwide shipping on eligible products.",
    shop: "Shop Signs & Print", quote: "Get a Quote", digital: "Websites & Google",
    paths: { shop: "/signage", quote: "/quote-request", digital: "/digital", portfolio: "/portfolio", pricing: "/pricing", check: "/free-visibility-check", shipping: "/shipping-policy" },
    reviews: "Read customer reviews on Google",
    featured: "Explore signs, print & displays", all: "Browse the full catalog",
    work: "Work for real businesses", workLink: "See the portfolio",
    online: "Help customers find you online", onlineText: "Get a website that makes it easy to call or request a quote, and help nearby customers find your business on Google.",
    pricing: "Compare website packages", check: "Get a free visibility check",
    order: "From first idea to finished order",
    steps: [
      ["Tell us what you need", "Choose a product or share your project, quantity, and deadline."],
      ["Review your quote", "We confirm your options, artwork needs, price, and delivery details."],
      ["Approve your proof", "Review the design before we move your order into production."],
    ],
    area: "Houston & Southeast Texas", areaText: "Serving Houston, Beaumont, Port Arthur, and Nederland. Eligible signs and print can ship nationwide.",
    shipping: "See shipping and delivery options", faq: "Questions before you order",
    final: "What are you working on?", finalText: "Tell us what you need and when you need it. We’ll help you choose the right product and confirm your quote.",
  },
  es: {
    heading: "Letreros e impresos personalizados para destacar tu negocio.",
    intro: "Desde banners y letreros para jardín hasta impresos y exhibidores, Pixel & Panel ayuda a tu negocio a destacar. Atendemos Houston y el sureste de Texas, con envío nacional en productos elegibles.",
    shop: "Ver letreros e impresos", quote: "Pedir cotización", digital: "Sitios web y Google",
    paths: { shop: "/es/letreros", quote: "/es/solicitar-cotizacion", digital: "/es/servicios-digitales", portfolio: "/es/portafolio", pricing: "/es/precios", check: "/es/chequeo-gratis-de-visibilidad", shipping: "/es/politica-de-envio" },
    reviews: "Lee las reseñas de clientes en Google",
    featured: "Explora letreros, impresos y exhibidores", all: "Ver el catálogo completo",
    work: "Proyectos para negocios reales", workLink: "Ver el portafolio",
    online: "Ayuda a tus clientes a encontrarte en internet", onlineText: "Crea un sitio web donde tus clientes puedan llamar o pedir una cotización, y facilita que te encuentren en Google.",
    pricing: "Comparar paquetes web", check: "Pedir un chequeo gratis",
    order: "De la idea al pedido terminado",
    steps: [
      ["Cuéntanos qué necesitas", "Elige un producto o comparte tu proyecto, la cantidad y la fecha en que lo necesitas."],
      ["Revisa tu cotización", "Confirmamos las opciones, el arte, el precio y los detalles de entrega."],
      ["Aprueba tu diseño", "Revisa la prueba de diseño antes de que iniciemos la producción."],
    ],
    area: "Houston y el sureste de Texas", areaText: "Atendemos Houston, Beaumont, Port Arthur y Nederland. Los letreros e impresos elegibles se envían a todo el país.",
    shipping: "Ver opciones de envío y entrega", faq: "Preguntas antes de hacer un pedido",
    final: "¿Qué proyecto tienes en mente?", finalText: "Cuéntanos qué necesitas y para cuándo. Te ayudaremos a elegir y confirmaremos tu cotización.",
  },
};

const PRODUCTS = [
  ["rigid-and-metal-signs", "coroplast-yard-signs", "Yard Signs", "Letreros para jardín", "letreros-para-jardin"],
  ["banners", "13oz-vinyl-banner", "Vinyl Banners", "Banners de vinilo", "banners-de-vinilo"],
  ["banner-stands", "standard-retractable", "Retractable Banners", "Banners retráctiles", "banners-retractiles"],
  ["flags", "econo-feather-flag", "Feather Flags & Kits", "Banderas y kits", "bandera-pluma-econo"],
  ["business-cards", null, "Business Cards", "Tarjetas de presentación", "tarjetas-de-presentacion"],
  ["seg-displays", null, "SEG Fabric Displays", "Exhibidores de tela SEG", null],
];

const action = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-center text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0369A1]";
const primary = action + " bg-[#0369A1] text-white hover:bg-sky-900";
const secondary = action + " border border-stone-400 bg-white text-[#1C1917] hover:border-[#0369A1] hover:text-[#0369A1]";
const textLink = "inline-flex min-h-11 items-center gap-2 font-bold text-[#0369A1] hover:underline";
const shell = "mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12";

export default function HomeSections({ faqs, categories, locale = "en" }) {
  const copy = COPY[locale];
  const spanish = locale === "es";
  const projects = (spanish ? portfolioProjectsEs : portfolioProjects).filter((project) => !project.isSample);
  const hero = projects.find((project) => project.slug === "house-of-rogo-storefront-sign");
  const featured = PRODUCTS.map(([categoryId, productId, en, es, esSlug]) => {
    const category = categories.find((entry) => entry.slug === categoryId);
    if (!category) return null;
    const product = category.products.find((entry) => entry.slug === productId);
    return {
      id: categoryId,
      title: spanish ? es : en,
      image: product?.image || category.image || category.products.find((entry) => entry.image)?.image,
      href: spanish ? (esSlug ? copy.paths.shop + "/" + esSlug : copy.paths.shop)
        : copy.paths.shop + "/" + categoryId + (product ? "/" + product.slug : ""),
    };
  }).filter(Boolean);

  return (
    <>
      <section className="bg-[#FAF8F4] pb-9 pt-30 text-[#1C1917] lg:pb-12 lg:pt-28">
        <div className={shell + " grid items-center gap-7 md:grid-cols-[1fr_0.94fr] lg:gap-14"}>
          <div className="min-w-0 md:py-6">
            <h1 className="pnp-home-hero-title font-extrabold tracking-[-0.055em]">{copy.heading}</h1>
            <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-stone-700 lg:mt-6 lg:text-lg">{copy.intro}</p>
            <div className="mt-5 flex flex-wrap gap-2.5 lg:mt-7">
              <Link className={primary} href={copy.paths.shop}>{copy.shop} <ArrowRight size={17} aria-hidden="true" /></Link>
              <Link className={secondary} href={copy.paths.quote}>{copy.quote}</Link>
            </div>
            <Link className={textLink + " mt-1 text-sm"} href={copy.paths.digital}>{copy.digital} <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <figure className="min-w-0 overflow-hidden rounded-2xl bg-[#1C1917] shadow-lg">
            <div className="relative aspect-[4/3]">
              <Image src={hero.image} alt={hero.imageAlt} fill preload sizes="(max-width: 767px) 94vw, (max-width: 1440px) 48vw, 628px" className="object-cover" />
            </div>
            <figcaption className="px-4 py-3 text-sm font-semibold text-white">{hero.title}</figcaption>
          </figure>
        </div>
      </section>

      <div className="border-y border-stone-200 bg-white">
        <div className={shell}>
          <a className={textLink + " py-3 text-sm"} href={GOOGLE_REVIEWS.profileUrl}>
            <Star size={17} fill="#F59E0B" stroke="#8A4B07" aria-hidden="true" /> {copy.reviews} <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      {featured.length > 0 && <section className={shell + " py-13 lg:py-20"} aria-labelledby="home-featured">
        <div className="flex flex-wrap items-end justify-between gap-x-5">
          <h2 id="home-featured">{copy.featured}</h2>
          <Link className={textLink + " text-sm"} href={copy.paths.shop}>{copy.all} <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5">
          {featured.map((item) => (
            <Link key={item.id} href={item.href} className="group overflow-hidden rounded-xl border border-stone-200 bg-white hover:border-[#0369A1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]">
              {item.image && <div className="relative aspect-[4/3] bg-[#FAF8F4]"><Image src={item.image} alt="" fill sizes="(max-width: 639px) 48vw, (max-width: 1360px) 32vw, 390px" className="object-contain" /></div>}
              <span className="flex min-h-12 items-center justify-between gap-1 px-3 py-2 text-sm font-bold text-[#1C1917] group-hover:text-[#0369A1] sm:px-5 sm:text-base">
                {item.title} <ArrowRight size={15} className="shrink-0" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>}

      <section className="bg-[#FAF8F4]" aria-labelledby="home-work">
        <div className={shell + " py-13 lg:py-20"}>
          <div className="flex flex-wrap items-end justify-between gap-x-5">
            <h2 id="home-work">{copy.work}</h2>
            <Link className={textLink + " text-sm"} href={copy.paths.portfolio}>{copy.workLink} <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                <div className="relative aspect-[4/3] bg-[#1C1917]">
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 639px) 95vw, 48vw" className="object-contain" />
                </div>
                <div className="p-4 sm:p-5"><h3 className="text-lg">{project.title}</h3><p className="mt-1 text-sm text-stone-600">{project.category}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-50" aria-labelledby="home-digital">
        <div className={shell + " grid gap-5 py-12 md:grid-cols-2 md:items-center lg:gap-10"}>
          <div>
            <p className="mb-2 text-sm font-bold text-[#0369A1]">{copy.digital}</p>
            <h2 id="home-digital">{copy.online}</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-stone-700">{copy.onlineText}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Link className={primary} href={copy.paths.pricing + "#website-pricing"}>{copy.pricing}</Link>
            <Link className={textLink + " text-sm"} href={copy.paths.check}>{copy.check} <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className={shell + " py-13 lg:py-20"} aria-labelledby="home-order">
        <h2 id="home-order">{copy.order}</h2>
        <ol className="mt-6 grid list-decimal gap-6 pl-6 marker:font-bold marker:text-[#0369A1] md:grid-cols-3 md:gap-10">
          {copy.steps.map(([title, text]) => <li key={title} className="pl-1"><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-700">{text}</p></li>)}
        </ol>
      </section>

      <section className="border-y border-stone-200 bg-[#FAF8F4]" aria-labelledby="home-area">
        <div className={shell + " py-9 md:flex md:items-center md:justify-between md:gap-5"}>
          <div>
            <h2 id="home-area" className="flex items-center gap-2 text-2xl"><MapPin className="shrink-0 text-[#0369A1]" aria-hidden="true" />{copy.area}</h2>
            <p className="mt-2 text-stone-700">{copy.areaText}</p>
            <div className="mt-1 flex flex-wrap gap-x-4">
              {[["Houston", spanish ? "/es/houston" : "/houston"], ...["Beaumont", "Port Arthur", "Nederland"].map((city) => [city, (spanish ? "/es/area-de-servicio/" : "/service-area/") + city.toLowerCase().replace(" ", "-") + "-tx"])].map(([name, href]) => <Link className={textLink + " text-sm"} key={href} href={href}>{name}</Link>)}
            </div>
          </div>
          <Link className={textLink + " shrink-0 text-sm"} href={copy.paths.shipping}>{copy.shipping} <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className={shell + " py-13 lg:py-18"} aria-labelledby="home-faq">
        <h2 id="home-faq">{copy.faq}</h2>
        <div className="mt-5 max-w-4xl divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map(({ question, answer }) => <details key={question} className="group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 font-bold text-[#1C1917]">{question}<ChevronDown className="shrink-0 text-[#0369A1] group-open:rotate-180" size={19} aria-hidden="true" /></summary>
            <p className="pb-4 leading-relaxed text-stone-700">{answer}</p>
          </details>)}
        </div>
      </section>

      <section className="bg-[#1C1917] py-12 text-white lg:py-16" aria-labelledby="home-quote">
        <div className={shell + " sm:flex sm:items-center sm:justify-between sm:gap-6"}>
          <div><h2 id="home-quote" className="text-white">{copy.final}</h2><p className="mt-3 max-w-2xl leading-relaxed text-stone-200">{copy.finalText}</p></div>
          <Link className={action + " mt-5 shrink-0 bg-[#F59E0B] text-[#1C1917] hover:bg-amber-300 sm:mt-0"} href={copy.paths.quote}>{copy.quote} <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
