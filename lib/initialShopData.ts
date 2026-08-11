import { ShopProduct, ShopCategory, ShopCoupon, ProductBundle, ShopOrder, ProductReview } from './types';

export const INITIAL_SHOP_CATEGORIES: ShopCategory[] = [
  { id: 'books', name: 'Books', slug: 'books', description: 'Official textbook guides, handbooks, and reference books for AI courses.' },
  { id: 'study-material', name: 'Study Material', slug: 'study-material', description: 'Printed notes, cheat sheets, flashcards, and quick revision workbooks.' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Desk pads, pre-loaded USB drives, cables, and hardware learning aids.' },
  { id: 'course-kits', name: 'Course Kits', slug: 'course-kits', description: 'All-in-one comprehensive learning boxes combining books, notes, and accessories.' },
  { id: 'stationery', name: 'Stationery', slug: 'stationery', description: 'High-quality AI notebooks, grid planners, and branded pens.' },
  { id: 'merchandise', name: 'Merchandise', slug: 'merchandise', description: 'Official Zenfotech AI Academy hoodies, t-shirts, caps, and stickers.' },
  { id: 'digital-products', name: 'Digital Products', slug: 'digital-products', description: 'Downloadable eBooks, PDF templates, and automation blueprint ZIP files.' },
];

export const INITIAL_PRODUCTS: ShopProduct[] = [
  {
    id: 'PROD-BOOK-001',
    name: 'AI Industry Certification Complete Guide & Handbook',
    slug: 'ai-industry-certification-complete-guide',
    shortDescription: 'The definitive textbook for mastering enterprise AI, Transformer architecture, LLMs, and agentic workflows.',
    description: 'Specially compiled by Zenfotech AI Academy senior instructors, this comprehensive paperback guide covers every module of the AI Industry Certification Program. Includes 500+ diagrams, model mathematical derivations, prompt templates, and exam practice questions.',
    categoryId: 'books',
    categoryName: 'Books',
    relatedCourseIds: ['ai-industry-certification'],
    type: 'Both',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=80'
    ],
    price: 799,
    mrp: 1199,
    salePrice: 799,
    discountPercentage: 33,
    sku: 'ZAF-BK-001',
    stock: 45,
    stockStatus: 'In Stock',
    lowStockAlert: 10,
    bookDetails: {
      author: 'Dr. Vikramaditya Sen & Zenfotech AI Faculty',
      publisher: 'Zenfotech Academic Press',
      isbn: '978-81-954321-0-1',
      edition: '2026 3rd Revised Edition',
      language: 'English',
      pages: 480,
      publicationDate: '2026-01-15',
      format: 'Paperback'
    },
    digitalFile: {
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileName: 'AI_Industry_Certification_Handbook_2026.pdf',
      fileSize: '42.5 MB',
      fileType: 'PDF'
    },
    shipping: {
      shippingRequired: true,
      weightKg: 0.65,
      lengthCm: 24,
      widthCm: 18,
      heightCm: 3,
      shippingClass: 'Standard Express',
      freeShipping: true
    },
    seo: {
      title: 'AI Industry Certification Handbook - Zenfotech',
      description: 'Official printed handbook and eBook for Zenfotech AI Industry Certification.',
      keywords: 'AI book, machine learning handbook, prompt engineering book',
      slug: 'ai-industry-certification-complete-guide'
    },
    rating: 4.9,
    reviewCount: 128,
    status: 'published',
    isBestseller: true,
    isNewArrival: false,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'PROD-BOOK-002',
    name: 'Generative AI & Systemic Prompt Engineering Workbook',
    slug: 'generative-ai-prompt-engineering-workbook',
    shortDescription: 'Hands-on prompt laboratory workbook with 150+ real-world enterprise prompt templates and exercises.',
    description: 'Master Chain-of-Thought prompting, Few-Shot alignment, XML structural tags, and guardrailing techniques. Designed directly for the Generative AI & Prompt Engineering Masterclass.',
    categoryId: 'books',
    categoryName: 'Books',
    relatedCourseIds: ['generative-ai-prompt-engineering', 'ai-industry-certification'],
    type: 'Both',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80'
    ],
    price: 499,
    mrp: 899,
    salePrice: 499,
    discountPercentage: 44,
    sku: 'ZAF-BK-002',
    stock: 60,
    stockStatus: 'In Stock',
    lowStockAlert: 15,
    bookDetails: {
      author: 'Ananya Sharma & Zenfotech GenAI Lab',
      publisher: 'Zenfotech Academic Press',
      isbn: '978-81-954321-1-8',
      edition: '2026 Edition',
      language: 'English',
      pages: 260,
      publicationDate: '2026-02-01',
      format: 'Paperback'
    },
    digitalFile: {
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileName: 'Generative_AI_Prompt_Workbook.pdf',
      fileSize: '28.1 MB',
      fileType: 'PDF'
    },
    shipping: {
      shippingRequired: true,
      weightKg: 0.42,
      lengthCm: 22,
      widthCm: 15,
      heightCm: 2,
      shippingClass: 'Standard Express',
      freeShipping: false
    },
    rating: 4.8,
    reviewCount: 94,
    status: 'published',
    isBestseller: true,
    isNewArrival: true,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'PROD-KIT-001',
    name: 'Zenfotech AI Certification Physical Study Kit (Box Set)',
    slug: 'ai-certification-physical-study-kit',
    shortDescription: 'Ultimate physical study box including Textbook, Notebook, Flashcards, Desk Mat, and Pre-loaded USB Drive.',
    description: 'Accelerate your learning experience with our all-in-one deluxe student kit. Box includes: 1x AI Handbook (Printed), 1x Hardcover Grid Notebook, 1x Flashcard Deck (50 key concepts), 1x 128GB Pre-loaded USB 3.2 Drive with offline datasets, and 1x Official Metallic AI Academy Lapel Badge.',
    categoryId: 'course-kits',
    categoryName: 'Course Kits',
    relatedCourseIds: ['ai-industry-certification'],
    type: 'Physical',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80'
    ],
    price: 1499,
    mrp: 2499,
    salePrice: 1499,
    discountPercentage: 40,
    sku: 'ZAF-KT-001',
    stock: 22,
    stockStatus: 'In Stock',
    lowStockAlert: 5,
    shipping: {
      shippingRequired: true,
      weightKg: 1.45,
      lengthCm: 30,
      widthCm: 24,
      heightCm: 10,
      shippingClass: 'Express Box',
      freeShipping: true
    },
    rating: 5.0,
    reviewCount: 56,
    status: 'published',
    isBestseller: true,
    isNewArrival: false,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'PROD-ACC-001',
    name: 'Zenfotech High-Speed USB 3.2 Drive (128GB - Pre-loaded)',
    slug: 'zenfotech-high-speed-usb-drive-128gb',
    shortDescription: 'Pre-loaded with offline AI models, Python datasets, code notebooks, and video lecture downloads.',
    description: 'High-speed metal body dual-connector USB-C & USB-A drive containing 100GB+ of curated AI datasets, open-source weights (Llama 3, Qwen, Mistral quantization scripts), Jupyter notebooks, and offline reference docs.',
    categoryId: 'accessories',
    categoryName: 'Accessories',
    relatedCourseIds: ['all'],
    type: 'Physical',
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80'
    ],
    price: 999,
    mrp: 1499,
    salePrice: 999,
    discountPercentage: 33,
    sku: 'ZAF-AC-001',
    stock: 35,
    stockStatus: 'In Stock',
    lowStockAlert: 8,
    accessoryDetails: {
      brand: 'Zenfotech Tech Hardware',
      material: 'Aluminum Alloy Casing',
      color: 'Space Gray / Matte Black',
      size: '128GB Ultra Speed',
      weight: '35 grams'
    },
    shipping: {
      shippingRequired: true,
      weightKg: 0.1,
      lengthCm: 10,
      widthCm: 8,
      heightCm: 2,
      shippingClass: 'Standard Express',
      freeShipping: false
    },
    rating: 4.8,
    reviewCount: 41,
    status: 'published',
    isBestseller: false,
    isNewArrival: true,
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-10T10:00:00Z'
  },
  {
    id: 'PROD-STN-001',
    name: 'Zenfotech AI Student Hardcover Grid Notebook',
    slug: 'zenfotech-ai-student-hardcover-notebook',
    shortDescription: 'Premium 120 GSM dot-grid notebook with cheat sheets for neural networks, transformers, and prompt formulas.',
    description: 'Designed specifically for AI students. Includes 200 bleed-proof pages, bookmark ribbon, elastic closure, back envelope pocket, and 16 pages of built-in reference cheat sheets.',
    categoryId: 'stationery',
    categoryName: 'Stationery',
    relatedCourseIds: ['all'],
    type: 'Physical',
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
    ],
    price: 249,
    mrp: 399,
    salePrice: 249,
    discountPercentage: 38,
    sku: 'ZAF-ST-001',
    stock: 80,
    stockStatus: 'In Stock',
    lowStockAlert: 20,
    accessoryDetails: {
      brand: 'Zenfotech Stationery',
      material: 'Vegan Leather Hardcover & 120 GSM Paper',
      color: 'Midnight Blue & Gold foil',
      size: 'A5 (148 x 210 mm)',
      weight: '380 grams'
    },
    shipping: {
      shippingRequired: true,
      weightKg: 0.4,
      lengthCm: 21,
      widthCm: 15,
      heightCm: 2,
      shippingClass: 'Standard Express',
      freeShipping: false
    },
    rating: 4.9,
    reviewCount: 112,
    status: 'published',
    isBestseller: true,
    isNewArrival: false,
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-01-05T10:00:00Z'
  },
  {
    id: 'PROD-DIG-001',
    name: 'Machine Learning & Statistical Formula Architecture eBook (PDF)',
    slug: 'machine-learning-statistical-formula-ebook',
    shortDescription: 'Complete formula reference guide with mathematical proofs and Python scikit-learn implementation snippets.',
    description: 'Instant download digital reference covering regression equations, matrix calculus for backpropagation, loss functions, probability distributions, and ROC curves.',
    categoryId: 'digital-products',
    categoryName: 'Digital Products',
    relatedCourseIds: ['machine-learning-data-intelligence', 'ai-industry-certification'],
    type: 'Digital',
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    price: 399,
    mrp: 699,
    salePrice: 399,
    discountPercentage: 43,
    sku: 'ZAF-DG-001',
    stock: 999,
    stockStatus: 'In Stock',
    digitalFile: {
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileName: 'ML_Statistical_Formula_Guide.pdf',
      fileSize: '18.4 MB',
      fileType: 'PDF'
    },
    rating: 4.7,
    reviewCount: 65,
    status: 'published',
    isBestseller: false,
    isNewArrival: true,
    createdAt: '2026-02-05T10:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z'
  },
  {
    id: 'PROD-DIG-002',
    name: 'No-Code AI Automation Blueprint & Workflow Kit (ZIP)',
    slug: 'no-code-ai-automation-blueprint-kit',
    shortDescription: 'Downloadable Zapier, Make, and Python FastAPI template workflows for business automation.',
    description: 'Includes 25+ ready-to-import JSON blueprints for automated customer email replies, PDF invoice parser agents, Slack AI summarizers, and CRM sync pipelines.',
    categoryId: 'digital-products',
    categoryName: 'Digital Products',
    relatedCourseIds: ['ai-automation-for-business'],
    type: 'Digital',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    ],
    price: 699,
    mrp: 1299,
    salePrice: 699,
    discountPercentage: 46,
    sku: 'ZAF-DG-002',
    stock: 999,
    stockStatus: 'In Stock',
    digitalFile: {
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileName: 'AI_Automation_Blueprints_Pack.zip',
      fileSize: '35.8 MB',
      fileType: 'ZIP'
    },
    rating: 4.8,
    reviewCount: 38,
    status: 'published',
    isBestseller: false,
    isNewArrival: true,
    createdAt: '2026-02-08T10:00:00Z',
    updatedAt: '2026-02-08T10:00:00Z'
  },
  {
    id: 'PROD-MER-001',
    name: 'Zenfotech AI Academy Premium Heavyweight Hoodie',
    slug: 'zenfotech-ai-academy-premium-hoodie',
    shortDescription: '100% Organic combed cotton 380 GSM fleece hoodie with embroidered Zenfotech AI emblem.',
    description: 'Stay warm while building future tech. Features double-lined hood, heavy brass aglets, front kangaroo pocket, and minimal high-density chest embroidery.',
    categoryId: 'merchandise',
    categoryName: 'Merchandise',
    relatedCourseIds: ['all'],
    type: 'Physical',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80'
    ],
    price: 1299,
    mrp: 1999,
    salePrice: 1299,
    discountPercentage: 35,
    sku: 'ZAF-MC-001',
    stock: 25,
    stockStatus: 'In Stock',
    lowStockAlert: 5,
    accessoryDetails: {
      brand: 'Zenfotech Apparel',
      material: '100% Organic Cotton Fleece (380 GSM)',
      color: 'Charcoal Slate / Deep Amber Logo',
      size: 'Regular Fit (M, L, XL)',
      weight: '750 grams'
    },
    shipping: {
      shippingRequired: true,
      weightKg: 0.8,
      lengthCm: 35,
      widthCm: 28,
      heightCm: 5,
      shippingClass: 'Standard Express',
      freeShipping: true
    },
    rating: 4.9,
    reviewCount: 82,
    status: 'published',
    isBestseller: false,
    isNewArrival: false,
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-01-12T10:00:00Z'
  },
  {
    id: 'PROD-MAT-001',
    name: 'Prompt Engineering Flashcard Deck (50 Essential Cards)',
    slug: 'prompt-engineering-flashcard-deck',
    shortDescription: 'Pocket-sized durable card deck for mastering prompt patterns, temperature controls, and parameter settings.',
    description: '50 heavy plastic-coated cards covering system roles, few-shot structures, output schemas, reasoning steps, guardrails, and model context limits.',
    categoryId: 'study-material',
    categoryName: 'Study Material',
    relatedCourseIds: ['generative-ai-prompt-engineering', 'ai-industry-certification'],
    type: 'Physical',
    images: [
      'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80'
    ],
    price: 349,
    mrp: 599,
    salePrice: 349,
    discountPercentage: 42,
    sku: 'ZAF-SM-001',
    stock: 50,
    stockStatus: 'In Stock',
    lowStockAlert: 10,
    shipping: {
      shippingRequired: true,
      weightKg: 0.2,
      lengthCm: 12,
      widthCm: 8,
      heightCm: 3,
      shippingClass: 'Standard Express',
      freeShipping: false
    },
    rating: 4.8,
    reviewCount: 47,
    status: 'published',
    isBestseller: false,
    isNewArrival: false,
    createdAt: '2026-01-25T10:00:00Z',
    updatedAt: '2026-01-25T10:00:00Z'
  },
  {
    id: 'PROD-ACC-002',
    name: 'Zenfotech AI Ergonomic XXL Desk Pad & Shortcut Mat',
    slug: 'zenfotech-ai-ergonomic-xxl-desk-pad',
    shortDescription: 'Waterproof 900x400mm desk mat printed with Python, PyTorch, Transformers & Prompt shortcut cheat-sheets.',
    description: 'Smooth microfiber top surface with anti-slip rubber base. Features clear printed reference guides for Python array slicing, Transformer tensor shapes, Git commands, and Prompt engineering rules.',
    categoryId: 'accessories',
    categoryName: 'Accessories',
    relatedCourseIds: ['all'],
    type: 'Physical',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
    ],
    price: 499,
    mrp: 899,
    salePrice: 499,
    discountPercentage: 44,
    sku: 'ZAF-AC-002',
    stock: 40,
    stockStatus: 'In Stock',
    lowStockAlert: 10,
    accessoryDetails: {
      brand: 'Zenfotech Tech Accessories',
      material: 'Waterproof Microfiber & Natural Rubber Base',
      color: 'Dark Slate with Amber & Emerald Printing',
      size: 'XXL (900 x 400 x 4 mm)',
      weight: '620 grams'
    },
    shipping: {
      shippingRequired: true,
      weightKg: 0.7,
      lengthCm: 42,
      widthCm: 8,
      heightCm: 8,
      shippingClass: 'Standard Express',
      freeShipping: false
    },
    rating: 4.9,
    reviewCount: 73,
    status: 'published',
    isBestseller: true,
    isNewArrival: false,
    createdAt: '2026-01-18T10:00:00Z',
    updatedAt: '2026-01-18T10:00:00Z'
  }
];

