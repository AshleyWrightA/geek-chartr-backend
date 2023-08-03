import { Temporal } from "@js-temporal/polyfill";

export function getDatesISOFormat() {
  const dateArray = [];
  for (let i = 1; i <= 14; i++) {
    try {
      let date = Temporal.Now.plainDateISO();
      dateArray.push(date.subtract({ days: i }).toString());
    } catch (err) {
      console.error(err);
    }
  }
  return dateArray.reverse();
}
