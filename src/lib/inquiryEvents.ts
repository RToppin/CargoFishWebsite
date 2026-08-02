import type { InquiryType } from "../content/siteContent";

const eventName = "cargofish:setInquiryType";

export function selectInquiryAndScroll(inquiryType: InquiryType) {
  window.dispatchEvent(new CustomEvent<InquiryType>(eventName, { detail: inquiryType }));

  const contact = document.getElementById("contact");
  contact?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function onInquirySelected(callback: (inquiryType: InquiryType) => void) {
  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<InquiryType>;
    callback(customEvent.detail);
  };

  window.addEventListener(eventName, listener);
  return () => window.removeEventListener(eventName, listener);
}
