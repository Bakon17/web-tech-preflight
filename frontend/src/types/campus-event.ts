export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export const categoryList: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

// Form değerleri: id yok, capacity metin, category boş olabilir (input hep metin verir)
export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

// Her alana en fazla bir mesaj
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
