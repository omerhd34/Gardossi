const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { resolveMediaUrl } = require("../lib/media/resolve-media-url.cjs");

const prisma = new PrismaClient();

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function publicImages(folder, prefix = null) {
 const dir = path.join(PUBLIC_DIR, folder);
 if (!fs.existsSync(dir)) {
  console.warn(`  ⚠ Görsel klasörü bulunamadı: ${folder}`);
  return [];
 }

 return fs
  .readdirSync(dir)
  .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
  .filter((file) => !prefix || file.startsWith(prefix))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((file) => resolveMediaUrl(`/${folder}/${file}`));
}

function dimItems(items) {
 return {
  dimensionItems: items,
 };
}

const COLLECTIONS = [
 {
  slug: "acelya",
  name: "Açelya",
  nameEn: "Azalea",
  sortOrder: 1,
  products: [
   {
    slug: "acelya-oturma-antrasit",
    name: "Açelya Antrasit Oturma Grubu",
    nameEn: "Azalea Anthracite Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 27900,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
      amount: 13125,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 7500,
     },
     {
      name: "Benç",
      nameEn: "Bench",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 6750,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir. Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile dış mekân koşullarında uzun ömürlü ve güvenilir bir kullanım sunar.

• Ürün yüzeyinde kullanılan yüksek kaliteli rattan örgü , doğal rattan görünümünü modern üretim teknolojisiyle birleştirerek estetik ve dayanıklı bir yapı oluşturur. UV ışınlarına ve dış hava koşullarına karşı dirençli yapısı sayesinde formunu uzun süre korur.

• Dış mekân kullanımına uygun malzeme ve üretim teknolojisi sayesinde güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım gösterir, uzun süre ilk günkü görünümünü muhafaza eder.

• Farklı renk ve doku seçenekleri ile çeşitli dekoratif anlayışlara ve yaşam alanı konseptlerine uyum sağlayarak mekânlarda bütüncül bir estetik görünüm oluşturur.

• Modern tasarım anlayışı, kaliteli malzeme seçimi ve dayanıklı yapısıyla bahçe, teras ve balkon gibi alanlarda uzun ömürlü ve konforlu bir kullanım imkânı sağlar.`,
    descriptionEn: `• The product frame is made entirely of aluminum. Its lightweight structure provides easy use while offering high durability and long-lasting performance against rust.

• The high-quality rattan weave used on the surface combines natural rattan appearance with modern production technology to create an aesthetic and durable structure. Its resistance to UV rays and outdoor weather conditions allows it to maintain its form for a long time.

• The product made with material and production technology suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• Different color and texture options allow for various decorative approaches and align with living area concepts, creating a cohesive aesthetic look in spaces.

• Modern design approach, high-quality material selection and durable structure allow for long-lasting and comfortable use in garden, terrace and balcony areas.`,
    folder: "acelya-oturma",
    imagePrefix: "antrasit",
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 1,
   },
   {
    slug: "acelya-oturma-cappuccino",
    name: "Açelya Cappuccino Oturma Grubu",
    nameEn: "Azalea Cappuccino Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 27900,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
      amount: 13125,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 7500,
     },
     {
      name: "Benç",
      nameEn: "Bench",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 6750,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir. Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile dış mekân koşullarında uzun ömürlü ve güvenilir bir kullanım sunar.

• Ürün yüzeyinde kullanılan yüksek kaliteli rattan örgü , doğal rattan görünümünü modern üretim teknolojisiyle birleştirerek estetik ve dayanıklı bir yapı oluşturur. UV ışınlarına ve dış hava koşullarına karşı dirençli yapısı sayesinde formunu uzun süre korur.

• Dış mekân kullanımına uygun malzeme ve üretim teknolojisi sayesinde güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım gösterir, uzun süre ilk günkü görünümünü muhafaza eder.

• Farklı renk ve doku seçenekleri ile çeşitli dekoratif anlayışlara ve yaşam alanı konseptlerine uyum sağlayarak mekânlarda bütüncül bir estetik görünüm oluşturur.

• Modern tasarım anlayışı, kaliteli malzeme seçimi ve dayanıklı yapısıyla bahçe, teras ve balkon gibi alanlarda uzun ömürlü ve konforlu bir kullanım imkânı sağlar.`,
    descriptionEn: `• The product frame is made entirely of aluminum. Its lightweight structure provides easy use while offering high durability and long-lasting performance against rust.

• The high-quality rattan weave used on the surface combines natural rattan appearance with modern production technology to create an aesthetic and durable structure. Its resistance to UV rays and outdoor weather conditions allows it to maintain its form for a long time.

• The product made with material and production technology suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• Different color and texture options allow for various decorative approaches and align with living area concepts, creating a cohesive aesthetic look in spaces.

• Modern design approach, high-quality material selection and durable structure allow for long-lasting and comfortable use in garden, terrace and balcony areas.`,
    folder: "acelya-oturma",
    imagePrefix: "cappuccino",
    sortOrder: 7,
   },
  ],
 },
 {
  slug: "aston",
  name: "Aston",
  nameEn: "Aston",
  sortOrder: 2,
  products: [
   {
    slug: "aston-oturma-antrasit",
    name: "Aston Antrasit Oturma Grubu",
    nameEn: "Aston Anthracite Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 85,
      heightCm: 80,
      amount: 23400,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 85,
      heightCm: 80,
      amount: 12150,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 9000,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 3450,
      quantity: 2,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir. Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile uzun ömürlü bir performans sunar.
  
    • Üst yüzeylerde kullanılan doğal ahşap detaylar, tasarıma sıcak ve doğal bir karakter kazandırırken dayanıklı yapısıyla uzun yıllar estetik görünümünü korur.

    • Özenle uygulanan örgü detayları, ürüne özgün bir tasarım dili kazandırırken estetik ve konforu bir araya getirir.

    • Dış mekân kullanımına uygun malzeme ve yüzey teknolojileriyle üretilen ürün, güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım göstererek ilk günkü görünümünü uzun süre muhafaza eder.

    • Kumaş ve alüminyum yüzeylerde sunulan farklı renk seçenekleri sayesinde çeşitli dekorasyon anlayışlarına uyum sağlayabilir.
    
    • Modern çizgileri, kaliteli malzeme seçimi ve zamansız tasarım anlayışıyla yaşam alanlarına estetik ve fonksiyonel bir değer katar.`,
    descriptionEn: `• The product frame is made entirely of aluminum. Its lightweight structure provides easy use while offering high durability and long-lasting performance against rust.
  
    • The natural wood details used on the top surfaces add a warm and natural character to the design while maintaining their durable structure for years of aesthetic appearance.

    • The carefully applied weave details add a unique design language to the product while combining aesthetic and comfort.

    • The product made with material and surface technologies suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

    • The different color options available on the fabric and aluminum surfaces allow for various decoration approaches.
    
    • Modern lines, high-quality material selection and timeless design approach add aesthetic and functional value to living areas.`,
    folder: "aston-oturma",
    imagePrefix: "antrasit",
    sortOrder: 8,
   },
   {
    slug: "aston-oturma-cappuccino",
    name: "Aston Cappuccino Oturma Grubu",
    nameEn: "Aston Cappuccino Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 85,
      heightCm: 80,
      amount: 23400,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 85,
      heightCm: 80,
      amount: 12150,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 9000,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 3450,
      quantity: 2,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir. Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile uzun ömürlü bir performans sunar.
  
• Üst yüzeylerde kullanılan doğal ahşap detaylar, tasarıma sıcak ve doğal bir karakter kazandırırken dayanıklı yapısıyla uzun yıllar estetik görünümünü korur.

• Özenle uygulanan örgü detayları, ürüne özgün bir tasarım dili kazandırırken estetik ve konforu bir araya getirir.

• Dış mekân kullanımına uygun malzeme ve yüzey teknolojileriyle üretilen ürün, güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım göstererek ilk günkü görünümünü uzun süre muhafaza eder.

• Kumaş ve alüminyum yüzeylerde sunulan farklı renk seçenekleri sayesinde çeşitli dekorasyon anlayışlarına uyum sağlayabilir.
    
• Modern çizgileri, kaliteli malzeme seçimi ve zamansız tasarım anlayışıyla yaşam alanlarına estetik ve fonksiyonel bir değer katar.`,
    descriptionEn: `• The product frame is made entirely of aluminum. Its lightweight structure provides easy use while offering high durability and long-lasting performance against rust.
  
• The natural wood details used on the top surfaces add a warm and natural character to the design while maintaining their durable structure for years of aesthetic appearance.

• The carefully applied weave details add a unique design language to the product while combining aesthetic and comfort.

• The product made with material and surface technologies suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• The different color options available on the fabric and aluminum surfaces allow for various decoration approaches.
    
• Modern lines, high-quality material selection and timeless design approach add aesthetic and functional value to living areas.`,
    folder: "aston-oturma",
    imagePrefix: "cappuccino",
    sortOrder: 4,
   },
  ],
 },
 {
  slug: "begonia",
  name: "Begonia",
  nameEn: "Begonia",
  sortOrder: 3,
  products: [
   {
    slug: "begonia-oturma-cappuccino",
    name: "Begonia Cappuccino Oturma Grubu",
    nameEn: "Begonia Cappuccino Seating Set",
    ...dimItems([
     {
      name: "2'li Koltuk",
      nameEn: "2-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 16100,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 75,
      heightCm: 80,
      amount: 9000,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 9300,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2300,
      quantity: 2,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir. Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile dış mekân koşullarında uzun ömürlü ve güvenilir bir kullanım sunar.

• Ürün yüzeyinde kullanılan yüksek kaliteli rattan örgü , doğal rattan görünümünü modern üretim teknolojisiyle birleştirerek estetik ve dayanıklı bir yapı oluşturur. UV ışınlarına ve dış hava koşullarına karşı dirençli yapısı sayesinde formunu uzun süre korur.

• Dış mekân kullanımına uygun malzeme ve üretim teknolojisi sayesinde güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım gösterir, uzun süre ilk günkü görünümünü muhafaza eder.

• Farklı renk ve doku seçenekleri ile çeşitli dekoratif anlayışlara ve yaşam alanı konseptlerine uyum sağlayarak mekânlarda bütüncül bir estetik görünüm oluşturur.

• Modern tasarım anlayışı, kaliteli malzeme seçimi ve dayanıklı yapısıyla bahçe, teras ve balkon gibi alanlarda uzun ömürlü ve konforlu bir kullanım imkânı sağlar.`,
    descriptionEn: `• The product frame is made entirely of aluminum. Its lightweight structure provides easy use while offering high durability and long-lasting performance against rust.

• The high-quality rattan weave used on the surface combines natural rattan appearance with modern production technology to create an aesthetic and durable structure. Its resistance to UV rays and outdoor weather conditions allows it to maintain its form for a long time.

• The product made with material and production technology suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• Different color and texture options allow for various decorative approaches and align with living area concepts, creating a cohesive aesthetic look in spaces.

• Modern design approach, high-quality material selection and durable structure allow for long-lasting and comfortable use in garden, terrace and balcony areas.`,
    folder: "begonia-2li",
    imageFiles: [
     "cappuccino-01.jpg",
     "cappuccino-02.jpg",
     "cappuccino-03.jpg",
     "cappuccino-04.jpg",
     "cappuccino-05.jpg",
     "cappuccino-06.jpg",
     "cappuccino-07.jpg",
     "cappuccino-08.jpg",
     "cappuccino-09.jpg",
     "cappuccino-10.jpg",
    ],
    sortOrder: 9,
   },
   {
    slug: "begonia-oturma-antrasit",
    name: "Begonia Antrasit Oturma Grubu",
    nameEn: "Begonia Anthracite Seating Set",
    ...dimItems([
     {
      name: "2'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 125,
      depthCm: 75,
      heightCm: 80,
      amount: 19100,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 75,
      heightCm: 80,
      amount: 9000,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 9300,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2300,
      quantity: 2,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir. Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile dış mekân koşullarında uzun ömürlü ve güvenilir bir kullanım sunar.

• Ürün yüzeyinde kullanılan yüksek kaliteli rattan örgü , doğal rattan görünümünü modern üretim teknolojisiyle birleştirerek estetik ve dayanıklı bir yapı oluşturur. UV ışınlarına ve dış hava koşullarına karşı dirençli yapısı sayesinde formunu uzun süre korur.

• Dış mekân kullanımına uygun malzeme ve üretim teknolojisi sayesinde güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım gösterir, uzun süre ilk günkü görünümünü muhafaza eder.

• Farklı renk ve doku seçenekleri ile çeşitli dekoratif anlayışlara ve yaşam alanı konseptlerine uyum sağlayarak mekânlarda bütüncül bir estetik görünüm oluşturur.

• Modern tasarım anlayışı, kaliteli malzeme seçimi ve dayanıklı yapısıyla bahçe, teras ve balkon gibi alanlarda uzun ömürlü ve konforlu bir kullanım imkânı sağlar.`,
    descriptionEn: `• The product frame is made entirely of aluminum. Its lightweight structure provides easy use while offering high durability and long-lasting performance against rust.

• The high-quality rattan weave used on the surface combines natural rattan appearance with modern production technology to create an aesthetic and durable structure. Its resistance to UV rays and outdoor weather conditions allows it to maintain its form for a long time.

• The product made with material and production technology suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• Different color and texture options allow for various decorative approaches and align with living area concepts, creating a cohesive aesthetic look in spaces.

• Modern design approach, high-quality material selection and durable structure allow for long-lasting and comfortable use in garden, terrace and balcony areas.`,
    folder: "begonia-oturma",
    imagePrefix: "antrasit",
    sortOrder: 5,
   },
   {
    slug: "begonia-oturma-gri",
    name: "Begonia Gri Oturma Grubu",
    nameEn: "Begonia Grey Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 19100,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 75,
      heightCm: 80,
      amount: 9000,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 9300,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2300,
      quantity: 2,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir. Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile dış mekân koşullarında uzun ömürlü ve güvenilir bir kullanım sunar.

• Ürün yüzeyinde kullanılan yüksek kaliteli rattan örgü , doğal rattan görünümünü modern üretim teknolojisiyle birleştirerek estetik ve dayanıklı bir yapı oluşturur. UV ışınlarına ve dış hava koşullarına karşı dirençli yapısı sayesinde formunu uzun süre korur.

• Dış mekân kullanımına uygun malzeme ve üretim teknolojisi sayesinde güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım gösterir, uzun süre ilk günkü görünümünü muhafaza eder.

• Farklı renk ve doku seçenekleri ile çeşitli dekoratif anlayışlara ve yaşam alanı konseptlerine uyum sağlayarak mekânlarda bütüncül bir estetik görünüm oluşturur.

• Modern tasarım anlayışı, kaliteli malzeme seçimi ve dayanıklı yapısıyla bahçe, teras ve balkon gibi alanlarda uzun ömürlü ve konforlu bir kullanım imkânı sağlar.`,
    descriptionEn: `• The product frame is made entirely of aluminum. Its lightweight structure provides easy use while offering high durability and long-lasting performance against rust.

• The high-quality rattan weave used on the surface combines natural rattan appearance with modern production technology to create an aesthetic and durable structure. Its resistance to UV rays and outdoor weather conditions allows it to maintain its form for a long time.

• The product made with material and production technology suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• Different color and texture options allow for various decorative approaches and align with living area concepts, creating a cohesive aesthetic look in spaces.

• Modern design approach, high-quality material selection and durable structure allow for long-lasting and comfortable use in garden, terrace and balcony areas.`,
    folder: "begonia-oturma",
    imagePrefix: "gri",
    sortOrder: 3,
   },
  ],
 },
 {
  slug: "tesla",
  name: "Tesla",
  nameEn: "Tesla",
  sortOrder: 4,
  products: [
   {
    slug: "tesla-kose",
    name: "Tesla Köşe Grubu",
    nameEn: "Tesla Corner Set",
    cornerStandardSideACm: 245,
    cornerStandardSideBCm: 220,
    ...dimItems([
     {
      name: "4'lü Koltuk",
      nameEn: "4-Seater Sofa",
      widthCm: 245,
      depthCm: 75,
      heightCm: 80,
      amount: 33600,
     },
     {
      name: "2'li Koltuk",
      nameEn: "2-Seater Sofa",
      widthCm: 120,
      depthCm: 75,
      heightCm: 80,
      amount: 16350,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 8850,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 3450,
      quantity: 2,
     },
     {
      name: "Kol Sehpası",
      nameEn: "Arm Side Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 7500,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir. Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile uzun ömürlü bir performans sunar.

• Üst yüzeylerde kullanılan doğal ahşap detaylar, tasarıma sıcak ve doğal bir karakter kazandırırken dayanıklı yapısıyla uzun yıllar estetik görünümünü korur.

• Dış mekân kullanımına uygun malzeme ve yüzey teknolojileriyle üretilen ürün, güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım göstererek ilk günkü görünümünü uzun süre muhafaza eder.

• Kumaş ve alüminyum yüzeylerde sunulan farklı renk seçenekleri sayesinde çeşitli dekorasyon anlayışlarına uyum sağlayabilir.

• Modern çizgileri, kaliteli malzeme seçimi ve zamansız tasarım anlayışıyla yaşam alanlarına estetik ve fonksiyonel bir değer katar.`,
    descriptionEn: `• The product frame is made entirely of aluminum. Its lightweight structure provides easy use while offering high durability and long-lasting performance against rust.

• The natural wood details used on the top surfaces add a warm and natural character to the design while maintaining their durable structure for years of aesthetic appearance.

• The product made with material and surface technologies suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• The different color options available on the fabric and aluminum surfaces allow for various decoration approaches.

• Modern lines, high-quality material selection and timeless design approach add aesthetic and functional value to living areas.`,
    folder: "tesla-kose",
    imagePrefix: "antrasit",
    sortOrder: 1,
   },
   {
    slug: "tesla-masa",
    name: "Tesla Masa Grubu",
    nameEn: "Tesla Table Set",
    ...dimItems([
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 160,
      depthCm: 90,
      heightCm: 75,
      amount: 27900,
     },
     {
      name: "Sandalye",
      nameEn: "Chair",
      widthCm: 57,
      depthCm: 60,
      heightCm: 85,
      amount: 6750,
      quantity: 6,
     },
    ]),
    description: `• Ürün, alüminyum iskelet ve doğal ahşap detayların bir araya gelmesiyle üretilmiş masa sandalye grubudur. Sağlam yapısı sayesinde dış mekân kullanımına uygun olup uzun ömürlü ve güvenilir bir performans sunar.

• Sandalyelerin iç içe geçebilme özelliği, kullanım sonrası alan tasarrufu sağlayarak depolama ve düzen açısından pratik bir çözüm sunar.

• Alüminyum gövde, paslanmaya karşı yüksek dayanım göstererek dış mekân koşullarında formunu korur ve uzun süreli kullanım imkânı sağlar.

• Ahşap detaylar, tasarıma doğal ve sıcak bir görünüm kazandırırken estetik bütünlüğü destekler ve yaşam alanlarına şık bir karakter katar.

• Dış mekân kullanımına uygun malzeme yapısı sayesinde güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım göstererek ilk günkü görünümünü uzun süre muhafaza eder.

• Modern tasarım çizgisi ve fonksiyonel yapısıyla bahçe, teras ve balkon gibi alanlarda hem estetik hem de kullanışlı bir oturma alanı oluşturur.`,
    descriptionEn: `• The product is made by combining an aluminum frame and natural wood details. Its durable structure makes it suitable for outdoor use and provides long-lasting and reliable performance.

• The collapsible feature of the chairs provides a practical solution for area savings after use, storage and organization.

• The aluminum body withstands high durability against rust and maintains its form in outdoor conditions, providing long-lasting use.

• The wood details add a natural and warm character to the design while supporting the aesthetic integrity and giving a stylish character to living areas.

• The product made with material suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• Modern design lines and functional structure create an aesthetic and practical seating area in garden, terrace and balcony areas.`,
    folder: "tesla-masa",
    sortOrder: 2,
   },
   {
    slug: "tesla-oturma",
    name: "Tesla Oturma Grubu",
    nameEn: "Tesla Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 28200,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
      amount: 13250,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 8000,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 3450,
      quantity: 2,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir.Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile uzun ömürlü bir performans sunar.

• Üst yüzeylerde kullanılan doğal ahşap detaylar, tasarıma sıcak ve doğal bir karakter kazandırırken dayanıklı yapısıyla uzun yıllar estetik görünümünü korur.

• Dış mekân kullanımına uygun malzeme ve yüzey teknolojileriyle üretilen ürün, güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım göstererek ilk günkü görünümünü uzun süre muhafaza eder.

• Kumaş ve alüminyum yüzeylerde sunulan farklı renk seçenekleri sayesinde çeşitli dekorasyon anlayışlarına uyum sağlayabilir.

• Modern çizgileri, kaliteli malzeme seçimi ve zamansız tasarım anlayışıyla yaşam alanlarına estetik ve fonksiyonel bir değer katar.`,
    descriptionEn: `• The product frame is made entirely of aluminum.Its lightweight structure provides easy use while offering high durability and long - lasting performance against rust.

• The natural wood details used on the top surfaces add a warm and natural character to the design while maintaining their durable structure for years of aesthetic appearance.

• The product made with material and surface technologies suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• The different color options available on the fabric and aluminum surfaces allow for various decoration approaches.

• Modern lines, high - quality material selection and timeless design approach add aesthetic and functional value to living areas.`,
    folder: "tesla-oturma",
    sortOrder: 6,
   },
   {
    slug: "tesla-salincak",
    name: "Tesla Salıncak",
    nameEn: "Tesla Swing",
    dimensions: "220 x 125 x 205 cm",
    widthCm: 220,
    depthCm: 125,
    heightCm: 205,
    ...dimItems([
     {
      name: "Salıncak",
      nameEn: "Swing",
      widthCm: 220,
      depthCm: 125,
      heightCm: 205,
      amount: 79000,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir.Paslanmaya karşı yüksek dayanımı ile dış mekân koşullarında uzun ömürlü ve güvenilir bir performans sunar.

• 250 kg taşıma kapasitesine sahip sağlam gövde yapısı, yüksek mukavemeti sayesinde güvenli ve dengeli bir kullanım sunarak dayanıklılığı ön planda tutar.

• Ürün üzerinde yer alan tente(gölgelik) sistemi, güneş ışınlarını ve hafif yağmur etkisini azaltarak konforlu bir kullanım alanı oluşturur ve dış mekân kullanımını daha keyifli hale getirir.

• Üründe kullanılan doğal ahşap detaylar, tasarıma sıcak ve estetik bir görünüm kazandırırken dış mekân koşullarına uygun yapısıyla uzun yıllar formunu korur.

• Ergonomik oturum yapısı, rahat bir salınım deneyimi sunarken aynı zamanda stabil ve dengeli bir kullanım sağlar.

• Dış mekân koşullarına uygun malzeme seçimi sayesinde güneş ışınları, nem, yağmur ve değişken hava şartlarına karşı yüksek dayanım göstererek uzun süre ilk günkü görünümünü muhafaza eder.

• Modern tasarım çizgisi, ahşap ve alüminyumun uyumlu birleşimiyle yaşam alanlarına estetik, konfor ve fonksiyonelliği bir arada sunar.`,
    descriptionEn: `• The product frame is made entirely of aluminum.Its lightweight structure provides easy use while offering high durability and long - lasting performance against rust.

• The strong body structure with a 250 kg load capacity provides safe and balanced use while keeping durability in the foreground.

• The tent(shade) system on the product reduces the effect of sunlight and light rain, creating a comfortable use area and making outdoor use more enjoyable.

• The natural wood details used on the product add a warm and aesthetic character to the design while maintaining their durable structure for years of appearance.

• The ergonomic swing structure provides a comfortable swing experience while also providing stable and balanced use.

• The product made with material suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• Modern design lines, the harmonious combination of wood and aluminum add aesthetic, comfort and functionality to living areas.`,
    folder: "tesla-salincak",
    sortOrder: 4,
   },
  ],
 },
 {
  slug: "velar",
  name: "Velar",
  nameEn: "Velar",
  sortOrder: 5,
  products: [
   {
    slug: "velar-kose",
    name: "Velar Köşe Grubu",
    nameEn: "Velar Corner Set",
    cornerStandardSideACm: 245,
    cornerStandardSideBCm: 220,
    ...dimItems([
     {
      name: "4'lü Koltuk",
      nameEn: "4-Seater Sofa",
      widthCm: 245,
      depthCm: 75,
      heightCm: 80,
      amount: 36750,
     },
     {
      name: "2'li Koltuk",
      nameEn: "2-Seater Sofa",
      widthCm: 120,
      depthCm: 75,
      heightCm: 80,
      amount: 18600,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 9750,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 3450,
      quantity: 2,
     },
     {
      name: "Kol Sehpası",
      nameEn: "Arm Side Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 8400,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir.Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile uzun ömürlü bir performans sunar.
  
    • Üst yüzeylerde kullanılan doğal ahşap detaylar, tasarıma sıcak ve doğal bir karakter kazandırırken dayanıklı yapısıyla uzun yıllar estetik görünümünü korur.

    • Özenle uygulanan örgü detayları, ürüne özgün bir tasarım dili kazandırırken estetik ve konforu bir araya getirir.

    • Dış mekân kullanımına uygun malzeme ve yüzey teknolojileriyle üretilen ürün, güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım göstererek ilk günkü görünümünü uzun süre muhafaza eder.

    • Kumaş ve alüminyum yüzeylerde sunulan farklı renk seçenekleri sayesinde çeşitli dekorasyon anlayışlarına uyum sağlayabilir.
    
    • Modern çizgileri, kaliteli malzeme seçimi ve zamansız tasarım anlayışıyla yaşam alanlarına estetik ve fonksiyonel bir değer katar.`,
    descriptionEn: `• The product frame is made entirely of aluminum.Its lightweight structure provides easy use while offering high durability and long - lasting performance against rust.
  
    • The natural wood details used on the top surfaces add a warm and natural character to the design while maintaining their durable structure for years of aesthetic appearance.

    • The carefully applied weave details add a unique design language to the product while combining aesthetic and comfort.

    • The product made with material and surface technologies suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

    • The different color options available on the fabric and aluminum surfaces allow for various decoration approaches.
    
    • Modern lines, high - quality material selection and timeless design approach add aesthetic and functional value to living areas.`,
    folder: "velar-kose",
    imagePrefix: "cappuccino",
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 2,
   },
   {
    slug: "velar-masa",
    name: "Velar Masa Grubu",
    nameEn: "Velar Table Set",
    ...dimItems([
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 190,
      depthCm: 90,
      heightCm: 75,
      amount: 30300,
     },
     {
      name: "Sandalye",
      nameEn: "Chair",
      widthCm: 57,
      depthCm: 60,
      heightCm: 85,
      amount: 6750,
      quantity: 8,
     },
    ]),
    description: `• Ürün, alüminyum iskelet ve doğal ahşap detayların bir araya gelmesiyle üretilmiş masa sandalye grubudur. Sağlam yapısı sayesinde dış mekân kullanımına uygun olup uzun ömürlü ve güvenilir bir performans sunar.

• Sandalyelerin iç içe geçebilme özelliği, kullanım sonrası alan tasarrufu sağlayarak depolama ve düzen açısından pratik bir çözüm sunar.

• Alüminyum gövde, paslanmaya karşı yüksek dayanım göstererek dış mekân koşullarında formunu korur ve uzun süreli kullanım imkânı sağlar.

• Özenle uygulanan örgü detayları, ürüne özgün bir tasarım dili kazandırırken estetik ve konforu bir araya getirir.

• Ahşap detaylar, tasarıma doğal ve sıcak bir görünüm kazandırırken estetik bütünlüğü destekler ve yaşam alanlarına şık bir karakter katar.

• Dış mekân kullanımına uygun malzeme yapısı sayesinde güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım göstererek ilk günkü görünümünü uzun süre muhafaza eder.

• Modern tasarım çizgisi ve fonksiyonel yapısıyla bahçe, teras ve balkon gibi alanlarda hem estetik hem de kullanışlı bir oturma alanı oluşturur.`,
    descriptionEn: `• The product is made by combining an aluminum frame and natural wood details. Its durable structure makes it suitable for outdoor use and provides long-lasting and reliable performance.

• The collapsible feature of the chairs provides a practical solution for area savings after use, storage and organization.

• The aluminum body withstands high durability against rust and maintains its form in outdoor conditions, providing long-lasting use.

• The carefully applied weave details add a unique design language to the product while combining aesthetic and comfort.

• The wood details add a natural and warm character to the design while supporting the aesthetic integrity and giving a stylish character to living areas.

• The product made with material suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• Modern design lines and functional structure create an aesthetic and practical seating area in garden, terrace and balcony areas.`,
    folder: "velar-masa",
    sortOrder: 2,
   },
   {
    slug: "velar-oturma",
    name: "Velar Oturma Grubu",
    nameEn: "Velar Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 30900,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
      amount: 14625,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 9750,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 3450,
      quantity: 2,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir.Hafif yapısı sayesinde kullanım kolaylığı sağlarken, paslanmaya karşı yüksek dayanımı ile uzun ömürlü bir performans sunar.
  
    • Üst yüzeylerde kullanılan doğal ahşap detaylar, tasarıma sıcak ve doğal bir karakter kazandırırken dayanıklı yapısıyla uzun yıllar estetik görünümünü korur.

    • Özenle uygulanan örgü detayları, ürüne özgün bir tasarım dili kazandırırken estetik ve konforu bir araya getirir.

    • Dış mekân kullanımına uygun malzeme ve yüzey teknolojileriyle üretilen ürün, güneş ışınları, nem, yağmur ve değişken hava koşullarına karşı yüksek dayanım göstererek ilk günkü görünümünü uzun süre muhafaza eder.

    • Kumaş ve alüminyum yüzeylerde sunulan farklı renk seçenekleri sayesinde çeşitli dekorasyon anlayışlarına uyum sağlayabilir.
    
    • Modern çizgileri, kaliteli malzeme seçimi ve zamansız tasarım anlayışıyla yaşam alanlarına estetik ve fonksiyonel bir değer katar.`,
    descriptionEn: `• The product frame is made entirely of aluminum.Its lightweight structure provides easy use while offering high durability and long - lasting performance against rust.
  
    • The natural wood details used on the top surfaces add a warm and natural character to the design while maintaining their durable structure for years of aesthetic appearance.

    • The carefully applied weave details add a unique design language to the product while combining aesthetic and comfort.

    • The product made with material and surface technologies suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

    • The different color options available on the fabric and aluminum surfaces allow for various decoration approaches.
    
    • Modern lines, high - quality material selection and timeless design approach add aesthetic and functional value to living areas.`,
    folder: "velar-oturma",
    sortOrder: 2,
   },
   //! ÖLÇÜLER YANLIŞ
   {
    slug: "velar-salincak",
    name: "Velar Salıncak",
    nameEn: "Velar Swing",
    dimensions: "215 x 120 x 200 cm",
    widthCm: 215,
    depthCm: 120,
    heightCm: 200,
    ...dimItems([
     {
      name: "Salıncak",
      nameEn: "Swing",
      widthCm: 215,
      depthCm: 120,
      heightCm: 200,
      amount: 85600,
     },
    ]),
    description: `• Ürün iskeleti tamamen alüminyumdan üretilmiştir.Paslanmaya karşı yüksek dayanımı ile dış mekân koşullarında uzun ömürlü ve güvenilir bir performans sunar.

• 250 kg taşıma kapasitesine sahip sağlam gövde yapısı, yüksek mukavemeti sayesinde güvenli ve dengeli bir kullanım sunarak dayanıklılığı ön planda tutar.

• Ürün üzerinde yer alan tente(gölgelik) sistemi, güneş ışınlarını ve hafif yağmur etkisini azaltarak konforlu bir kullanım alanı oluşturur ve dış mekân kullanımını daha keyifli hale getirir.

• Üründe kullanılan doğal ahşap detaylar, tasarıma sıcak ve estetik bir görünüm kazandırırken dış mekân koşullarına uygun yapısıyla uzun yıllar formunu korur.

• Özenle uygulanan örgü detayları, ürüne özgün bir tasarım dili kazandırırken estetik ve konforu bir araya getirir.

• Ergonomik oturum yapısı, rahat bir salınım deneyimi sunarken aynı zamanda stabil ve dengeli bir kullanım sağlar.

• Dış mekân koşullarına uygun malzeme seçimi sayesinde güneş ışınları, nem, yağmur ve değişken hava şartlarına karşı yüksek dayanım göstererek uzun süre ilk günkü görünümünü muhafaza eder.

• Modern tasarım çizgisi, ahşap ve alüminyumun uyumlu birleşimiyle yaşam alanlarına estetik, konfor ve fonksiyonelliği bir arada sunar.`,
    descriptionEn: `• The product frame is made entirely of aluminum.Its lightweight structure provides easy use while offering high durability and long - lasting performance against rust.

• The strong body structure with a 250 kg load capacity provides safe and balanced use while keeping durability in the foreground.

• The tent(shade) system on the product reduces the effect of sunlight and light rain, creating a comfortable use area and making outdoor use more enjoyable.

• The natural wood details used on the product add a warm and aesthetic character to the design while maintaining their durable structure for years of appearance.

• The carefully applied weave details add a unique design language to the product while combining aesthetic and comfort.

• The ergonomic swing structure provides a comfortable swing experience while also providing stable and balanced use.

• The product made with material suitable for outdoor use withstands high durability against sunlight, humidity, rain and variable weather conditions, preserving its original appearance for a long time.

• Modern design lines, the harmonious combination of wood and aluminum add aesthetic, comfort and functionality to living areas.`,
    folder: "velar-salincak",
    sortOrder: 4,
    isFeatured: true,
    featuredOrder: 4,
   },
   {
    slug: "velar-sezlong",
    name: "Velar Şezlong",
    nameEn: "Velar Sun Lounger",
    ...dimItems([
     {
      name: "Şezlong",
      nameEn: "Sunbed",
      widthCm: 75,
      depthCm: 195,
      heightCm: 85,
      amount: 21600,
     },
     {
      name: "Sehpa",
      nameEn: "Coffee Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 40,
      amount: 6000,
     },
    ]),
    description: `• Ürün, alüminyum iskelet ve doğal ahşap detayların birleşimiyle üretilmiş dış mekân şezlongudur. Sağlam yapısı sayesinde uzun ömürlü ve güvenilir kullanım sunar.

• Alüminyum gövde, paslanmaya karşı yüksek dayanım göstererek dış mekân koşullarında formunu korur ve dayanıklılık sağlar.

• Ahşap detaylar tasarıma doğal ve sıcak bir görünüm kazandırırken estetik bütünlüğü destekler.

• Dış mekân kullanımına uygun yapısı sayesinde güneş, nem ve yağmur gibi hava koşullarına karşı yüksek direnç gösterir.

• Minderli yapısı, konforlu bir oturum ve uzun süreli rahat kullanım imkânı sunar.

• Modern tasarımıyla havuz kenarı, bahçe ve teras gibi alanlarda şık ve kullanışlı bir kullanım alanı oluşturur.`,
    descriptionEn: `• The product is made by combining an aluminum frame and natural wood details. Its durable structure makes it suitable for outdoor use and provides long-lasting and reliable performance.

• The aluminum body withstands high durability against rust and maintains its form in outdoor conditions.

• The wood details add a natural, warm and aesthetic character to the design.

• The product made with material suitable for outdoor use withstands high durability against sunlight, humidity and rain.`,
    folder: "velar-sezlong",
    sortOrder: 5,
   },
  ],
 },
 {
  slug: "trend",
  name: "Trend",
  nameEn: "Trend",
  sortOrder: 6,
  products: [
   {
    slug: "trend-sandalye-cappuccino",
    name: "Trend Cappuccino Sallanır Sandalye",
    nameEn: "Trend Cappuccino Rocking Chair",
    ...dimItems([
     {
      name: "Sandalye",
      nameEn: "Chair",
      widthCm: 65,
      depthCm: 100,
      heightCm: 90,
      amount: 13500,
     },
     {
      name: "Sehpa",
      nameEn: "Coffee Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 55,
      amount: 6000,
     },
    ]),
    description: `• Ürün, alüminyum iskelet ve doğal ahşap detayların birleşimiyle üretilmiş sallanır sandalye modelidir. Sağlam yapısı sayesinde dış mekân kullanımına uygun ve uzun ömürlüdür.

• Alüminyum gövde, paslanmaya karşı yüksek dayanım göstererek dış ortam koşullarında formunu korur.

• Ahşap detaylar tasarıma doğal, sıcak ve estetik bir görünüm kazandırır.

• Sallanır yapısı sayesinde konforlu ve rahatlatıcı bir oturum deneyimi sunar.

• Dış mekân kullanımına uygun malzemesi ile güneş, nem ve yağmur gibi etkenlere karşı dayanıklıdır.

• Modern tasarımıyla bahçe, teras ve balkon gibi alanlarda hem şık hem de keyifli bir kullanım sağlar.`,
    descriptionEn: `• The product is made by combining an aluminum frame and natural wood details. Its durable structure makes it suitable for outdoor use and provides long-lasting and reliable performance.

• The aluminum body withstands high durability against rust and maintains its form in outdoor conditions.

• The wood details add a natural, warm and aesthetic character to the design.

• The rocking structure provides a comfortable and relaxing seating experience.

• The product made with material suitable for outdoor use withstands high durability against sunlight, humidity and rain.`,
    folder: "trend-sandalye",
    imageFiles: ["06.jpg", "07.jpg", "08.jpg"],
    sortOrder: 1,
   },
   {
    slug: "trend-sandalye-antrasit",
    name: "Trend Antrasit Sallanır Sandalye",
    nameEn: "Trend Anthracite Rocking Chair",
    ...dimItems([
     {
      name: "Sandalye",
      nameEn: "Chair",
      widthCm: 65,
      depthCm: 100,
      heightCm: 90,
      amount: 13500,
     },
     {
      name: "Sehpa",
      nameEn: "Coffee Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 55,
      amount: 6000,
     },
    ]),
    description: `• Ürün, alüminyum iskelet ve doğal ahşap detayların birleşimiyle üretilmiş sallanır sandalye modelidir. Sağlam yapısı sayesinde dış mekân kullanımına uygun ve uzun ömürlüdür.

• Alüminyum gövde, paslanmaya karşı yüksek dayanım göstererek dış ortam koşullarında formunu korur.

• Ahşap detaylar tasarıma doğal, sıcak ve estetik bir görünüm kazandırır.

• Sallanır yapısı sayesinde konforlu ve rahatlatıcı bir oturum deneyimi sunar.

• Dış mekân kullanımına uygun malzemesi ile güneş, nem ve yağmur gibi etkenlere karşı dayanıklıdır.

• Modern tasarımıyla bahçe, teras ve balkon gibi alanlarda hem şık hem de keyifli bir kullanım sağlar.`,
    descriptionEn: `• The product is made by combining an aluminum frame and natural wood details. Its durable structure makes it suitable for outdoor use and provides long-lasting and reliable performance.

• The aluminum body withstands high durability against rust and maintains its form in outdoor conditions.

• The wood details add a natural, warm and aesthetic character to the design.

• The rocking structure provides a comfortable and relaxing seating experience.

• The product made with material suitable for outdoor use withstands high durability against sunlight, humidity and rain.`,
    folder: "trend-sandalye",
    isFeatured: true,
    featuredOrder: 3,
    imageFiles: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
    sortOrder: 2,
   },
  ],
 },
];

function resolveProductImages(productData) {
 if (productData.imageFiles?.length) {
  return productData.imageFiles.map((file) =>
   resolveMediaUrl(`/${productData.folder}/${file}`)
  );
 }

 if (productData.imagePrefix) {
  return publicImages(productData.folder, productData.imagePrefix);
 }

 return publicImages(productData.folder);
}

async function createProduct(data) {
 const name = data.name?.trim();
 const nameEn = data.nameEn?.trim() || null;
 const imageUrls = resolveProductImages(data);
 if (imageUrls.length === 0) {
  throw new Error(`Görsel bulunamadı: ${data.folder} `);
 }

 await prisma.product.create({
  data: {
   slug: data.slug,
   name,
   nameEn,
   description: data.description,
   descriptionEn: data.descriptionEn,
   dimensions: data.dimensions ?? null,
   dimensionItems: data.dimensionItems ?? null,
   widthCm: data.widthCm ?? null,
   depthCm: data.depthCm ?? null,
   heightCm: data.heightCm ?? null,
   cornerStandardSideACm: data.cornerStandardSideACm ?? null,
   cornerStandardSideBCm: data.cornerStandardSideBCm ?? null,
   sortOrder: data.sortOrder,
   isFeatured: data.isFeatured ?? false,
   featuredOrder: data.featuredOrder ?? 0,
   sku: data.slug.toUpperCase().replace(/-/g, ""),
   images: {
    create: imageUrls.map((url, imageIndex) => ({
     url,
     alt: imageIndex === 0 ? name : `${name} - görsel ${imageIndex + 1} `,
     altEn:
      imageIndex === 0 ? nameEn ?? name : `${nameEn ?? name} - image ${imageIndex + 1} `,
     sortOrder: imageIndex,
     isPrimary: imageIndex === 0,
    })),
   },
  },
 });
}

const CATEGORY_GROUP_LABELS = {
 "oturma-gruplari": { name: "Oturma Grupları", nameEn: "Seating Sets" },
 "kose-gruplari": { name: "Köşe Grupları", nameEn: "Corner Sets" },
 masalar: { name: "Masa Grupları", nameEn: "Table Sets" },
 salincak: { name: "Salıncaklar", nameEn: "Swings" },
 sezlong: { name: "Şezlonglar", nameEn: "Sun Loungers" },
 sandalyeler: { name: "Sandalyeler", nameEn: "Chairs" },
};

async function seedCategoryGroups() {
 const { productMenuGroupsData } = await import("../lib/i18n/navigation-data.js");
 const {
  DEFAULT_CATEGORY_DESCRIPTIONS_EN,
  DEFAULT_CATEGORY_DESCRIPTIONS_TR,
 } = await import("../lib/content/default-category-descriptions.js");

 console.log("Kategori grupları ekleniyor…");

 for (const [index, group] of productMenuGroupsData.entries()) {
  const labels = CATEGORY_GROUP_LABELS[group.slug] ?? {
   name: group.slug,
   nameEn: null,
  };

  const created = await prisma.productCategoryGroup.create({
   data: {
    slug: group.slug,
    name: labels.name,
    nameEn: labels.nameEn,
    description: DEFAULT_CATEGORY_DESCRIPTIONS_TR[group.slug] ?? null,
    descriptionEn: DEFAULT_CATEGORY_DESCRIPTIONS_EN[group.slug] ?? null,
    coverImage: resolveMediaUrl(group.coverImage ?? group.items[0]?.image ?? null),
    sortOrder: index + 1,
    isPublished: true,
   },
  });

  for (const item of group.items) {
   const productSlug = item.href.replace("/urunler/", "");

   await prisma.product.updateMany({
    where: { slug: productSlug },
    data: { categoryGroupId: created.id },
   });
  }

  console.log(`  ✓ ${created.name} (${group.items.length} menü öğesi)`);
 }
}

async function main() {
 console.log("Veritabanı temizleniyor…");
 await prisma.image.deleteMany();
 await prisma.product.deleteMany();
 await prisma.productCategoryGroup.deleteMany();

 console.log("Ürünler ekleniyor…");

 let productCount = 0;

 for (const collectionData of COLLECTIONS) {
  for (const productData of collectionData.products) {
   await createProduct(productData);
   productCount += 1;
  }

  console.log(`  ✓ ${collectionData.name} (${collectionData.products.length} ürün)`);
 }

 await seedCategoryGroups();

 const counts = await Promise.all([
  prisma.productCategoryGroup.count(),
  prisma.product.count(),
  prisma.image.count(),
 ]);

 const { seedCms } = await import("./seed-cms.mjs");
 await seedCms(prisma);

 const contentCounts = await Promise.all([
  prisma.contentBlock.count(),
  prisma.faqCategory.count(),
  prisma.faqItem.count(),
 ]);

 console.log("\nSeed tamamlandı:");
 console.log(`  Kategori grubu: ${counts[0]} `);
 console.log(`  Ürün: ${counts[1]} `);
 console.log(`  Görsel: ${counts[2]} `);
 console.log(`  İçerik bloğu: ${contentCounts[0]} `);
 console.log(`  SSS kategorisi: ${contentCounts[1]} `);
 console.log(`  SSS sorusu: ${contentCounts[2]} `);
}

main()
 .catch((error) => {
  console.error("Seed hatası:", error);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });
