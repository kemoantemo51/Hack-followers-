herelet visitorCount = localStorage.getItem('visitorCount') ? parseInt(localStorage.getItem('visitorCount')) : 258;
let quranAudio = null;
let currentService = null;

const allServices = [
    { name: "📌 متابعين فيسبوك", price: "10", icon: "fab fa-facebook", category: "facebook", description: "✅ 1000 متابع - وصول سريع 🐦‍🔥", needsQuantity: true, pricePer1000: 10, unit: "1000" },
    { name: "❤️ ريأكت فيسبوك", price: "10", icon: "fas fa-heart", category: "facebook", description: "✅ 1000 ريأكت - تفاعل طبيعي ✅", needsQuantity: true, pricePer1000: 10, unit: "1000" },
    { name: "👁️ مشاهدة فيسبوك", price: "35", icon: "fas fa-eye", category: "facebook", description: "✅ 10000 مشاهدة - وصول ضخم 🚀", needsQuantity: true, pricePer1000: 3.5, unit: "10000" },
    { name: "📷 متابعين انستقرام", price: "20", icon: "fab fa-instagram", category: "instagram", description: "✅ 1000 متابع - جودة احترافية ✨", needsQuantity: true, pricePer1000: 20, unit: "1000" },
    { name: "❤️ لايكات انستقرام", price: "15", icon: "fas fa-heart", category: "instagram", description: "✅ 1000 لايك - تفاعل حقيقي 💯", needsQuantity: true, pricePer1000: 15, unit: "1000" },
    { name: "🎵 متابعين تيك توك", price: "130", icon: "fab fa-tiktok", category: "tiktok", description: "✅ 1000 متابع - وصول عالمي 🌍", needsQuantity: true, pricePer1000: 130, unit: "1000" },
    { name: "❤️ لايكات تيك توك", price: "2", icon: "fas fa-heart", category: "tiktok", description: "✅ 1000 لايك - أرخص سعر في مصر 💪", needsQuantity: true, pricePer1000: 2, unit: "1000" }
];

const dailyOffers = [
    { title: "🎁 عرض العيد الذهبي", desc: "10000 متابع فيسبوك + 10000 ريأكت من اختيارك مقابل 139 جنيه فقط! يمكنك اختيار خدمة واحدة فقط من خدمات فيسبوك. 🌟✅" }
];

const features = [
    { icon: "🐦‍🔥", title: "وصول سريع", desc: "نتائج فورية خلال ساعات" },
    { icon: "🌏", title: "جودة حقيقية", desc: "حسابات حقيقية نشطة" },
    { icon: "✅", title: "ضمان مدى الحياة", desc: "استبدال المفقود مجاناً" },
    { icon: "♻️", title: "تعويض فوري", desc: "في حالة عدم الالتزام" },
    { icon: "💰", title: "أقل الأسعار", desc: "أرخص من الجميع" },
    { icon: "🛡️", title: "حماية كاملة", desc: "آمن 100%" }
];

const socialLinks = [
    { platform: "واتساب", url: "https://wa.me/201025844231", icon: "fab fa-whatsapp" },
    { platform: "فيسبوك", url: "https://www.facebook.com/eng.Kareem.ahmed.1", icon: "fab fa-facebook" }
];

let newsMessages = [
    "✨ تم إضافة عروض حصرية بمناسبة العيد!",
    "🎁 عرض 10000 متابع + 10000 ريأكت ب 139 جنيه فقط",
    "🔥 أرخص الأسعار في مصر - متابعين تيك توك 1000 ب 130 جنيه",
    "🐦‍🔥 وصول سريع وجودة مضمونة - نضمن لك رضاك التام"
];