export const INITIAL_SHOP_BUNDLES: ProductBundle[] = [
  {
    id: 'BUNDLE-001',
    title: 'AI Industry Certification Flagship Mastery Bundle',
    description: 'Enrolls you in the Flagship AI Program and ships the Physical Handbook, Student Grid Notebook, and Deluxe Box Kit directly to your address.',
    courseId: 'ai-industry-certification',
    courseTitle: 'AI Industry Certification Program',
    productIds: ['PROD-BOOK-001', 'PROD-STN-001', 'PROD-KIT-001'],
    mrpTotal: 18996,
    bundlePrice: 15999,
    savings: 2997,
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    id: 'BUNDLE-002',
    title: 'Generative AI Creator Bundle',
    description: 'Masterclass Course + Physical Workbook + Prompt Flashcard Deck + XXL Shortcut Desk Pad.',
    courseId: 'generative-ai-prompt-engineering',
    courseTitle: 'Generative AI & Prompt Engineering Masterclass',
    productIds: ['PROD-BOOK-002', 'PROD-MAT-001', 'PROD-ACC-002'],
    mrpTotal: 7396,
    bundlePrice: 5499,
    savings: 1897,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
    status: 'active'
  }
];

export const INITIAL_SHOP_COUPONS: ShopCoupon[] = [
  {
    id: 'COUPON-001',
    code: 'AI20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 499,
    maxDiscountAmount: 500,
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    usageLimit: 1000,
    usedCount: 142,
    applicableCourses: ['all'],
    applicableProducts: ['all'],
    status: 'active'
  },
  {
    id: 'COUPON-002',
    code: 'GENAI20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 399,
    maxDiscountAmount: 400,
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    usageLimit: 500,
    usedCount: 88,
    applicableCourses: ['generative-ai-prompt-engineering'],
    applicableProducts: ['PROD-BOOK-002', 'PROD-MAT-001'],
    status: 'active'
  },
  {
    id: 'COUPON-003',
    code: 'WELCOME10',
    discountType: 'fixed',
    discountValue: 100,
    minOrderAmount: 299,
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    usageLimit: 2000,
    usedCount: 310,
    applicableCourses: ['all'],
    applicableProducts: ['all'],
    status: 'active'
  }
];

