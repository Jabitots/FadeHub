# Fade Hub

**Student Name:** John Benedict M. Hipolito
**Website Category:** Service Booking Website (Barbershop)

## Project Description

Fade Hub is a premium barbershop website that lets customers browse services
and barbers, get a hairstyle match through an AI-style recommendation quiz,
spin an interactive style roulette when undecided, book appointments online,
and track their haircut history and favorites through a personal dashboard.

The project was built as an individual final project using plain HTML, CSS,
and JavaScript, with a focus on interactive, event-driven UI rather than a
single static page.

## Main Features

- **Home page** — hero section, featured services, featured barbers, hairstyle
  gallery, customer reviews, and location/contact info
- **AI Style Finder** — a 5-question quiz (face shape, hair type, length,
  preferred style, maintenance level) that scores a style library and returns
  the top 3 matching hairstyles with reasoning
- **Style Roulette** — an animated spinning wheel of 10 signature styles that
  lands on a random pick, with a "Try Another Style" option
- **Appointment Booking** — a form to choose a service, barber, date, time,
  and notes, with a confirmation state
- **Customer Dashboard** — shows the upcoming appointment (persisted via
  `localStorage` from the booking form), recent haircut history with a
  "Book Again" action that pre-fills the booking form, favorite styles with
  photos (Blow Out Low Taper, Warrior Cut, Crew Cut, French Crop) and a
  "Book This" action, and profile info
- **Responsive design** — adapts across desktop, tablet, and mobile, including
  a mobile hamburger menu
- **Event handling showcase** — uses event delegation (bubbling) for all
  card/button interactions instead of one listener per element, and a
  capturing-phase listeners for the "click outside to close menu" behavior
  and for the dashboard image fallback (image `error` events do not bubble, so
  they are caught during the capture phase)

## Technologies Used

- HTML5
- CSS3 (custom properties, Grid, Flexbox, media queries)
- Vanilla JavaScript (DOM rendering, event delegation, event capturing,
  `localStorage`, `IntersectionObserver`)
- Google Fonts (Barlow Condensed, Inter)

## Pages

| File | Description |
|---|---|
| `index.html` | Home page |
| `ai-style-finder.html` | AI hairstyle recommendation quiz |
| `roulette.html` | Style roulette wheel |
| `booking.html` | Appointment booking form |
| `dashboard.html` | Customer dashboard |

## Project Structure

```
index.html
ai-style-finder.html
roulette.html
booking.html
dashboard.html
style.css
script.js
images/
  blowout-low-taper.jpg
  warrior-cut.jpg
  crew-cut.jpg
  french-crop.jpg
```

## Photo Credits

- [Add the source/photographer for each photo in `images/`, e.g. "Photo by
  Name on Unsplash"]

## Notes

- No backend/database is used — sample data is defined directly in
  `script.js`, and the "Upcoming Appointment" on the dashboard is persisted
  locally via `localStorage` so it survives navigation between pages.
- All styling lives in a single `style.css`; all interactivity lives in a
  single `script.js` shared across every page.
