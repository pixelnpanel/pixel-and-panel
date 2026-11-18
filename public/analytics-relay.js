(() => {
  if (window === window.parent) return;

  const { ga, meta, gtm, parent: origin } = window.pixelPanelAnalytics;
  if (location.origin === origin) return;
  let previousPath = "";
  let referralOrigin = "";
  let initialized = false;
  const formNames = { quote: "Quote Request", contact: "Contact Form", visibility: "Free Visibility Check" };
  const contacts = { phone: ["phone_click", "Phone Call"], whatsapp: ["whatsapp_click", "WhatsApp"] };
  const events = new Set([
    "quote_start", "calculator_interaction", "quote_form_step_view",
    "quote_form_start", "quote_form_error", "extended_catalog_click",
  ]);

  window.dataLayer = [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  function load(src) {
    const tag = document.createElement("script");
    tag.src = src;
    tag.async = true;
    document.head.append(tag);
  }
  function initialize() {
    initialized = true;
    if (ga) {
      gtag("js", new Date());
      // The analytics document is cross-site. Partitioned cookies keep the
      // measurement session scoped to the public site embedding this relay.
      gtag("config", ga, {
        send_page_view: false,
        cookie_flags: "SameSite=None; Secure; Partitioned",
      });
      load("https://www.googletagmanager.com/gtag/js?id=" + ga);
    }
    if (gtm) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      load("https://www.googletagmanager.com/gtm.js?id=" + gtm);
    }
    if (meta) {
      const pixel = function () {
        if (pixel.callMethod) pixel.callMethod.apply(pixel, arguments);
        else pixel.queue.push(arguments);
      };
      pixel.push = pixel;
      pixel.loaded = true;
      pixel.version = "2.0";
      pixel.queue = [];
      window.fbq = window._fbq = pixel;
      pixel("set", "autoConfig", false, meta);
      pixel("init", meta);
      load("https://connect.facebook.net/en_US/fbevents.js");
    }
  }

  function google(name, fields, path) {
    if (!ga) return;
    gtag("event", name, {
      ...fields,
      page_location: origin + path,
      page_referrer: referralOrigin,
    });
  }

  window.addEventListener("message", ({ source, origin: sender, data }) => {
    if (source !== window.parent || sender !== origin || !data) return;
    if (data.type === "connect") {
      window.parent.postMessage("analytics-ready", origin);
      return;
    }
    if (typeof data.path !== "string") return;
    const { type, path } = data;
    if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+){0,3})?$/i.test(path) ||
        /^\/(?:admin|api|track|analytics-frame)(?:\/|$)/i.test(path)) return;
    if (!initialized) initialize();

    if (type === "page") {
      if (previousPath === path) return;
      if (previousPath) referralOrigin = origin + previousPath;
      else if (/^https?:\/\/[^/?#@]+\/$/i.test(data.referrer)) referralOrigin = data.referrer;
      previousPath = path;
      google("page_view", { page_title: path }, path);
      window.fbq?.("track", "PageView", { page_path: path });
    } else if (type === "lead" && Object.hasOwn(formNames, data.form)) {
      google("generate_lead", {
        form_id: data.form,
        language: data.language,
        ...(data.packageId ? { package_id: data.packageId } : {}),
      }, path);
      window.fbq?.("track", "Lead", { content_name: formNames[data.form], currency: "USD" });
    } else if (type === "contact" && Object.hasOwn(contacts, data.channel)) {
      const [name, label] = contacts[data.channel];
      google(name, {}, path);
      window.fbq?.("track", "Contact", { content_name: label });
    } else if (type === "product") {
      const itemId = path.split("/").at(-1);
      google("view_item", { items: [{ item_id: itemId }] }, path);
      window.fbq?.("track", "ViewContent", { content_ids: [itemId], content_type: "product" });
    } else if (type === "event" && events.has(data.name)) {
      google(data.name, data.params, path);
    }
  });
})();
