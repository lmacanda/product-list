import { useCartStore } from '../store';


interface OrderModalProps {
  onNewOrder: () => void;
}

export const OrderModal = ({ onNewOrder }: OrderModalProps) => {
  const { cart } = useCartStore();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl p-8 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <img src="./assets/images/icon-order-confirmed.svg" alt="Confirmed" className="w-10 mb-4"/>
        <h1 className="text-3xl font-bold text-stone-800 mb-1">Order Confirmed</h1>
        <p className="text-stone-400 mb-6">We hope you enjoy your food!</p>

        <div className="bg-rose-50 rounded-xl p-4 mb-6">
           {cart.map(item => (
            <div key={item.name} className="flex items-center gap-3 py-3 border-b border-rose-100">
              <img
                src={item.image.thumbnail}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-800">{item.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">{item.quantity}x</span>
                  <span className="text-sm text-stone-400">@ ${item.price.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-sm font-bold text-stone-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4">
            <span className="text-sm text-stone-600">Order Total</span>
            <h2 className="text-2xl font-bold text-stone-800">${total.toFixed(2)}</h2>
          </div>
        </div>

        <button onClick={onNewOrder} className="btn-confirm">
          Start New Order
        </button>
      </div>
    </div>
  );
};