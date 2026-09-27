# Admitad affiliate bases (DesiFit)

Recorded 27 Sep 2026 — strategy/prep only, no site code yet.

## Merchant deeplink bases

| Merchant   | Admitad base |
|------------|--------------|
| Bewakoof   | `https://tjzuh.com/g/el5arbwari0be660c0628f3bde6dea/` |
| BlissClub  | `https://tjzuh.com/g/f7dkjuc7zj0be660c062519b939af8/` |
| Salty      | `https://tjzuh.com/g/9idoi1gyuy0be660c0620c509bedc5/` |

## Deep-link pattern (when we build)

```
{BASE}?ulp={URL_ENCODED_PRODUCT_PAGE}&subid={LOOK_ID}-{ROLE}
```

Example (Bewakoof):
```
https://tjzuh.com/g/el5arbwari0be660c0628f3bde6dea/?ulp=https%3A%2F%2Fwww.bewakoof.com%2Fp%2F...&subid=skd01-top
```

`ulp` = exact merchant product URL (never home/category when we have a PDP).  
`subid` = tracking per look + item role (top / bottom / acc / item1…).
