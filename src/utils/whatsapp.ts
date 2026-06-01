/**
 * Monta a URL do WhatsApp com a mensagem pronta (NÃO envia automaticamente).
 *
 * Correção de emojis: normalizamos para NFC (forma canônica) para que
 * sequências com variation selectors (❤️, 🍽️) e emojis de saúde (🩺) cheguem
 * íntegras, e deixamos o URLSearchParams cuidar da codificação — evitando
 * duplo-encoding. A mensagem NÃO deve vir pré-codificada.
 */
export function buildWhatsappUrl(message: string): string {
  const normalized = message.normalize("NFC");
  const params = new URLSearchParams({ text: normalized });
  return `https://api.whatsapp.com/send?${params.toString()}`;
}

/** Abre o WhatsApp em nova aba com a mensagem pré-preenchida. */
export function openWhatsapp(message: string): void {
  const url = buildWhatsappUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}
