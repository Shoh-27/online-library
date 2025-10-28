# 📚 Online Kutubxona Loyxasi

Online kutubxona — Laravel backend va React frontend bilan qurilgan to'liq web ilovasi. Foydalanuvchilar kitoblarni qidirishlari, o'qishlari va ijara olishlari mumkin. Admin paneliga kitoblarni boshqarish funktsiyalari mavjud.

## 🚀 Asosiy Xususiyatlar

- **Foydalanuvchi Autentifikatsiyasi** - ro'yxatdan o'tish, kirish, profilni boshqarish
- **Kitoblarni Qidiruvi** - kategoriya, muallif, sana bo'yicha filtrlash
- **Kitobning Batafsil Ma'lumotlari** - rasm, sharh, reyting, ijara narxi
- **Admin Paneli** - kitoblarni qo'shish, tahrirlash, o'chirish
- **Ijara Tizimi** - kitoblarni ijara olish, qaytarish, to'lovni amalga oshirish
- **Reyting va Sharhlar** - foydalanuvchilar sharhlar qoldirishlari

## 💻 Texnologiyalar

### Backend
- **Laravel 10+** - PHP framework
- **MySQL** - ma'lumotlar bazasi
- **Laravel API** - RESTful API
- **Laravel Sanctum** - autentifikatsiya

### Frontend
- **React 18+** - JavaScript kutubxonasi
- **Tailwind CSS** - styling
- **Axios** - API soʻrovlari
- **React Router** - navigatsiya

## 📋 Sahifalar va Komponentlar

### Foydalanuvchi Sahifalari
- `Home.jsx` - asosiy sahifa
- `BookList.jsx` - kitoblar ro'yxati
- **BookDetails.jsx** - kitobning batafsil ma'lumotlari
- `Cart.jsx` - savatcha
- `UserDashboard.jsx` - foydalanuvchi boshqaruvi

### Admin Sahifalari
- **AdminDashboard.jsx** - admin boshqaruv paneli
- **AdminBookForm.jsx** - kitob qo'shish/tahrirlash formasi
- `AdminUsers.jsx` - foydalanuvchilarni boshqarish
- `AdminOrders.jsx` - buyurtmalarni boshqarish

## 🔧 O'rnatish va Ishga Tushirish

### Backend o'rnatishi

```bash
# Loyxani klonlash
git clone <repository-url>
cd library-backend

# Dependency-larni o'rnatish
composer install

# .env faylini yaratish
cp .env.example .env

# Database migratsiyalarini bajarish
php artisan migrate

# Dasturni ishga tushirish
php artisan serve
```

### Frontend o'rnatishi

```bash
# React loyxasiga o'tish
cd library-frontend

# Dependencies o'rnatish
npm install

# Dasturni ishga tushirish
npm start
```

## 📁 Loyja Strukturasi

```
library-backend/
├── app/
│   ├── Models/
│   │   ├── Book.php
│   │   ├── User.php
│   │   ├── Order.php
│   │   └── Review.php
│   ├── Http/Controllers/
│   │   ├── BookController.php
│   │   ├── OrderController.php
│   │   └── AdminController.php
│   └── Routes/
│       └── api.php

library-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── BookList.jsx
│   │   ├── BookDetails.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── AdminBookForm.jsx
│   ├── components/
│   ├── styles/
│   └── App.jsx
```

## 🔑 API Endpoints

### Kitoblar
- `GET /api/books` - barcha kitoblarni olish
- `GET /api/books/{id}` - bir kitobning ma'lumotlarini olish
- `POST /api/books` - yangi kitob qo'shish (admin)
- `PUT /api/books/{id}` - kitobni tahrirlash (admin)
- `DELETE /api/books/{id}` - kitobni o'chirish (admin)

### Buyurtmalar
- `GET /api/orders` - foydalanuvchining buyurtmalari
- `POST /api/orders` - yangi buyurtma yaratish
- `PUT /api/orders/{id}` - buyurtmani yangilash

### Admin
- `GET /api/admin/dashboard` - dashboard statistikasi
- `GET /api/admin/books` - barcha kitoblar (admin)

## 🎨 Sahifalar Haqida

### BookDetails.jsx
Bir kitobning batafsil ma'lumotlarini ko'rsatadi:
- Kitobning rasmi
- Nomi, muallifi, nashr sana
- Tavsifi
- Narxi va mavjudligi
- Foydalanuvchi sharhları va reytingi
- "Ijara olish" tugmasi

### AdminDashboard.jsx
Admin boshqaruv panelidagi asosiy sahifa:
- Statistika (jami kitoblar, buyurtmalar, foydalanuvchilar)
- Oxirgi buyurtmalar
- Ko'p ijara olinadigan kitoblar
- Kitoblarni boshqarish tugmalari

### AdminBookForm.jsx
Yangi kitob qo'shish yoki mavjudini tahrirlash formasi:
- Kitob nomi, muallif, nashr sana
- Kategoriya tanlash
- Tavsif va rasm yuklash
- Narx va nusxa soni
- Saqlash/Bekor qilish tugmalari

## 🚨 Muhim O'zgarishlar

Agar oldingi suhbatda qo'llaniladigan o'zgarishlar bo'lsa, ularga quyidagi rasmning bo'limlari kiritiladi:

1. **BookDetails** - reyting va sharh qismi yangilandi
2. **AdminBookForm** - yangi fieldlar qo'shildi
3. **AdminDashboard** - statistika paneli takomillashtirildi

## 👨‍💻 Ishtirokchilar

- Siz va jamoangiz

## 📝 Litsenziya

MIT License - batafsil ma'lumot uchun LICENSE faylini ko'ring.

---

**Savol yoki muammo bo'lsa, Issues bo'limida yozib qoldiring!** 📧
