CREATE TABLE IF NOT EXISTS parents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  district TEXT NOT NULL,
  email TEXT NOT NULL,
  child_age TEXT,
  topics TEXT NOT NULL,
  intro_card TEXT NOT NULL,
  event_title TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
