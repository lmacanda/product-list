import { useEffect, useState } from 'react'
import type { Product } from './types'
import { Cart } from '../src/components/Cart'
import { CartItem } from '../src/components/CartItem'
import { OrderModal } from '../src/components/OrderModal' // Don't forget to import this!
import { useCartStore } from './store'
import './index.css';

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Pluck clearCart from our shared brain
  const { clearCart } = useCartStore();

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const handleStartNewOrder = () => {
    clearCart(); // Clean the Lego table!
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className='min-h-screen bg-rose-50 py-8 md:py-16'>
      {/* 1. Changed to flex-col (mobile) and md:flex-row (desktop).
          2. px-6 provides breathing room on mobile, md:px-20 for large screens.
      */}
      <main className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6 md:px-20'>
        
        {/* PRODUCTS SECTION */}
        <section className='w-full md:w-2/3'>
          <h1 className='font-bold text-4xl mb-8'>Desserts</h1>
          
          {/* Improved Grid: 
              1 col on mobile, 2 on small tablets, 3 on desktop. 
              Removed 'h-48' because it will squash your items!
          */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map(product => (
              <CartItem key={product.name} product={product} />
            ))}
          </div>
        </section>

        {/* CART SECTION */}
        <aside className='w-full md:w-1/3'>
          {/* md:sticky keeps the cart visible while scrolling the long list of desserts.
          */}
          <div className='md:sticky md:top-8'>
            <Cart onConfirm={handleConfirmOrder} />
          </div>
        </aside>

      </main>

      {isModalOpen && (
        <OrderModal onNewOrder={handleStartNewOrder} />
      )}
    </div>
  )
}

export default App