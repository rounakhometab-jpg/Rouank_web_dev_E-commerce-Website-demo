'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Course, Exam, ExamAttempt, Certificate, Order, AppNotification, StudentProgress, Module, Lesson, ExamQuestion, ShopProduct, ShopCartItem, ShopOrder, ShopCoupon, ShopCategory, ProductReview, ProductBundle } from './types';
import { DEMO_STUDENT, DEMO_ADMIN, INITIAL_COURSES, INITIAL_EXAM, INITIAL_CERTIFICATE, INITIAL_ORDERS, INITIAL_NOTIFICATIONS } from './initialData';
import { INITIAL_PRODUCTS, INITIAL_SHOP_CATEGORIES, INITIAL_SHOP_COUPONS, INITIAL_SHOP_BUNDLES, INITIAL_PRODUCT_REVIEWS, INITIAL_SHOP_ORDERS } from './initialShopData';
import { evaluateExamSubmission } from './examHelpers';

const STORAGE_KEYS = {
  USER: 'zenfotech_user',
  COURSES: 'zenfotech_courses',
  PROGRESS: 'zenfotech_progress',
  ORDERS: 'zenfotech_orders',
  NOTIFICATIONS: 'zenfotech_notifications',
  EXAM: 'zenfotech_exam',
  EXAMS: 'zenfotech_exams',
  EXAM_ATTEMPTS: 'zenfotech_exam_attempts',
  STUDENTS: 'zenfotech_students',
  PRODUCTS: 'zenfotech_products',
  CART: 'zenfotech_cart',
  WISHLIST: 'zenfotech_wishlist',
  SHOP_ORDERS: 'zenfotech_shop_orders',
  COUPONS: 'zenfotech_coupons',
  CATEGORIES: 'zenfotech_shop_categories',
  REVIEWS: 'zenfotech_product_reviews',
  BUNDLES: 'zenfotech_bundles'
};

// Default initial completed lessons (68% of demo lessons = les_01, les_02, les_03, les_04, les_05, les_06, les_07, les_09, les_11)
const DEFAULT_PROGRESS: StudentProgress = {
  courseId: 'ai-industry-certification',
  completedLessonIds: ['les_01', 'les_02', 'les_03', 'les_04', 'les_05', 'les_06', 'les_07', 'les_09', 'les_11', 'les_13', 'les_15'],
  completedQuizIds: {
    'quiz_mod_01': 100
  },
  examAttempt: {
    id: 'att_2026_01',
    studentId: DEMO_STUDENT.id,
    studentName: DEMO_STUDENT.name,
    examId: INITIAL_EXAM.id,
    startedAt: '2026-08-11T03:30:00Z',
    completedAt: '2026-08-11T03:52:00Z',
    answers: {},
    score: 16,
    totalQuestions: 20,
    correctCount: 16,
    wrongCount: 4,
    skippedCount: 0,
    percentage: 82,
    passed: true,
    topicScores: {
      'AI Fundamentals': 90,
      'Generative AI & Multimodal': 80,
      'Prompt Engineering': 85,
      'Machine Learning & RAG': 75,
      'AI Automation & Agents': 80
    }
  },
  certificate: INITIAL_CERTIFICATE
};

