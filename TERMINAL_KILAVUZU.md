# 📁 Hobii Backend - Terminal Komutları Kılavuzu (Türkçe / English)

> Bu rehber, Hobii backend projesini kurmak, başlatmak, durdurmak ve test etmek için sık kullanılan terminal komutlarını içerir. Her komutun Türkçe açıklaması ve İngilizcesi ile birlikte örnek kullanım senaryoları verilmiştir.

---

## 🚀 1. Sunucuyu Başlatma / Starting the Server

```bash
npm run dev
```

**TR:** Sunucuyu geliştirme modunda başlatır  
**EN:** Starts the backend server in development mode  
📌 `.env` dosyasının bulunduğundan emin olun.

---

## 📦 2. Bağımlılıkları Yükleme / Installing Dependencies

```bash
npm install
```

**TR:** Projedeki tüm gerekli paketleri yükler  
**EN:** Installs all dependencies listed in package.json  

---

## 🧱 3. Migration Çalıştırma / Running Migrations

```bash
npx sequelize db:migrate
```

**TR:** Veritabanı tablolarını oluşturur  
**EN:** Runs all Sequelize migrations  

---

## 🐳 4. Docker Servislerini Başlatma / Starting Docker Services

```bash
docker compose up -d
```

**TR:** Docker ile Redis ve PostgreSQL container’larını arka planda başlatır  
**EN:** Starts PostgreSQL and Redis containers using Docker Compose (detached mode)  

---

## 🐘 5. PostgreSQL Container’ı Manuel Başlatma / Manual PostgreSQL Container Start

```bash
docker run --name hobii-postgres -e POSTGRES_USER=hobii11 -e POSTGRES_PASSWORD=11hobii -e POSTGRES_DB=hobii_db -p 5433:5432 -d postgres
```

**TR:** PostgreSQL container'ını manuel başlatır  
**EN:** Manually starts PostgreSQL container using Docker  

---

## 🔁 6. Redis Container’ı Manuel Başlatma / Manual Redis Container Start

```bash
docker run --name hobii-redis -p 6380:6379 -d redis
```

**TR:** Redis container’ını manuel başlatır  
**EN:** Manually starts Redis container using Docker  

---

## ⛔ 7. Docker Servislerini Durdurma / Stopping Docker Services

```bash
docker stop hobii-postgres hobii-redis
```

**TR:** Docker container’larını durdurur  
**EN:** Stops the running containers for PostgreSQL and Redis  

---

## 📋 8. Docker Container’ları Listeleme / Listing Docker Containers

```bash
docker ps -a
```

**TR:** Tüm Docker container’larını listeler  
**EN:** Lists all Docker containers (active & inactive)  

---

## 🔄 9. Migration Geri Alma / Undo Last Migration

```bash
npx sequelize db:migrate:undo
```

**TR:** Son yapılan migration’ı geri alır  
**EN:** Undo the last Sequelize migration  

---

## 🧪 10. Postman Testleri / Postman API Tests

### ✅ Kullanıcı Kayıt / User Signup

```http
POST http://localhost:5050/signup
```

**JSON Body:**
```json
{
  "email": "test@hobii.com",
  "password": "123456"
}
```

---

### 🔐 Kullanıcı Giriş / User Login

```http
POST http://localhost:5050/login
```

**JSON Body:**
```json
{
  "email": "test@hobii.com",
  "password": "123456"
}
```

---

### 🔒 Korunan Route / Protected Route (JWT Gerekir)

```http
GET http://localhost:5050/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

---

## 📂 Ekstra: .env Dosyası Örneği

```env
PORT=5050

POSTGRES_USER=hobii11
POSTGRES_PASSWORD=11hobii
POSTGRES_DB=hobii_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5433

REDIS_HOST=localhost
REDIS_PORT=6380
REDIS_USERNAME=hobii12
REDIS_PASSWORD=12hobii

JWT_SECRET=superserctekey
```

> 🛑 `.env` dosyasını GitHub gibi herkese açık ortamlarda paylaşma!
