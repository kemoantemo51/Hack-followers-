let percent = 0;
let currentService = null;
let currentFilter = "all";
let quranAudio = null;

const loaderBar = document.getElementById('loaderBar');
const loaderPercent = document.getElementById('loaderPercent');
const startBtn = document.getElementById('startBtn');
const splashScreen = document.getElementById('splashScreen');
const mainContent = document.getElementById('mainContent');
const whatsappFloat = document.getElementById('whatsappFloat');

const loadingInterval = setInterval(() => {
    if (percent < 100) {
        percent += 2;
        loaderPercent.textContent = `جاري التحميل ${percent}%`;
        loaderBar.style.width = `${percent}%`;
    }
    if (percent >= 100) clearInterval(loadingInterval);
}, 40);

const socialServices = [
    { name: "📌 متابعين فيسبوك", price: "10", icon: "fab fa-facebook", description: "✅ متابعين حقيقيين نشطين ✅ نتائج فورية", needsQuantity: true, pricePer1000: 10, platform: "facebook" },
    { name: "📌 متابعين فيسبوك صفحة", price: "10", icon: "fas fa-thumbs-up", description: "✅ متابعين للصفحات الرسمية ✅ زيادة الثقة", needsQuantity: true, pricePer1000: 10, platform: "facebook" },
    { name: "❤️ تفاعل منشورات", price: "15", icon: "fas fa-heart", description: "✅ لايكات حقيقية ✅ زيادة وصول المنشورات", needsQuantity: true, pricePer1000: 15, platform: "facebook" },
    { name: "📷 متابعين انستقرام", price: "20", icon: "fab fa-instagram", description: "✅ متابعين انستقرام حقيقيين ✅ زيادة ظهور الحساب", needsQuantity: true, pricePer1000: 20, platform: "instagram" },
    { name: "👍 لايكات انستقرام", price: "7", icon: "far fa-heart", description: "✅ لايكات سريعة ✅ زيادة التفاعل", needsQuantity: true, pricePer1000: 7, platform: "instagram" }
];

const subscriptionServices = [
    { name: "📡 IPTV اشتراك", price: "140", icon: "fas fa-tv", description: "✅ آلاف القنوات ✅ مشاهدة HD و4K", needsQuantity: false },
    { name: "🎬 Netflix اشتراك", price: "550", icon: "fab fa-netflix", description: "✅ شهرين ✅ جودة 4K ✅ جميع المسلسلات", needsQuantity: false },
    { name: "💬 شات جبتى", price: "حسب الاختيار", icon: "fas fa-comments", description: "✅ جميع الباقات ✅ تفعيل فوري", needsQuantity: false },
    { name: "✂️ CapCut Pro", price: "190", icon: "fas fa-video", description: "✅ شهر كامل ✅ جميع مميزات البرو", needsQuantity: false },
    { name: "🤖 Gemini Premium", price: "650", icon: "fas fa-robot", description: "✅ شهر ✅ ذكاء اصطناعي متقدم", needsQuantity: false },
    { name: "🎨 Canva Pro", price: "30", icon: "fab fa-canva", description: "✅ 60 يوم ✅ تصميم احترافي", needsQuantity: false },
    { name: "🎬 شاهد نت", price: "2300", icon: "fas fa-ticket-alt", description: "✅ سنة كاملة ✅ أقوى المسلسلات", needsQuantity: false }
];

function getLinkPlaceholder(platform) {
    if (platform === 'facebook') {
        return '🔗 رابط حساب فيسبوك (مثال: https://www.facebook.com/username)';
    } else if (platform === 'instagram') {
        return '🔗 رابط حساب انستقرام (مثال: https://www.instagram.com/username)';
    }
    return '🔗 رابط الحساب';
}

function getLinkExample(platform) {
    if (platform === 'facebook') {
        return 'مثال: https://www.facebook.com/username';
    } else if (platform === 'instagram') {
        return 'مثال: https://www.instagram.com/username';
    }
    return '';
}

