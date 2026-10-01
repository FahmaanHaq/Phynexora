export type Testimonial = {
  id: string;
  name: string;
  company?: string | null;
  role?: string | null;
  rating: number;
  feedback: string;
};
