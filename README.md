# CeraMal

Kerámia webshop Next.js-sel. A termékek PostgreSQL adatbázisból jönnek, a kosár a böngésző memóriájában tárolódik (React Context).

## Technológiák

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **PostgreSQL** + **pg** npm csomag

## Funkciók

- Főoldal hero képpel, legújabb termékek, rövid értékajánlók
- Terméklista (`/products`)
- Termék részletek (`/products/[id]`)
- Kosár: termék hozzáadása, mennyiség, eltávolítás
- Dummy rendelés: `POST /api/cart` (nem ment adatbázisba)
- Mobil hamburger menü

## Telepítés

1. Klónozd a repót, majd a `ceramal` mappában:

```bash
npm install
```

2. Másold az `.env.example` fájlt `.env.local` néven, és add meg a `DATABASE_URL` értékét.

## API végpontok

- `GET /api/products` – összes termék JSON-ben
- `POST /api/cart` – dummy: `{ "ids": ["bowl-sand", ...] }` vagy tömb formátum
