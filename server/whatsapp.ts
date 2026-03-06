import dotenv from "dotenv";
dotenv.config({ override: true });

function normalizeToWaId(input: string, defaultCountryCode?: string): string | null {
  let digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    digits = digits.slice(1);
  } else if (defaultCountryCode && /^\d{6,12}$/.test(digits)) {
    digits = `${defaultCountryCode.replace(/^\+/, "")}${digits}`;
  }
  if (!/^\d{7,15}$/.test(digits)) {
    return null;
  }
  return digits;
}

export async function sendWhatsAppGroupInvite(rawPhone: string): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const inviteLink = process.env.WHATSAPP_GROUP_INVITE_LINK;
  const defaultCc = process.env.WHATSAPP_DEFAULT_COUNTRY_CODE;

  if (!token || !phoneNumberId || !inviteLink) {
    return;
  }

  const to = normalizeToWaId(rawPhone, defaultCc);
  if (!to) {
    return;
  }

  const body = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: {
      body: `Welcome! Tap to join our WhatsApp group:\n${inviteLink}`,
    },
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );
    if (!res.ok) {
      // swallow error silently to avoid blocking user flow
    }
  } catch {
    // network or other failure ignored by design
  }
}
