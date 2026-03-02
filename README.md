# 🍰 Dessert Cart

<img width="1440" height="1361" alt="image" src="https://github.com/user-attachments/assets/dc022287-8aca-48c2-a41c-7415f699993b" />

A product list with cart UI built as a frontend practice project. Browse a menu of desserts, add items to the cart, adjust quantities, and confirm your order.

[![App preview](https://path-to-your-image.png)](https://product-list-self-zeta.vercel.app/)

## Tech Stack

| Tool | Purpose |

| React + TypeScript | UI + type safety |

| Vite | Build tool + dev server |

| Tailwind CSS v4 | Utility-first styling |

| Zustand | Global cart state |

## Features

- Add items to cart with a single click
- Quantity selector replaces the button when item is in cart
- Cart sidebar updates in real time — no page reload
- Order confirmation modal with item summary
- "Start New Order" clears the cart and resets the UI
- Responsive layout — stacked on mobile, side-by-side on desktop
- Cart sidebar sticks to the viewport while the product list scrolls
- Custom font (RedHat Text) loaded from local assets

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/dessert-cart.git
cd dessert-cart

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open local host in your browser

## Project Structure

```
dessert-cart/
├── public/
│   ├── data.json                  # Product data
│   └── assets/
│       ├── fonts/                 # RedHat Text woff2 files
│       └── images/                # Product images + SVG icons
│
├── src/
│   ├── types.ts                   # TypeScript interfaces
│   ├── store.ts                   # Zustand cart store
│   ├── index.css                  # Tailwind + @theme tokens + component classes
│   ├── App.tsx                    # Root layout + modal state
│   └── components/
│       ├── CartItem/CartItem.tsx  # Product card (two-state button)
│       ├── Cart/Cart.tsx          # Cart sidebar
│       └── OrderModal/OrderModal.tsx
│
└── vite.config.ts
```

## CSS Architecture

This project uses Tailwind CSS v4 with a clear separation of concerns:

**Tailwind utilities** handle layout and spacing inline in JSX:
```tsx

```

**`@theme` tokens** in `index.css` define the design system — they become Tailwind classes automatically:
```css
@theme {
  --color-brand-orange: hsl(14, 86%, 42%);
  --font-sans: 'RedHat', sans-serif;
}
```
Which lets you use `text-brand-orange`, `bg-brand-orange`, `font-sans` etc. directly in JSX.

**CSS component classes** handle anything stateful or visually complex — the two-state pill button, image border on active, confirm button. These live in `index.css` outside of `@theme`.

## State Management

Zustand provides a single global store. Any component can read or write cart state directly — no prop-drilling, no Context boilerplate:

```ts
const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCartStore();
```

| Action | Behaviour |

| `addToCart(product)` | Adds product with `quantity: 1` |

| `updateQuantity(name, delta)` | ±1 quantity, auto-removes item at 0 |

| `removeFromCart(name)` | Removes by name |

| `clearCart()` | Resets cart to `[]` |

## Data

Products are loaded from `public/data.json` via `fetch('data.json')` in `App.tsx`. Each product has four image sizes (`thumbnail`, `mobile`, `tablet`, `desktop`) that map to the `ProductImage` TypeScript interface.

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build locally
