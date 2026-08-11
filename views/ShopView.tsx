'use client';

import React, { useState, useMemo } from 'react';
import { useAppStore } from '../lib/store';
import { ShopProduct } from '../lib/types';
import { SafeImage } from '../components/ui/SafeImage';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Heart, 
  Star, 
  BookOpen, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Layers, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Download,
  Package,
  Book,
  ChevronRight,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface ShopViewProps {
  initialCategory?: string;
  onNavigate: (view: string, params?: any) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ initialCategory = 'all', onNavigate }) => {
  const { products, categories, cart, wishlist, addToCart, toggleWishlist, courses } = useAppStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(5000);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'offers') {
          if (!product.discountPercentage || product.discountPercentage < 10) return false;
        } else if (selectedCategory === 'course-kits') {
          if (product.categoryId !== 'course-kits' && !product.name.toLowerCase().includes('kit')) return false;
        } else if (product.categoryId !== selectedCategory) {
          return false;
        }
      }

      // Type filter (Physical / Digital)
      if (selectedType !== 'all') {
        if (selectedType === 'physical' && product.type === 'Digital') return false;
        if (selectedType === 'digital' && product.type !== 'Digital') return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(q);
        const descMatch = product.shortDescription.toLowerCase().includes(q);
        const catMatch = (product.categoryName || '').toLowerCase().includes(q);
        if (!nameMatch && !descMatch && !catMatch) return false;
      }

      // Max price
      if (product.price > maxPriceFilter) return false;

      // Status
      if (product.status !== 'published') return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // default featured / bestsellers
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [products, selectedCategory, selectedType, searchQuery, sortBy, maxPriceFilter]);

  const handleAddToCart = (product: ShopProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToast(`Added "${product.name}" to your cart!`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const handleBuyNow = (product: ShopProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    onNavigate('cart');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-[300] bg-emerald-500 text-slate-950 px-5 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 bg-slate-950 text-emerald-400 rounded-full p-0.5" />
          <span>{addedToast}</span>
          <button 
            onClick={() => onNavigate('cart')}
            className="ml-2 underline text-xs font-black hover:text-white"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Official Zenfotech Academy Store
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Learn More. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Build More.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Get official books, study materials and accessories designed for your AI learning journey.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => setSelectedCategory('books')}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <Book className="w-4 h-4" />
              <span>Shop Books</span>
            </button>

            <button
              onClick={() => setSelectedCategory('accessories')}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Shop Accessories</span>
            </button>
          </div>

          {/* Quick Value Props */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80 text-xs font-semibold text-slate-300">
            <div className="flex items-center justify-center gap-2.5">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Free Pan-India Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Course Material</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Download className="w-4 h-4 text-blue-400" />
              <span>Instant Digital PDF Access</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Tag className="w-4 h-4 text-purple-400" />
              <span>Student Discount Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10 font-extrabold'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>All Products</span>
          </button>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10 font-extrabold'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}

          <button
            onClick={() => setSelectedCategory('offers')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === 'offers'
                ? 'bg-rose-500 text-white font-extrabold shadow-md shadow-rose-500/20'
                : 'bg-rose-950/30 border border-rose-800/40 text-rose-300 hover:bg-rose-900/40'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Special Offers</span>
          </button>
        </div>

        {/* Search, Filter & Sort Toolbar */}
        <div className="mt-6 bg-slate-900/80 border border-slate-800 p-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, kits, notes..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Format Filter */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1 rounded-lg ${selectedType === 'all' ? 'bg-amber-400 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('physical')}
                className={`px-3 py-1 rounded-lg ${selectedType === 'physical' ? 'bg-amber-400 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
              >
                Physical
              </button>
              <button
                onClick={() => setSelectedType('digital')}
                className={`px-3 py-1 rounded-lg ${selectedType === 'digital' ? 'bg-amber-400 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
              >
                Digital (PDF)
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
          <p>Showing <span className="text-amber-400 font-extrabold">{filteredProducts.length}</span> products</p>
          {(selectedCategory !== 'all' || searchQuery || selectedType !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedType('all');
                setMaxPriceFilter(5000);
              }}
              className="text-amber-400 hover:underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 bg-slate-900 border border-slate-800/80 rounded-3xl p-12 text-center max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No products match your criteria</h3>
            <p className="mt-2 text-xs text-slate-400">Try adjusting your category filter, search keywords, or product format.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="mt-6 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const relatedCourseCount = product.relatedCourseIds.filter(id => id !== 'all').length;

              return (
                <div
                  key={product.id}
                  onClick={() => onNavigate('shop-product', { productId: product.id })}
                  className="group bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col cursor-pointer relative"
                >
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                    {product.isBestseller && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                        Bestseller
                      </span>
                    )}
                    {product.type === 'Digital' && (
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500 text-white font-black text-[10px] uppercase tracking-wider shadow">
                        Instant PDF
                      </span>
                    )}
                    {(product.discountPercentage ?? 0) > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-black text-[10px] uppercase tracking-wider shadow">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-rose-400 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Product Image — 1:1 Aspect Ratio */}
                  <div className="relative aspect-square w-full bg-slate-950 overflow-hidden border-b border-slate-800/80 p-2">
                    <SafeImage
                      src={product.images[0]}
                      alt={product.name}
                      type="product"
                      aspectRatio="1:1"
                      objectFit="contain"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Course Tag */}
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                        <span className="text-amber-400 uppercase tracking-wider">{product.categoryName}</span>
                        {relatedCourseCount > 0 && (
                          <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full text-[10px]">
                            {relatedCourseCount} Course{relatedCourseCount > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-base text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Author / Spec snippet */}
                      {product.bookDetails && (
                        <p className="mt-2 text-[11px] text-slate-400 italic">
                          By {product.bookDetails.author} • {product.bookDetails.pages} Pages
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                      {/* Price & Rating */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
                            {product.mrp > product.price && (
                              <span className="text-xs text-slate-500 line-through font-semibold">₹{product.mrp.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium">Incl. GST & Materials</p>
                        </div>

                        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-slate-200">{product.rating}</span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                          <span>Add to Cart</span>
                        </button>

                        <button
                          onClick={(e) => handleBuyNow(product, e)}
                          className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1 shadow"
                        >
                          <span>Buy Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
