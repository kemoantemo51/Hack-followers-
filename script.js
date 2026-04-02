let percent = 0;
let currentService = null;
let currentFilter = "all";
let quranAudio = null;
let currentPlatform = null;

const startBtn = document.getElementById('startBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');
const whatsappFloat = document.getElementById('whatsappFloat');

const allServices = [
    // فيسبوك
    { name: "📌 متابعين فيسبوك", price: "15", icon: "fab fa-facebook", category: "facebook", description:" متابعين حقيقيين نشطين ✅ هناك عروض للكميات", needsQuantity: true, pricePer1000: 10, platform: "facebook" },
    { name: "📌 متابعين فيسبوك صفحة", price: "30", icon: "fas fa-thumbs-up", category: "facebook", description: "✅ متابعين للصفحات الرسمية ✅ وصول عالمي ✅ زيادة الثقة", needsQuantity: true, pricePer1000: 10, platform: "facebook" },
    { name: "❤️ لايكات منشورات فيسبوك", price: "20", icon: "fas fa-heart", category: "facebook", description: "✅ لايكات حقيقية ✅ زيادة وصول المنشورات ✅ تفاعل طبيعي", needsQuantity: true, pricePer1000: 15, platform: "facebook" },
    { name: "👀 مشاهدات فيديو فيسبوك", price: "5", icon: "fas fa-play", category: "facebook", description: "✅ مشاهدات حقيقية ✅ زيادة تفاعل الفيديو ✅ تحسين الترتيب", needsQuantity: true, pricePer1000: 8, platform: "facebook" },
    { name: "💬 تعليقات فيسبوك", price: "140", icon: "fas fa-comment", category: "facebook", description: "✅ تعليقات مميزة ✅ زيادة التفاعل ✅ تعزيز المصداقية", needsQuantity: true, pricePer1000: 20, platform: "facebook" },
    { name: "📢 مشاركات فيسبوك", price: "10", icon: "fas fa-share-alt", category: "facebook", description: "✅ مشاركات حقيقية ✅ انتشار أسرع ✅ وصول أكبر", needsQuantity: true, pricePer1000: 12, platform: "facebook" },
    { name: "🎥 مشاهدات بث مباشر فيسبوك", price: "50", icon: "fas fa-video", category: "facebook", description: "✅ مشاهدات بث مباشر ✅ زيادة التفاعل المباشر", needsQuantity: true, pricePer1000: 5, platform: "facebook" },
    
    // انستقرام
    { name: "📷 متابعين انستقرام", price: "25", icon: "fab fa-instagram", category: "instagram", description: "✅ متابعين انستقرام حقيقيين ✅ زيادة ظهور الحساب ✅ متابعين نشطين", needsQuantity: true, pricePer1000: 20, platform: "instagram" },
    { name: "❤️ لايكات انستقرام", price: "10", icon: "far fa-heart", category: "instagram", description: "✅ لايكات سريعة ✅ زيادة التفاعل ✅ تحسين ترتيب المنشورات", needsQuantity: true, pricePer1000: 7, platform: "instagram" },
    { name: "👀 مشاهدات ريلز انستقرام", price: "3", icon: "fas fa-film", category: "instagram", description: "✅ مشاهدات ريلز حقيقية ✅ زيادة الوصول ✅ انتشار سريع", needsQuantity: true, pricePer1000: 5, platform: "instagram" },
    { name: "👁️ مشاهدات ستوري انستقرام", price: "5", icon: "fas fa-eye", category: "instagram", description: "✅ مشاهدات ستوري ✅ زيادة التفاعل اليومي", needsQuantity: true, pricePer1000: 4, platform: "instagram" },
    { name: "💬 تعليقات انستقرام", price: "1200", icon: "fas fa-comment-dots", category: "instagram", description: "✅ تعليقات مميزة ✅ زيادة التفاعل ✅ تعزيز المصداقية", needsQuantity: true, pricePer1000: 18, platform: "instagram" },
    { name: "📥 حفظ انستقرام", price: "20", icon: "fas fa-bookmark", category: "instagram", description: "✅ حفظ المنشورات ✅ زيادة الثقة ✅ تحسين الخوارزمية", needsQuantity: true, pricePer1000: 10, platform: "instagram" },
    { name: "🔗 زيارات بروفايل انستقرام", price: "10", icon: "fas fa-user", category: "instagram", description: "✅ زيارات بروفايل ✅ زيادة الوعي بالحساب", needsQuantity: true, pricePer1000: 6, platform: "instagram" },
    
    // تيك توك
    { name: "🎵 متابعين تيك توك", price:"،100", icon: "fab fa-tiktok", category: "tiktok", description: "✅ متابعين تيك توك حقيقيين ✅ زيادة ظهور الفيديوهات ✅ نمو سريع", needsQuantity: true, pricePer1000: 25, platform: "tiktok" },
    { name: "❤️ لايكات تيك توك", price: "5", icon: "fas fa-heart", category: "tiktok", description: "✅ لايكات حقيقية ✅ زيادة التفاعل ✅ تحسين الترتيب", needsQuantity: true, pricePer1000: 8, platform: "tiktok" },
    { name: "👀 مشاهدات تيك توك", price: "5", icon: "fas fa-play", category: "tiktok", description: "✅ مشاهدات فيديو ✅ انتشار أسرع ✅ وصول أكبر", needsQuantity: true, pricePer1000: 4, platform: "tiktok" },
    { name: "🎥 مشاهدات بث مباشر تيك توك", price: "5", icon: "fas fa-video", category: "tiktok", description: "✅ مشاهدات بث مباشر ✅ زيادة التفاعل المباشر", needsQuantity: true, pricePer1000: 6, platform: "tiktok" },
    { name: "💬 تعليقات تيك توك", price: "100", icon: "fas fa-comment", category: "tiktok", description: "✅ تعليقات مميزة ✅ زيادة التفاعل ✅ تعزيز المصداقية", needsQuantity: true, pricePer1000: 15, platform: "tiktok" },
    { name: "⭐ زيادة سكور تيك توك", price: "50", icon: "fas fa-chart-line", category: "tiktok", description: "✅ زيادة نقاط الجودة ✅ تحسين ترتيب الحساب", needsQuantity: true, pricePer1000: 50, platform: "tiktok" },
    { name: "📌 مشاركات تيك توك", price: "20", icon: "fas fa-share", category: "tiktok", description: "✅ مشاركات حقيقية ✅ انتشار أوسع", needsQuantity: true, pricePer1000: 12, platform: "tiktok" },
    
    // تويتر
    { name: "🐦 متابعين تويتر", price: "450", icon: "fab fa-twitter", category: "twitter", description: "✅ متابعين حقيقيين ✅ زيادة الظهور ✅ تفاعل أكبر", needsQuantity: true, pricePer1000: 18, platform: "twitter" },
    { name: "❤️ لايكات تويتر", price: "280", icon: "fas fa-heart", category: "twitter", description: "✅ لايكات حقيقية ✅ زيادة التفاعل ✅ تحسين الترند", needsQuantity: true, pricePer1000: 6, platform: "twitter" },
    { name: "🔄 ريتويت تويتر", price: "300", icon: "fas fa-retweet", category: "twitter", description: "✅ ريتويت حقيقي ✅ انتشار سريع ✅ وصول أكبر", needsQuantity: true, pricePer1000: 10, platform: "twitter" },
    { name: "👁️ انطباعات تويتر", price: "20", icon: "fas fa-chart-line", category: "twitter", description: "✅ زيادة الانطباعات ✅ تحسين الوصول", needsQuantity: true, pricePer1000: 5, platform: "twitter" },
    { name: "📈 رفع تريند تويتر", price: "200", icon: "fas fa-fire", category: "twitter", description: "✅ رفع هاشتاج تريند ✅ انتشار واسع", needsQuantity: false, platform: "twitter" },
    
    // يوتيوب
    { name: "📺 مشتركين يوتيوب", price: "1000", icon: "fab fa-youtube", category: "youtube", description: "✅ مشتركين حقيقيين ✅ زيادة ثقة القناة ✅ نمو مستمر", needsQuantity: true, pricePer1000: 35, platform: "youtube" },
    { name: "👀 مشاهدات يوتيوب", price: "150", icon: "fas fa-play", category: "youtube", description: "✅ مشاهدات فيديو ✅ تحسين الترتيب ✅ انتشار أسرع", needsQuantity: true, pricePer1000: 8, platform: "youtube" },
    { name: "⏱️ ساعات مشاهدة يوتيوب", price: "1300", icon: "fas fa-clock", category: "youtube", description: "✅ زيادة ساعات المشاهدة ✅ تحقيق شروط الربح", needsQuantity: true, pricePer1000: 40, platform: "youtube" },
    { name: "❤️ لايكات يوتيوب", price: "15", icon: "fas fa-thumbs-up", category: "youtube", description: "✅ لايكات حقيقية ✅ زيادة التفاعل", needsQuantity: true, pricePer1000: 12, platform: "youtube" },
    { name: "💬 تعليقات يوتيوب", price: "600", icon: "fas fa-comment", category: "youtube", description: "✅ تعليقات مميزة ✅ زيادة التفاعل", needsQuantity: true, pricePer1000: 20, platform: "youtube" },
    
    // سناب شات
    { name: "👻 متابعين سناب شات", price: "1200", icon: "fab fa-snapchat", category: "snapchat", description: "✅ متابعين حقيقيين ✅ زيادة الظهور", needsQuantity: true, pricePer1000: 15, platform: "snapchat" },
    { name: "👁️ مشاهدات سناب شات", price: "300", icon: "fas fa-eye", category: "snapchat", description: "✅ مشاهدات ستوري ✅ زيادة التفاعل", needsQuantity: true, pricePer1000: 6, platform: "snapchat" },
    { name: "🎥 مشاهدات بث مباشر سناب", price: "4000", icon: "fas fa-video", category: "snapchat", description: "✅ مشاهدات بث مباشر ✅ تفاعل فوري", needsQuantity: true, pricePer1000: 8, platform: "snapchat" },
    
    // تيليجرام
    { name: "✈️ اعضاء تيليجرام", price: "100", icon: "fab fa-telegram", category: "telegram", description: "✅ متابعين حقيقيين ✅ زيادة القناة", needsQuantity: true, pricePer1000: 12, platform: "telegram" },
    { name: "🗳️ تصويت تيليجرام", price: "10", icon: "fas fa-vote-yea", category: "telegram", description: "✅ تصويت حقيقي ✅ زيادة التفاعل", needsQuantity: true, pricePer1000: 5, platform: "telegram" },
    
    // تويتش
    { name: "🎮 متابعين تويتش", price: "30", icon: "fab fa-twitch", category: "twitch", description: "✅ متابعين حقيقيين ✅ زيادة الشهرة", needsQuantity: true, pricePer1000: 22, platform: "twitch" },
    { name: "👀 مشاهدات بث تويتش", price: "300", icon: "fas fa-play", category: "twitch", description: "✅ مشاهدات بث مباشر ✅ زيادة التفاعل", needsQuantity: true, pricePer1000: 7, platform: "twitch" },
    
    // سبوتيفاي
    { name: "🎵 متابعين سبوتيفاي", price: "50", icon: "fab fa-spotify", category: "spotify", description: "✅ متابعين حقيقيين ✅ زيادة الاستماعات", needsQuantity: true, pricePer1000: 18, platform: "spotify" },
    { name: "🎧 استماعات سبوتيفاي", price: "350", icon: "fas fa-headphones", category: "spotify", description: "✅ استماعات حقيقية ✅ زيادة الشهرة", needsQuantity: true, pricePer1000: 10, platform: "spotify" }
];

