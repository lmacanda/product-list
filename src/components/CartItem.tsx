import { useCartStore } from '../store';
import type { Product } from '../types';


interface CartItemProps {
  product: Product; 

}

export const CartItem = ({ product }: CartItemProps) => {

    const { cart, addToCart, updateQuantity } = useCartStore();

    const cartItem = cart.find(item => item.name === product.name);
    const isInCart = !!cartItem; // Convert to boolean
    
  return (
    <div className="image-container relative">
      <div className="relative">
        <img 
          src={product.image.desktop} 
          alt={product.name} 
          className={`product-image ${isInCart ? 'selected-border' : ''}`}
        />
        
        {/* BUTTON LOGIC */}
    <div className={`btn-primary text-xs ${isInCart ? 'btn-active' : ''}`}>
  {!isInCart ? (
    <button onClick={() => addToCart(product)}>
      <img src="/assets/images/icon-add-to-cart.svg" alt="" />
      Add to Cart
    </button>
  ) : (
    <>
      <button onClick={() => updateQuantity(product.name, -1)}>−</button>
      <span>{cartItem.quantity}</span>
      <button  onClick={() => updateQuantity(product.name, +1)}>+</button>
    </>
  )}
</div>
      </div>

      <div className="mt-6 flex flex-col gap-0.5">
        <p className="text-xs text-stone-400">{product.category}</p>
        <h3 className="text-sm font-bold text-stone-800">{product.name}</h3>
        <p className="text-sm font-bold text-orange-700">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};