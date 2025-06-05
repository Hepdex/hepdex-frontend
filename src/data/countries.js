import ct from "countries-and-timezones";
import currency from "locale-currency";

// Get country flag
export const getFlagEmoji = (code) => {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
};

// Countries
export const countries = Object.values(ct.getAllCountries()).map((country) => ({
  code: country.id,
  name: country.name,
  flag: getFlagEmoji(country.id),
}));

// Currencies
export const currencies = [
  ...new Set(
    Object.values(ct.getAllCountries()).map((country) =>
      currency.getCurrency(country.id)
    )
  ),
];