// أفضل العروض (4 خدمات)
const featuredServices = [
    allServices.find(s => s.name === "📷 متابعين انستقرام"),
    allServices.find(s => s.name === "🎵 متابعين تيك توك"),
    allServices.find(s => s.name === "📺 مشتركين يوتيوب"),
    allServices.find(s => s.name === "📌 متابعين فيسبوك")
];

// خدمات الاشتراكات
const subscriptionServices = [
    { name: "📡 IPTV اشتراك", price: "140", icon: "fas fa-tv", description: "✅ آلاف القنوات العالمية والعربية ✅ مشاهدة HD و4K ✅ دعم فني 24/7", needsQuantity: false },
    { name: "🎬 Netflix اشتراك", price: "550", icon: "fab fa-netflix", description: "✅ اشتراك شهرين ✅ جودة 4K ✅ جميع المسلسلات والأفلام ✅ حساب خاص", needsQuantity: false },
    { name: "💬 شات جبتى", price: "حسب الاختيار", icon: "fas fa-comments", description: "✅ جميع باقات شات جبتى ✅ أسعار خاصة ✅ تفعيل فوري ✅ دعم كامل", needsQuantity: false },
    { name: "✂️ CapCut Pro", price: "190", icon: "fas fa-video", description: "✅ اشتراك شهر كامل ✅ جميع مميزات البرو ✅ تعديل فيديو احترافي ✅ تأثيرات حصرية", needsQuantity: false },
    { name: "🤖 Gemini Premium", price: "650", icon: "fas fa-robot", description: "✅ اشتراك شهر ✅ ذكاء اصطناعي متقدم ✅ سرعة فائقة ✅ دعم عربي كامل", needsQuantity: false },
    { name: "🎨 Canva Pro", price: "30", icon: "fab fa-canva", description: "✅ اشتراك 60 يوم ✅ تصميم احترافي ✅ قوالب حصرية ✅ أدوات متطورة", needsQuantity: false },
    { name: "🎬 شاهد نت", price: "2300", icon: "fas fa-ticket-alt", description: "✅ اشتراك سنة كاملة ✅ أقوى المسلسلات العربية ✅ تحديثات مستمرة ✅ جودة عالية", needsQuantity: false },
    { name: "🎵 Spotify Premium", price: "120", icon: "fab fa-spotify", description: "✅ اشتراك شهر ✅ بدون إعلانات ✅ جودة عالية ✅ تحميل الأغاني", needsQuantity: false },
    { name: "📺 YouTube Premium", price: "180", icon: "fab fa-youtube", description: "✅ اشتراك شهر ✅ بدون إعلانات ✅ تشغيل خلفية ✅ تحميل الفيديوهات", needsQuantity: false }
];

