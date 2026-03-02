import { useEffect, useState } from 'react'
import type { Product } from './types'
import { Cart } from '../src/components/Cart'
import { CartItem } from '../src/components/CartItem'
import { OrderModal } from '../src/components/OrderModal' 
import { useCartStore } from './store'
import './index.css';

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  
 
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
      <main className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6 md:px-20'>
        
        {/* PRODUCTS SECTION */}
        <section className='w-full md:w-2/3'>
          <h1 className='font-bold text-4xl mb-8'>Desserts</h1>
        
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map(product => (
              <CartItem key={product.name} product={product} />
            ))}
          </div>
        </section>

        {/* CART SECTION */}
        <aside className='w-full md:w-1/3'>
          {/* md:sticky
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