const dateFormat = new Intl.DateTimeFormat("en-GH", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** "27 October 2026" — Ghana English, used for article dates. */
export const formatDate = (iso: string) => dateFormat.format(new Date(iso));