// أقسام المنصات للقائمة المنسدلة
const platformCategories = [
    { name: "فيسبوك", icon: "fab fa-facebook", key: "facebook" },
    { name: "انستقرام", icon: "fab fa-instagram", key: "instagram" },
    { name: "تيك توك", icon: "fab fa-tiktok", key: "tiktok" },
    { name: "تويتر", icon: "fab fa-twitter", key: "twitter" },
    { name: "يوتيوب", icon: "fab fa-youtube", key: "youtube" },
    { name: "سناب شات", icon: "fab fa-snapchat", key: "snapchat" },
    { name: "تيليجرام", icon: "fab fa-telegram", key: "telegram" },
    { name: "تويتش", icon: "fab fa-twitch", key: "twitch" },
    { name: "سبوتيفاي", icon: "fab fa-spotify", key: "spotify" },
    { name: "الاشتراكات", icon: "fas fa-gem", key: "subscription" }
];

function getPlatformServices(platform) {
    if (platform === "subscription") return subscriptionServices;
    return allServices.filter(s => s.category === platform);
}

function getPlatformIcon(platform) {
    const cat = platformCategories.find(c => c.key === platform);
    return cat ? cat.icon : "fas fa-globe";
}

function getPlatformName(platform) {
    const cat = platformCategories.find(c => c.key === platform);
    return cat ? cat.name : platform;
}

