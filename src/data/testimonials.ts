export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Sneha Kulkarni",
    location: "Kothrud, Pune",
    rating: 5,
    review:
      "Beautiful collection and excellent fabric quality. The Banarasi dress material looked even better in person than in the photos.",
  },
  {
    id: "t-2",
    name: "Vaishali Gokhale",
    location: "Prabhat Road, Pune",
    rating: 5,
    review:
      "I have been buying my Paithani sarees from Pokharna for years. The weave is genuine and the staff patiently show you every piece.",
  },
  {
    id: "t-3",
    name: "Priya Jadhav",
    location: "Wagholi, Pune",
    rating: 4,
    review:
      "Ordered two festive suit sets for Diwali. Colours were exactly as shown and the dupattas are beautifully finished.",
  },
  {
    id: "t-4",
    name: "Meera Shah",
    location: "Camp, Pune",
    rating: 5,
    review:
      "Their Kanchipuram silk is the real thing. Got so many compliments at my niece's wedding — worth every rupee.",
  },
  {
    id: "t-5",
    name: "Aarti Joshi",
    location: "Chandan Nagar, Pune",
    rating: 5,
    review:
      "The Chanderi cottons are perfect for Pune summers. Soft, light and the block prints do not fade after washing.",
  },
  {
    id: "t-6",
    name: "Rasika Patil",
    location: "Viman Nagar, Pune",
    rating: 4,
    review:
      "Honest pricing and no pushy selling. They helped me match a blouse fabric to my mother's old saree.",
  },
];
