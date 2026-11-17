# MASTER BUILD PROMPT: USPS CERTIFIED MAIL & KATALOG GENİŞLETME

Bu komut dosyasını `/Users/aziz/Documents/legaldeliveryportal.com` klasöründe çalıştıracağın AI kodlama ajanına (agent) doğrudan ver.

---

```markdown
Sen kıdemli bir Full-Stack Next.js Yazılım Mimarı ve LegalTech Mühendisisin.
Görevin bu repository içerisinde **LegalDeliveryPortal.com** projesine resmi **USPS Certified Mail (İadeli Taahhütlü Posta)** fiziksel basım/gönderim motorunu PostGrid API ile entegre etmek ve kataloğu en çok satan belgelerle genişletmektir.

Canlı üretim ortamında (`live_sk_bTm67cyQuqY8avXW5tXLQu`) gerçek para harcandığı ve mektup başına $6-$8 maliyet oluştuğu için **sıfır toleransla ve mutlak idempotency (çift basım koruması)** ile çalışacaksın.

---

### 🚨 1. BELGE SINIFLANDIRMASI VE `hasCertifiedMailOption` KURALI
Her belgeye posta seçeneği KOYMAYACAKSIN. Sadece karşı tarafa yasal tebliğ edilmesi (Service of Process) gereken ihbar, ihtar ve uyuşmazlık belgelerine bu seçenek açılacaktır.

Her belgenin şablonuna (`src/config/documents/*.ts`) şu bayrağı ekle:

**A. `hasCertifiedMailOption: true` (Posta Seçeneği Açık Olanlar - $9.90 PDF veya $29.90 USPS Certified Mail):**
1. `evictionNoticeNonPayment` (Tahliye İhtarı - Pay or Quit)
2. `securityDepositDemand` (Depozito İade İhtarı)
3. `ceaseAndDesist` (Hukuki İhtarname)
4. `demandLetter` (Genel Alacak / Pre-Suit İhtarı)
5. `mechanicsLienNotice` (Usta ve Taşeron Haciz İhtarı)
6. `rentIncreaseNotice` (Kira Artış Bildirimi)
7. `noticeOfIntentToEnter` (Eve Giriş Bildirimi)
8. `leaseViolationNotice` (Kira Sözleşmesi İhlal İhtarı)
9. `debtValidationLetter` (FDCPA 30 Günlük Borç İtiraz İhtarı)
10. `revocationOfPowerOfAttorney` (Vekaletname İptal Bildirimi)
11. `noticeOfIntentToVacate` (Kiracı Tahliye Bildirimi)
12. `debtSettlementAgreement` (Borç İbra ve Uzlaşma İhtarı)

**B. `hasCertifiedMailOption: false` (Posta Seçeneği KAPALI Olanlar - Sadece $9.90 PDF İndirme):**
- Karşılıklı imzalanan sözleşmeler ve şahsi belgeler (Residential Lease, Roommate Agreement, Sublease, Standard NDA, LLC Operating Agreement, Last Will, Living Will, Quitclaim Deed, Child Travel Consent, Child Medical Consent, Independent Contractor, DMV Bill of Sale vb.).
- Bu belgelerin formunda sadece $9.90 Dijital İndirme gösterilecek, posta adresleri istenmeyecektir.

---

### 📦 2. İKİ FARKLI PAKET UI'I ($9.90 DİJİTAL vs $29.90 USPS CERTIFIED)
`hasCertifiedMailOption: true` olan belgelerin Adım 3 (İnceleme & Ödeme) ekranında kullanıcıya iki net kart sun:

1. **Standart Dijital İndirme ($9.90):**
   - Anında mahkemeye uygun resmi vektör PDF indirme.
   - LemonSqueezy Checkout: `https://depositdemand.lemonsqueezy.com/checkout/buy/e5a2b41d-69b2-4d5a-bb86-0218378c2373`
2. **Resmi USPS Certified Mail Paketi ($29.90):**
   - PostGrid üzerinden resmi USPS İadeli Taahhütlü fiziksel basım ve gönderim.
   - 22 haneli resmi USPS barkodlu takip numarası ve teslimat takibi.
   - Dijital PDF kopyası anında indirme.
   - LemonSqueezy Checkout: `https://depositdemand.lemonsqueezy.com/checkout/buy/1f62b1b7-bcbf-49f6-956d-d7b022794719`
   - **Form Gereksinimi:** Certified Mail seçildiğinde formda zorunlu alanlar açılır: Alıcı Adı/Şirketi, Sokak Adresi, Şehir, Eyalet, 5 Haneli Posta Kodu (ZIP) ve Gönderici İade Adresi.

---

### 🛡️ 3. ÇÖKMEYEN POSTGRID MOTORU (`src/lib/postgrid.ts`)
`apis_and_credentials.txt` içerisindeki `POSTGRID_API_KEY`'i (`live_sk_bTm67cyQuqY8avXW5tXLQu`) kullan:

1. **CASS Adres Doğrulaması (Pre-Flight Check):**
   - PostGrid'e gitmeden önce istemci ve sunucuda `validateUSAddress` ile sokak ve 5 haneli ZIP kodunu kontrol et.
   - PostGrid API yanıtında `data.to?.addressStatus === 'failed'` dönerse, parayı kurtarmak için anında `cancelPostGridLetter(data.id)` çağır ve kullanıcıya anlaşılır hata mesajı dön.
2. **Çift Pencereli Zarf Uyumlu Transmittal Cover Sheet (Page 1):**
   - PostGrid çift pencereli zarf kullanır. Mektup paketinin 1. sayfasına resmi 'Transmittal Cover Sheet' koy.
   - Sol üstte gönderici adresi (`from`), pencere hizasında alıcı adresi (`to`) PostGrid'in standart boşluklarıyla yer alsın. 2. sayfadan itibaren resmi hukuki belge başlasın.
   - PostGrid'e Multipart FormData olarak gönder:
     - `extraService: 'certified'`
     - `color: 'false'`
     - `doubleSided: 'false'`
     - `addressPlacement: 'top_first_page'`
     - `pdf`: 2+ sayfalık resmi vektör PDF dosyası.
3. **Resmi Takip Numarası (Tracking Number):**
   - PostGrid'den dönen gerçek USPS takip numarasını (`data.trackingNumber` veya `data.carrierTracking?.trackingNumber`) al.
   - Başarı ekranında `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}` linkini oluştur.

---

### 🔒 4. ÇİFT BASIM YARIŞI KORUMASI (IDEMPOTENCY LOCK)
Müşteri ödeme sonrası `/checkout/success` sayfasına düştüğünde (istemci taraflı) ve eşzamanlı olarak LemonSqueezy webhook'u geldiğinde (sunucu taraflı) AYNI mektubun 2 kere basılmasını (%100) engelle:
- Sipariş numarası (`order_number`) bazlı durum kontrolü yap.
- İlk gelen istek sipariş durumunu `dispatching` olarak işaretlesin. İkinci istek geldiğinde mevcut mektup ID'sini ve takip numarasını döndürsün.
- Asla aynı sipariş için PostGrid API'si 2 kez çağrılmamalıdır!

---

### 🌐 5. LEMONSQUEEZY WEBHOOK & ÇOKLU SİTE KORUMASI (`/api/webhooks/lemonsqueezy`)
1. **İmza Doğrulama:** `LEMONSQUEEZY_WEBHOOK_SECRET` kullanarak HMAC-SHA256 imzasını kontrol et; geçersiz istekleri 401 ile reddet.
2. **Çoklu Site Çarpışma Kalkanı:**
   - Checkout başlatılırken `custom_data[site]=legaldeliveryportal` parametresi gönderilmelidir.
   - Webhook'a başka kardeş sitelerin siparişi düştüğünde (`custom_data.site !== 'legaldeliveryportal'`) hata vermeden sessizce `200 OK (skipped: foreign_site)` dön.
3. **Apple Pay E-posta Tuzağı Koruması:**
   - Apple Pay ile ödeyenlerde `user_email` kısmı `@privaterelay.appleid.com` gelebilir. Formda kullanıcının bizzat girdiği gerçek e-postayı (`formData.email`) birincil teslimat adresi olarak al.

---

### 🚨 6. KRİTİK METİN VE DİL KURALI (SIFIR UZUN ÇİZGİ - NO EM-DASH):
- Sitenin hiçbir yerinde (UI metinleri, rehberler, SEO içerikleri, FAQ ve PDF çıktısı dahil) **ASLA uzun tire / em-dash (`—`) veya en-dash (`–`) KULLANILMAYACAKTIR.**
- Cümleler doğal İngilizce bağlaçlarla, virgüllerle, iki nokta üst üste (`:`) veya gerekirse düz kısa tire (`-`) ile kurulmalıdır.

---

### 🚀 7. UYGULAMA VE DOĞRULAMA ADIMLARI
1. `src/config/documents/*.ts` dosyalarına `hasCertifiedMailOption` bayrağını ekle.
2. `src/lib/postgrid.ts` motorunu yukarıdaki kurallarla eksiksiz yaz.
3. `/api/webhooks/lemonsqueezy/route.ts` webhook dinleyicisini çift basım ve çoklu site korumasıyla bağla.
4. Form stepper'ının 3. adımına $9.90 Dijital vs $29.90 USPS Certified Mail seçim kartlarını entegre et.
5. `/checkout/success` sayfasında Certified Mail siparişleri için resmi USPS canlı takip çubuğu ve linkini göster.
6. `npm run build` çalıştırarak sıfır TypeScript hatası olduğunu doğrula.
7. Değişiklikleri `main` branch'ine commit'le ve GitHub'a pushla.
```
