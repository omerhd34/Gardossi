import {
 trLocalSeoDescription,
 trLocalSeoKeywords,
 trLocalSeoTitle,
} from "../../seo/local.js";

const tr = {
 metadata: {
  title: trLocalSeoTitle,
  description: trLocalSeoDescription,
  keywords: trLocalSeoKeywords,
 },

 common: {
  search: "Ara",
  searchPlaceholder: "Ara...",
  searchLabel: "Arama",
  clearSearch: "Aramayı temizle.",
  closeSearch: "Aramayı kapat.",
  searching: "Aranıyor.",
  searchResults: "Arama sonuçları",
  close: "Kapat.",
  loading: "Yükleniyor.",
  home: "ana sayfa",
  language: "Dil",
  selectLanguage: "Dil Seçin.",
  switchTo: "{language} diline geç",
 },

 nav: {
  mainMenu: "Ana Menü",
  products: "Ürünler",
  favorites: "Favoriler",
  contact: "İletişim",
  about: "Hakkımızda",
  corporate: "Kurumsal",
  policies: "Politikalar",
  projects: "Projeler",
  search: "Ara",
  exploreWithBrand: "Gardossi'yi Keşfet",
  mission: "Misyon & Vizyon",
  values: "Değerlerimiz",
  commitments: "Taahhütlerimiz",
  faq: "Sıkça Sorulan Sorular",
  desktopMenu: "Masaüstü menü",
  mainNav: "Ana navigasyon",
  mobileMenu: "Mobil menü",
  openMenu: "Menüyü aç",
  closeMenu: "Menüyü kapat",
  productCategories: "Ürün kategorileri",
  openProductCategories: "Ürün kategorilerini aç",
  openCorporateMenu: "Kurumsal menüyü aç",
  openSubmenu: "{label} alt menüsünü aç",
  mainMenuTitle: "Ana menü - {brand}",
 },

 categories: {
  "oturma-gruplari": "Oturma Grupları",
  "kose-gruplari": "Köşe Grupları",
  masalar: "Masa Grupları",
  salincak: "Salıncaklar",
  sezlong: "Şezlonglar",
  sandalyeler: "Sandalyeler",
  allProducts: "Tüm ürünler",
  viewAll: "Tümünü gör",
  categoriesAria: "Kategoriler",
 },

 menuProducts: {
  "acelya-oturma-antrasit": "Açelya",
  "acelya-oturma-cappuccino": "Açelya",
  "aston-oturma-antrasit": "Aston",
  "aston-oturma-cappuccino": "Aston",
  "begonia-oturma-antrasit": "Begonia",
  "begonia-oturma-gri": "Begonia",
  "tesla-oturma": "Tesla",
  "velar-oturma": "Velar",
  "begonia-oturma-cappuccino": "Begonia",
  "tesla-kose": "Tesla",
  "velar-kose": "Velar",
  "tesla-masa": "Tesla",
  "velar-masa": "Velar",
  "tesla-salincak": "Tesla",
  "velar-salincak": "Velar",
  "velar-sezlong": "Velar",
  "trend-sandalye-cappuccino": "Trend",
  "trend-sandalye-antrasit": "Trend",
 },

 footer: {
  explore: "Kurumsal",
  categories: "Kategoriler",
  helpPolicies: "Politikalar",
  getInTouch: "İletişime Geçin",
  about: "Hakkımızda",
  mission: "Misyon & Vizyon",
  values: "Değerlerimiz",
  commitments: "Taahhütlerimiz",
  faq: "Sıkça Sorulan Sorular",
  kvkk: "Kişisel Verilerin Korunması Kanunu (KVKK)",
  privacy: "Gizlilik ve Güvenlik",
  cookies: "Çerez Politikası",
  siteDeveloper: "Tasarım ve geliştirme:",
  phone: "Telefon: {phone}",
  email: "E-posta: {email}",
  location: "Konum",
 },

 contact: {
  title: "İletişim",
  seoIntro:
   "İnegöl/Bursa showroom'umuzda sizlere en iyi hizmeti sunabilmemiz için ziyaretlerinizi randevulu olarak kabul etmekteyiz. Gelmeden önce telefon ya da WhatsApp üzerinden bize ulaşarak randevu alabilirsiniz.",
  address: "Mahmudiye Mahallesi, 11. Mobilya Sokak No: 21/I, 16400, İnegöl/Bursa",
  whatsapp: "WhatsApp ile iletişime geç",
  backToTop: "Sayfanın en üstüne git",
  call: "Telefon ile ara",
  weekdays: "Hafta içi",
  weekend: "Hafta sonu",
  weekdayHours: "10:00 - 19:00",
  weekendHours: "11:00 - 20:00",
  viewOnMap: "Haritada görüntüle",
  mapLocation: "{name} konumu",
 },

 catalog: {
  category: "Kategori",
  filter: "Filtre",
  productFilters: "Ürün filtreleri",
  closeFilters: "Filtreleri kapat.",
  removeFilter: "Filtreyi kaldır.",
  clearAll: "Tümünü temizle",
  clear: "Temizle",
  showProducts: "Göster",
  searchProducts: "Ürün ara",
  sort: "Sırala",
  sortOptions: "Sıralama seçenekleri",
  closeSort: "Sıralamayı kapat.",
  sortFeatured: "Öne Çıkan",
  sortPanelOrder: "Panel sırası",
  sortNewest: "En yeni gelenler",
  sortPriceAsc: "Fiyata göre artan",
  sortPriceDesc: "Fiyata göre azalan",
  sortNameAsc: "Adı (A'dan > Z'ye)",
  sortNameDesc: "Adı (Z'den > A'ya)",
  noSearchResults: "Aramanızla eşleşen sonuç bulunamadı.",
  products: "Ürünler",
  allProductsTitle: "Tüm Ürünler",
  searchProductsPlaceholder: "Ürün ara...",
  noProducts: "Aramanızla eşleşen ürün bulunamadı.",
  tryAgain: "Aramanızı değiştirerek tekrar deneyin.",
  categoryDescriptions: {
   "oturma-gruplari":
    "Bahçe oturma grupları ve dış mekan koltuk takımları",
   "kose-gruplari":
    "Bahçe köşe takımları, ve modüler dış mekan oturma çözümleri",
   masalar:
    "Bahçe, balkon ve teraslar için şık masa takımları, Dayanıklı dış mekan yemek masaları ve sandalyeleri",
   salincak: "Bahçe salıncakları ve dış mekan salıncak modelleri",
   sezlong: "Bahçe ve havuz başı şezlongları",
   sandalyeler: "Bahçe ve balkonlar için dayanıklı dış mekan sandalyeleri",
  },
 },

 product: {
  notFound: "Ürün Bulunamadı.",
  notFoundDescription:
   "Aradığınız ürün kaldırılmış veya yayında olmayabilir.",
  backToAllProducts: "Tüm ürünlere dön",
  addToFavorites: "Favorilere Ekle",
  removeFromFavorites: "Favorilerden Çıkar",
  viewDimensionsTable: "Ölçü Tablosunu Gör",
  viewProductInfo: "Ürün Bilgisini Gör",
  dimensionsTableTitle: "Ölçü Tablosu",
  price: "Fiyat",
  priceTotal: "Toplam",
  standardConfig: "Standart ölçü",
  cornerStandardSize: "Boyut",
  cornerStandardSideA: "L - uzun",
  cornerStandardSideB: "L - kısa",
  cornerStandardNote:
   "Ürün modüllerden oluşmaktadır; ölçü değişikliği mümkündür.",
  productInfo: "Ürün Bilgisi",
  productImage: "Ürün görseli",
  enlargeImage: "{alt} - büyüt",
  productImages: "Ürün görselleri",
  noImage: "Görsel bulunamadı.",
  previousImage: "Önceki görsel",
  nextImage: "Sonraki görsel",
  enterFullscreen: "Tam ekran",
  exitFullscreen: "Tam ekrandan çık",
  width: "Genişlik",
  depth: "Derinlik",
  height: "Yükseklik",
  dimensionPiece: "Parça",
  dimensionUnit: "cm",
  dimensionWidthShort: "G",
  dimensionDepthShort: "D",
  dimensionHeightShort: "Y",
  previousCategories: "Önceki kategoriler",
  nextCategories: "Sonraki kategoriler",
 },

 hero: {
  prevSlide: "Önceki slayt",
  nextSlide: "Sonraki slayt",
  slide: "Slayt {n}",
  carouselLabel: "Ana sayfa slayt görselleri",
  slides: {
   "slide-1": {
    alt: "Gardossi bahçe mobilyası - dış mekan oturma grubu",
   },
   "slide-2": {
    alt: "Gardossi bahçe mobilyası - modern dış mekan yaşam alanı",
   },
   "slide-3": {
    alt: "Gardossi bahçe mobilyası - premium teras ve bahçe mobilyası",
   },
   "slide-4": {
    alt: "Gardossi bahçe mobilyası - dış mekan dinlenme alanı",
   },
  },
 },

 faq: {
  pageTitle: "Sık Sorulan Sorular",
  intro:
   "Sıkça Sorulan Sorular bölümünde, en yaygın soruları ve bu sorulara verilen cevapları bulacaksınız.",
  categoriesAria: "Sıkça Sorulan Sorular kategorileri",
  showMore: "Daha Fazla",
  tabs: {
   alisveris: "ALIŞVERİŞ",
   teslimat: "TESLİMAT",
   odeme: "ÖDEME",
  },
  categories: [
   {
    id: "alisveris",
    title: "ALIŞVERİŞ",
    initialVisible: 4,
    items: [
     {
      question: "Ürünleri nasıl satın alabilirim?",
      answer:
       "Beğendiğiniz ürünler için müşteri hizmetlerimizle yukarıdaki WhatsApp veya telefon bağlantıları üzerinden iletişime geçebilirsiniz. Ekibimiz size ölçü, kumaş ve teslimat seçenekleri konusunda rehberlik eder.",
     },
     {
      question: "Telefon üzerinden sipariş oluşturabilir miyim?",
      answer:
       "Evet. Müşteri hizmetleri hattımızı arayarak ürün bilgisi alabilir ve sipariş sürecinizi telefonla başlatabilirsiniz. Randevu ve teklif talepleriniz aynı kanal üzerinden kayda alınır.",
     },
     {
      question: "Siparişimin onaylandığını nereden öğrenebilirim?",
      answer:
       "Siparişiniz onaylandığında telefon veya WhatsApp üzerinden bilgilendirilirsiniz. Ayrıca müşteri hizmetlerimizden sipariş durumunuzu sorgulayabilirsiniz.",
     },
     {
      question: "Ürünleri yerinde görebilir miyim?",
      answer:
       "İletişim sayfamızdaki adresten randevu alarak ürünleri yerinde inceleyebilirsiniz.",
     },
     {
      question: "Özel ölçü veya kişiselleştirme mümkün mü?",
      answer:
       "Seçili ürünlerde kumaş, ayak ve ölçü seçenekleri sunulmaktadır. Detaylar için satış ekibimizle iletişime geçin.",
     },
    ],
   },
   {
    id: "teslimat",
    title: "TESLİMAT",
    initialVisible: 4,
    items: [
     {
      question: "Teslimat süresi nedir?",
      answer:
       "Teslimat süresi ürün model, stok durumuna ve teslimat adresine göre değişir. Sipariş onayı sonrası tahmini teslimat tarihi size bildirilir.",
     },
     {
      question:
       "Satın aldığım ürünü teslim alırken nakliye ve kurulum ücreti ödeyecek miyim?",
      answer:
       "Nakliye ve kurulum ücretleri sipariş özetinde ayrıca belirtilir. Bölge ve hizmet kapsamına göre ücretlendirme yapılır; teklif aşamasında net bilgi paylaşılır.",
     },
     {
      question: "Türkiye'nin her yerine ve yurt dışına teslimat yapıyor musunuz?",
      answer:
       "Türkiye genelinde ve yurt dışına teslimat yapılmaktadır. Uzak bölgeler için ek süre veya ücret uygulanabilir; sipariş öncesi teyit edilir.",
     },
     {
      question: "Hasarlı ürün teslim alındıysa ne yapmalıyım?",
      answer:
       "Hasarlı veya eksik teslimatlarda 48 saat içinde fotoğraflı bildirim yapmanız önerilir. Ekibimiz değişim veya onarım sürecini başlatır.",
     },
    ],
   },
   {
    id: "odeme",
    title: "ÖDEME",
    initialVisible: 3,
    items: [
     {
      question: "Ödemeyi ürünleri teslim alırken kapıda yapabilir miyim?",
      answer:
       "Kapıda ödeme seçeneği bölge ve sipariş tipine göre sunulabilir. Teklif aşamasında uygun ödeme yöntemleri paylaşılır.",
     },
     {
      question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      answer:
       "Kredi kartı ve banka havalesi ile ödeme seçenekleri mevcuttur. Taksit imkânları banka anlaşmalarına göre değişir.",
     },
     {
      question: "Kurumsal fatura kesilebilir mi?",
      answer:
       "Evet. Şirket unvanı, vergi dairesi ve numara bilgilerinizi sipariş öncesi paylaşmanız yeterlidir.",
     },
    ],
   },
  ],
 },

 home: {
  categoriesTitle: "Kategoriler",
  categoriesDescription:
   "Dış mekân yaşam alanlarınıza değer katacak bahçe ve balkon mobilyası koleksiyonlarımızı keşfedin.",
  featuredTitle: "Öne Çıkan Ürünler",
  featuredDescription: "Sezonun öne çıkan tasarımlarını keşfedin.",
  brandExperienceAlt: "Gardossi üretim deneyimi - bahçe mobilyası atölyesi",
  brandExperienceTitleLines: [
   "İnegöl ustalığı",
   "premium",
   "bahçe mobilyasında",
  ],
  brandExperienceDescription:
   "Dış mekânlarınızı seçkin yaşam alanlarına dönüştüren ürünlerimiz; dayanıklılığı, konforu ve estetiği kusursuz bir uyumla sunar.",
  brandExperienceCta: "Markayı Keşfet",
 },

 about: {
  pageTitle: "Hakkımızda",
  heroEyebrow: "Gardossi Garden Furniture",
  greeting: "Merhaba, biz Gardossi Garden Furniture.",
  paragraphs: [
   "Gardossi Garden Furniture, dış mekân yaşamını konfor ve estetikle buluşturma vizyonuyla kurulmuş bir bahçe mobilyası markasıdır. Bahçe, teras ve balkonlarda geçirilen zamanı daha keyifli kılmak için özenle seçilmiş ürünlerimizi sizlerle buluşturuyoruz.",
   "Kalite, şıklık ve kullanım rahatlığını bir arada sunan ürünler geliştirmeyi esas alıyoruz. Bizim için bir bahçe mobilyası yalnızca bir eşya değil; sevdiklerinizle paylaştığınız anların ayrılmaz bir parçasıdır.",
   "Müşterilerimizi bir sipariş numarasından ibaret görmüyoruz. Her alışverişin arkasında bir yaşam alanı, bir aile ve yeni anılar olduğunun bilinciyle; ürün seçiminden teslimata kadar her aşamada güvenilir ve özenli bir hizmet sunuyoruz.",
   "İnegöl'ün üretim geleneğinden ilham alarak her üründe aynı titizliği sürdürüyor, yaşam alanlarınıza kalıcı konfor ve estetik katmaya kararlılıkla devam ediyoruz.",
  ],
  closing: "Gardossi Garden Furniture ailesine hoş geldiniz.",
  visualTitleLines: [
   "Zanaatin konforla buluştuğu",
   "premium bahçe mobilyaları",
  ],
  visualCta: "Ürünleri Keşfet",
 },

 missionVision: {
  pageTitle: "Misyon ve Vizyon",
  heroImageAlt: "İnegöl mobilya ustalığı - atölyede zımparalama",
  heroEyebrow: "Gardossi Garden Furniture",
  missionTitle: "Misyonumuz",
  missionText:
   "Dış mekânları güzelleştiren, dayanıklı ve estetik bahçe mobilyalarını müşterilerimizle buluşturmak. Ürünlerimizi şeffaf katalog deneyimi, detaylı ürün bilgileri ve güvenilir üretim ortaklığıyla sunarak; bireysel alıcılardan otel ve proje müşterilerine kadar her ihtiyaca yanıt vermek.",
  visionTitle: "Vizyonumuz",
  visionText:
   "Türkiye'nin premium bahçe mobilyası alanında güvenilir ve ilham veren bir marka olmak. Minimalist, zamansız tasarım anlayışımızı koruyarak ürün yelpazemizi genişletmek; İnegöl ustalığını ulusal ve uluslararası dış mekân projelerinde referans noktası haline getirmek.",
  valuesTitle: "Değerlerimiz",
  values: [
   {
    icon: "MdVerifiedUser",
    title: "Premium Kalite",
    description:
     "Dış mekân koşullarına dayanıklı malzemeler ve özenli işçilikle uzun ömürlü ürünler sunarız.",
   },
   {
    icon: "MdViewModule",
    title: "Zamansız Tasarım",
    description:
     "Minimalist ve çağdaş çizgilerle, yıllar geçse de değerini koruyan tasarımlar geliştiririz.",
   },
   {
    icon: "MdExplore",
    title: "Şeffaflık",
    description:
     "Ürün bilgileri, görseller ve teknik detaylarda açık ve güvenilir bir katalog deneyimi sağlarız.",
   },
   {
    icon: "MdSupportAgent",
    title: "Müşteri Odaklılık",
    description:
     "Satış öncesi danışmanlıktan teslimat sonrasına kadar her aşamada müşterilerimizi destekleriz.",
   },
   {
    icon: "MdHandshake",
    title: "Üretim Gücü",
    description:
     "İnegöl'ün köklü mobilya geleneğiyle güvenilir üretim altyapısı ve tutarlı kalite standartları sunarız.",
   },
   {
    icon: "MdEco",
    title: "Sürdürülebilirlik",
    description:
     "Uzun ömürlü ürünler ve bilinçli malzeme seçimleriyle kaynakları verimli kullanır, israfı azaltırız.",
   },
  ],
  commitmentsTitle: "Taahhütlerimiz",
  commitments: [
   "Her üründe doğru ve eksiksiz bilgi paylaşmak",
   "Kalite standartlarından ödün vermeden üretim yapmak",
   "Kurumsal ve özel projelerde esnek, çözüm odaklı yaklaşmak",
   "Dış mekân mobilyasında sürdürülebilir ve uzun ömürlü tercihleri desteklemek",
  ],
  ctaTitle: "Ürünleri Keşfedin",
  ctaDescription:
   "Misyonumuzu ürünlerimizde yaşatıyoruz. Bahçe ve dış mekân mobilyası kataloğumuza göz atın.",
  ctaProducts: "Ürünleri Gör",
  ctaContact: "İletişime Geçin",
 },

 favorites: {
  title: "Favorilerim",
  navLabel: "Favorilerim ({count})",
  listing: "{count} ürün",
  search: "Favorilerde ara",
  searchPlaceholder: "Kategori veya ürün ara...",
  sortRecentlyAdded: "Son eklenenler",
  allCategories: "Tüm Kategoriler",
  selectFilters: "Kategori seçin",
  noResults: "Filtrelerinizle eşleşen favori bulunamadı.",
  tryAgain: "Filtreleri temizleyerek tekrar deneyin.",
  emptyDescription:
   "Henüz favori ürününüz yok. Beğendiğiniz ürünleri kalp simgesiyle kaydedin; liste yalnızca bu tarayıcıda saklanır.",
  browseProducts: "Ürünleri keşfet",
  addedToast: "Ürün favorilere eklendi.",
  removedToast: "Ürün favorilerden çıkarıldı.",
  addedToastShort: "Favorilere eklendi.",
  removedToastShort: "Favorilerden çıkarıldı.",
 },

 legal: {
  shared: {
   lastUpdatedLabel: "Son güncelleme",
   contactTitle: "İletişime geçin",
   contactDescription:
    "Kişisel verileriniz, gizlilik uygulamalarımız veya çerez kullanımımız hakkında sorularınız için bizimle iletişime geçebilirsiniz.",
  },
  policies: {
   heroEyebrow: "Yasal",
   pageTitle: "Politikalar",
   lastUpdated: "Haziran 2026",
  },
  kvkk: {
   heroEyebrow: "Yasal",
   pageTitle: "Kişisel Verilerin Korunması Kanunu (KVKK)",
   lastUpdated: "Haziran 2026",
   intro:
    "Gardossi olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerinizin güvenliğine önem veriyoruz. Web sitemiz üyelik veya online satış içermeyen bir ürün kataloğudur; bu metin, veri sorumlusu sıfatıyla hangi verileri hangi amaçlarla işlediğimizi ve haklarınızı açıklar.",
   sections: [
    {
     id: "veri-sorumlusu",
     title: "Veri Sorumlusu",
     paragraphs: [
      "Veri sorumlusu: Gardossi. Adres: Mahmudiye Mahallesi, 11. Mobilya Sokak No: 21/I, 16400 İnegöl/Bursa.",
      "Kişisel verilerinizle ilgili taleplerinizi telefon, WhatsApp veya e-posta kanallarımız üzerinden bize iletebilirsiniz.",
     ],
    },
    {
     id: "islenen-veriler",
     title: "İşlenen Kişisel Veriler",
     paragraphs: [
      "Web sitemizi ziyaret ettiğinizde veya telefon, WhatsApp ya da e-posta ile bizimle iletişime geçtiğinizde aşağıdaki veri kategorileri işlenebilir:",
     ],
     list: [
      "İletişim bilgileri (telefon, WhatsApp veya e-posta yoluyla paylaştığınız ad, telefon numarası, e-posta adresi)",
      "İşlem güvenliği verileri (IP adresi, tarayıcı türü, erişim kayıtları)",
      "Dil tercihi çerezi aracılığıyla toplanan site kullanım verileri",
     ],
    },
    {
     id: "isleme-amaclari",
     title: "İşleme Amaçları ve Hukuki Sebepler",
     paragraphs: [
      "Kişisel verileriniz; ürün kataloğunun sunulması, iletişim taleplerinizin yanıtlanması, web sitesi güvenliğinin sağlanması ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.",
      "İşleme faaliyetleri KVKK'nın 5. ve 6. maddelerinde belirtilen hukuki yükümlülük, meşru menfaat ve - iletişim talebiniz kapsamında - sözleşmenin kurulması veya ifası hukuki sebeplerine dayanabilir.",
     ],
    },
    {
     id: "aktarim",
     title: "Verilerin Aktarılması",
     paragraphs: [
      "Kişisel verileriniz; web sitesi altyapısı, harita hizmeti veya hukuk ve mali müşavirlik gibi hizmet sağlayıcıları ile yalnızca hizmetin gerektirdiği ölçüde ve gerekli güvenlik önlemleri alınarak paylaşılabilir.",
      "Yurt dışına aktarım söz konusu olduğunda KVKK'nın 9. maddesinde öngörülen şartlara uygun hareket edilir.",
     ],
    },
    {
     id: "saklama",
     title: "Saklama Süresi",
     paragraphs: [
      "Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı süreleri kadar saklanır; süre sonunda silinir, yok edilir veya anonim hâle getirilir.",
     ],
    },
    {
     id: "haklar",
     title: "KVKK Kapsamındaki Haklarınız",
     paragraphs: [
      "KVKK'nın 11. maddesi uyarınca veri sorumlusuna başvurarak aşağıdaki haklara sahipsiniz:",
     ],
     list: [
      "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
      "İşlenmişse buna ilişkin bilgi talep etme",
      "İşleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
      "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
      "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
      "KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
      "Düzeltme, silme veya yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme",
      "Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
      "Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
     ],
    },
    {
     id: "basvuru",
     title: "Başvuru Yöntemi",
     paragraphs: [
      "Haklarınıza ilişkin taleplerinizi yazılı olarak veya Kişisel Verileri Koruma Kurulu'nun belirlediği yöntemlerle iletebilirsiniz. Başvurularınız en geç 30 içinde sonuçlandırılır.",
     ],
    },
   ],
  },
  privacy: {
   heroEyebrow: "Yasal",
   pageTitle: "Gizlilik ve Güvenlik",
   lastUpdated: "Haziran 2026",
   intro:
    "Gardossi web sitesi üyelik veya online satış içermeyen bir ürün kataloğudur. Ziyaretiniz sırasında gizliliğinizi korumayı taahhüt ederiz. Bu politika, bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu özetler.",
   sections: [
    {
     id: "toplanan-bilgiler",
     title: "Toplanan Bilgiler",
     paragraphs: [
      "Sitemizde aşağıdaki bilgiler toplanabilir veya işlenebilir:",
     ],
     list: [
      "Telefon, WhatsApp veya e-posta ile bize ulaştığınızda paylaştığınız iletişim bilgileri",
      "Site kullanımına ilişkin teknik veriler (tarayıcı türü, cihaz bilgisi, IP adresi)",
      "Güvenlik amacıyla tutulan sunucu erişim kayıtları",
      "Favori ürün listeniz yalnızca tarayıcınızda (yerel depolama) saklanır; sunucuya gönderilmez ve üyelik gerektirmez.",
     ],
    },
    {
     id: "kullanim-amaclari",
     title: "Bilgilerin Kullanım Amaçları",
     paragraphs: [
      "Toplanan bilgiler; iletişim taleplerinize yanıt vermek, ürün kataloğunu sunmak, web sitesi güvenliğini sağlamak ve yasal yükümlülüklerimizi yerine getirmek için kullanılır.",
      "Web sitemiz üzerinden online sipariş, ödeme veya üyelik işlemi yapılmaz.",
     ],
    },
    {
     id: "guvenlik",
     title: "Güvenlik Önlemleri",
     paragraphs: [
      "Kişisel verilerinizin yetkisiz erişime, kayba veya ifşaya karşı korunması için teknik ve idari güvenlik önlemleri uygulanır.",
      "Erişim yetkileri ihtiyaç esasına göre sınırlandırılır ve düzenli olarak gözden geçirilir.",
     ],
    },
    {
     id: "ucuncu-taraf",
     title: "Üçüncü Taraf Hizmetler",
     paragraphs: [
      "İletişim sayfasında kullanılan harita hizmeti (Google Maps) gibi üçüncü taraf araçlar kendi gizlilik politikalarına tabidir. Bu hizmetler yalnızca ilgili sayfanın sunulması için gerekli olduğu ölçüde kullanılır.",
     ],
    },
    {
     id: "cocuklar",
     title: "Çocukların Gizliliği",
     paragraphs: [
      "Web sitemiz 18 yaş altı bireylere yönelik değildir. Bilerek reşit olmayan kişilerden kişisel veri toplamayız.",
     ],
    },
    {
     id: "guncellemeler",
     title: "Politika Güncellemeleri",
     paragraphs: [
      "Bu gizlilik politikasını yasal gereklilikler veya hizmet değişiklikleri doğrultusunda güncelleyebiliriz. Güncel metin her zaman bu sayfada yayımlanır.",
     ],
    },
   ],
  },
  cookies: {
   heroEyebrow: "Yasal",
   pageTitle: "Çerez Politikası",
   lastUpdated: "Haziran 2026",
   intro:
    "Gardossi web sitesi, sitenin düzgün çalışması için sınırlı sayıda çerez kullanır. Bu politika, hangi çerezleri neden kullandığımızı açıklar.",
   sections: [
    {
     id: "cerez-nedir",
     title: "Çerez Nedir?",
     paragraphs: [
      "Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır. Dil tercihi gibi site ayarlarını hatırlamak için kullanılabilir.",
     ],
    },
    {
     id: "kullandigimiz-cerezler",
     title: "Kullandığımız Çerez Türleri",
     paragraphs: [
      "Sitemizde aşağıdaki çerez kullanılmaktadır:",
     ],
     list: [
      "Zorunlu çerezler: Dil tercihinizi hatırlamak için kullanılır. Bu çerez olmadan site dil seçiminizi koruyamaz.",
     ],
    },
    {
     id: "yerel-depolama",
     title: "Çerez Dışı Yerel Depolama",
     paragraphs: [
      "Favori ürün listeniz çerez değil, tarayıcınızın yerel depolama alanında (localStorage) saklanır. Bu veri yalnızca cihazınızda kalır ve sunucuya iletilmez.",
     ],
    },
    {
     id: "ucuncu-taraf-cerezler",
     title: "Üçüncü Taraf Çerezleri",
     paragraphs: [
      "İletişim sayfasındaki gömülü harita (Google Maps) gibi içerikler, ilgili platformların kendi çerezlerini yerleştirebilir. Bu çerezlerin kullanımı üçüncü tarafların politikalarına tabidir.",
     ],
    },
    {
     id: "yonetim",
     title: "Çerezleri Yönetme",
     paragraphs: [
      "Tarayıcı ayarlarınızdan çerezleri engelleyebilir, silebilir veya belirli çerez türlerine izin verebilirsiniz. Zorunlu çerezlerin devre dışı bırakılması sitenin bazı bölümlerinin düzgün çalışmamasına neden olabilir.",
      "Dil tercihiniz site çerezi aracılığıyla saklanır; bu çerezi silmeniz durumunda varsayılan dil yeniden uygulanır.",
     ],
    },
    {
     id: "saklama-suresi",
     title: "Saklama Süreleri",
     paragraphs: [
      "Oturum çerezleri tarayıcınızı kapattığınızda silinir. Kalıcı çerezler, amaçlarına uygun süre boyunca cihazınızda kalabilir; süre sonunda otomatik olarak sona erer veya siz tarafından silinir.",
     ],
    },
    {
     id: "guncellemeler",
     title: "Politika Güncellemeleri",
     paragraphs: [
      "Çerez kullanımımızdaki değişiklikler bu sayfada yayımlanır. Önemli değişikliklerde güncel tarih bilgisi paylaşılır.",
     ],
    },
   ],
  },
 },

 status: {
  notFound: {
   code: "404",
   title: "Sayfa Bulunamadı.",
   description:
    "Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.",
   goHome: "Ana sayfaya dön.",
   browseProducts: "Ürünleri keşfet",
   metadata: {
    title: "Sayfa Bulunamadı.",
    description: "Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.",
   },
  },
  error: {
   code: "Hata",
   title: "Bir Şeyler Ters Gitti",
   description:
    "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.",
   tryAgain: "Tekrar dene.",
   goHome: "Ana sayfaya dön.",
   metadata: {
    title: "Bir Hata Oluştu",
    description: "Sayfa yüklenirken beklenmeyen bir hata oluştu.",
   },
  },
 },

 pages: {
  contact: {
   title: "İletişim",
   description:
    "İnegöl/Bursa mağazamıza davetlisiniz. Bahçe mobilyası seçiminde uzman desteği, adres ve tüm iletişim bilgilerimiz burada.",
  },
  products: {
   title: "Ürünler",
   description:
    "İnegöl üretimi bahçe ve balkon mobilyaları, Oturma gruplarından salıncaklara tüm koleksiyonlarımızı inceleyin.",
   layoutDescription:
    "Gardossi İnegöl bahçe mobilyası kataloğu: oturma grupları, köşe bahçe takımları, balkon mobilyası, masa setleri ve dış mekan mobilyası.",
  },
  faq: {
   title: "Sık Sorulan Sorular",
   description:
    "Sıkça Sorulan Sorular bölümünde, en yaygın soruları ve bu sorulara verilen cevapları bulacaksınız.",
  },
  about: {
   title: "Hakkımızda",
   description:
    "Gardossi, dış mekân yaşamını konfor ve estetikle buluşturan bir bahçe mobilyası markasıdır.",
  },
  missionVision: {
   title: "Misyon ve Vizyon",
   description:
    "İnegöl'de üretilen premium bahçe mobilyası markası Gardossi'nin misyonunu ve vizyonunu keşfedin.",
  },
  values: {
   title: "Değerlerimiz",
   description:
    "İnegöl'de üretilen premium bahçe mobilyası markası Gardossi'nin kalite, tasarım, şeffaflık ve müşteri odaklılık değerlerini keşfedin.",
  },
  commitments: {
   title: "Taahhütlerimiz",
   description:
    "Gardossi'nin doğru ürün bilgisi, kaliteli üretim ve sürdürülebilir dış mekân mobilyası taahhütlerini keşfedin.",
  },
  favorites: {
   title: "Favorilerim",
   description:
    "Kaydettiğiniz Gardossi ürünleri - tarayıcınızda saklanan favori listeniz.",
  },
  policies: {
   title: "Politikalar",
   description:
    "Gardossi KVKK aydınlatma metni, gizlilik ve güvenlik politikası ile çerez politikası.",
  },
 },
};

export default tr;