export function useAppStore() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return DEMO_STUDENT;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEMO_STUDENT;
    } catch {
      return DEMO_STUDENT;
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window === 'undefined') return INITIAL_COURSES;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [progress, setProgress] = useState<StudentProgress>(() => {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return INITIAL_ORDERS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [exam, setExam] = useState<Exam>(() => {
    if (typeof window === 'undefined') return INITIAL_EXAM;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAM);
      return saved ? JSON.parse(saved) : INITIAL_EXAM;
    } catch {
      return INITIAL_EXAM;
    }
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    if (typeof window === 'undefined') return [INITIAL_EXAM];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAMS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [INITIAL_EXAM];
    } catch {
      return [INITIAL_EXAM];
    }
  });

  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS.examAttempt ? [DEFAULT_PROGRESS.examAttempt] : [];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAM_ATTEMPTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_PROGRESS.examAttempt ? [DEFAULT_PROGRESS.examAttempt] : [];
    } catch {
      return DEFAULT_PROGRESS.examAttempt ? [DEFAULT_PROGRESS.examAttempt] : [];
    }
  });

  const [students, setStudents] = useState<User[]>(() => {
    if (typeof window === 'undefined') return [DEMO_STUDENT];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return saved ? JSON.parse(saved) : [DEMO_STUDENT];
    } catch {
      return [DEMO_STUDENT];
    }
  });

  // E-COMMERCE SHOP STATES
  const [products, setProducts] = useState<ShopProduct[]>(() => {
    if (typeof window === 'undefined') return INITIAL_PRODUCTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<ShopCartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shopOrders, setShopOrders] = useState<ShopOrder[]>(() => {
    if (typeof window === 'undefined') return INITIAL_SHOP_ORDERS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHOP_ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_SHOP_ORDERS;
    } catch {
      return INITIAL_SHOP_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState<ShopCoupon[]>(() => {
    if (typeof window === 'undefined') return INITIAL_SHOP_COUPONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_SHOP_COUPONS;
    } catch {
      return INITIAL_SHOP_COUPONS;
    }
  });

  const [categories, setCategories] = useState<ShopCategory[]>(() => {
    if (typeof window === 'undefined') return INITIAL_SHOP_CATEGORIES;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_SHOP_CATEGORIES;
    } catch {
      return INITIAL_SHOP_CATEGORIES;
    }
  });

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    if (typeof window === 'undefined') return INITIAL_PRODUCT_REVIEWS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_PRODUCT_REVIEWS;
    } catch {
      return INITIAL_PRODUCT_REVIEWS;
    }
  });

  const [bundles, setBundles] = useState<ProductBundle[]>(() => {
    if (typeof window === 'undefined') return INITIAL_SHOP_BUNDLES;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUNDLES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_SHOP_BUNDLES;
    } catch {
      return INITIAL_SHOP_BUNDLES;
    }
  });

  const [isInitialized] = useState(true);

  // Save changes to localStorage
  const saveUser = useCallback((newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, []);

  const saveProgress = useCallback((newProgress: StudentProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(newProgress));
  }, []);

  const saveOrders = useCallback((newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(newOrders));
  }, []);

  const saveNotifications = useCallback((newNotifs: AppNotification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(newNotifs));
  }, []);

  const saveCourses = useCallback((newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(newCourses));
  }, []);

  const saveExam = useCallback((newExam: Exam) => {
    setExam(newExam);
    localStorage.setItem(STORAGE_KEYS.EXAM, JSON.stringify(newExam));
  }, []);

  const saveExams = useCallback((newExams: Exam[]) => {
    setExams(newExams);
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(newExams));
    if (newExams.length > 0) {
      setExam(newExams[0]);
      localStorage.setItem(STORAGE_KEYS.EXAM, JSON.stringify(newExams[0]));
    }
  }, []);

  const saveProducts = useCallback((newProducts: ShopProduct[]) => {
    setProducts(newProducts);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newProducts));
  }, []);

  const saveCart = useCallback((newCart: ShopCartItem[]) => {
    setCart(newCart);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(newCart));
  }, []);

  const saveWishlist = useCallback((newWishlist: string[]) => {
    setWishlist(newWishlist);
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(newWishlist));
  }, []);

  const saveShopOrders = useCallback((newOrders: ShopOrder[]) => {
    setShopOrders(newOrders);
    localStorage.setItem(STORAGE_KEYS.SHOP_ORDERS, JSON.stringify(newOrders));
  }, []);

  const saveCoupons = useCallback((newCoupons: ShopCoupon[]) => {
    setCoupons(newCoupons);
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(newCoupons));
  }, []);

  const saveCategories = useCallback((newCats: ShopCategory[]) => {
    setCategories(newCats);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(newCats));
  }, []);

  const saveReviews = useCallback((newReviews: ProductReview[]) => {
    setReviews(newReviews);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(newReviews));
  }, []);

  const saveBundles = useCallback((newBundles: ProductBundle[]) => {
    setBundles(newBundles);
    localStorage.setItem(STORAGE_KEYS.BUNDLES, JSON.stringify(newBundles));
  }, []);

  // CART HANDLERS
  const addToCart = (product: ShopProduct, quantity = 1, selectedCourseId?: string) => {
    const existingIdx = cart.findIndex(item => item.product.id === product.id);
    let updated: ShopCartItem[];
    if (existingIdx > -1) {
      updated = cart.map((item, idx) => {
        if (idx === existingIdx) {
          const nextQty = item.quantity + quantity;
          return { ...item, quantity: nextQty > product.stock ? product.stock : nextQty, selectedCourseId: selectedCourseId || item.selectedCourseId };
        }
        return item;
      });
    } else {
      updated = [...cart, { product, quantity, selectedCourseId }];
    }
    saveCart(updated);
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.min(quantity, item.product.stock || 999) };
      }
      return item;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const updated = exists ? wishlist.filter(id => id !== productId) : [...wishlist, productId];
    saveWishlist(updated);
  };

  // PRODUCT MANAGEMENT
  const upsertProduct = (productData: Partial<ShopProduct>): ShopProduct => {
    let targetId = productData.id;
    if (!targetId) {
      targetId = `PROD-${Date.now().toString().slice(-6)}`;
    }
    const existing = products.find(p => p.id === targetId);

    const mrpVal = Number(productData.mrp) || Number(productData.price) || 0;
    const saleVal = Number(productData.price) || Number(productData.salePrice) || mrpVal;
    const discountPct = mrpVal > saleVal ? Math.round(((mrpVal - saleVal) / mrpVal) * 100) : 0;
    const stockVal = Number(productData.stock) ?? 10;
    let stockStatus: ShopProduct['stockStatus'] = productData.stockStatus || 'In Stock';
    if (stockVal === 0) stockStatus = 'Out of Stock';
    else if (stockVal <= (productData.lowStockAlert || 5)) stockStatus = 'Low Stock';

    const fullProduct: ShopProduct = {
      id: targetId,
      name: productData.name || 'New Product',
      slug: productData.slug || (productData.name ? productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `product-${targetId}`),
      shortDescription: productData.shortDescription || '',
      description: productData.description || '',
      categoryId: productData.categoryId || 'books',
      categoryName: categories.find(c => c.id === productData.categoryId)?.name || 'General',
      relatedCourseIds: productData.relatedCourseIds || ['all'],
      type: productData.type || 'Physical',
      images: productData.images && productData.images.length > 0 ? productData.images : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'],
      price: saleVal,
      mrp: mrpVal,
      salePrice: saleVal,
      discountPercentage: discountPct,
      sku: productData.sku || `SKU-${targetId}`,
      stock: stockVal,
      stockStatus: stockStatus,
      lowStockAlert: productData.lowStockAlert || 5,
      bookDetails: productData.bookDetails,
      accessoryDetails: productData.accessoryDetails,
      digitalFile: productData.digitalFile,
      shipping: productData.shipping || { shippingRequired: productData.type !== 'Digital', freeShipping: false },
      seo: productData.seo,
      rating: existing?.rating || 5.0,
      reviewCount: existing?.reviewCount || 0,
      status: productData.status || 'published',
      isBestseller: productData.isBestseller ?? false,
      isNewArrival: productData.isNewArrival ?? true,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedList: ShopProduct[];
    if (existing) {
      updatedList = products.map(p => p.id === targetId ? fullProduct : p);
    } else {
      updatedList = [fullProduct, ...products];
    }
    saveProducts(updatedList);
    return fullProduct;
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    saveProducts(updated);
  };

  const duplicateProduct = (productId: string) => {
    const found = products.find(p => p.id === productId);
    if (!found) return;
    const dup: ShopProduct = {
      ...JSON.parse(JSON.stringify(found)),
      id: `PROD-${Date.now().toString().slice(-6)}`,
      name: `${found.name} (Copy)`,
      sku: `${found.sku}-COPY`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    saveProducts([dup, ...products]);
  };

  const toggleProductStatus = (productId: string) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const nextStatus: ShopProduct['status'] = p.status === 'published' ? 'draft' : 'published';
        return { ...p, status: nextStatus, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    saveProducts(updated);
  };

  const updateProductStock = (productId: string, newStock: number) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        let status: ShopProduct['stockStatus'] = 'In Stock';
        if (newStock === 0) status = 'Out of Stock';
        else if (newStock <= (p.lowStockAlert || 5)) status = 'Low Stock';
        return { ...p, stock: newStock, stockStatus: status, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    saveProducts(updated);
  };

  // COUPON & ORDER HANDLERS
  const upsertCoupon = (couponData: Partial<ShopCoupon>): ShopCoupon => {
    let id = couponData.id;
    if (!id) id = `COUPON-${Date.now().toString().slice(-6)}`;
    const existing = coupons.find(c => c.id === id);
    const full: ShopCoupon = {
      id,
      code: couponData.code ? couponData.code.toUpperCase().trim() : 'SAVE10',
      discountType: couponData.discountType || 'percentage',
      discountValue: Number(couponData.discountValue) || 10,
      minOrderAmount: Number(couponData.minOrderAmount) || 0,
      maxDiscountAmount: couponData.maxDiscountAmount ? Number(couponData.maxDiscountAmount) : undefined,
      startDate: couponData.startDate || new Date().toISOString().split('T')[0],
      expiryDate: couponData.expiryDate || '2027-12-31',
      usageLimit: couponData.usageLimit || 1000,
      usedCount: existing?.usedCount || 0,
      applicableCourses: couponData.applicableCourses || ['all'],
      applicableProducts: couponData.applicableProducts || ['all'],
      status: couponData.status || 'active'
    };
    const updated = existing ? coupons.map(c => c.id === id ? full : c) : [full, ...coupons];
    saveCoupons(updated);
    return full;
  };

  const deleteCoupon = (couponId: string) => {
    saveCoupons(coupons.filter(c => c.id !== couponId));
  };

  const applyCoupon = (code: string, subtotal: number, courseIds?: string[]) => {
    const cleaned = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleaned && c.status === 'active');
    if (!found) {
      return { success: false, message: 'Invalid or inactive coupon code.' };
    }
    if (found.minOrderAmount && subtotal < found.minOrderAmount) {
      return { success: false, message: `Minimum order amount for code ${cleaned} is ₹${found.minOrderAmount}.` };
    }
    let discount = 0;
    if (found.discountType === 'percentage') {
      discount = (subtotal * found.discountValue) / 100;
      if (found.maxDiscountAmount && discount > found.maxDiscountAmount) {
        discount = found.maxDiscountAmount;
      }
    } else {
      discount = found.discountValue;
    }
    return {
      success: true,
      message: `Coupon ${cleaned} applied successfully!`,
      discountAmount: Math.round(discount),
      coupon: found
    };
  };

  const placeShopOrder = (orderData: Partial<ShopOrder>): ShopOrder => {
    const orderNum = `ZEN-ORD-${(shopOrders.length + 1).toString().padStart(6, '0')}`;
    const id = orderData.id || orderNum;

    const sub = orderData.subtotal || 0;
    const disc = orderData.discountAmount || 0;
    const ship = orderData.shippingFee || 0;
    const tax = orderData.taxAmount || 0;
    const tot = orderData.totalAmount || (sub - disc + ship + tax);

    const newOrder: ShopOrder = {
      id,
      orderNumber: orderNum,
      studentId: orderData.studentId || user?.id,
      customerName: orderData.customerName || user?.name || 'Valued Customer',
      customerEmail: orderData.customerEmail || user?.email || 'customer@zenfotech.com',
      customerMobile: orderData.customerMobile || user?.mobile || '',
      shippingAddress: orderData.shippingAddress,
      items: orderData.items || [],
      subtotal: sub,
      discountAmount: disc,
      couponCode: orderData.couponCode,
      shippingFee: ship,
      taxAmount: tax,
      totalAmount: tot,
      paymentMethod: orderData.paymentMethod || 'DEMO PAYMENT',
      paymentStatus: orderData.paymentStatus || 'paid',
      orderStatus: orderData.orderStatus || 'Confirmed',
      isDemo: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveShopOrders([newOrder, ...shopOrders]);
    clearCart();

    // Deduct stock for ordered items
    const updatedProducts = products.map(p => {
      const match = newOrder.items.find(i => i.productId === p.id);
      if (match) {
        const remaining = Math.max(0, p.stock - match.quantity);
        let status = p.stockStatus;
        if (remaining === 0) status = 'Out of Stock';
        else if (remaining <= (p.lowStockAlert || 5)) status = 'Low Stock';
        return { ...p, stock: remaining, stockStatus: status };
      }
      return p;
    });
    saveProducts(updatedProducts);

    return newOrder;
  };

  const updateShopOrderStatus = (
    orderId: string,
    status: ShopOrder['orderStatus'],
    trackingInfo?: { trackingNumber?: string; shippingPartner?: string; trackingUrl?: string }
  ) => {
    const updated = shopOrders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: status,
          trackingNumber: trackingInfo?.trackingNumber || o.trackingNumber,
          shippingPartner: trackingInfo?.shippingPartner || o.shippingPartner,
          trackingUrl: trackingInfo?.trackingUrl || o.trackingUrl,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    });
    saveShopOrders(updated);
  };

  // CATEGORIES, REVIEWS, BUNDLES
  const upsertCategory = (catData: Partial<ShopCategory>): ShopCategory => {
    const id = catData.id || catData.slug || `cat-${Date.now()}`;
    const existing = categories.find(c => c.id === id);
    const full: ShopCategory = {
      id,
      name: catData.name || 'New Category',
      slug: catData.slug || catData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || id,
      description: catData.description || '',
      image: catData.image
    };
    saveCategories(existing ? categories.map(c => c.id === id ? full : c) : [...categories, full]);
    return full;
  };

  const deleteCategory = (catId: string) => {
    saveCategories(categories.filter(c => c.id !== catId));
  };

  const addProductReview = (reviewData: Partial<ProductReview>): ProductReview => {
    const id = `REV-${Date.now().toString().slice(-6)}`;
    const full: ProductReview = {
      id,
      productId: reviewData.productId || '',
      userName: reviewData.userName || user?.name || 'Anonymous Learner',
      userEmail: reviewData.userEmail || user?.email || '',
      rating: reviewData.rating || 5,
      comment: reviewData.comment || '',
      createdAt: new Date().toISOString(),
      verifiedPurchase: true,
      status: 'approved'
    };
    const updated = [full, ...reviews];
    saveReviews(updated);

    // Update product rating summary
    const prodReviews = updated.filter(r => r.productId === full.productId && r.status === 'approved');
    if (prodReviews.length > 0) {
      const avg = Number((prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length).toFixed(1));
      const updatedProds = products.map(p => {
        if (p.id === full.productId) {
          return { ...p, rating: avg, reviewCount: prodReviews.length };
        }
        return p;
      });
      saveProducts(updatedProds);
    }

    return full;
  };

  const updateReviewStatus = (reviewId: string, status: ProductReview['status']) => {
    saveReviews(reviews.map(r => r.id === reviewId ? { ...r, status } : r));
  };

  const deleteReview = (reviewId: string) => {
    saveReviews(reviews.filter(r => r.id !== reviewId));
  };

  const upsertBundle = (bundleData: Partial<ProductBundle>): ProductBundle => {
    const id = bundleData.id || `BUNDLE-${Date.now().toString().slice(-6)}`;
    const existing = bundles.find(b => b.id === id);
    const full: ProductBundle = {
      id,
      title: bundleData.title || 'New Bundle',
      description: bundleData.description || '',
      courseId: bundleData.courseId || '',
      courseTitle: bundleData.courseTitle || '',
      productIds: bundleData.productIds || [],
      mrpTotal: Number(bundleData.mrpTotal) || 0,
      bundlePrice: Number(bundleData.bundlePrice) || 0,
      savings: Number(bundleData.savings) || 0,
      image: bundleData.image,
      status: bundleData.status || 'active'
    };
    saveBundles(existing ? bundles.map(b => b.id === id ? full : b) : [...bundles, full]);
    return full;
  };

  const deleteBundle = (bundleId: string) => {
    saveBundles(bundles.filter(b => b.id !== bundleId));
  };

  const attachProductToCourse = (courseId: string, productId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const existing = c.relatedProductIds || [];
        if (!existing.includes(productId)) {
          return { ...c, relatedProductIds: [...existing, productId] };
        }
      }
      return c;
    });
    saveCourses(updated);

    // Also update product's relatedCourseIds
    const updatedProds = products.map(p => {
      if (p.id === productId) {
        const rel = p.relatedCourseIds || [];
        if (!rel.includes(courseId) && !rel.includes('all')) {
          return { ...p, relatedCourseIds: [...rel, courseId] };
        }
      }
      return p;
    });
    saveProducts(updatedProds);
  };

  const detachProductFromCourse = (courseId: string, productId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId && c.relatedProductIds) {
        return { ...c, relatedProductIds: c.relatedProductIds.filter(id => id !== productId) };
      }
      return c;
    });
    saveCourses(updated);
  };

  const saveExamAttempts = useCallback((newAttempts: ExamAttempt[]) => {
    setExamAttempts(newAttempts);
    localStorage.setItem(STORAGE_KEYS.EXAM_ATTEMPTS, JSON.stringify(newAttempts));
  }, []);

  const saveStudents = useCallback((newStudents: User[]) => {
    setStudents(newStudents);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(newStudents));
  }, []);

  // Auth methods
  const login = (email: string, password: string): { success: boolean; message: string; role?: 'student' | 'admin' } => {
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail === 'admin@zenfotech.com') {
      if (password === 'Admin@123' || password === 'admin') {
        saveUser(DEMO_ADMIN);
        return { success: true, message: 'Welcome back Admin!', role: 'admin' };
      }
      return { success: false, message: 'Invalid admin password. Use: Admin@123' };
    }

    if (cleanEmail === 'student@zenfotech.com') {
      if (password === 'Demo@123' || password === 'demo' || password === 'student') {
        saveUser(DEMO_STUDENT);
        return { success: true, message: 'Welcome back, Rahul!', role: 'student' };
      }
      return { success: false, message: 'Invalid student password. Use: Demo@123' };
    }

    // Dynamic registered student search
    const foundStudent = students.find(s => s.email.toLowerCase() === cleanEmail);
    if (foundStudent) {
      if (foundStudent.status === 'suspended') {
        return { success: false, message: 'Your student account has been suspended by Admin.' };
      }
      saveUser(foundStudent);
      return { success: true, message: `Welcome back, ${foundStudent.name}!`, role: 'student' };
    }

    return { success: false, message: 'Invalid credentials. Please use demo options on the login screen.' };
  };

  const register = (name: string, email: string, mobile: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = students.find(s => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email: cleanEmail,
      mobile,
      role: 'student',
      enrolledAt: new Date().toISOString(),
      status: 'active'
    };

    const updatedStudents = [...students, newUser];
    saveStudents(updatedStudents);
    saveUser(newUser);

    return { success: true, message: 'Account registered successfully!' };
  };

  const logout = () => {
    saveUser(null);
  };

  // Lesson & Progress methods
  const markLessonComplete = (lessonId: string) => {
    const currentCompleted = progress.completedLessonIds || [];
    if (!currentCompleted.includes(lessonId)) {
      const updated = [...currentCompleted, lessonId];
      saveProgress({
        ...progress,
        completedLessonIds: updated
      });

      // Add notification
      const newNotif: AppNotification = {
        id: `notif_${Date.now()}`,
        title: 'Lesson Completed',
        message: 'Progress updated successfully.',
        createdAt: new Date().toISOString(),
        read: false,
        type: 'info'
      };
      saveNotifications([newNotif, ...notifications]);
    }
  };

  const submitQuiz = (quizId: string, scorePercentage: number) => {
    const updatedQuizzes = {
      ...(progress.completedQuizIds || {}),
      [quizId]: scorePercentage
    };
    saveProgress({
      ...progress,
      completedQuizIds: updatedQuizzes
    });
  };

  // Exam Submission & Automated Evaluation Engine
  const submitExam = (answers: Record<string, string | number>, examIdParam?: string): ExamAttempt => {
    const activeExam = (examIdParam ? exams.find(e => e.id === examIdParam) : null) || exam || INITIAL_EXAM;
    const activeCourse = courses.find(c => c.id === activeExam.courseId);

    const previousAttempts = examAttempts.filter(a => a.examId === activeExam.id && a.studentId === (user?.id || DEMO_STUDENT.id));
    const attemptNumber = previousAttempts.length + 1;

    const attempt = evaluateExamSubmission({
      exam: activeExam,
      answers,
      studentId: user?.id || DEMO_STUDENT.id,
      studentName: user?.name || DEMO_STUDENT.name,
      studentEmail: user?.email || DEMO_STUDENT.email,
      courseTitle: activeCourse?.title || 'AI Industry Certification Program',
      startedAt: new Date(Date.now() - (activeExam.durationMinutes || 30) * 60 * 1000).toISOString(),
      attemptNumber
    });

    const updatedAttempts = [attempt, ...examAttempts];
    saveExamAttempts(updatedAttempts);

    const allUserAttempts = updatedAttempts.filter(a => a.studentId === (user?.id || DEMO_STUDENT.id));
    const passedAttempt = allUserAttempts.find(a => a.passed);

    let cert: Certificate | undefined = progress.certificate;

    if (attempt.passed || passedAttempt) {
      const bestScore = Math.max(...allUserAttempts.map(a => a.percentage));
      cert = {
        id: cert?.id || `ZAA-2026-${String(Math.floor(Math.random() * 900000) + 100000)}`,
        studentId: user?.id || DEMO_STUDENT.id,
        studentName: user?.name || DEMO_STUDENT.name,
        courseTitle: activeCourse?.title || 'AI Industry Certification Program',
        issueDate: cert?.issueDate || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'valid',
        scorePercentage: bestScore,
        verificationUrl: `https://zenfotech.com/verify`
      };
    } else {
      cert = cert ? { ...cert, status: 'locked' } : undefined;
    }

    saveProgress({
      ...progress,
      examAttempt: attempt,
      certificate: cert
    });

    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: attempt.passed ? 'Examination Passed!' : 'Examination Attempted',
      message: attempt.passed
        ? `Congratulations! You scored ${attempt.percentage}% and passed "${activeExam.title}". Certificate unlocked!`
        : `You scored ${attempt.percentage}% on "${activeExam.title}". Passing threshold is ${activeExam.passingPercentage}%. You can retake the exam.`,
      createdAt: new Date().toISOString(),
      read: false,
      type: attempt.passed ? 'certificate' : 'warning'
    };
    saveNotifications([newNotif, ...notifications]);

    return attempt;
  };

  // Exam Management CRUD
  const upsertExam = (examData: Partial<Exam> & { title: string; courseId: string }): Exam => {
    const existingIdx = exams.findIndex(e => e.id === examData.id);
    let targetExam: Exam;

    if (existingIdx >= 0) {
      targetExam = {
        ...exams[existingIdx],
        ...examData,
        totalQuestions: examData.questions ? examData.questions.length : exams[existingIdx].questions.length,
        updatedAt: new Date().toISOString()
      };
      const updatedList = [...exams];
      updatedList[existingIdx] = targetExam;
      saveExams(updatedList);
    } else {
      const newId = examData.id || `EXAM-${String(exams.length + 1).padStart(6, '0')}`;
      targetExam = {
        id: newId,
        title: examData.title,
        courseId: examData.courseId,
        moduleId: examData.moduleId,
        description: examData.description || '',
        durationMinutes: examData.durationMinutes || 30,
        totalQuestions: examData.questions ? examData.questions.length : 20,
        passingPercentage: examData.passingPercentage || 60,
        maxAttempts: examData.maxAttempts ?? 1,
        examType: examData.examType || 'Final Examination',
        status: examData.status || 'published',
        questions: examData.questions || INITIAL_EXAM.questions,
        randomizeQuestions: examData.randomizeQuestions ?? false,
        randomizeOptions: examData.randomizeOptions ?? false,
        negativeMarking: examData.negativeMarking ?? false,
        negativeMarksPerWrong: examData.negativeMarksPerWrong ?? 0.25,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      saveExams([targetExam, ...exams]);
    }
    return targetExam;
  };

  const deleteExam = (examId: string) => {
    const updated = exams.filter(e => e.id !== examId);
    saveExams(updated);
  };

  const toggleExamStatus = (examId: string) => {
    const updated = exams.map(e => {
      if (e.id === examId) {
        return { ...e, status: (e.status === 'published' ? 'draft' : 'published') as 'draft' | 'published' };
      }
      return e;
    });
    saveExams(updated);
  };

  const addQuestionToExam = (examId: string, qData: Omit<ExamQuestion, 'id'>) => {
    const newQ: ExamQuestion = {
      ...qData,
      id: `eq_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    };
    const updatedExams = exams.map(e => {
      if (e.id === examId || (!examId && e.id === exam.id)) {
        const questions = [...(e.questions || []), newQ];
        return {
          ...e,
          questions,
          totalQuestions: questions.length,
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    });
    saveExams(updatedExams);
  };

  const updateQuestionInExam = (examId: string, questionId: string, qData: Partial<ExamQuestion>) => {
    const updatedExams = exams.map(e => {
      if (e.id === examId || (!examId && e.id === exam.id)) {
        const questions = (e.questions || []).map(q => q.id === questionId ? { ...q, ...qData } : q);
        return {
          ...e,
          questions,
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    });
    saveExams(updatedExams);
  };

  const deleteQuestionFromExam = (examId: string, questionId: string) => {
    const updatedExams = exams.map(e => {
      if (e.id === examId || (!examId && e.id === exam.id)) {
        const questions = (e.questions || []).filter(q => q.id !== questionId);
        return {
          ...e,
          questions,
          totalQuestions: questions.length,
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    });
    saveExams(updatedExams);
  };

  const duplicateQuestionInExam = (examId: string, questionId: string) => {
    const targetExam = exams.find(e => e.id === examId) || exam;
    const foundQ = targetExam.questions.find(q => q.id === questionId);
    if (!foundQ) return;

    const dupQ: ExamQuestion = {
      ...foundQ,
      id: `eq_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      question: `${foundQ.question} (Copy)`
    };

    const updatedExams = exams.map(e => {
      if (e.id === targetExam.id) {
        const idx = e.questions.findIndex(q => q.id === questionId);
        const questions = [...e.questions];
        questions.splice(idx + 1, 0, dupQ);
        return {
          ...e,
          questions,
          totalQuestions: questions.length,
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    });
    saveExams(updatedExams);
  };

  const deleteExamAttempt = (attemptId: string) => {
    const updated = examAttempts.filter(a => a.id !== attemptId);
    saveExamAttempts(updated);
  };

  // Payment Demo Flow
  const processDemoPayment = (courseId: string, paymentMethod: 'UPI' | 'Card' | 'Net Banking'): Order => {
    const course = courses.find(c => c.id === courseId) || courses[0];
    const taxAmount = Math.round(course.price * 0.18);

    const newOrder: Order = {
      id: `ORD-ZAA-${Math.floor(Math.random() * 9000) + 1000}`,
      transactionId: `TXN-${Math.floor(Math.random() * 90000000) + 10000000}`,
      enrollmentId: `ZAA-ENR-2026-${Math.floor(Math.random() * 9000) + 1000}`,
      studentId: user?.id || DEMO_STUDENT.id,
      studentName: user?.name || DEMO_STUDENT.name,
      studentEmail: user?.email || DEMO_STUDENT.email,
      courseId: course.id,
      courseTitle: course.title,
      amount: course.price,
      originalAmount: course.originalPrice,
      taxAmount,
      paymentMethod,
      paymentStatus: 'paid',
      createdAt: new Date().toISOString()
    };

    saveOrders([newOrder, ...orders]);

    // Add Notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: 'Demo Payment Successful',
      message: `Payment of ₹${course.price.toLocaleString('en-IN')} confirmed for ${course.title}. Order ID: ${newOrder.id}`,
      createdAt: new Date().toISOString(),
      read: false,
      type: 'success'
    };
    saveNotifications([newNotif, ...notifications]);

    return newOrder;
  };

  // Certificate Verification
  const verifyCertificate = (certId: string): Certificate | null => {
    const cleanId = certId.trim().toUpperCase();
    if (progress.certificate && progress.certificate.id.toUpperCase() === cleanId) {
      return progress.certificate;
    }
    if (cleanId === 'ZAA-2026-000001') {
      return INITIAL_CERTIFICATE;
    }
    return null;
  };

  // Notification methods
  const markNotificationRead = (notifId: string) => {
    const updated = notifications.map(n => n.id === notifId ? { ...n, read: true } : n);
    saveNotifications(updated);
  };

  const clearAllNotifications = () => {
    saveNotifications([]);
  };

  // Admin methods
  const addQuestion = (newQuestion: Omit<Exam['questions'][0], 'id'>) => {
    const question = {
      ...newQuestion,
      id: `eq_${Date.now()}`
    };
    const updatedExam = {
      ...exam,
      totalQuestions: exam.questions.length + 1,
      questions: [...exam.questions, question]
    };
    saveExam(updatedExam);
  };

  const deleteQuestion = (qId: string) => {
    const updatedQuestions = exam.questions.filter(q => q.id !== qId);
    saveExam({
      ...exam,
      totalQuestions: updatedQuestions.length,
      questions: updatedQuestions
    });
  };

  const broadcastNotification = (title: string, message: string) => {
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      createdAt: new Date().toISOString(),
      read: false,
      type: 'info',
      targetRole: 'all'
    };
    saveNotifications([newNotif, ...notifications]);
  };

  const toggleStudentStatus = (studentId: string) => {
    const updated = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          status: (s.status === 'active' ? 'suspended' : 'active') as 'active' | 'suspended'
        };
      }
      return s;
    });
    saveStudents(updated);
  };

  const revokeCertificate = () => {
    if (progress.certificate) {
      saveProgress({
        ...progress,
        certificate: {
          ...progress.certificate,
          status: 'revoked'
        }
      });
    }
  };

  // Course, Module & Lesson Management CRUD
  const upsertCourse = (courseData: Course) => {
    const existingIndex = courses.findIndex(c => c.id === courseData.id);
    const updatedCourse: Course = {
      ...courseData,
      status: courseData.status || 'published',
      updatedAt: new Date().toISOString(),
      createdAt: courseData.createdAt || new Date().toISOString(),
      modules: courseData.modules || []
    };

    let updatedList: Course[];
    if (existingIndex >= 0) {
      updatedList = [...courses];
      updatedList[existingIndex] = updatedCourse;
    } else {
      updatedList = [updatedCourse, ...courses];
    }

    saveCourses(updatedList);
    return updatedCourse;
  };

  const deleteCourse = (courseId: string) => {
    const updated = courses.filter(c => c.id !== courseId);
    saveCourses(updated);
  };

  const duplicateCourse = (courseId: string): Course | null => {
    const original = courses.find(c => c.id === courseId);
    if (!original) return null;

    const newCourseId = `course_${Date.now()}`;
    const duplicated: Course = {
      ...JSON.parse(JSON.stringify(original)),
      id: newCourseId,
      title: `${original.title} Copy`,
      badge: 'Duplicated Program',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: {
        ...(original.seo || {}),
        slug: `${original.seo?.slug || 'course'}-copy-${Date.now().toString().slice(-4)}`
      }
    };

    // re-id modules and lessons
    duplicated.modules = (duplicated.modules || []).map((m, mIdx) => ({
      ...m,
      id: `mod_${Date.now()}_${mIdx}`,
      courseId: newCourseId,
      lessons: (m.lessons || []).map((l, lIdx) => ({
        ...l,
        id: `les_${Date.now()}_${mIdx}_${lIdx}`,
        courseId: newCourseId,
        moduleId: `mod_${Date.now()}_${mIdx}`
      }))
    }));

    saveCourses([duplicated, ...courses]);
    return duplicated;
  };

  const toggleCourseStatus = (courseId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const nextStatus = c.status === 'published' ? 'draft' : 'published';
        return { ...c, status: nextStatus as 'draft' | 'published', updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const addOrUpdateModule = (courseId: string, moduleData: Partial<Module> & { title: string }) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = [...(c.modules || [])];
        if (moduleData.id) {
          const modIndex = modules.findIndex(m => m.id === moduleData.id);
          if (modIndex >= 0) {
            modules[modIndex] = {
              ...modules[modIndex],
              ...moduleData,
              title: moduleData.title
            };
          }
        } else {
          const newMod: Module = {
            id: `mod_${Date.now()}`,
            courseId,
            order: modules.length + 1,
            moduleNumber: modules.length + 1,
            title: moduleData.title,
            description: moduleData.description || '',
            estimatedHours: moduleData.estimatedHours || 2,
            status: moduleData.status || 'published',
            lessons: []
          };
          modules.push(newMod);
        }
        return { ...c, modules, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const deleteModule = (courseId: string, moduleId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = (c.modules || []).filter(m => m.id !== moduleId);
        return { ...c, modules, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const reorderModules = (courseId: string, moduleIds: string[]) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const currentMods = c.modules || [];
        const reordered: Module[] = [];
        moduleIds.forEach((id, index) => {
          const found = currentMods.find(m => m.id === id);
          if (found) {
            reordered.push({ ...found, order: index + 1, moduleNumber: index + 1 });
          }
        });
        return { ...c, modules: reordered, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const addOrUpdateLesson = (courseId: string, moduleId: string, lessonData: Partial<Lesson> & { title: string }) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = (c.modules || []).map(m => {
          if (m.id === moduleId) {
            const lessons = [...(m.lessons || [])];
            if (lessonData.id) {
              const lesIdx = lessons.findIndex(l => l.id === lessonData.id);
              if (lesIdx >= 0) {
                lessons[lesIdx] = {
                  ...lessons[lesIdx],
                  ...lessonData,
                  title: lessonData.title,
                  updatedAt: new Date().toISOString()
                };
              }
            } else {
              const newLesson: Lesson = {
                id: `les_${Date.now()}`,
                courseId,
                moduleId,
                lessonNumber: lessons.length + 1,
                title: lessonData.title,
                shortDescription: lessonData.shortDescription || '',
                summary: lessonData.shortDescription || lessonData.summary || '',
                contentMarkdown: lessonData.contentMarkdown || lessonData.content || '',
                content: lessonData.content || lessonData.contentMarkdown || '',
                durationMinutes: lessonData.durationMinutes || 15,
                learningHours: lessonData.learningHours || 0.25,
                type: lessonData.type || 'video',
                videoUrl: lessonData.videoUrl,
                videoFileName: lessonData.videoFileName,
                videoFileSize: lessonData.videoFileSize,
                resources: lessonData.resources || [],
                attachments: lessonData.attachments || [],
                images: lessonData.images || [],
                quiz: lessonData.quiz,
                settings: lessonData.settings || {
                  isFreePreview: false,
                  allowComments: true,
                  isRequired: true,
                  sequentialLearning: true,
                  downloadResources: true,
                  certificateRequirement: true
                },
                status: lessonData.status || 'published',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };
              lessons.push(newLesson);
            }
            return { ...m, lessons };
          }
          return m;
        });

        // Recalculate lesson count and learning hours
        const allLessons = modules.flatMap(m => m.lessons || []);
        const totalMin = allLessons.reduce((acc, l) => acc + (l.durationMinutes || 15), 0);
        const totalHours = Math.ceil(totalMin / 60) || 1;

        return {
          ...c,
          modules,
          lessonCount: allLessons.length,
          learningHours: totalHours,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    });
    saveCourses(updated);
  };

  const deleteLesson = (courseId: string, moduleId: string, lessonId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = (c.modules || []).map(m => {
          if (m.id === moduleId) {
            const lessons = (m.lessons || []).filter(l => l.id !== lessonId);
            return { ...m, lessons };
          }
          return m;
        });

        const allLessons = modules.flatMap(m => m.lessons || []);
        const totalMin = allLessons.reduce((acc, l) => acc + (l.durationMinutes || 15), 0);

        return {
          ...c,
          modules,
          lessonCount: allLessons.length,
          learningHours: Math.ceil(totalMin / 60) || 1,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    });
    saveCourses(updated);
  };

  const duplicateLesson = (courseId: string, moduleId: string, lessonId: string) => {
    let sourceLesson: Lesson | null = null;
    courses.forEach(c => {
      if (c.id === courseId) {
        c.modules.forEach(m => {
          if (m.id === moduleId) {
            const found = m.lessons.find(l => l.id === lessonId);
            if (found) sourceLesson = found;
          }
        });
      }
    });

    if (!sourceLesson) return;

    const dup: Lesson = {
      ...JSON.parse(JSON.stringify(sourceLesson)),
      id: `les_${Date.now()}`,
      title: `${(sourceLesson as Lesson).title} Copy`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addOrUpdateLesson(courseId, moduleId, dup);
  };

  const toggleLessonStatus = (courseId: string, moduleId: string, lessonId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = (c.modules || []).map(m => {
          if (m.id === moduleId) {
            const lessons = (m.lessons || []).map(l => {
              if (l.id === lessonId) {
                const nextStatus = l.status === 'published' ? 'draft' : 'published';
                return { ...l, status: nextStatus as 'draft' | 'published', updatedAt: new Date().toISOString() };
              }
              return l;
            });
            return { ...m, lessons };
          }
          return m;
        });
        return { ...c, modules, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const importCoursesAndLessons = (importedData: Course[]) => {
    if (!Array.isArray(importedData)) return false;
    saveCourses(importedData);
    return true;
  };

  const exportCoursesAndLessons = () => {
    return JSON.stringify(courses, null, 2);
  };

  // Reset Demo
  const resetDemo = () => {
    localStorage.clear();
    setUser(DEMO_STUDENT);
    setCourses(INITIAL_COURSES);
    setProgress(DEFAULT_PROGRESS);
    setOrders(INITIAL_ORDERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setExam(INITIAL_EXAM);
    setStudents([DEMO_STUDENT]);
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    setWishlist([]);
    setShopOrders(INITIAL_SHOP_ORDERS);
    setCoupons(INITIAL_SHOP_COUPONS);
    setCategories(INITIAL_SHOP_CATEGORIES);
    setReviews(INITIAL_PRODUCT_REVIEWS);
    setBundles(INITIAL_SHOP_BUNDLES);
  };

  return {
    isInitialized,
    user,
    courses,
    progress,
    orders,
    notifications,
    exam,
    exams,
    examAttempts,
    students,
    products,
    cart,
    wishlist,
    shopOrders,
    coupons,
    categories,
    reviews,
    bundles,
    login,
    register,
    logout,
    markLessonComplete,
    submitQuiz,
    submitExam,
    upsertExam,
    deleteExam,
    toggleExamStatus,
    addQuestionToExam,
    updateQuestionInExam,
    deleteQuestionFromExam,
    duplicateQuestionInExam,
    deleteExamAttempt,
    processDemoPayment,
    verifyCertificate,
    markNotificationRead,
    clearAllNotifications,
    addQuestion,
    deleteQuestion,
    broadcastNotification,
    toggleStudentStatus,
    revokeCertificate,
    resetDemo,
    upsertCourse,
    deleteCourse,
    duplicateCourse,
    toggleCourseStatus,
    addOrUpdateModule,
    deleteModule,
    reorderModules,
    addOrUpdateLesson,
    deleteLesson,
    duplicateLesson,
    toggleLessonStatus,
    importCoursesAndLessons,
    exportCoursesAndLessons,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleWishlist,
    upsertProduct,
    deleteProduct,
    duplicateProduct,
    toggleProductStatus,
    updateProductStock,
    upsertCoupon,
    deleteCoupon,
    applyCoupon,
    placeShopOrder,
    updateShopOrderStatus,
    upsertCategory,
    deleteCategory,
    addProductReview,
    updateReviewStatus,
    deleteReview,
    upsertBundle,
    deleteBundle,
    attachProductToCourse,
    detachProductFromCourse
  };
}
