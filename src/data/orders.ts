export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  imageKey: string;
};

export type Order = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: "Cash on Delivery" | "UPI" | "Card";
  status: OrderStatus;
};

export const orderStatuses: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export const orders: Order[] = [
  {
    id: "PKS-90114",
    customerName: "Ananya Deshmukh",
    email: "ananya.deshmukh@gmail.com",
    phone: "9822216629",
    address: "Flat 402, Sunrise Residency, Kharadi",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411014",
    date: "2026-08-27",
    items: [
      { productId: "p-1", name: "Banarasi Zari Silk Unstitched Suit", price: 8499, qty: 1, imageKey: "banarasi" },
      { productId: "p-8", name: "Royal Chanderi Cotton Dress Material", price: 2499, qty: 2, imageKey: "chanderi" },
    ],
    subtotal: 13497,
    shipping: 0,
    discount: 500,
    total: 12997,
    paymentMethod: "UPI",
    status: "Delivered",
  },
  {
    id: "PKS-90115",
    customerName: "Sneha Kulkarni",
    email: "sneha.kulkarni@gmail.com",
    phone: "9823311204",
    address: "12, Shivneri Society, Kothrud",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411038",
    date: "2026-08-29",
    items: [
      { productId: "p-12", name: "Traditional Yeola Paithani", price: 13999, qty: 1, imageKey: "paithani" },
    ],
    subtotal: 13999,
    shipping: 0,
    discount: 0,
    total: 13999,
    paymentMethod: "Card",
    status: "Shipped",
  },
  {
    id: "PKS-90116",
    customerName: "Priya Jadhav",
    email: "priya.jadhav@outlook.com",
    phone: "9764412876",
    address: "Row House 7, Green Meadows, Wagholi",
    city: "Pune",
    state: "Maharashtra",
    pincode: "412207",
    date: "2026-08-30",
    items: [
      { productId: "p-16", name: "Festive Gold Zari Dress Material", price: 3999, qty: 2, imageKey: "festive" },
      { productId: "p-25", name: "Jaipuri Block Print Cotton Suit", price: 1499, qty: 1, imageKey: "cotton" },
    ],
    subtotal: 9497,
    shipping: 99,
    discount: 300,
    total: 9296,
    paymentMethod: "Cash on Delivery",
    status: "Processing",
  },
  {
    id: "PKS-90117",
    customerName: "Meera Shah",
    email: "meera.shah@gmail.com",
    phone: "9890012233",
    address: "B-9, Ratan Heights, Camp",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    date: "2026-09-01",
    items: [
      { productId: "p-6", name: "Kanchipuram Pure Silk Saree", price: 14999, qty: 1, imageKey: "kanchipuram" },
    ],
    subtotal: 14999,
    shipping: 0,
    discount: 750,
    total: 14249,
    paymentMethod: "UPI",
    status: "Confirmed",
  },
  {
    id: "PKS-90118",
    customerName: "Rasika Patil",
    email: "rasika.patil@gmail.com",
    phone: "9922114455",
    address: "301, Tulip Enclave, Viman Nagar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411014",
    date: "2026-09-02",
    items: [
      { productId: "p-24", name: "Lucknowi Chikankari Cotton Suit", price: 2999, qty: 1, imageKey: "cotton" },
      { productId: "p-9", name: "Classic Chanderi Floral Suit", price: 1899, qty: 1, imageKey: "chanderi" },
    ],
    subtotal: 4898,
    shipping: 99,
    discount: 0,
    total: 4997,
    paymentMethod: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: "PKS-90119",
    customerName: "Vaishali Gokhale",
    email: "vaishali.g@gmail.com",
    phone: "9850067788",
    address: "Bungalow 4, Prabhat Road",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411004",
    date: "2026-09-02",
    items: [
      { productId: "p-3", name: "Royal Purple Banarasi Saree", price: 12499, qty: 1, imageKey: "sarees" },
    ],
    subtotal: 12499,
    shipping: 0,
    discount: 0,
    total: 12499,
    paymentMethod: "Card",
    status: "Pending",
  },
];