function getLinkPlaceholder(platform) {
    const links = {
        facebook: '🔗 رابط حساب فيسبوك (مثال: https://www.facebook.com/username)',
        instagram: '🔗 رابط حساب انستقرام (مثال: https://www.instagram.com/username)',
        tiktok: '🔗 رابط حساب تيك توك (مثال: https://www.tiktok.com/@username)',
        twitter: '🔗 رابط حساب تويتر (مثال: https://twitter.com/username)',
        youtube: '🔗 رابط قناة يوتيوب (مثال: https://www.youtube.com/@channel)',
        snapchat: '🔗 رابط حساب سناب شات (مثال: https://www.snapchat.com/add/username)',
        telegram: '🔗 رابط قناة تيليجرام (مثال: https://t.me/username)',
        twitch: '🔗 رابط قناة تويتش (مثال: https://www.twitch.tv/username)',
        spotify: '🔗 رابط حساب سبوتيفاي (مثال: https://open.spotify.com/user/username)'
    };
    return links[platform] || '🔗 رابط الحساب';
}

function getLinkExample(platform) {
    const examples = {
        facebook: 'مثال: https://www.facebook.com/username',
        instagram: 'مثال: https://www.instagram.com/username',
        tiktok: 'مثال: https://www.tiktok.com/@username',
        twitter: 'مثال: https://twitter.com/username',
        youtube: 'مثال: https://www.youtube.com/@channel',
        snapchat: 'مثال: https://www.snapchat.com/add/username',
        telegram: 'مثال: https://t.me/username',
        twitch: 'مثال: https://www.twitch.tv/username',
        spotify: 'مثال: https://open.spotify.com/user/username'
    };
    return examples[platform] || '';
}