export const INITIAL_PRODUCT_REVIEWS: ProductReview[] = [
  {
    id: 'REV-001',
    productId: 'PROD-BOOK-001',
    userName: 'Rahul Sharma',
    userEmail: 'student@zenfotech.com',
    rating: 5,
    comment: 'The printed handbook is unbelievable! Having physical diagrams for Transformer self-attention made learning module 1 so much faster. Essential companion for the exam.',
    createdAt: '2026-02-01T14:20:00Z',
    verifiedPurchase: true,
    status: 'approved'
  },
  {
    id: 'REV-002',
    productId: 'PROD-BOOK-001',
    userName: 'Priya Patel',
    userEmail: 'priya@example.com',
    rating: 5,
    comment: 'Page quality and diagrams are crisp. Plus having the instant PDF download on student dashboard meant I could start reading on my tablet right away.',
    createdAt: '2026-02-04T09:15:00Z',
    verifiedPurchase: true,
    status: 'approved'
  },
  {
    id: 'REV-003',
    productId: 'PROD-KIT-001',
    userName: 'Amitabh Verma',
    userEmail: 'amitabh@example.com',
    rating: 5,
    comment: 'The box kit arrived in 2 days! The 128GB USB drive preloaded with datasets alone is worth the price.',
    createdAt: '2026-02-07T11:45:00Z',
    verifiedPurchase: true,
    status: 'approved'
  }
];

