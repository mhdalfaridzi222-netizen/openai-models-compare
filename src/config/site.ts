export const siteConfig = {
  name: "OpenAI Models Compare",
  tagline: "Bandingkan Semua Model OpenAI dengan Mudah.",
  description: "Ensiklopedia & portal komparasi independen terlengkap untuk semua model OpenAI: spesifikasi, kemampuan visi, coding, reasoning, context window, tolok ukur, dan kalkulator biaya API.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mhdalfaridzi.vercel.app",
  ogImage: "https://mhdalfaridzi.vercel.app/og.jpg",
  author: "OpenAI Models Compare Research Team",
  adsenseId: process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-5683117405667471",
  disclaimer: {
    independent: "OpenAI Models Compare adalah website informasi independen dan bukan website resmi OpenAI.",
    trademark: "Nama, logo, dan merek OpenAI merupakan milik pemiliknya masing-masing.",
    accuracy: "Informasi model, harga, kemampuan, dan status dapat berubah sewaktu-waktu. Selalu periksa dokumentasi resmi OpenAI untuk informasi terbaru."
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Models", href: "/models" },
    { label: "Compare", href: "/compare" },
    { label: "Find Model", href: "/find-model" },
    { label: "Categories", href: "/categories" },
    { label: "Calculator", href: "/calculator" },
    { label: "Guides", href: "/guides" },
    { label: "Articles", href: "/articles" },
    { label: "History", href: "/history" },
    { label: "About", href: "/about" },
  ]
};