function createMainContent() {
    return `
        <div class="container">
            <div class="header" data-aos="fade-down">
                <img src="https://i.ibb.co/fzFYrfbj/IMG.png" alt="HACK FOLLOWERS" class="header-logo">
                <h1 class="logo">💀 HACK <span class="logo-badge">PRO</span> FOLLOWERS 💀</h1>
                <p class="tagline">✨ أرخص الأسعار، أسرع النتائج - دعم فوري 24/7 ✨</p>
            </div>
            
            <!-- القائمة المنسدلة الرئيسية -->
            <div class="main-dropdown">
                <div class="dropdown-main">
                    <button class="dropbtn-main" id="dropdownMainBtn">
                        <i class="fas fa-bars"></i>
                        اختر القسم
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-main-content" id="mainDropdownContent">
                        ${platformCategories.map(cat => `
                            <a onclick="selectPlatform('${cat.key}')">
                                <i class="${cat.icon}"></i>
                                ${cat.name}
                                <span style="font-size:0.65rem; margin-right:auto;">${getPlatformServices(cat.key).length}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- أفضل العروض -->
            <div id="featuredSection">
                <div class="section-title" data-aos="fade-up">
                    <i class="fas fa-crown"></i>
                    أفضل العروض
                </div>
                <div class="featured-grid" id="featuredGrid"></div>
            </div>
            
            <!-- قسم الخدمات حسب الاختيار (يظهر عند اختيار قسم) -->
            <div id="platformServicesSection" style="display: none;">
                <div class="section-title" data-aos="fade-up" id="platformTitle">
                    <i class="fas fa-th-large"></i>
                    <span id="platformTitleText">الخدمات</span>
                </div>
                <div class="services-grid" id="servicesGrid"></div>
                <!-- زر العودة للرئيسية -->
                <div style="text-align: center; margin: 1rem 0;">
                    <button onclick="goBackToHome()" class="submit-btn" style="background: linear-gradient(135deg, #00c6fb, #005bea); width: auto; padding: 0.5rem 1.5rem;">
                        <i class="fas fa-arrow-right"></i> العودة للرئيسية
                    </button>
                </div>
            </div>
            
            <div class="inquiry-section" data-aos="fade-up" data-aos-delay="100">
                <div class="inquiry-title">
                    <h2><i class="fas fa-headset"></i> استفسار أو خدمة أخرى</h2>
                    <p>لديك استفسار؟ املأ النموذج وسنرد عليك فوراً</p>
                </div>
                <form id="inquiryForm">
                    <div class="form-group"><input type="text" name="الاسم" id="inquiryName" placeholder="الاسم الكامل" required></div>
                    <div class="form-group"><input type="tel" name="رقم الهاتف" id="inquiryPhone" placeholder="رقم الهاتف (واتساب)" required></div>
                    <div class="form-group"><textarea name="الاستفسار" id="inquiryMessage" rows="2" placeholder="اكتب استفسارك..." required></textarea></div>
                    <button type="submit" class="submit-btn"><i class="fas fa-paper-plane"></i> إرسال</button>
                </form>
            </div>
            
            <div class="download-section" data-aos="fade-up" data-aos-delay="200">
                <h3><i class="fas fa-download"></i> مركز التحميل</h3>
                <div class="download-simple">
                    <div class="download-item" data-file="tools"><i class="fas fa-toolbox"></i><span>حزمة الأدوات</span></div>
                    <div class="download-item" data-file="apk"><i class="fab fa-android"></i><span>تطبيق APK</span></div>
                    <div class="download-item" data-file="guide"><i class="fas fa-book-open"></i><span>الدليل الشامل</span></div>
                </div>
            </div>
        </div>
        <footer data-aos="fade-up" data-aos-delay="300">
            <p>© 2025 HACK FOLLOWERS | جميع الحقوق محفوظة</p>
            <div class="developer">✨ تم التطوير بواسطة كريم احمد ✨</div>
        </footer>
    `;
}

function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    grid.innerHTML = featuredServices.map(s => `
        <div class="service-card" onclick="openOrderModal({
            name: '${s.name.replace(/'/g, "\\'")}',
            price: '${s.price}',
            icon: '${s.icon}',
            description: '${s.description.replace(/'/g, "\\'")}',
            needsQuantity: ${s.needsQuantity || false},
            pricePer1000: ${s.pricePer1000 || 0},
            platform: '${s.platform || ""}'
        })">
            <i class="${s.icon} service-icon"></i>
            <div class="service-name">${s.name}</div>
            <div class="service-description"><i class="fas fa-star" style="color:#ffd966;font-size:.55rem"></i> ${s.description}</div>
            <div class="price-wrapper"><div class="price-card"><span class="price-amount">${s.price}</span><span class="price-unit">جنيه</span></div><div class="price-badge">عرض خاص</div></div>
            <button class="order-card-btn" onclick="event.stopPropagation(); openOrderModal({
                name: '${s.name.replace(/'/g, "\\'")}',
                price: '${s.price}',
                icon: '${s.icon}',
                description: '${s.description.replace(/'/g, "\\'")}',
                needsQuantity: ${s.needsQuantity || false},
                pricePer1000: ${s.pricePer1000 || 0},
                platform: '${s.platform || ""}'
            })"><i class="fas fa-envelope"></i> اطلب الآن</button>
        </div>
    `).join('');
}

function selectPlatform(platform) {
    // إغلاق القائمة المنسدلة
    const dropdownContent = document.getElementById('mainDropdownContent');
    if (dropdownContent) {
        dropdownContent.style.display = 'none';
    }
    
    // عرض الخدمات الخاصة بالقسم
    showPlatform(platform);
}

function showPlatform(platform) {
    currentPlatform = platform;
    const services = getPlatformServices(platform);
    const platformName = getPlatformName(platform);
    const platformIcon = getPlatformIcon(platform);
    
    // تغيير عنوان القسم
    document.getElementById('platformTitleText').innerHTML = `<i class="${platformIcon}"></i> ${platformName}`;
    
    // عرض بطاقات الخدمات
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = services.map((s, i) => {
        const isSpecial = s.price === "حسب الاختيار";
        return `
            <div class="service-card" onclick="openOrderModal({
                name: '${s.name.replace(/'/g, "\\'")}',
                price: '${s.price}',
                icon: '${s.icon}',
                description: '${s.description.replace(/'/g, "\\'")}',
                needsQuantity: ${s.needsQuantity || false},
                pricePer1000: ${s.pricePer1000 || 0},
                platform: '${s.platform || ""}'
            })">
                <i class="${s.icon} service-icon"></i>
                <div class="service-name">${s.name}</div>
                <div class="service-description"><i class="fas fa-star" style="color:#ffd966;font-size:.55rem"></i> ${s.description}</div>
                <div class="price-wrapper"><div class="price-card"><span class="price-amount">${s.price}</span><span class="price-unit">${isSpecial ? '' : 'جنيه'}</span></div>${!isSpecial ? '<div class="price-badge">أفضل سعر</div>' : ''}</div>
                <button class="order-card-btn" onclick="event.stopPropagation(); openOrderModal({
                    name: '${s.name.replace(/'/g, "\\'")}',
                    price: '${s.price}',
                    icon: '${s.icon}',
                    description: '${s.description.replace(/'/g, "\\'")}',
                    needsQuantity: ${s.needsQuantity || false},
                    pricePer1000: ${s.pricePer1000 || 0},
                    platform: '${s.platform || ""}'
                })"><i class="fas fa-envelope"></i> اطلب الآن</button>
            </div>
        `;
    }).join('');
    
    // إخفاء أفضل العروض
    const featuredSection = document.getElementById('featuredSection');
    if (featuredSection) featuredSection.style.display = 'none';
    
    // إظهار قسم الخدمات
    const platformSection = document.getElementById('platformServicesSection');
    if (platformSection) platformSection.style.display = 'block';
    
    // تمرير سلس إلى القسم
    platformSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goBackToHome() {
    // إظهار أفضل العروض مرة أخرى
    const featuredSection = document.getElementById('featuredSection');
    if (featuredSection) featuredSection.style.display = 'block';
    
    // إخفاء قسم الخدمات
    const platformSection = document.getElementById('platformServicesSection');
    if (platformSection) platformSection.style.display = 'none';
    
    // تمرير سلس إلى الأعلى
    window.scrollTo({ behavior: 'smooth', top: 0 });
}

// إضافة حدث لإغلاق القائمة عند النقر خارجها
function setupDropdownClose() {
    const dropdownBtn = document.getElementById('dropdownMainBtn');
    const dropdownContent = document.getElementById('mainDropdownContent');
    
    if (dropdownBtn && dropdownContent) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'block';
            }
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.style.display = 'none';
            }
        });
    }
}

function showSuccessMessage(serviceName) {
    const modal = document.getElementById('orderModal');
    if (modal) {
        const modalContent = modal.querySelector('.order-modal-content');
        const form = modalContent.querySelector('#orderForm');
        const submitBtn = modalContent.querySelector('#submitOrderBtn');
        if (form) form.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'none';
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> تم استلام طلبك بنجاح!</h4>
            <p>مرحباً بك في <strong>HACK FOLLOWERS</strong> 🚀</p>
            <p>شكراً لتواصلك معنا. تم استلام طلبك للخدمة: <span class="service-name-highlight">${serviceName}</span></p>
            <p>سنقوم بالرد عليك في أقرب وقت ممكن لتأكيد الطلب وإكمال الإجراءات.</p>
            <p>نتمنى لك تجربة ممتعة! ✨</p>
            <div class="whatsapp-support">
                <p><i class="fab fa-whatsapp"></i> للتواصل مع الدعم الفني:</p>
                <a href="https://wa.me/201025844231" target="_blank"><i class="fab fa-whatsapp"></i> اضغط للدعم الفني</a>
            </div>
            <button onclick="closeOrderModal()" class="submit-btn" style="margin-top:.8rem; background: linear-gradient(135deg, #00c6fb, #005bea);"><i class="fas fa-check"></i> موافق</button>
        `;
        modalContent.appendChild(successDiv);
        const closeBtn = successDiv.querySelector('button');
        if (closeBtn) closeBtn.onclick = () => closeOrderModal();
    }
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) modal.remove();
}

