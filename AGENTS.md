# AGENT INSTRUCTIONS & MEMORY

## ⚠️ MANDATORY CHECKLIST FOR ALL AGENTS
Herhangi bir agent bu projede göreve başladığında ilk olarak aşağıdaki kritik tarihi kontrol etmelidir:

### 1. VERCEL PRO TRIAL İPTALİ (HEDEF: 2 ARALIK 2026)
* Bu proje ve ilişkili 23 proje şu anda **Legal Delivery Portal** (`team_9cbbaLEyQ7tjwyrSdpHiSOmk`) ekibinde Vercel Pro Trial üzerindedir.
* Trial bitiş tarihi: **3 Aralık 2026**.
* **Eğer bugünün tarihi 30 Kasım - 2 Aralık 2026 civarındaysa, kullanıcıya derhal Vercel Pro Trial'ı iptal edip Hobby ($0)'ye düşürmesini hatırlat!**
* Ayrıntılı talimatlar: [CRITICAL_REMINDER_VERCEL_TRIAL.md](file:///Users/aziz/Documents/legaldeliveryportal.com/CRITICAL_REMINDER_VERCEL_TRIAL.md) dosyasındadır.

### 2. CLOUDFLARE EDGE CACHE DOKUNULMAZLIĞI
* Domain: `legaldeliveryportal.com` Cloudflare proxy (`Orange Cloud`) arkasındadır.
* `/forms/*` rotası Cloudflare üzerinde 7 gün cache'lenmektedir (`Cache Everything`).
* `/api/*`, `/api/checkout`, `/api/delivery` ve `/success` rotaları **kesinlikle cache'lenmemelidir (DYNAMIC kalmalıdır)**.

### 3. API & CREDENTIALS
* Tüm API anahtarları, token'lar ve team ID'leri [apis_and_credentials.txt](file:///Users/aziz/Documents/legaldeliveryportal.com/apis_and_credentials.txt) dosyasındadır.
