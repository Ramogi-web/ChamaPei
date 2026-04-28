// below is the sms parser function

const parseSMS = (sms) => {
  const amountMatch = sms.match(/KSh([\d,]+)/i);
  const senderMatch = sms.match(/from (.+?) on/i);
  const paidToMatch = sms.match(/to (.+?) on/i);

  const amount = amountMatch
    ? parseInt(amountMatch[1].replace(/,/g, ""))
    : 0;

  let name = "Unknown";
  let type = "expense";

  if (sms.toLowerCase().includes("received")) {
    name = senderMatch ? senderMatch[1] : "Unknown";
    type = "income";
  } else if (sms.toLowerCase().includes("sent")) {
    name = paidToMatch ? paidToMatch[1] : "Unknown";
    type = "expense";
  }

 return {
  amount,
  sender: name,
  type,
  category: detectCategory(sms)
};
};

// added category detection
const detectCategory = (sms) => {
  sms = sms.toLowerCase();

  if (sms.includes("paybill")) return "bills";
  if (sms.includes("till")) return "shopping";
  if (sms.includes("airtime")) return "airtime";
  if (sms.includes("received")) return "income";

  return "general";
};



module.exports = parseSMS;