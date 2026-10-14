import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standlari.",
    capacity: 100,
    image: "/kariyer-gunleri.jpg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvari 2",
    description: "Arduino ile çizgi izleyen robot yapimi, başlangiç seviyesi.",
    capacity: 20,
    image: "/robotik-atolyesi.jpg"
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "2026-10-27",
    time: "13:00",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
    capacity: 50,
    image: "/siber-guvenlik.jpg"
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "2026-11-03",
    time: "15:00",
    location: "Bilgisayar Laboratuvari 1",
    description: "HTML ve CSS ile ilk kişisel sayfami yapiyorum.",
    capacity: 30,
    image: "/web.png"
  },
  {
    id: "event-5",
    title: "Yazılım Yarışması",
    category: "Yarışma",
    date: "2026-11-10",
    time: "09:00",
    location: "C Blok Laboratuvari",
    description: "24 saatlik algoritma ve bitirme projesi yarişmasi.",
    capacity: 40,
    image: "/trophy.png"
  },
  {
    id: "event-6",
    title: "AI & Machine Learning Semineri",
    category: "Seminer",
    date: "2026-11-15",
    time: "13:00",
    location: "A Blok Konferans Salonu",
    description: "Yapay zeka temelleri ve modern trendler.",
    capacity: 80,
    image: "/ai.png"
  }
];