export function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00+08:00`);
  return new Intl.DateTimeFormat("zh-HK", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const weekdays = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

export function eventDateParts(iso: string) {
  const date = new Date(`${iso}T00:00:00+08:00`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Hong_Kong",
    day: "numeric",
    month: "numeric",
    weekday: "short",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(value("weekday"));
  return {
    day: value("day"),
    month: value("month"),
    weekday: weekdays[weekdayIndex] ?? value("weekday"),
  };
}

export function hongKongTodayISO() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