function validateEgyptianPhone(phone) {
    const cleanPhone = phone.replace(/[\s\-]/g, '');
    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    return phoneRegex.test(cleanPhone);
}

function showToast(msg, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = isError ? 'toast error' : 'toast';
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2500);
}

async function sendToEmail(formData) {
    const FORMSPREE_URL = "https://formspree.io/f/mjgpvlao";
    try {
        const response = await fetch(FORMSPREE_URL, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function submitOrder(e) {
    e.preventDefault();
    const name = document.getElementById('orderName').value.trim();
    const phone = document.getElementById('orderPhone').value.trim();
    const quantity = document.getElementById('quantity') ? document.getElementById('quantity').value : 0;
    const accountLink = document.getElementById('accountLink') ? document.getElementById('accountLink').value.trim() : '';
    const details = document.getElementById('orderDetails').value.trim();
    let isValid = true;
    if (name.length < 3) {
        document.getElementById('nameError').textContent = '⚠️ الاسم 3 أحرف على الأقل';
        document.getElementById('orderName').classList.add('input-error');
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
        document.getElementById('orderName').classList.remove('input-error');
        document.getElementById('orderName').classList.add('input-success');
    }
    if (!validateEgyptianPhone(phone)) {
        document.getElementById('phoneError').textContent = '⚠️ رقم غير صالح! 11 رقم يبدأ بـ 010/011/012/015';
        document.getElementById('orderPhone').classList.add('input-error');
        isValid = false;
    } else {
        document.getElementById('phoneError').textContent = '';
        document.getElementById('orderPhone').classList.remove('input-error');
        document.getElementById('orderPhone').classList.add('input-success');
    }
    if (currentService.needsQuantity) {
        if (!accountLink) {
            document.getElementById('linkError').textContent = '⚠️ الرابط مطلوب';
            document.getElementById('accountLink').classList.add('input-error');
            isValid = false;
        } else if (!accountLink.startsWith('http://') && !accountLink.startsWith('https://')) {
            document.getElementById('linkError').textContent = '⚠️ الرابط يجب أن يبدأ بـ http:// أو https://';
            document.getElementById('accountLink').classList.add('input-error');
            isValid = false;
        } else {
            document.getElementById('linkError').textContent = '';
            document.getElementById('accountLink').classList.remove('input-error');
            document.getElementById('accountLink').classList.add('input-success');
        }
    }
    if (!isValid) return;
    const submitBtn = document.getElementById('submitOrderBtn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    const formData = new FormData();
    formData.append('الاسم', name);
    formData.append('رقم الهاتف', phone);
    formData.append('نوع الخدمة', currentService.name);
    if (currentService.needsQuantity && quantity > 0) {
        const totalPrice = (quantity / 1000) * currentService.pricePer1000;
        formData.append('الكمية', quantity);
        formData.append('السعر الإجمالي', `${totalPrice} جنيه`);
        formData.append('رابط الحساب', accountLink);
        formData.append('تفاصيل الطلب', `الخدمة: ${currentService.name}\nالكمية: ${quantity}\nالسعر الإجمالي: ${totalPrice} جنيه\nرابط الحساب: ${accountLink}\nملاحظات: ${details || 'لا توجد'}`);
    } else {
        formData.append('السعر', `${currentService.price} جنيه`);
        formData.append('تفاصيل الطلب', `الخدمة: ${currentService.name}\nالسعر: ${currentService.price} جنيه\nملاحظات: ${details || 'لا توجد'}`);
    }
    formData.append('_subject', '📢 طلب جديد من HACK FOLLOWERS');
    formData.append('_replyto', `${phone}@whatsapp.com`);
    const success = await sendToEmail(formData);
    if (success) {
        showToast("✓ تم إرسال طلبك بنجاح!");
        showSuccessMessage(currentService.name);
    } else {
        showToast("❌ حدث خطأ في الإرسال", true);
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> تأكيد الطلب';
        submitBtn.disabled = false;
    }
}

function createOrderModal(service) {
    const isQuantityService = service.needsQuantity === true;
    const pricePer1000 = service.pricePer1000 || 0;
    const linkPlaceholder = getLinkPlaceholder(service.platform);
    const linkExample = getLinkExample(service.platform);
    return `
        <div class="order-modal active" id="orderModal">
            <div class="order-modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-shopping-cart"></i> طلب الخدمة</h3>
                    <button class="close-modal" onclick="closeOrderModal()">&times;</button>
                </div>
                <div class="selected-service-info"><strong>الخدمة المختارة:</strong> ${service.name}</div>
                <form id="orderForm">
                    <div class="form-group">
                        <input type="text" id="orderName" placeholder="👤 الاسم الكامل" required>
                        <div class="error-message" id="nameError"></div>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="orderPhone" placeholder="📞 رقم الهاتف المصري (مثال: 01025844231)" required>
                        <div class="error-message" id="phoneError"></div>
                    </div>
                    ${isQuantityService ? `
                        <div class="price-calculator">
                            <h4><i class="fas fa-calculator"></i> حساب السعر</h4>
                            <p style="font-size:.65rem;">الحد الأدنى 1000 - كل 1000 = ${pricePer1000} جنيه</p>
                            <div class="quantity-input">
                                <button type="button" class="qty-btn" id="decreaseQty">-</button>
                                <input type="number" id="quantity" value="1000" min="1000" step="1000">
                                <button type="button" class="qty-btn" id="increaseQty">+</button>
                            </div>
                            <div class="total-price">السعر الإجمالي: <span id="totalPrice">${pricePer1000}</span> جنيه</div>
                            <div class="form-group">
                                <input type="url" id="accountLink" placeholder="${linkPlaceholder}">
                                <small class="link-example">${linkExample}</small>
                                <div class="error-message" id="linkError"></div>
                            </div>
                        </div>
                    ` : `
                        <div class="price-calculator"><div class="total-price">السعر: ${service.price} جنيه</div></div>
                        <input type="hidden" id="quantity" value="0">
                    `}
                    <div class="form-group"><textarea id="orderDetails" rows="2" placeholder="📝 تفاصيل إضافية (اختياري)"></textarea></div>
                    <button type="submit" class="submit-btn" id="submitOrderBtn"><i class="fas fa-paper-plane"></i> تأكيد الطلب</button>
                </form>
            </div>
        </div>
    `;
}

function openOrderModal(service) {
    currentService = service;
    const modalHtml = createOrderModal(service);
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const form = document.getElementById('orderForm');
    if (form) form.addEventListener('submit', submitOrder);
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');
    const totalSpan = document.getElementById('totalPrice');
    if (decreaseBtn && increaseBtn && quantityInput && totalSpan) {
        const pricePer1000 = currentService.pricePer1000;
        function updateTotal() {
            let val = parseInt(quantityInput.value) || 1000;
            if (val < 1000) val = 1000;
            if (val % 1000 !== 0) val = Math.ceil(val / 1000) * 1000;
            quantityInput.value = val;
            totalSpan.textContent = (val / 1000) * pricePer1000;
        }
        decreaseBtn.onclick = () => { let v = parseInt(quantityInput.value)||1000; if(v>1000) quantityInput.value = v-1000; updateTotal(); };
        increaseBtn.onclick = () => { let v = parseInt(quantityInput.value)||1000; quantityInput.value = v+1000; updateTotal(); };
        quantityInput.oninput = updateTotal;
        updateTotal();
    }
    const orderName = document.getElementById('orderName');
    const orderPhone = document.getElementById('orderPhone');
    const accountLinkInput = document.getElementById('accountLink');
    if (orderName) orderName.addEventListener('input', () => {
        const valid = orderName.value.trim().length >= 3;
        if (valid) { orderName.classList.add('input-success'); orderName.classList.remove('input-error'); document.getElementById('nameError').textContent = ''; }
        else { orderName.classList.remove('input-success'); orderName.classList.add('input-error'); }
    });
    if (orderPhone) orderPhone.addEventListener('input', () => {
        const valid = validateEgyptianPhone(orderPhone.value);
        if (valid) { orderPhone.classList.add('input-success'); orderPhone.classList.remove('input-error'); document.getElementById('phoneError').textContent = ''; }
        else { orderPhone.classList.remove('input-success'); orderPhone.classList.add('input-error'); }
    });
    if (accountLinkInput) accountLinkInput.addEventListener('input', () => {
        const link = accountLinkInput.value.trim();
        const valid = link && (link.startsWith('http://') || link.startsWith('https://'));
        if (valid) { accountLinkInput.classList.add('input-success'); accountLinkInput.classList.remove('input-error'); document.getElementById('linkError').textContent = ''; }
        else { accountLinkInput.classList.remove('input-success'); accountLinkInput.classList.add('input-error'); }
    });
}

function initializeSite() {
    renderFeatured();
    AOS.init({ duration: 500, once: true, offset: 40 });
    setupDropdownClose();
    
    document.querySelectorAll('.download-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.dataset.file;
            let fn = '';
            if (type === 'tools') fn = 'HACK_FOLLOWERS_Tools.zip';
            else if (type === 'apk') fn = 'HACK_FOLLOWERS_App.apk';
            else if (type === 'guide') fn = 'HACK_FOLLOWERS_Guide.pdf';
            const blob = new Blob(['محتوى تجريبي'], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fn;
            a.click();
            URL.revokeObjectURL(url);
            showToast(`✓ بدء تحميل ${fn}`);
        });
    });
    
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('inquiryName').value.trim();
            const phone = document.getElementById('inquiryPhone').value.trim();
            const msg = document.getElementById('inquiryMessage').value.trim();
            if (!name || !phone || !msg) { showToast("❌ الرجاء ملء جميع الحقول", true); return; }
            const btn = inquiryForm.querySelector('button');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري...';
            btn.disabled = true;
            const formData = new FormData();
            formData.append('الاسم', name);
            formData.append('رقم الهاتف', phone);
            formData.append('الاستفسار', msg);
            formData.append('_subject', '📢 استفسار جديد من HACK FOLLOWERS');
            formData.append('_replyto', `${phone}@whatsapp.com`);
            const success = await sendToEmail(formData);
            if (success) { showToast("✓ تم إرسال استفسارك بنجاح!"); inquiryForm.reset(); showSuccessMessage("استفسار"); }
            else showToast("❌ حدث خطأ", true);
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال';
            btn.disabled = false;
        });
    }
}

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.width = `${Math.random() * 4 + 1}px`;
        p.style.height = p.style.width;
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDuration = `${Math.random() * 10 + 5}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(p);
    }
}
createParticles();

// زر الدخول
const enterBtn = document.getElementById('enterBtn');
enterBtn.addEventListener('click', () => {
    quranAudio = new Audio('https://server6.mp3quran.net/wdee3/040.mp3');
    quranAudio.loop = true;
    quranAudio.volume = 0.2;
    quranAudio.play().catch(e => console.log('تشغيل الصوت:', e));
    
    mainContent.innerHTML = createMainContent();
    mainContent.style.display = 'block';
    welcomeScreen.classList.add('hide');
    whatsappFloat.style.display = 'block';
    setTimeout(initializeSite, 50);
});

window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;
window.selectPlatform = selectPlatform;
window.showPlatform = showPlatform;
window.goBackToHome = goBackToHome;
