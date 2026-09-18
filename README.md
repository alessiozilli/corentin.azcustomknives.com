# Le fil

Corentin's own seat. He finished his co-op at AZ Custom Knives on 2026-09-19 and flew
home to France. This is how he keeps talking to the shop: he writes, the shop answers,
and the whole thing reads as correspondence rather than chat. Installed on his phone as
an icon from https://corentin.azcustomknives.com.

CORRESPONDENCE, NOT CHAT. He is nine time zones away and the mind that answers is
shared. So nothing on this page ever pretends. He presses Envoyer, his letter is stored
at once and he is told so, and the answer is there when he next opens the page. If the
mind is asleep the page says so in French and tells him the reply will be waiting. The
page polls the thread while it is in front of him, so an answer that lands while he is
reading simply appears.

Who he is: the key this browser mints on first open, kept in the browser's own storage.
No account, no login, no password, no settings, no tabs. If the seat is already paired
to other devices the database answers with the code `full`, and the page says that
plainly and tells him to ask Alessio.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole page. French, phone first, one letter box and two buttons. |
| `manifest.webmanifest`, `sw.js`, `icons/` | Makes it installable on his phone. Nothing from Supabase is ever cached. |
| `.github/workflows/pages-deploy.yml` | The self healing Pages deploy, same as the other faces. |
| `CNAME` | corentin.azcustomknives.com |

## The database

Five functions on the AZCK Supabase, reached with the publishable key and this browser's
device key. Nothing else. No other host is contacted from this page at all.

- `corentin_open(p_device)` gives his name, whether the mind is awake, and the thread
- `corentin_write(p_device, p_body)` stores a letter, status waiting
- `corentin_thread(p_device, p_limit)` rereads the thread and the awake flag
- `corentin_tell_alessio(p_device, p_body)` puts his words on the shop bus and buzzes
  Alessio's phone. Only the button calls it. The mind never does.
- `corentin_brain_awake()` the lamp

Every one of them answers `ok:false` with a plain human reason and a short code, and the
page prefers the reason the database gives over anything written into the page.

Born 2026-09-18.
