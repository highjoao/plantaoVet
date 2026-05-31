/** Monta a URL wa.me com a mensagem pronta (NÃO envia automaticamente). */
export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/** Abre o WhatsApp em nova aba com a mensagem pré-preenchida. */
export function openWhatsapp(message: string): void {
  const url = buildWhatsappUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}
