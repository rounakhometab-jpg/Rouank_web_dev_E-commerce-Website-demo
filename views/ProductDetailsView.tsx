'use client';

import React, { useState } from 'react';
import { useAppStore } from '../lib/store';
import { ShopProduct } from '../lib/types';
import { SafeImage } from '../components/ui/SafeImage';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  BookOpen, 
  Check, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  Download,
  Share2,
  ChevronRight,
  Book,
  Sparkles,
  Layers,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface ProductDetailsViewProps {
  productId: string;
  onNavigate: (view: string, params?: any) => void;
}

export const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({ productId, onNavigate }) => {
  const { products, courses, reviews, cart, wishlist, addToCart, toggleWishlist, addProductReview, user } = useAppStore();

  const product = products.find(p => p.id === productId) || products[0];

  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'courses' | 'reviews'>('description');

  // New review form state
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [commentInput, setCommentInput] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-12 text-center">
        <p>Product not found.</p>
        <button onClick={() => onNavigate('shop')} className="mt-4 px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl">Back to Shop</button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id && r.status === 'approved');

  // Find linked courses
  const linkedCourses = courses.filter(c => 
    product.relatedCourseIds.includes('all') || 
    product.relatedCourseIds.includes(c.id) ||
    (c.relatedProductIds && c.relatedProductIds.includes(product.id))
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToastMessage(`Added ${quantity} x "${product.name}" to cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onNavigate('cart');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    addProductReview({
      productId: product.id,
      rating: ratingInput,
      comment: commentInput.trim(),
      userName: user?.name || 'Verified Learner',
      userEmail: user?.email || ''
    });

    setCommentInput('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[300] bg-emerald-500 text-slate-950 px-5 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 bg-slate-950 text-emerald-400 rounded-full p-0.5" />
          <span>{toastMessage}</span>
          <button onClick={() => onNavigate('cart')} className="ml-2 underline text-xs font-black">Go to Cart</button>
        </div>
      )}

      {/* Navigation Breadcrumb Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400 font-semibold">
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('shop')} className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400">{product.categoryName}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 truncate max-w-[200px] sm:max-w-md">{product.name}</span>
          </div>

          <button 
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              setToastMessage('Product link copied to clipboard!');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Image Gallery — 1:1 Aspect Ratio */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-4">
              <SafeImage
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                type="product"
                aspectRatio="1:1"
                objectFit="contain"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isBestseller && (
                  <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                    Bestseller
                  </span>
                )}
                {product.type === 'Digital' && (
                  <span className="px-3 py-1 rounded-xl bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow">
                    Digital Instant Download
                  </span>
                )}
                {(product.discountPercentage ?? 0) > 0 && (
                  <span className="px-3 py-1 rounded-xl bg-rose-500 text-white font-black text-xs uppercase tracking-wider shadow">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-2xl bg-slate-950/80 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-rose-400 transition-colors shadow-lg"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-20 h-20 rounded-2xl border-2 overflow-hidden shrink-0 transition-all ${
                      selectedImageIdx === idx ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      type="product"
                      aspectRatio="1:1"
                      objectFit="contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Features summary box */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Fast Shipping</p>
                  <p className="text-[11px] text-slate-400">Dispatched in 24 hrs</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Genuine Quality</p>
                  <p className="text-[11px] text-slate-400">Official Zenfotech edition</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Meta & Purchase Panel */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg">
                {product.categoryName}
              </span>

              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-extrabold text-white">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {product.shortDescription}
            </p>

            {/* Price Box */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.mrp > product.price && (
                    <span className="text-sm text-slate-500 line-through font-bold">₹{product.mrp.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <p className="text-xs text-emerald-400 font-bold mt-0.5">
                  You Save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({product.discountPercentage}% OFF)
                </p>
              </div>

              {/* Stock status indicator */}
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  product.stock > 10 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  product.stock > 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {product.stock > 10 ? `In Stock (${product.stock} left)` :
                   product.stock > 0 ? `Low Stock (${product.stock} left)` :
                   'Out of Stock'}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">SKU: {product.sku}</p>
              </div>
            </div>

            {/* Linked Course Card */}
            {linkedCourses.length > 0 && (
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-400">Official Course Companion</p>
                    <p className="text-xs font-extrabold text-white">{linkedCourses[0].title}</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('course-details', { courseId: linkedCourses[0].id })}
                  className="px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-extrabold hover:bg-amber-400 hover:text-slate-950 transition-colors shrink-0"
                >
                  View Course
                </button>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-300">Quantity:</span>
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-black text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="py-4 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white font-extrabold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Add to Shopping Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
                >
                  <span>Buy Now (Express Checkout)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs Section: Description, Specifications, Linked Courses, Reviews */}
        <div className="mt-16 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-4 no-scrollbar">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                activeTab === 'description' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Product Description
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                activeTab === 'specs' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Specifications & Contents
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                activeTab === 'courses' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Linked Courses ({linkedCourses.length})
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                activeTab === 'reviews' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Learner Reviews ({productReviews.length})
            </button>
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="mt-6 space-y-4 text-sm text-slate-300 leading-relaxed">
              <p className="text-base text-white font-medium">{product.description}</p>
              
              {product.bookDetails && (
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="font-extrabold text-amber-400 mb-2">Book Summary</h4>
                  <p>{product.bookDetails.summary || 'Designed specifically for AI students seeking hands-on mastery.'}</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Specs */}
          {activeTab === 'specs' && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
              {product.bookDetails && (
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                    <Book className="w-4 h-4 text-amber-400" />
                    <span>Book Specifications</span>
                  </h4>
                  <div className="space-y-2 divide-y divide-slate-800">
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-400">Author:</span>
                      <span className="font-bold text-white">{product.bookDetails.author}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-400">Publisher:</span>
                      <span className="font-bold text-white">{product.bookDetails.publisher}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-400">Edition:</span>
                      <span className="font-bold text-white">{product.bookDetails.edition}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-400">Pages:</span>
                      <span className="font-bold text-white">{product.bookDetails.pages}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-400">Language:</span>
                      <span className="font-bold text-white">{product.bookDetails.language}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-400">ISBN:</span>
                      <span className="font-bold text-white">{product.bookDetails.isbn}</span>
                    </div>
                  </div>
                </div>
              )}

              {product.accessoryDetails && (
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Accessory Specifications</span>
                  </h4>
                  <div className="space-y-2 divide-y divide-slate-800">
                    {product.accessoryDetails.material && (
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-400">Material:</span>
                        <span className="font-bold text-white">{product.accessoryDetails.material}</span>
                      </div>
                    )}
                    {product.accessoryDetails.color && (
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-400">Color:</span>
                        <span className="font-bold text-white">{product.accessoryDetails.color}</span>
                      </div>
                    )}
                    {product.accessoryDetails.dimensions && (
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-400">Dimensions:</span>
                        <span className="font-bold text-white">{product.accessoryDetails.dimensions}</span>
                      </div>
                    )}
                    {product.accessoryDetails.warranty && (
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-400">Warranty:</span>
                        <span className="font-bold text-white">{product.accessoryDetails.warranty}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Linked Courses */}
          {activeTab === 'courses' && (
            <div className="mt-6 space-y-4">
              <p className="text-xs text-slate-400">
                This item is designed to complement the following Zenfotech AI Academy courses:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {linkedCourses.map(course => (
                  <div key={course.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
                        {(course.category || 'AI').slice(0, 3)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">{course.title}</p>
                        <p className="text-[11px] text-slate-400">{course.level} • {course.learningHours} Hours</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('course-details', { courseId: course.id })}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300"
                    >
                      Explore Course
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="mt-6 space-y-8">
              
              {/* Add Review Form */}
              <form onSubmit={handleSubmitReview} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Write a Learner Review</span>
                </h4>

                {reviewSubmitted && (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Thank you! Your review has been posted successfully.</span>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-300 font-semibold">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRatingInput(s)}
                        className="p-1"
                      >
                        <Star className={`w-5 h-5 ${s <= ratingInput ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Share your experience with this book or kit..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300"
                >
                  Submit Review
                </button>
              </form>

              {/* Existing Reviews List */}
              <div className="space-y-4">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No reviews yet for this product. Be the first to review!</p>
                ) : (
                  productReviews.map(rev => (
                    <div key={rev.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                            {rev.userName.charAt(0)}
                          </div>
                          <span className="font-bold text-white text-xs">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-bold">Verified Buyer</span>
                          )}
                        </div>

                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300">{rev.comment}</p>
                      <p className="text-[10px] text-slate-500">{new Date(rev.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