let reviews = JSON.parse(localStorage.getItem('siteReviews')) || [
    { name: "محمد السيد", text: "خدمة رائعة وسريعة جداً! وصلتني المتابعين خلال ساعة بجودة عالية. أنصح بالتعامل معهم 👍", stars: 5, date: "2026-03-15" },
    { name: "أحمد فتحي", text: "تعامل محترم واسعار ممتازة. جربت خدمة متابعين انستقرام والنتيجة ممتازة. شكراً لكم", stars: 5, date: "2026-03-10" },
    { name: "نورا سمير", text: "أفضل موقع للخدمات الرقمية في مصر. سرعة في التنفيذ ودعم فني متواصل. فاموس رقم واحد 🔥", stars: 5, date: "2026-03-08" },
    { name: "كريم وائل", text: "جربت أكثر من خدمة عندهم والحمد لله كلها ممتازة. أسعار منافسة وجودة عالية. استمروا", stars: 5, date: "2026-03-05" },
    { name: "سارة محمود", text: "خدمة رائعة ومصداقية في التعامل. وصلتني الخدمة في وقت قياسي. أنصح الجميع بالتجربة", stars: 5, date: "2026-03-01" }
];

function saveReviews() {
    localStorage.setItem('siteReviews', JSON.stringify(reviews));
}

function showToast(msg, isError = false) {
    let toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = isError ? 'toast error' : 'toast';
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2500);
}

function updateVisitorCount() {
    let today = new Date().toDateString();
    let lastVisitDate = localStorage.getItem('lastVisitDate');
    if (lastVisitDate !== today) {
        visitorCount++;
        localStorage.setItem('visitorCount', visitorCount);
        localStorage.setItem('lastVisitDate', today);
    }
    let counterSpan = document.getElementById('visitorCount');
    if (counterSpan) counterSpan.textContent = visitorCount;
}

function renderFeatures() {
    let container = document.getElementById('featuresContainer');
    if (!container) return;
    container.innerHTML = features.map(f => `
        <div class="feature-card" data-aos="zoom-in">
            <div class="feature-icon">${f.icon}</div>
            <h3>${f.title}</h3>
            <p>${f.desc}</p>
        </div>
    `).join('');
}

function renderServicesGrid() {
    let grid = document.getElementById('servicesGrid');
    if (!grid) return;
    grid.innerHTML = allServices.map(s => `
        <div class="service-card" data-aos="fade-up" onclick='openOrderModal(${JSON.stringify(s).replace(/'/g, "&#39;")})'>
            <i class="${s.icon} service-icon"></i>
            <div class="service-name">${s.name}</div>
            <div class="service-description">${s.description}</div>
            <div class="price-wrapper"><div class="price-card"><span class="price-amount">${s.price}</span><span class="price-unit">جنيه</span></div><div class="price-badge">أفضل سعر</div></div>
            <button class="order-card-btn" onclick="event.stopPropagation(); openOrderModal(${JSON.stringify(s).replace(/'/g, "&#39;")})"><i class="fas fa-envelope"></i> اطلب الآن</button>
        </div>
    `).join('');
}

function renderDailyOffersGrid() {
    let grid = document.getElementById('dailyOffersGrid');
    if (!grid) return;
    grid.innerHTML = dailyOffers.map(o => `
        <div class="offer-card" data-aos="fade-up" data-aos-delay="100" onclick='openOfferModal(${JSON.stringify(o).replace(/'/g, "&#39;")})'>
            <i class="fas fa-gift service-icon" style="color:#ffd700;"></i>
            <div class="service-name">🎁 ${o.title}</div>
            <div class="service-description">${o.desc}</div>
            <div class="price-wrapper"><div class="price-card"><span class="price-amount" style="color:#ffd700;">عرض محدود</span></div></div>
            <button class="order-card-btn" onclick="event.stopPropagation(); openOfferModal(${JSON.stringify(o).replace(/'/g, "&#39;")})"><i class="fas fa-gift"></i> استفد الآن</button>
        </div>
    `).join('');
}

function openOfferModal(offer) {
    openOrderModal({ name: offer.title, price: "عرض خاص", description: offer.desc, needsQuantity: false, isOffer: true });
}

function renderSocialSection() {
    let container = document.getElementById('socialLinksContainer');
    if (container) {
        container.innerHTML = socialLinks.map(l => `<a href="${l.url}" target="_blank" class="social-icon"><i class="${l.icon}"></i> ${l.platform}</a>`).join('');
    }
}

