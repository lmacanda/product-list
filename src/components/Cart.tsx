import { useCartStore } from '../store';


interface CartProps {
  onConfirm: () => void; 
}

export const Cart = ({ onConfirm }: CartProps) => {
  
  const { cart, removeFromCart} = useCartStore();

  // Calculate the total price of everything in the basket
  const totalOrderPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity, 
    0
  );

  // Calculate total number of items
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='bg-white p-4 rounded-xl shadow-md '>
      <h2 className="font-bold text-3xl text-orange-700">Your Cart ({totalItems})</h2>

      {cart.length === 0 ? (
        <div className='flex flex-col justify-center items-center'>
          <img src="/assets/images/illustration-empty-cart.svg" alt="Empty Cart" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="flex flex-col">
            {cart.map((item) => (
              <li key={item.name} className="flex items-center justify-between py-3 border-b border-rose-100 mt-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold text-stone-800">{item.name}</p>
                  <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-orange-700">{item.quantity}x</span>
                  <span className="text-sm text-stone-400 font-medium">@ ${item.price.toFixed(2)}</span>
                  <span className="text-sm font-bold text-stone-700">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                </div>
                <button 
                   onClick={() => removeFromCart(item.name)}
                   className=" w-6 h-6 rounded-full border-2 border-solid flex items-center justify-center  text-stone-400 cursor-pointer"
                >
              
                  X
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-4">
            <p>Order Total</p>
            <h3 className='text-lg font-bold'>${totalOrderPrice.toFixed(2)}</h3>
          </div>

            <div className="flex items-center justify-center gap-2 bg-rose-50 rounded-lg p-3 mb-4 text-sm text-stone-600">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="Carbon neutral delivery" className="w-4 h-4" />
            <p>This is a <span className='font-semibold'>carbon-neutral delivery</span></p>
          </div>


<button className="btn-confirm" onClick={onConfirm}>
  Confirm Order
</button>        </>
      )}
    </div>
  );
};