export const INITIAL_SHOP_ORDERS: ShopOrder[] = [
  {
    id: 'ZEN-ORD-000001',
    orderNumber: 'ZEN-ORD-000001',
    studentId: 'usr_student_01',
    customerName: 'Rahul Sharma',
    customerEmail: 'student@zenfotech.com',
    customerMobile: '+91 98765 43210',
    shippingAddress: {
      fullName: 'Rahul Sharma',
      email: 'student@zenfotech.com',
      mobile: '+91 98765 43210',
      address: '42 Tech Park Avenue, Koramangala 4th Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
      country: 'India'
    },
    items: [
      {
        productId: 'PROD-BOOK-001',
        productName: 'AI Industry Certification Complete Guide & Handbook',
        productImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
        price: 799,
        mrp: 1199,
        quantity: 1,
        type: 'Both',
        relatedCourseId: 'ai-industry-certification',
        relatedCourseTitle: 'AI Industry Certification Program',
        digitalFileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        productId: 'PROD-STN-001',
        productName: 'Zenfotech AI Student Hardcover Grid Notebook',
        productImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80',
        price: 249,
        mrp: 399,
        quantity: 1,
        type: 'Physical'
      }
    ],
    subtotal: 1048,
    discountAmount: 100,
    couponCode: 'WELCOME10',
    shippingFee: 0,
    taxAmount: 0,
    totalAmount: 948,
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    orderStatus: 'Delivered',
    trackingNumber: 'BLR-EXP-98214',
    shippingPartner: 'BlueDart Express',
    trackingUrl: 'https://www.bluedart.com',
    isDemo: true,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-04T16:00:00Z'
  }
];
