# 🛍️ E-Commerce Frontend

Ini adalah proyek **frontend** dari sistem E-Commerce modern, dibangun menggunakan **Next.js 15**, **React 19**, dan **Tailwind CSS 4**. Aplikasi ini berkomunikasi dengan RESTful API Laravel yang dihosting di:

- 🔗 **Backend**: [https://backend-ecommerce.rndev.my.id](https://backend-ecommerce.rndev.my.id)
- 🔗 **Live Frontend**: [https://frontend-e-commerce-dun.vercel.app/](https://frontend-e-commerce-dun.vercel.app/)

## 🚀 Tech Stack

| Tool                    | Keterangan                                   |
| ----------------------- | -------------------------------------------- |
| Next.js 15              | Framework React berbasis file routing        |
| React 19                | Library UI utama                             |
| Tailwind CSS 4          | Styling utility-first                        |
| Zustand                 | State management ringan & scalable           |
| TanStack React Query v5 | Data fetching dan caching                    |
| Axios                   | HTTP client untuk komunikasi ke API          |
| Font Awesome & Lucide   | Ikon modern untuk UI                         |
| Embla Carousel          | Slider carousel untuk tampilan produk/banner |
| React Hot Toast         | Notifikasi sukses/gagal                      |

## ✨ Fitur Utama

- 🔍 Lihat produk dan kategori
- 🛒 Tambah produk ke keranjang
- 🔐 Login user dan autentikasi berbasis cookie
- 🧑‍💼 Dashboard admin (kelola kategori & produk)
- 📊 Fetch data real-time menggunakan React Query
- 🧠 Global state (auth/cart) menggunakan Zustand
- ⚙️ Reusable components dengan Tailwind CSS

## 📦 Instalasi

### 1. Clone repository

```bash
git clone https://github.com/username/e-commerce-frontend.git
cd e-commerce-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. File konfigurasi enviroment

```bash
NEXT_PUBLIC_API_BASE_URL=https://backend-ecommerce.rndev.my.id/api/v1/

##Jalan kan
npm run dev

```

### Struktur Folder

```bash
src/
├── app/               # Halaman utama & routing App Router (Next.js 15)
│  └── api/            # Custom hooks React Query (useFetch, useAction)
├── components/        # Reusable components seperti Table, Card, Button
├── store/             # Zustand store (authStore, cartStore, dsb)
├── lib/               # Utilitas umum dan types
├── sections/          # Section untuk landing page
├── layouts/           # Template layout
```

### 🔐 Login & Role

| Role  | Fitur                                                          |
| ----- | -------------------------------------------------------------- |
| Guest | Lihat produk & kategori                                        |
| User  | Login, tambah ke keranjang, checkout                           |
| Admin | Login, kelola kategori, order & produk melalui dashboard admin |

---

## Login Sebagai Admin

-   email : admin@zedgroup.test
-   password : admin123

---

### 🧑‍💻 Pengembang

Author: Muhammad Rinaldi
📧 Email: muhammad.rinaldi007.mr@gmail.com
