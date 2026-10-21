const CATEGORIES = [
    { name: 'Groceries', icon: '🥦', bg: '#e9f6e4' },
    { name: 'Clothes', icon: '👗', bg: '#fde8e6' },
    { name: 'Electronics', icon: '💻', bg: '#e2f0ff' },
    { name: 'Home & Kitchen', icon: '🍳', bg: '#fdf1dc' },
    { name: 'Beauty & Personal Care', icon: '🧴', bg: '#efe6fb' },
    { name: 'Sports & Fitness', icon: '🏋️', bg: '#e3f1fb' },
    { name: 'Books & Stationery', icon: '📚', bg: '#fde6ee' },
    { name: 'Watches', icon: '⌚', bg: '#e8eaff' },
    { name: 'Footwear', icon: '👟', bg: '#f9eadf' }
];

const PRODUCTS = [
    // 1. Groceries
    {
        id: 1, cat: 'Groceries', name: 'Basmati Rice (5kg)',
        icon: '🍚',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
        prices: { 'D-Mart': 320, 'BigBasket': 340, 'Blinkit': 345, 'Amazon Fresh': 350 }
    },
    {
        id: 2, cat: 'Groceries', name: 'Fresh Farm Vegetables Combo',
        icon: '🥦',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
        prices: { 'D-Mart': 150, 'BigBasket': 165, 'Blinkit': 170, 'Amazon Fresh': 180 }
    },
    {
        id: 3, cat: 'Groceries', name: 'Organic Toor Dal (1kg)',
        icon: '🫘',
        image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=500&q=80',
        prices: { 'D-Mart': 120, 'BigBasket': 135, 'Blinkit': 140, 'Amazon Fresh': 150 }
    },
    {
        id: 4, cat: 'Groceries', name: 'Cold Pressed Sunflower Oil (1L)',
        icon: '🌻',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
        prices: { 'D-Mart': 175, 'BigBasket': 185, 'Blinkit': 190, 'Amazon Fresh': 195 }
    },

    // 2. Clothes
    {
        id: 5, cat: 'Clothes', name: 'Casual Cotton Crew T-Shirt',
        icon: '👕',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80',
        prices: { 'Myntra': 499, 'Amazon': 549, 'Flipkart': 529, 'Ajio': 599 }
    },
    {
        id: 6, cat: 'Clothes', name: 'Slim Fit Denim Jeans',
        icon: '👖',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80',
        prices: { 'Myntra': 1199, 'Amazon': 1249, 'Flipkart': 1229, 'Ajio': 1299 }
    },
    {
        id: 7, cat: 'Clothes', name: 'Classic Formal Linen Shirt',
        icon: '👔',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80',
        prices: { 'Myntra': 899, 'Amazon': 949, 'Flipkart': 929, 'Ajio': 999 }
    },
    {
        id: 8, cat: 'Clothes', name: "Women's Floral Summer Dress",
        icon: '👗',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80',
        prices: { 'Myntra': 799, 'Amazon': 849, 'Flipkart': 829, 'Ajio': 899 }
    },

    // 3. Electronics
    {
        id: 9, cat: 'Electronics', name: 'Wireless Over-Ear Headphones',
        icon: '🎧',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1999, 'Flipkart': 2099, 'Croma': 2199, 'Reliance': 2149 }
    },
    {
        id: 10, cat: 'Electronics', name: 'Portable Bluetooth Speaker',
        icon: '🔊',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1499, 'Flipkart': 1599, 'Croma': 1699, 'Reliance': 1649 }
    },
    {
        id: 11, cat: 'Electronics', name: '4K Ultra HD Action Camera',
        icon: '📷',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 4499, 'Flipkart': 4699, 'Croma': 4799, 'Reliance': 4749 }
    },
    {
        id: 12, cat: 'Electronics', name: 'RGB Mechanical Gaming Keyboard',
        icon: '⌨️',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 2299, 'Flipkart': 2399, 'Croma': 2499, 'Reliance': 2449 }
    },

    // 4. Home & Kitchen
    {
        id: 13, cat: 'Home & Kitchen', name: 'Non-Stick Granite Cookware Set',
        icon: '🍳',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1499, 'Flipkart': 1549, 'Croma': 1599, 'Reliance': 1579 }
    },
    {
        id: 14, cat: 'Home & Kitchen', name: 'Insulated Stainless Steel Bottle (1L)',
        icon: '🍶',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 499, 'Flipkart': 529, 'Croma': 549, 'Reliance': 539 }
    },
    {
        id: 15, cat: 'Home & Kitchen', name: 'Artisan Ceramic Coffee Mug Set',
        icon: '☕',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 399, 'Flipkart': 429, 'Croma': 449, 'Reliance': 439 }
    },
    {
        id: 16, cat: 'Home & Kitchen', name: 'Electric Glass Kettle (1.8L)',
        icon: '🫖',
        image: 'https://images.unsplash.com/photo-1594213114663-d94db9b17125?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 999, 'Flipkart': 1049, 'Croma': 1099, 'Reliance': 1079 }
    },

    // 5. Beauty & Personal Care
    {
        id: 17, cat: 'Beauty & Personal Care', name: 'Vitamin C Glowing Face Serum',
        icon: '🧴',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 499, 'Nykaa': 519, 'Flipkart': 529, 'Myntra': 549 }
    },
    {
        id: 18, cat: 'Beauty & Personal Care', name: 'Organic Argan Hair Shampoo',
        icon: '🧼',
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 349, 'Nykaa': 369, 'Flipkart': 379, 'Myntra': 389 }
    },
    {
        id: 19, cat: 'Beauty & Personal Care', name: 'Hydrating Daily Body Lotion',
        icon: '🧴',
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 299, 'Nykaa': 309, 'Flipkart': 319, 'Myntra': 329 }
    },
    {
        id: 20, cat: 'Beauty & Personal Care', name: 'Deep Cleansing Face Wash',
        icon: '🫧',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 249, 'Nykaa': 259, 'Flipkart': 269, 'Myntra': 279 }
    },

    // 6. Sports & Fitness
    {
        id: 21, cat: 'Sports & Fitness', name: 'Breathable Running Sports Shoes',
        icon: '👟',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1299, 'Decathlon': 1329, 'Flipkart': 1349, 'Myntra': 1399 }
    },
    {
        id: 22, cat: 'Sports & Fitness', name: 'Adjustable Hex Dumbbell Set (10kg)',
        icon: '🏋️',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1499, 'Decathlon': 1549, 'Flipkart': 1599, 'Myntra': 1649 }
    },
    {
        id: 23, cat: 'Sports & Fitness', name: 'High-Density Non-Slip Yoga Mat',
        icon: '🧘',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 599, 'Decathlon': 629, 'Flipkart': 649, 'Myntra': 699 }
    },
    {
        id: 24, cat: 'Sports & Fitness', name: 'Resistance Exercise Bands (Set of 5)',
        icon: '💪',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 399, 'Decathlon': 429, 'Flipkart': 449, 'Myntra': 499 }
    },

    // 7. Books & Stationery
    {
        id: 25, cat: 'Books & Stationery', name: 'Premium Hardcover Ruled Journal',
        icon: '📖',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 249, 'Flipkart': 269, 'Local Store': 240, 'FirstCry': 279 }
    },
    {
        id: 26, cat: 'Books & Stationery', name: 'Fineliner Color Sketch Pens (Set of 12)',
        icon: '✏️',
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 199, 'Flipkart': 219, 'Local Store': 190, 'FirstCry': 229 }
    },
    {
        id: 27, cat: 'Books & Stationery', name: 'Study Desk Organizer Stand',
        icon: '🗂️',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 349, 'Flipkart': 379, 'Local Store': 350, 'FirstCry': 399 }
    },
    {
        id: 28, cat: 'Books & Stationery', name: 'Undated Daily Productivity Planner',
        icon: '📚',
        image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 299, 'Flipkart': 329, 'Local Store': 310, 'FirstCry': 349 }
    },

    // 8. Watches
    {
        id: 29, cat: 'Watches', name: 'Smart Fitness Tracker Watch',
        icon: '⌚',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 2499, 'Flipkart': 2599, 'Croma': 2699, 'Reliance': 2649 }
    },
    {
        id: 30, cat: 'Watches', name: 'Classic Leather Chronograph Watch',
        icon: '⏱️',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1499, 'Flipkart': 1549, 'Myntra': 1599, 'Ajio': 1529 }
    },
    {
        id: 31, cat: 'Watches', name: 'Minimalist Matte Black Mesh Watch',
        icon: '⌚',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1799, 'Flipkart': 1849, 'Myntra': 1899, 'Ajio': 1829 }
    },
    {
        id: 32, cat: 'Watches', name: 'Rose Gold Metallic Accent Watch',
        icon: '✨',
        image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1999, 'Flipkart': 2099, 'Myntra': 2149, 'Ajio': 2049 }
    },

    // 9. Footwear
    {
        id: 33, cat: 'Footwear', name: 'Classic All-White Casual Sneakers',
        icon: '👟',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 899, 'Flipkart': 949, 'Myntra': 999, 'Ajio': 929 }
    },
    {
        id: 34, cat: 'Footwear', name: 'Lightweight Sport Running Shoes',
        icon: '👟',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1199, 'Flipkart': 1249, 'Myntra': 1299, 'Decathlon': 1229 }
    },
    {
        id: 35, cat: 'Footwear', name: 'Handcrafted Penny Leather Loafers',
        icon: '👞',
        image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 1699, 'Flipkart': 1749, 'Myntra': 1799, 'Ajio': 1729 }
    },
    {
        id: 36, cat: 'Footwear', name: 'Slip-On Breathable Canvas Loafers',
        icon: '👟',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80',
        prices: { 'Amazon': 699, 'Flipkart': 749, 'Myntra': 799, 'Ajio': 729 }
    }
];

const TABS = [
    'Groceries',
    'Clothes',
    'Electronics',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Sports & Fitness',
    'Books & Stationery',
    'Watches',
    'Footwear',
    'More'
];