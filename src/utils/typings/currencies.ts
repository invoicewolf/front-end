export const currencies = ["€", "$", "£"] as const;

export type Currencies = typeof currencies[number];