function renderReviews() {
    let container = document.getElementById('reviewsContainer');
    if (!container) return;
    container.innerHTML = reviews.map(rev => `
        <div class="review-card" data-aos="fade-up">
            <div class="review-header">
                <div class="review-avatar">${rev.name.charAt(0)}</div>
                <div class="review-info">
                    <h4>${rev.name}</h4>
                    <div class="review-stars">${'⭐'.repeat(rev.stars)}</div>
                </div>
            </div>
            <div class="review-text">"${rev.text}"</div>
            <div class="review-date">📅 ${rev.date}</div>
        </div>
    `).join('');
}

function addReview(name, text) {
    let today = new Date().toISOString().split('T')[0];
    reviews.unshift({ name: name, text: text, stars: 5, date: today });
    if (reviews.length > 10) reviews.pop();
    saveReviews();
    renderReviews();
    showToast("✓ تم إضافة رأيك بنجاح! شكراً لك");
}

window.openOrderModal = function(service) {
    currentService = service;
    let modalHtml = `
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
                        <input type="tel" id="orderPhone" placeholder="📞 رقم الهاتف (مثال: 01025844231)" required>
                        <div class="error-message" id="phoneError"></div>
                    </div>
                    ${service.needsQuantity ? `
                        <div class="price-calculator">
                            <h4><i class="fas fa-calculator"></i> حساب السعر</h4>
                            <p style="font-size:.65rem;">الحد الأدنى ${service.unit} - سعر ${service.unit} = ${service.price} جنيه</p>
                            <div class="quantity-input">
                                <button type="button" class="qty-btn" id="decreaseQty">-</button>
                                <input type="number" id="quantity" value="${parseInt(service.unit)}" min="${parseInt(service.unit)}" step="${parseInt(service.unit)}">
                                <button type="button" class="qty-btn" id="increaseQty">+</button>
                            </div>
                            <div class="total-price">السعر الإجمالي: <span id="totalPrice">${service.price}</span> جنيه</div>
                            <div class="form-group">
                                <input type="url" id="accountLink" placeholder="🔗 رابط الحساب">
                                <div class="error-message" id="linkError"></div>
                            </div>
                        </div>
                    ` : `
                        <div class="price-calculator">
                            <div class="total-price">السعر: ${service.price} جنيه</div>
                        </div>
                        <input type="hidden" id="quantity" value="0">
                    `}
                    <div class="form-group">
                        <textarea id="orderDetails" rows="2" placeholder="📝 تفاصيل إضافية (اختياري)"></textarea>
                    </div>
                    <button type="submit" class="submit-btn" id="submitOrderBtn"><i class="fas fa-paper-plane"></i> تأكيد الطلب</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    let form = document.getElementById('orderForm');
    if (form) form.addEventListener('submit', submitOrder);
    
    let dec = document.getElementById('decreaseQty');
    let inc = document.getElementById('increaseQty');
    let qty = document.getElementById('quantity');
    let totalSpan = document.getElementById('totalPrice');
    if (dec && inc && qty && totalSpan && service.needsQuantity) {
        let step = parseInt(service.unit);
        let pricePerUnit = service.pricePer1000;
        let unit = parseInt(service.unit);
        let updateTotal = () => {
            let val = parseInt(qty.value) || unit;
            if (val < unit) val = unit;
            if (val % unit !== 0) val = Math.ceil(val / unit) * unit;
            qty.value = val;
            totalSpan.textContent = (val / unit) * pricePerUnit;
        };
        dec.onclick = () => { let v = parseInt(qty.value) || unit; if (v > unit) qty.value = v - unit; updateTotal(); };
        inc.onclick = () => { let v = parseInt(qty.value) || unit; qty.value = v + unit; updateTotal(); };
        qty.oninput = updateTotal;
        updateTotal();
    }
    
    let orderName = document.getElementById('orderName');
    let orderPhone = document.getElementById('orderPhone');
    let accountLink = document.getElementById('accountLink');
    if (orderName) orderName.addEventListener('input', () => validateName());
    if (orderPhone) orderPhone.addEventListener('input', () => validatePhone());
    if (accountLink) accountLink.addEventListener('input', () => validateLink());
};

function validateName() {
    let input = document.getElementById('orderName');
    let valid = input.value.trim().length >= 3;
    if (valid) {
        input.classList.add('input-success');
        input.classList.remove('input-error');
        document.getElementById('nameError').textContent = '';
    } else {
        input.classList.remove('input-success');
        input.classList.add('input-error');
        document.getElementById('nameError').textContent = '⚠️ الاسم 3 أحرف على الأقل';
    }
    return valid;
}

function validatePhone() {
    let input = document.getElementById('orderPhone');
    let valid = /^(010|011|012|015)[0-9]{8}$/.test(input.value.replace(/[\s\-]/g, ''));
    if (valid) {
        input.classList.add('input-success');
        input.classList.remove('input-error');
        document.getElementById('phoneError').textContent = '';
    } else {
        input.classList.remove('input-success');
        input.classList.add('input-error');
        document.getElementById('phoneError').textContent = '⚠️ رقم هاتف غير صالح';
    }
    return valid;
}

function validateLink() {
    let input = document.getElementById('accountLink');
    if (!input) return true;
    let link = input.value.trim();
    let valid = link && (link.startsWith('http://') || link.startsWith('https://'));
    if (valid) {
        input.classList.add('input-success');
        input.classList.remove('input-error');
        document.getElementById('linkError').textContent = '';
    } else {
        input.classList.remove('input-success');
        input.classList.add('input-error');
        if (link) document.getElementById('linkError').textContent = '⚠️ الرابط يجب أن يبدأ بـ http:// أو https://';
    }
    return valid;
}

window.closeOrderModal = function() {
    let modal = document.getElementById('orderModal');
    if (modal) modal.remove();
};

async function sendToEmail(formData) {
    try {
        let response = await fetch("https://formspree.io/f/mjgpvlao", {
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
    if (!validateName() || !validatePhone()) return;
    if (currentService.needsQuantity && !validateLink()) return;
    
    let name = document.getElementById('orderName').value.trim();
    let phone = document.getElementById('orderPhone').value.trim();
    let quantity = document.getElementById('quantity') ? document.getElementById('quantity').value : 0;
    let accountLink = document.getElementById('accountLink') ? document.getElementById('accountLink').value.trim() : '';
    let details = document.getElementById('orderDetails').value.trim();
    
    let submitBtn = document.getElementById('submitOrderBtn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    let formData = new FormData();
    formData.append('الاسم', name);
    formData.append('رقم الهاتف', phone);
    formData.append('نوع الخدمة', currentService.name);
    if (currentService.needsQuantity && quantity > 0) {
        let total = (quantity / parseInt(currentService.unit)) * currentService.pricePer1000;
        formData.append('الكمية', quantity);
        formData.append('السعر الإجمالي', `${total} جنيه`);
        formData.append('رابط الحساب', accountLink);
    } else {
        formData.append('السعر', `${currentService.price} جنيه`);
    }
    formData.append('تفاصيل إضافية', details);
    formData.append('_subject', '📢 طلب جديد من FAMOUS');
    
    let success = await sendToEmail(formData);
    if (success) {
        showToast("✓ تم إرسال طلبك بنجاح!");
        showSuccessMessage(currentService.name);
    } else {
        showToast("❌ حدث خطأ، حاول مرة أخرى", true);
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> تأكيد الطلب';
        submitBtn.disabled = false;
    }
}

function showSuccessMessage(serviceName) {
    let modal = document.getElementById('orderModal');
    if (modal) {
        let modalContent = modal.querySelector('.order-modal-content');
        let form = modalContent.querySelector('#orderForm');
        if (form) form.style.display = 'none';
        let successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> تم استلام طلبك بنجاح!</h4>
            <p>شكراً لتواصلك مع <strong>FAMOUS</strong></p>
            <p>الخدمة: <span class="service-name-highlight">${serviceName}</span></p>
            <p>سنقوم بالرد عليك في أقرب وقت ممكن.</p>
            <div class="whatsapp-support">
                <a href="https://wa.me/201025844231" target="_blank" class="submit-btn" style="display:inline-block; text-decoration:none;"><i class="fab fa-whatsapp"></i> الدعم الفني</a>
            </div>
            <button onclick="closeOrderModal()" class="submit-btn" style="margin-top:.8rem;">موافق</button>
        `;
        modalContent.appendChild(successDiv);
    }
}

