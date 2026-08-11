'use client';

import React, { useState, useRef } from 'react';
import { useAppStore } from '../lib/store';
import { ShopProduct, ShopCoupon, ShopCategory } from '../lib/types';
import { SafeImage } from '../components/ui/SafeImage';
import { ImageCropperModal } from '../components/ui/ImageCropperModal';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Filter, 
  Book, 
  Sparkles, 
  Layers, 
  Tag, 
  Package, 
  Truck, 
  AlertTriangle,
  FolderTree,
  CreditCard,
  FileSpreadsheet,
  Link as LinkIcon,
  Upload,
  Crop,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';

interface AdminShopViewProps {
  initialTab?: string;
  onNavigate?: (view: string, params?: any) => void;
}

export const AdminShopView: React.FC<AdminShopViewProps> = ({ initialTab = 'products', onNavigate }) => {
  const { 
    products, 
    courses, 
    categories, 
    shopOrders, 
    coupons, 
    upsertProduct, 
    deleteProduct, 
    duplicateProduct, 
    toggleProductStatus, 
    updateProductStock,
    upsertCoupon,
    deleteCoupon,
    upsertCategory,
    deleteCategory,
    updateShopOrderStatus,
    attachProductToCourse,
    detachProductFromCourse
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'coupons' | 'inventory'>(
    initialTab as any || 'products'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Modal State for Add/Edit Product
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<ShopProduct> | null>(null);
  const [productCropperOpen, setProductCropperOpen] = useState(false);
  const [productImageToCrop, setProductImageToCrop] = useState<string | null>(null);
  const productImageInputRef = useRef<HTMLInputElement>(null);

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProductImageToCrop(objectUrl);
      setProductCropperOpen(true);
    }
  };

  const handleProductCropSave = (croppedDataUrl: string) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        images: [croppedDataUrl, ...(editingProduct.images?.slice(1) || [])]
      });
    }
    setProductCropperOpen(false);
    setProductImageToCrop(null);
  };

  // Modal State for Add Coupon
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Partial<ShopCoupon> | null>(null);

  // Modal State for Add Category
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<ShopCategory> | null>(null);

  // Order Tracking Modal State
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<any | null>(null);
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [courierPartnerInput, setCourierPartnerInput] = useState('Bluedart');

  // Filtered products list
  const filteredProducts = products.filter(p => {
    if (selectedCategoryFilter !== 'all' && p.categoryId !== selectedCategoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    }
    return true;
  });

  const lowStockProducts = products.filter(p => p.stock <= (p.lowStockAlert || 5));

  // Save product form handler
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    upsertProduct(editingProduct);
    setProductModalOpen(false);
    setEditingProduct(null);
  };

  // Save coupon handler
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon) return;
    upsertCoupon(editingCoupon);
    setCouponModalOpen(false);
    setEditingCoupon(null);
  };

  // Save category handler
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    upsertCategory(editingCategory);
    setCategoryModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest">
            <ShoppingBag className="w-4 h-4" />
            <span>Storefront E-Commerce Hub</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Zenfotech Academy Shop Management</h1>
          <p className="text-xs text-slate-400 mt-1">Manage physical books, study materials, accessories, course kits, coupons and order fulfillments.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingProduct({
                name: '',
                categoryId: 'books',
                type: 'Physical',
                price: 499,
                mrp: 999,
                stock: 25,
                status: 'published',
                relatedCourseIds: ['all']
              });
              setProductModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'products' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>All Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'categories' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'orders' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Shop Orders ({shopOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'coupons' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Coupons & Offers ({coupons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'inventory' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Low Stock Alerts ({lowStockProducts.length})</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS TABLE */}
      {activeTab === 'products' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or SKU..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Format</th>
                  <th className="p-3.5">Price / MRP</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <SafeImage
                          src={p.images[0]}
                          alt={p.name}
                          type="product"
                          aspectRatio="1:1"
                          objectFit="contain"
                          containerClassName="w-10 h-10 rounded-xl border border-slate-800 shrink-0"
                        />
                        <div>
                          <p className="font-extrabold text-white">{p.name}</p>
                          <p className="text-[10px] text-slate-500">SKU: {p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-amber-400">{p.categoryName}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.type === 'Digital' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-300'}`}>
                        {p.type}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-white">₹{p.price.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-slate-500 line-through">₹{p.mrp.toLocaleString('en-IN')}</p>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.stock === 0 ? 'bg-rose-500/20 text-rose-400' :
                        p.stock <= (p.lowStockAlert || 5) ? 'bg-amber-500/20 text-amber-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {p.stock} Units
                      </span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => toggleProductStatus(p.id)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase transition-colors ${
                          p.status === 'published' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => duplicateProduct(p.id)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-white text-base">Store Categories</h3>
            <button
              onClick={() => {
                setEditingCategory({ name: '', slug: '', description: '' });
                setCategoryModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm">{cat.name}</p>
                  <p className="text-xs text-slate-400">{cat.description}</p>
                  <p className="text-[10px] text-amber-400 font-mono mt-1">Slug: {cat.slug}</p>
                </div>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="p-2 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-white text-base">Customer Orders & Fulfillments</h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Order No.</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Delivery Status</th>
                  <th className="p-3.5 text-right">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {shopOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/50">
                    <td className="p-3.5 font-black text-amber-400">{ord.orderNumber}</td>
                    <td className="p-3.5">
                      <p className="font-bold text-white">{ord.customerName}</p>
                      <p className="text-[10px] text-slate-500">{ord.customerEmail} • {ord.customerMobile}</p>
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-200">{ord.items.length} Items</p>
                    </td>
                    <td className="p-3.5 font-black text-white">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                        {ord.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateShopOrderStatus(ord.id, e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-amber-300 font-bold focus:outline-none"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedOrderForTracking(ord);
                          setTrackingNumberInput(ord.trackingNumber || `BLUEDART-${Date.now().toString().slice(-6)}`);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-bold"
                      >
                        Add Tracking
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-white text-base">Discount Coupons & Offers</h3>
            <button
              onClick={() => {
                setEditingCoupon({
                  code: 'ZENNEW',
                  discountType: 'percentage',
                  discountValue: 15,
                  minOrderAmount: 499,
                  status: 'active'
                });
                setCouponModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div key={c.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-mono font-black text-amber-400 text-base">{c.code}</span>
                  <p className="text-xs text-white font-bold mt-1">
                    {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}
                  </p>
                  <p className="text-[10px] text-slate-400">Min Order: ₹{c.minOrderAmount} • Expiry: {c.expiryDate}</p>
                </div>
                <button
                  onClick={() => deleteCoupon(c.id)}
                  className="p-2 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INVENTORY ALERTS */}
      {activeTab === 'inventory' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-white text-base flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Low Stock & Out-of-Stock Alert Monitor</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-white text-xs">{p.name}</p>
                    <p className="text-[10px] text-amber-400 font-semibold">{p.categoryName}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                  <span className="text-rose-400 font-bold">Current Stock: {p.stock}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateProductStock(p.id, p.stock + 20)}
                      className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded font-bold text-[10px] hover:bg-emerald-500/30"
                    >
                      +20 Restock
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {productModalOpen && editingProduct && (
        <div className="fixed inset-0 z-[300] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setProductModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-slate-300 font-bold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category *</label>
                  <select
                    value={editingProduct.categoryId || 'books'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Format Type *</label>
                  <select
                    value={editingProduct.type || 'Physical'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, type: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="Physical">Physical Book / Kit</option>
                    <option value="Digital">Digital PDF / E-Book</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.mrp || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, mrp: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock ?? 20}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="col-span-2 space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <label className="text-slate-200 font-bold flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>Product Image (1:1 Ratio) *</span>
                    </label>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                      RECOMMENDED: 1200 × 1200 px (1:1 Square)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-1">
                    <div className="sm:col-span-7 space-y-2">
                      <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-xl p-4 text-center space-y-1 bg-slate-900/50 cursor-pointer relative">
                        <input
                          ref={productImageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleProductImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Upload className="w-6 h-6 text-amber-400 mx-auto" />
                        <p className="font-semibold text-white text-xs">Upload Product Image</p>
                        <p className="text-[10px] text-slate-500">Supports PNG, JPG, WEBP (Auto 1:1 Cropper)</p>
                      </div>

                      <input
                        type="text"
                        required
                        placeholder="Or Image URL: https://images.unsplash.com/..."
                        value={editingProduct.images?.[0] || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs font-mono"
                      />
                    </div>

                    <div className="sm:col-span-5 flex flex-col items-center justify-center space-y-2">
                      <SafeImage
                        src={editingProduct.images?.[0]}
                        alt={editingProduct.name || 'Product'}
                        type="product"
                        aspectRatio="1:1"
                        objectFit="contain"
                        containerClassName="w-28 h-28 rounded-2xl border border-slate-800 shadow"
                      />
                      {editingProduct.images?.[0] && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setProductImageToCrop(editingProduct.images![0]);
                              setProductCropperOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-[10px] flex items-center gap-1"
                          >
                            <Crop className="w-3 h-3" /> Crop 1:1
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, images: [''] })}
                            className="px-2.5 py-1 rounded-lg bg-rose-950/40 text-rose-400 border border-rose-800/50 font-bold text-[10px]"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-slate-300 font-bold mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={editingProduct.shortDescription || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-black"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1:1 Product Image Cropper Modal */}
      <ImageCropperModal
        isOpen={productCropperOpen}
        imageSrc={productImageToCrop}
        aspectRatio="1:1"
        title="Crop Product Image (1:1 Ratio)"
        recommendedResolution="1200 × 1200 px"
        onCropSave={handleProductCropSave}
        onReplaceImage={() => productImageInputRef.current?.click()}
        onRemoveImage={() => {
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, images: [''] });
          }
          setProductCropperOpen(false);
        }}
        onClose={() => setProductCropperOpen(false)}
      />

    </div>
  );
};
