export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joined: string;
  status: "Active" | "Inactive";
};

export const customers: Customer[] = [
  { id: "c-1", name: "Ananya Deshmukh", email: "ananya.deshmukh@gmail.com", phone: "9822216629", orders: 7, totalSpent: 68420, joined: "2024-11-12", status: "Active" },
  { id: "c-2", name: "Sneha Kulkarni", email: "sneha.kulkarni@gmail.com", phone: "9823311204", orders: 4, totalSpent: 39980, joined: "2025-01-24", status: "Active" },
  { id: "c-3", name: "Priya Jadhav", email: "priya.jadhav@outlook.com", phone: "9764412876", orders: 3, totalSpent: 18740, joined: "2025-03-08", status: "Active" },
  { id: "c-4", name: "Meera Shah", email: "meera.shah@gmail.com", phone: "9890012233", orders: 2, totalSpent: 27350, joined: "2025-05-19", status: "Active" },
  { id: "c-5", name: "Rasika Patil", email: "rasika.patil@gmail.com", phone: "9922114455", orders: 5, totalSpent: 22110, joined: "2025-06-02", status: "Active" },
  { id: "c-6", name: "Vaishali Gokhale", email: "vaishali.g@gmail.com", phone: "9850067788", orders: 6, totalSpent: 54900, joined: "2024-08-30", status: "Active" },
  { id: "c-7", name: "Kavita Bhosale", email: "kavita.bhosale@gmail.com", phone: "9765543321", orders: 1, totalSpent: 4999, joined: "2026-01-15", status: "Active" },
  { id: "c-8", name: "Neha Agarwal", email: "neha.agarwal@gmail.com", phone: "9819900112", orders: 2, totalSpent: 11480, joined: "2026-02-27", status: "Inactive" },
  { id: "c-9", name: "Shruti Pawar", email: "shruti.pawar@gmail.com", phone: "9730044556", orders: 3, totalSpent: 16250, joined: "2025-09-11", status: "Active" },
  { id: "c-10", name: "Aarti Joshi", email: "aarti.joshi@gmail.com", phone: "9822007744", orders: 8, totalSpent: 91230, joined: "2024-06-21", status: "Active" },
];
