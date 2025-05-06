export const categoryGroups = {
  loginCredentials: {
    displayName: "Login Credentials",
    includes: ["userId-password"],
  },
  apiKeys: {
    displayName: "API Keys",
    includes: ["apiKey"],
  },
  banking: {
    displayName: "Banking Info",
    includes: ["creditCard", "debitCard", "bankLockerKey"],
  },
  idCards: {
    displayName: "Identification Cards",
    includes: ["aadharCard", "panCard"],
  },
  secureNotes: {
    displayName: "Secure Notes",
    includes: ["note"],
  },
  others: {
    displayName: "Other Items",
    includes: ["others"],
  },
};

export const categoryFields = {
  "userId-password": ["username", "password"],
  apiKey: ["apiKey"],
  creditCard: ["cardNumber", "expiry", "cvv"],
  debitCard: ["cardNumber", "expiry", "cvv", "pin"],
  bankLockerKey: ["lockerId", "location"],
  aadharCard: ["aadharNumber", "name"],
  panCard: ["panNumber", "name"],
  note: ["title", "content"],
  others: ["key", "value"],
};