function createMainContent() {
    return `
        <div class="cyber-bg"></div>
        <div class="particles" id="particles"></div>
        <div class="container">
            <div class="header">
                <img src="https://i.ibb.co/KzzNj7N0/IMG.png" class="header-logo">
                <h1 class="logo">💀 FAMOUS <span class="logo-badge">PRO</span> 💀</h1>
                <p class="tagline">✨ أرخص الأسعار، أسرع النتائج - دعم فوري 24/7 ✨</p>
            </div>
            <div class="visitor-counter"><i class="fas fa-eye"></i> عدد الزوار: <span id="visitorCount">${visitorCount}</span></div>
            
            <div class="news-ticker">
                <span class="news-label"><i class="fas fa-bullhorn"></i> أخبار</span>
                <div class="news-content">
                    <div class="news-text" id="newsTicker">${newsMessages.map(m => `<span style="margin-left:30px;">📢 ${m}</span>`).join('')}</div>
                </div>
            </div>
            
            <div class="features-grid" id="featuresContainer"></div>
            
            <div class="section-title" data-aos="fade-right"><i class="fas fa-tags"></i> 🎁 العروض اليومية</div>
            <div class="featured-grid" id="dailyOffersGrid"></div>
            
            <div class="section-title" data-aos="fade-right"><i class="fas fa-crown"></i> ⭐ خدماتنا المميزة</div>
            <div class="services-grid" id="servicesGrid"></div>
            
            <div class="reviews-section" data-aos="fade-up">
                <div class="section-title"><i class="fas fa-star"></i> آراء عملائنا الكرام</div>
                <div class="reviews-grid" id="reviewsContainer"></div>
                <div class="add-review-form">
                    <h4><i class="fas fa-pen"></i> أضف رأيك</h4>
                    <div class="review-input-group">
                        <input type="text" id="reviewName" placeholder="👤 اسمك">
                        <textarea id="reviewText" rows="2" placeholder="📝 اكتب رأيك وتجربتك معنا..."></textarea>
                    </div>
                    <button class="add-review-btn" id="submitReviewBtn"><i class="fas fa-paper-plane"></i> إضافة رأيك</button>
                </div>
            </div>
            
            <div class="social-section" data-aos="fade-up">
                <h3><i class="fas fa-share-alt"></i> تواصل معنا</h3>
                <div class="social-icons" id="socialLinksContainer"></div>
            </div>
            
            <div class="more-services-section" data-aos="fade-up">
                <h3><i class="fas fa-plus-circle"></i> المزيد من الخدمات</h3>
                <p>هناك المزيد من الخدمات المتنوعة، ولكن هذا الأكثر طلباً.<br>تواصل معنا لطلب خدمة أخرى أو استفسار.</p>
                <a href="https://wa.me/201025844231" target="_blank" class="contact-btn"><i class="fab fa-whatsapp"></i> تواصل معنا الآن</a>
            </div>
            
            <div class="inquiry-section" data-aos="fade-up">
                <div class="inquiry-title">
                    <h2><i class="fas fa-headset"></i> استفسار أو خدمة أخرى</h2>
                    <p>املأ النموذج وسنرد عليك فوراً</p>
                </div>
                <form id="inquiryForm">
                    <div class="form-group"><input type="text" id="inquiryName" placeholder="الاسم الكامل" required></div>
                    <div class="form-group"><input type="tel" id="inquiryPhone" placeholder="رقم الهاتف" required></div>
                    <div class="form-group"><textarea id="inquiryMessage" rows="2" placeholder="اكتب استفسارك..." required></textarea></div>
                    <button type="submit" class="submit-btn"><i class="fas fa-paper-plane"></i> إرسال</button>
                </form>
            </div>
            
            <div class="download-section" data-aos="fade-up">
                <h3><i class="fas fa-download"></i> مركز التحميل</h3>
                <div class="download-simple">
                    <div class="download-item" data-file="tools"><i class="fas fa-toolbox"></i> حزمة الأدوات</div>
                    <div class="download-item" data-file="apk"><i class="fab fa-android"></i> تطبيق APK</div>
                    <div class="download-item" data-file="guide"><i class="fas fa-book-open"></i> الدليل الشامل</div>
                </div>
            </div>
        </div>
        <footer>
            <p>© 2026 FAMOUS | جميع الحقوق محفوظة</p>
            <div class="developer">✨ تم التطوير بواسطة كريم احمد ✨</div>
        </footer>
    `;
}