function createMainContent() {
    return `
        <div class="container">
            <div class="header" data-aos="fade-down" data-aos-duration="800">
                <h1 class="logo"> HACK <span class="logo-badge">PRO</span> FOLLOWERS </h1>
                <p class="tagline">✨ سرڤر سريع ورخيص - دعم فوري 24/7 ✨</p>
            </div>
            <div class="filter-buttons" data-aos="fade-up" data-aos-duration="600">
                <button class="filter-btn active" data-filter="all">الكل</button>
                <button class="filter-btn" data-filter="social">وسائل التواصل</button>
                <button class="filter-btn" data-filter="subscription">الاشتراكات</button>
            </div>
            <div class="services-grid" id="servicesGrid"></div>
            <div class="inquiry-section" data-aos="fade-up" data-aos-duration="700" data-aos-delay="100">
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
            <div class="download-section" data-aos="fade-up" data-aos-duration="700" data-aos-delay="200">
                <h3><i class="fas fa-download"></i> مركز التحميل</h3>
                <div class="download-simple">
                    <div class="download-item" data-file="tools"><i class="fas fa-toolbox"></i><span>حزمة الأدوات</span></div>
                    <div class="download-item" data-file="apk"><i class="fab fa-android"></i><span>تطبيق APK</span></div>
                    <div class="download-item" data-file="guide"><i class="fas fa-book-open"></i><span>الدليل الشامل</span></div>
                </div>
            </div>
        </div>
        <footer data-aos="fade-up" data-aos-duration="600" data-aos-delay="300">
            <p>© 2026 HACK FOLLOWERS | جميع الحقوق محفوظة</p>
            <div class="developer">✨ تم التطوير بواسطة كريم احمد ✨</div>
        </footer>
    `;
}

