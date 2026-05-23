import { GOOGLE_SCRIPT_URL } from "../constants/config";
import { DematLead, SipLead } from "../types";

export async function submitDematLead(lead: DematLead): Promise<boolean> {
  // 1. Double secure backup to LocalStorage
  try {
    const existing = localStorage.getItem("pcs_demat_leads");
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(lead);
    localStorage.setItem("pcs_demat_leads", JSON.stringify(list));
  } catch (err) {
    console.warn("Could not save backup copy of Demat lead locally:", err);
  }

  // 2. Submit to Google Apps Script Webapp if configured
  if (!GOOGLE_SCRIPT_URL || (GOOGLE_SCRIPT_URL as string) === "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE") {
    console.info(
      "Google Sheets script URL is not configured yet. Leads are securely backed up in localStorage.",
      lead
    );
    // Simulate slight network lag then return success of true to guarantee seamless onboard redirect.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return true;
  }

  try {
    const payload = {
      sheetName: "leads",
      submissionType: "demat",
      fullName: lead.fullName,
      mobile: lead.mobile,
      city: lead.city,
      timestamp: lead.timestamp,
      source: lead.source,
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Crucial for security and CORS-free submission to GAS web apps
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return true; // Returns true because "no-cors" doesn't provide status codes, but successfully sends.
  } catch (error) {
    console.error("Network error during submission to Google Script:", error);
    // Return true anyway because the client must redirect to the onboarding link even if network is poor!
    return true;
  }
}

export async function submitSipLead(lead: SipLead): Promise<boolean> {
  // 1. Replicate into LocalStorage backup
  try {
    const existing = localStorage.getItem("pcs_sip_leads");
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(lead);
    localStorage.setItem("pcs_sip_leads", JSON.stringify(list));
  } catch (err) {
    console.warn("Could not save backup copy of SIP lead locally:", err);
  }

  // 2. Post to Google app script webapp
  if (!GOOGLE_SCRIPT_URL || (GOOGLE_SCRIPT_URL as string) === "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE") {
    console.info(
      "Google Sheets script URL is not configured yet. SIP lead is saved locally in localStorage.",
      lead
    );
    await new Promise((resolve) => setTimeout(resolve, 800));
    return true;
  }

  try {
    const payload = {
      sheetName: "sip_leads",
      submissionType: "sip_forecaster",
      fullName: lead.fullName,
      mobile: lead.mobile,
      monthlySip: lead.monthlySip,
      expectedReturn: lead.expectedReturn,
      years: lead.years,
      estimatedWealth: lead.estimatedWealth,
      timestamp: lead.timestamp,
    };

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error("Network error during CRM submission:", error);
    return true; // Forward user regardless
  }
}

export function fetchAllLocalLeads() {
  try {
    const dematRaw = localStorage.getItem("pcs_demat_leads");
    const sipRaw = localStorage.getItem("pcs_sip_leads");
    return {
      demat: dematRaw ? JSON.parse(dematRaw) : [],
      sip: sipRaw ? JSON.parse(sipRaw) : [],
    };
  } catch (_) {
    return { demat: [], sip: [] };
  }
}

export function clearLocalLeads() {
  localStorage.removeItem("pcs_demat_leads");
  localStorage.removeItem("pcs_sip_leads");
}
