export async function postLeadRequest(endpoint, payload, attemptId) {
  const multipart = payload instanceof FormData;
  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Idempotency-Key": attemptId,
        ...(!multipart && { "Content-Type": "application/json" }),
      },
      body: multipart ? payload : JSON.stringify(payload),
      signal: AbortSignal.timeout(45000),
    });
  } catch {
    throw Object.assign(new Error("Receipt could not be confirmed."), { unconfirmed: true });
  }

  const data = await response.json().catch(() => null);
  if (!response.ok || data?.accepted !== true || !(data.ok === true || data.success === true)) {
    throw Object.assign(new Error(data?.error || data?.message || ""), {
      unconfirmed: response.status >= 500 || response.ok,
      rateLimited: response.status === 429,
    });
  }

  const reference = /^PNP-[A-F0-9]{12}$/.test(data.reference || "") ? data.reference : "";
  return { reference, message: data.message };
}

export function leadErrorMessage(error, language, fallback) {
  const spanish = language === "Spanish";
  if (error.unconfirmed) {
    return spanish
      ? "No pudimos confirmar la recepción. Tus datos siguen aquí. Intenta de nuevo o escríbenos a hello@pixelnpanel.com."
      : "We couldn’t confirm receipt. Your details are still here. Try again or email hello@pixelnpanel.com.";
  }
  if (error.rateLimited) {
    return spanish
      ? "Espera un momento antes de volver a intentar o escríbenos a hello@pixelnpanel.com."
      : "Wait a moment before trying again, or email hello@pixelnpanel.com.";
  }
  return (!spanish && error.message) || fallback;
}

export function leadReferenceLabel(reference, language) {
  return language === "Spanish" ? "Referencia de la solicitud " + reference : "Request reference " + reference;
}