function showSuccessMessage(serviceName) {
    const modal = document.getElementById('orderModal');
    if (modal) {
        const modalContent = modal.querySelector('.order-modal-content');
        const form = modalContent.querySelector('#orderForm');
        const submitBtn = modalContent.querySelector('#submitOrderBtn');
        
        form.style.display = 'none';
        submitBtn.style.display = 'none';
        
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
                <a href="https://wa.me/201025844231" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-whatsapp"></i> اضغط للدعم الفني
                </a>
            </div>
            <button onclick="closeOrderModal()" class="submit-btn" style="margin-top:1rem; background: linear-gradient(135deg, #00c6fb, #005bea);">
                <i class="fas fa-check"></i> موافق
            </button>
        `;
        modalContent.appendChild(successDiv);
        
        const closeBtn = successDiv.querySelector('button');
        if (closeBtn) {
            closeBtn.onclick = () => closeOrderModal();
        }
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
    setTimeout(() => toast.style.display = 'none', 3000);
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
        console.error('Error:', error);
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
        document.getElementById('phoneError').textContent = '⚠️ رقم غير صالح! يجب أن يكون 11 رقم ويبدأ بـ 010/011/012/015';
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
        const pricePer1000 = currentService.pricePer1000;
        const totalPrice = (quantity / 1000) * pricePer1000;
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
        showToast("❌ حدث خطأ في الإرسال، حاول مرة أخرى", true);
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
                <div class="selected-service-info">
                    <strong>الخدمة المختارة:</strong> ${service.name}
                </div>
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
                            <p style="font-size:0.7rem;">الحد الأدنى 1000 - كل 1000 = ${pricePer1000} جنيه</p>
                            <div class="quantity-input">
                                <button type="button" class="qty-btn" id="decreaseQty">-</button>
                                <input type="number" id="quantity" value="1000" min="1000" step="1000">
                                <button type="button" class="qty-btn" id="increaseQty">+</button>
                            </div>
                            <div class="total-price">
                                السعر الإجمالي: <span id="totalPrice">${pricePer1000}</span> جنيه
                            </div>
                            <div class="form-group">
                                <input type="url" id="accountLink" placeholder="${linkPlaceholder}">
                                <small class="link-example">${linkExample}</small>
                                <div class="error-message" id="linkError"></div>
                            </div>
                        </div>
                    ` : `
                        <div class="price-calculator">
                            <div class="total-price">
                                السعر: ${service.price} جنيه
                            </div>
                        </div>
                        <input type="hidden" id="quantity" value="0">
                    `}
                    <div class="form-group">
                        <textarea id="orderDetails" rows="2" placeholder="📝 تفاصيل إضافية (اختياري)"></textarea>
                    </div>
                    <button type="submit" class="submit-btn" id="submitOrderBtn">
                        <i class="fas fa-paper-plane"></i> تأكيد الطلب
                    </button>
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
            const total = (val / 1000) * pricePer1000;
            totalSpan.textContent = total;
        }
        
        decreaseBtn.onclick = () => {
            let val = parseInt(quantityInput.value) || 1000;
            if (val > 1000) quantityInput.value = val - 1000;
            updateTotal();
        };
        
        increaseBtn.onclick = () => {
            let val = parseInt(quantityInput.value) || 1000;
            quantityInput.value = val + 1000;
            updateTotal();
        };
        
        quantityInput.oninput = updateTotal;
        updateTotal();
    }
    
    const orderName = document.getElementById('orderName');
    const orderPhone = document.getElementById('orderPhone');
    const accountLinkInput = document.getElementById('accountLink');
    
    if (orderName) {
        orderName.addEventListener('input', () => {
            const valid = orderName.value.trim().length >= 3;
            if (valid) {
                orderName.classList.add('input-success');
                orderName.classList.remove('input-error');
                document.getElementById('nameError').textContent = '';
            } else {
                orderName.classList.remove('input-success');
                orderName.classList.add('input-error');
            }
        });
    }
    
    if (orderPhone) {
        orderPhone.addEventListener('input', () => {
            const valid = validateEgyptianPhone(orderPhone.value);
            if (valid) {
                orderPhone.classList.add('input-success');
                orderPhone.classList.remove('input-error');
                document.getElementById('phoneError').textContent = '';
            } else {
                orderPhone.classList.remove('input-success');
                orderPhone.classList.add('input-error');
            }
        });
    }
    
    if (accountLinkInput) {
        accountLinkInput.addEventListener('input', () => {
            const link = accountLinkInput.value.trim();
            const valid = link && (link.startsWith('http://') || link.startsWith('https://'));
            if (valid) {
                accountLinkInput.classList.add('input-success');
                accountLinkInput.classList.remove('input-error');
                document.getElementById('linkError').textContent = '';
            } else {
                accountLinkInput.classList.remove('input-success');
                accountLinkInput.classList.add('input-error');
            }
        });
    }
}

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    let services = currentFilter === "all" ? [...socialServices, ...subscriptionServices] : 
                   currentFilter === "social" ? socialServices : subscriptionServices;
    
    grid.innerHTML = services.map((s, i) => {
        const isSpecial = s.price === "حسب الاختيار";
        const delay = i * 50;
        return `
            <div class="service-card" data-aos="fade-up" data-aos-duration="600" data-aos-delay="${delay}" onclick="openOrderModal({
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
                <div class="service-description"><i class="fas fa-star" style="color:#ffd966;font-size:.6rem"></i> ${s.description}</div>
                <div class="price-wrapper">
                    <div class="price-card">
                        <span class="price-currency">🇪🇬</span>
                        <span class="price-amount">${s.price}</span>
                        <span class="price-unit">${isSpecial ? '' : 'جنيه'}</span>
                    </div>
                    ${!isSpecial ? '<div class="price-badge">أفضل سعر</div>' : ''}
                </div>
                <button class="order-card-btn" onclick="event.stopPropagation(); openOrderModal({
                    name: '${s.name.replace(/'/g, "\\'")}',
                    price: '${s.price}',
                    icon: '${s.icon}',
                    description: '${s.description.replace(/'/g, "\\'")}',
                    needsQuantity: ${s.needsQuantity || false},
                    pricePer1000: ${s.pricePer1000 || 0},
                    platform: '${s.platform || ""}'
                })">
                    <i class="fas fa-envelope"></i> اطلب الآن
                </button>
            </div>
        `;
    }).join('');
    
    if (typeof AOS !== 'undefined') AOS.refresh();
}

function initializeSite() {
    renderServices();
    
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
        disable: false
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderServices();
        });
    });
    
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
            
            if (!name || !phone || !msg) {
                showToast("❌ الرجاء ملء جميع الحقول", true);
                return;
            }
            
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
            
            if (success) {
                showToast("✓ تم إرسال استفسارك بنجاح!");
                inquiryForm.reset();
                const tempService = { name: "استفسار" };
                showSuccessMessage("استفسار");
            } else {
                showToast("❌ حدث خطأ", true);
            }
            
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

startBtn.addEventListener('click', () => {
    quranAudio = new Audio('https://server6.mp3quran.net/wdee3/040.mp3');
    quranAudio.loop = true;
    quranAudio.volume = 0.25;
    quranAudio.play().catch(e => console.log('تشغيل الصوت:', e));
    
    mainContent.innerHTML = createMainContent();
    mainContent.style.display = 'block';
    splashScreen.classList.add('hide');
    whatsappFloat.style.display = 'block';
    
    setTimeout(initializeSite, 50);
});

window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;