function initializeSite() {
    updateVisitorCount();
    renderFeatures();
    renderDailyOffersGrid();
    renderServicesGrid();
    renderSocialSection();
    renderReviews();
    AOS.init({ duration: 500, once: true });
    
    let tickerDiv = document.querySelector('.news-text');
    if (tickerDiv) tickerDiv.style.animation = 'ticker 35s linear infinite';
    
    let submitReviewBtn = document.getElementById('submitReviewBtn');
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', () => {
            let name = document.getElementById('reviewName').value.trim();
            let text = document.getElementById('reviewText').value.trim();
            if (!name || !text) {
                showToast("❌ الرجاء إدخال الاسم والتعليق", true);
                return;
            }
            addReview(name, text);
            document.getElementById('reviewName').value = '';
            document.getElementById('reviewText').value = '';
        });
    }
    
    let downloadItems = document.querySelectorAll('.download-item');
    downloadItems.forEach(item => {
        item.addEventListener('click', () => {
            let type = item.dataset.file;
            let filename = type === 'tools' ? 'FAMOUS_Tools.zip' : type === 'apk' ? 'FAMOUS_App.apk' : 'FAMOUS_Guide.pdf';
            let blob = new Blob(['محتوى تجريبي'], { type: 'application/octet-stream' });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
            showToast(`✓ بدء تحميل ${filename}`);
        });
    });
    
    let inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            let name = document.getElementById('inquiryName').value.trim();
            let phone = document.getElementById('inquiryPhone').value.trim();
            let msg = document.getElementById('inquiryMessage').value.trim();
            if (!name || !phone || !msg) { showToast("❌ الرجاء ملء جميع الحقول", true); return; }
            let btn = inquiryForm.querySelector('button');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري...';
            btn.disabled = true;
            let formData = new FormData();
            formData.append('الاسم', name);
            formData.append('رقم الهاتف', phone);
            formData.append('الاستفسار', msg);
            formData.append('_subject', '📢 استفسار جديد من FAMOUS');
            let success = await sendToEmail(formData);
            if (success) { showToast("✓ تم إرسال استفسارك!"); inquiryForm.reset(); }
            else showToast("❌ حدث خطأ", true);
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال';
            btn.disabled = false;
        });
    }
}

function createParticles() {
    let container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
        let p = document.createElement('div');
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

let enterBtn = document.getElementById('enterBtn');
let welcomeScreen = document.getElementById('welcomeScreen');
let mainContent = document.getElementById('mainContent');
let whatsappFloat = document.getElementById('whatsappFloat');

enterBtn.addEventListener('click', () => {
    mainContent.innerHTML = createMainContent();
    mainContent.style.display = 'block';
    welcomeScreen.classList.add('hide');
    whatsappFloat.style.display = 'block';
    if (quranAudio) quranAudio.pause();
    quranAudio = new Audio('https://server6.mp3quran.net/wdee3/040.mp3');
    quranAudio.loop = true;
    quranAudio.volume = 0.2;
    quranAudio.play().catch(e => console.log("تشغيل القرآن:", e));
    setTimeout(() => {
        initializeSite();
    }, 50);
});
