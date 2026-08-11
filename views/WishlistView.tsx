'use client';

import React from 'react';
import { useAppStore } from '../lib/store';
import { SafeImage } from '../components/ui/SafeImage';
import { Heart, ShoppingBag, ArrowLeft, Trash2, Star, ArrowRight } from 'lucide-react';

interface WishlistViewProps {
  onNavigate: (view: string, params?: any) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({ onNavigate }) => {
  const { wishlist, products, toggleWishlist, addToCart } = useAppStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Top Header */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </button>

          <h1 className="text-base font-extrabold text-white flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>My Wishlist ({wishlistedProducts.length})</span>
          </h1>

          <div />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {wishlistedProducts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto my-12 shadow-2xl">
            <Heart className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">Your Wishlist is empty</h3>
            <p className="text-xs text-slate-400 mt-2">Save books, study materials, and accessories to buy them later.</p>
            <button
              onClick={() => onNavigate('shop')}
              className="mt-6 px-6 py-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 shadow-lg"
            >
              Explore Shop Store
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onNavigate('shop-product', { productId: product.id })}
                className="group bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col cursor-pointer relative"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-950/80 border border-slate-700 flex items-center justify-center text-rose-500 hover:scale-110 transition-transform"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="relative aspect-square w-full bg-slate-950 overflow-hidden border-b border-slate-800 p-2">
                  <SafeImage
                    src={product.images[0]}
                    alt={product.name}
                    type="product"
                    aspectRatio="1:1"
                    objectFit="contain"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{product.categoryName}</span>
                    <h3 className="font-bold text-white text-sm line-clamp-2 mt-1">{product.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{product.shortDescription}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
                      <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-lg text-xs font-bold text-slate-300">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                        onNavigate('cart');
                      }}
                      className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
