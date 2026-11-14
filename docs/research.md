# Research notes — English service page

Short notes from the references used to build `/en/`. Nothing here is a client claim.

## Scroll-driven product scenes

1. **Apple product pages** (iPhone 17 Pro, a 2026 Webby winner for moving image; AirPods Pro 3 and Vision Pro as measured in late 2026). The product sits in a sticky stage while scroll drives one timeline. Type stays huge and still. Heavy media loads after the first screen. Mobile gets a shorter cut. Pages measured in 2026 use video and sticky sections, not a Three.js scene — the lesson is the staging, not the file format.
2. **Chronos** (Three.js, GSAP ScrollTrigger, a generated PMREM room). Scroll is a shot list: approach, orbit, explode, detail, reassemble. GSAP tweens a plain state object. The renderer reads it. Reflections come from a computed environment, not a photographed HDR.
3. **GSAP Vault — exploded view.** A pinned stack tilts into a three-quarter view, layers lift along their normal, and labels stay stuck to the parts. A little overshoot on the way out sells the mechanism.
4. **Code-built product teardowns** (the usual Three.js + ScrollTrigger headphone / object tutorials). Same pattern: one paused timeline, `scrub` around 0.6–0.8, primitives instead of a model download, and reduced motion shows a single still of the exploded, labelled object.
5. **What that means here.** The words stay in HTML, outside the canvas, at full contrast. The stack is the only thing that moves. Four beats, then stop: Broken, Scan, Fix, Launch. The Three.js chunk loads after first paint, pauses off screen, and never runs when motion is reduced or WebGL is missing.

## People who already sell this fix

1. **Rebar** ([getrebar.us](https://getrebar.us/)). “Your AI built the app. I fix what it can’t.” One problem is $390, a pre-launch review is $490, a launch sprint starts at $1,900. Pay when it works, 48-hour target, no call. The copy names the actual failures: Stripe not unlocking access, login, users seeing each other’s data.
2. **Friendly Experts** ([friendlyexperts.ai/prices](https://friendlyexperts.ai/prices/)). Free health check, then menu fixes from about $199 to $449, a full audit at $249, a launch pack at $999, a full rescue at $2,999. “Fixed or it’s free.” One price means one root cause.
3. **NoCode Finishers** ([nocodefinishers.com/rescue](https://www.nocodefinishers.com/rescue)). Rescue and repair from $399, security audit included, fixed quote after they look, ongoing care from $99 a month. They use a call to confirm scope.

## What the page takes from that

Inqreon’s offer stays the one in the brief (`src/data/prices.ts`): one Scan price, three Fix tiers, and monthly support, written messages only. Those prices are lower than the three shops above, and the page does not borrow their guarantees (pay when it works, refunds, hour SLAs, review scores). The proof on the page is the teardown itself and one real case: this site, built and shipped by the owner. No testimonials, logos, or counts.

The failure list (login, open data, payments, deploy) matches how those shops describe the work, and it was already the concept’s list.

Fix tier sentences are still a draft. See the note in `src/data/offer.ts` and the pull request. The concept names the monthly support plan “Vault”; the brief says “support.” The page uses Vault until the owner picks the name.

## Approved renders

The owner supplied WebP and AVIF frames (glass device, four layer states, three agent portraits, grid, grain, glow, and a 1200×630 share image). They are supporting art. The scroll scene is still drawn in Three.js so the labels stay sharp and the explode can be scrubbed. The photos sit on planes behind the cards, the mascot replaces the placeholder robot, reduced motion and no-WebGL show the four stills, and the process steps use the three portraits. `og:image` is `og-share-1200x630.webp`. The procedural grid and the 512px grain tile are the ones used for repeating backgrounds. The generated grid and grain variants are not, because their seams are weaker.
