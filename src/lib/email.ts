export interface CheckinReceiptPayload {
  to: string;
  fullName: string;
  companyName: string;
  action: "checkin" | "checkout";
  locationName: string;
  actionTime: string;
  distance: number;
  signature: string;
  chainHash: string;
}

export async function sendCheckinReceipt(
  payload: CheckinReceiptPayload,
): Promise<{ ok: boolean; error?: string }> {
  const apiKey =
    typeof process !== "undefined" ? process.env?.RESEND_API_KEY : undefined;
  const from =
    typeof process !== "undefined" && process.env?.RECEIPT_FROM_EMAIL
      ? process.env.RECEIPT_FROM_EMAIL
      : "noreply@getinwork.cl";

  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY no configurada" };
  }

  const subject = `Comprobante de marcación ${payload.action === "checkin" ? "Entrada" : "Salida"}`;
  const html = `
    <h2>Comprobante de marcación</h2>
    <p><strong>Trabajador:</strong> ${payload.fullName}</p>
    <p><strong>Empresa:</strong> ${payload.companyName}</p>
    <p><strong>Acción:</strong> ${payload.action}</p>
    <p><strong>Ubicación:</strong> ${payload.locationName}</p>
    <p><strong>Fecha/Hora:</strong> ${payload.actionTime}</p>
    <p><strong>Distancia validada:</strong> ${Math.round(payload.distance)} m</p>
    <hr />
    <p><strong>Firma electrónica:</strong> ${payload.signature}</p>
    <p><strong>Hash de cadena:</strong> ${payload.chainHash}</p>
    <p>Este comprobante valida la integridad de la marcación.</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [payload.to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const reason = await response.text();
    return { ok: false, error: `Fallo envío email: ${reason}` };
  }

  return { ok: true };
}
