// Smart Shopping Assistant - Core Application Logic

// Local Storage Helpers
function load(key, defaultVal) {
    try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : defaultVal;
    } catch (e) {
        console.error('Error loading key ' + key, e);
        return defaultVal;
    }
}

function save(key, val) {
    try {
        localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
        console.error('Error saving key ' + key, e);
    }
}

// Application State
let cart = load('cart', []);
let wish = load('wish', []);
let list = load('list', [
    { t: 'Basmati Rice (5kg)', d: 0 },
    { t: 'Cold Pressed Sunflower Oil', d: 1 },
    { t: 'Cotton T-Shirt', d: 0 }
]);
let currentTab = 'More';

// Ensure state arrays are valid arrays
if (!Array.isArray(cart)) cart = [];
if (!Array.isArray(wish)) wish = [];
if (!Array.isArray(list)) list = [];
cart = cart.map(Number);
wish = wish.map(Number);

// Helper: Format price in Indian Rupee format
function rs(amount) {
    return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

// Helper: Get lowest/best price of a product
function best(product) {
    if (!product || !product.prices) return 0;
    const values = Object.values(product.prices);
    return values.length ? Math.min(...values) : 0;
}

// Helper: Get product by ID
function getProduct(id) {
    if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return null;
    return PRODUCTS.find(p => Number(p.id) === Number(id)) || null;
}

// Category Matching helper: Handles naming variations like 'Sports' & 'Sports & Fitness'
function isCategoryMatch(productCat, targetTab) {
    if (!targetTab || targetTab === 'More' || targetTab === 'All' || targetTab === 'All Categories') return true;
    if (!productCat) return false;
    if (productCat === targetTab) return true;

    const clean = s => (s || '').toLowerCase().replace(/&amp;/g, '&').replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
    const p = clean(productCat);
    const t = clean(targetTab);

    if (p === t) return true;
    return (p.includes('sport') && t.includes('sport')) ||
        (p.includes('cloth') && t.includes('cloth')) ||
        (p.includes('book') && t.includes('book')) ||
        (p.includes('beauty') && t.includes('beauty')) ||
        (p.includes('kitchen') && t.includes('kitchen')) ||
        (p.includes('watch') && t.includes('watch')) ||
        (p.includes('foot') && t.includes('foot')) ||
        (p.includes('electr') && t.includes('electr')) ||
        (p.includes('groc') && t.includes('groc'));
}

// Filter products by tab and optional search query
function filterProducts(tab, query = '') {
    if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return [];
    let filtered = PRODUCTS;

    if (tab && tab !== 'More' && tab !== 'All' && tab !== 'All Categories') {
        filtered = filtered.filter(p => isCategoryMatch(p.cat, tab));
    }

    if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter(p =>
            (p.name && p.name.toLowerCase().includes(q)) ||
            (p.cat && p.cat.toLowerCase().includes(q))
        );
    }
    return filtered;
}

// Render Tabs
function renderTabs() {
    const tabsContainer = document.getElementById('tabs');
    if (!tabsContainer || typeof TABS === 'undefined' || !Array.isArray(TABS)) return;

    tabsContainer.innerHTML = TABS.map(tab => {
        const isActive = (tab === currentTab) || (tab === 'More' && currentTab === 'More');
        return `<button class="tab ${isActive ? 'active' : ''}" onclick="setTab('${tab}')">${tab}</button>`;
    }).join('');
}

// Set Active Tab
function setTab(tab) {
    currentTab = tab;
    const searchInput = document.getElementById('q');
    const query = searchInput ? searchInput.value.trim() : '';

    renderTabs();
    renderProducts(filterProducts(currentTab, query));

    // Update active highlight in sidebar category links
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        const onclickAttr = link.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${tab}'`) || (tab === 'Sports & Fitness' && onclickAttr.includes('Sports'))) {
            link.style.fontWeight = '600';
            link.style.color = 'var(--blue)';
        } else {
            link.style.fontWeight = 'normal';
            link.style.color = '';
        }
    });
}

// Render Product Cards
function renderProducts(items) {
    const container = document.getElementById('products');
    if (!container) return;

    const listToRender = items !== undefined ? items : filterProducts(currentTab);

    if (!listToRender || listToRender.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 48px 20px; text-align: center; color: var(--muted); background: #fff; border-radius: 12px; border: 1px dashed var(--border)">
                <div style="font-size: 40px; margin-bottom: 8px">🔍</div>
                <b style="font-size: 15px; color: var(--navy)">No products found</b>
                <p style="font-size: 13px; margin-top: 6px">Try another category tab or clear your search query.</p>
                <button onclick="setTab('More');if(document.getElementById('q'))document.getElementById('q').value='';" 
                        style="margin-top: 14px; background: var(--blue); color: #fff; padding: 8px 18px; border-radius: 6px; font-size: 12px">
                    View All Products
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = listToRender.map(p => {
        const isWished = wish.includes(Number(p.id));
        const lowestPrice = best(p);

        // Find store with lowest price
        let bestStore = '';
        if (p.prices) {
            const entries = Object.entries(p.prices);
            if (entries.length > 0) {
                const sorted = entries.slice().sort((a, b) => a[1] - b[1]);
                bestStore = sorted[0][0];
            }
        }

        const fallbackIcon = p.icon || '🛍️';
        const imageHtml = p.image
            ? `<img src="${p.image}" alt="${p.name}" loading="lazy" style="width:100%;height:110px;object-fit:cover;border-radius:8px;display:block" onerror="this.onerror=null;this.parentElement.innerHTML='<span style=\\'font-size:52px\\'>${fallbackIcon}</span>';">`
            : `<span>${fallbackIcon}</span>`;

        return `
            <div class="prod" data-id="${p.id}">
                <button class="heart" onclick="toggleWish(${p.id})" title="${isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}" aria-label="Wishlist">
                    ${isWished ? '❤️' : '♡'}
                </button>
                <div class="img">
                    ${imageHtml}
                </div>
                <div class="name" title="${p.name}">${p.name}</div>
                <div class="price">
                    ${rs(lowestPrice)} <small style="font-size:11px;color:var(--muted);font-weight:normal">on ${bestStore || 'Store'}</small>
                </div>
                <div class="cmp">
                    ${Object.entries(p.prices || {}).slice(0, 4).map(([store, price]) => `
                        <div>${store}: <b>${rs(price)}</b></div>
                    `).join('')}
                </div>
                <div style="display:flex;gap:6px">
                    <button class="add" onclick="addToCart(${p.id})" style="flex:1">🛒 Add</button>
                    <button onclick="renderCmp(${p.id});document.getElementById('panelCmp').scrollIntoView({behavior:'smooth'})" 
                            title="Compare Prices" 
                            style="padding:8px 10px;background:#eef2f8;border-radius:6px;font-size:12px;color:var(--navy);cursor:pointer">
                        ⚖️
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Add to Cart
function addToCart(id) {
    const numId = Number(id);
    const prod = getProduct(numId);
    if (!prod) return;

    cart.push(numId);
    save('cart', cart);
    updateCounters();
    updateBudget();

    const modal = document.getElementById('viewModal');
    if (modal && modal.classList.contains('open')) {
        const title = document.getElementById('viewTitle');
        if (title && title.textContent.includes('Cart')) showView('cart');
        else if (title && title.textContent.includes('Wishlist')) showView('wishlist');
    }
}

// Remove from Cart
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        save('cart', cart);
        updateCounters();
        updateBudget();

        const modal = document.getElementById('viewModal');
        if (modal && modal.classList.contains('open')) {
            const title = document.getElementById('viewTitle');
            if (title && title.textContent.includes('Cart')) showView('cart');
        }
    }
}

// Toggle Wishlist
function toggleWish(id) {
    const numId = Number(id);
    const idx = wish.indexOf(numId);
    if (idx > -1) {
        wish.splice(idx, 1);
    } else {
        wish.push(numId);
    }
    save('wish', wish);
    updateCounters();

    // Update heart on active card
    const heartBtn = document.querySelector(`.prod[data-id="${numId}"] .heart`);
    if (heartBtn) {
        heartBtn.textContent = wish.includes(numId) ? '❤️' : '♡';
    }

    const modal = document.getElementById('viewModal');
    if (modal && modal.classList.contains('open')) {
        const title = document.getElementById('viewTitle');
        if (title && title.textContent.includes('Wishlist')) {
            showView('wishlist');
        }
    }
}

// Update Badges & Counters
function updateCounters() {
    const wishCountEl = document.getElementById('wishCount');
    const cartCountEl = document.getElementById('cartCount');
    if (wishCountEl) wishCountEl.textContent = wish.length;
    if (cartCountEl) cartCountEl.textContent = cart.length;
}

// Update Budget Tracker
function updateBudget() {
    const totalEl = document.getElementById('total');
    const spentEl = document.getElementById('spent');
    const barFill = document.getElementById('barFill');
    const remainEl = document.getElementById('remain');
    const warningEl = document.getElementById('budgetWarning');

    const totalBudget = 50000;
    const spent = cart.reduce((sum, id) => {
        const p = getProduct(id);
        return sum + (p ? best(p) : 0);
    }, 0);
    const remaining = Math.max(0, totalBudget - spent);
    const pct = Math.min(100, Math.round((spent / totalBudget) * 100));

    if (totalEl) totalEl.textContent = rs(totalBudget);
    if (spentEl) spentEl.textContent = rs(spent);
    if (remainEl) remainEl.textContent = rs(remaining);

    if (barFill) {
        barFill.style.width = pct + '%';
        if (spent > totalBudget) {
            barFill.style.background = '#e11d48';
        } else if (pct >= 80) {
            barFill.style.background = '#f59e0b';
        } else {
            barFill.style.background = 'var(--green)';
        }
    }

    if (warningEl) {
        if (spent > totalBudget) {
            warningEl.style.color = '#e11d48';
            warningEl.textContent = `⚠️ Budget exceeded by ${rs(spent - totalBudget)}!`;
        } else if (pct >= 80) {
            warningEl.style.color = '#d97706';
            warningEl.textContent = `⚠️ Warning: You have used ${pct}% of your budget.`;
        } else {
            warningEl.style.color = 'var(--green)';
            warningEl.textContent = '✓ Within budget.';
        }
    }
}

// Shopping List Rendering and Controls
function renderList() {
    const el = document.getElementById('list');
    if (!el) return;

    el.innerHTML = list.length ? list.map((item, index) => `
        <li class="${item.d ? 'done' : ''}">
            <label style="cursor:pointer">
                <input type="checkbox" ${item.d ? 'checked' : ''} onchange="tick(${index})">
                <span>${item.t}</span>
            </label>
            <button onclick="removeItem(${index})" style="background:none;color:var(--muted);float:right;font-size:12px;cursor:pointer;padding:2px 6px" title="Delete">✕</button>
        </li>
    `).join('') : '<li style="color:var(--muted);font-size:12px">Your list is empty. Add items below!</li>';
}

function addItem() {
    const input = document.getElementById('newItem');
    if (input && input.value.trim()) {
        list.push({ t: input.value.trim(), d: 0 });
        save('list', list);
        input.value = '';
        renderList();
    }
}

function tick(index) {
    if (list[index]) {
        list[index].d = list[index].d ? 0 : 1;
        save('list', list);
        renderList();
    }
}

function removeItem(index) {
    if (list[index] !== undefined) {
        list.splice(index, 1);
        save('list', list);
        renderList();
    }
}

// Price Comparison Panel Renderer
function renderCmp(id) {
    const p = getProduct(id) || (typeof PRODUCTS !== 'undefined' && PRODUCTS[0]);
    const el = document.getElementById('cmp');
    if (!el || !p) return;

    const entries = Object.entries(p.prices || {}).sort((a, b) => a[1] - b[1]);
    const lowest = entries.length ? entries[0] : ['N/A', 0];

    el.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="font-size:32px">${p.icon || '🛍️'}</div>
            <div>
                <b style="font-size:13px;display:block;line-height:1.2">${p.name}</b>
                <span style="font-size:11px;color:var(--muted)">${p.cat}</span>
            </div>
        </div>
        <div class="cmp" style="margin-bottom:10px">
            ${entries.map(([store, price]) => `
                <div>${store}</div>
                <div style="text-align:right"><b>${rs(price)}</b></div>
            `).join('')}
        </div>
        <div>
            <span class="low">Best Price: ${lowest[0]} (${rs(lowest[1])})</span>
        </div>
        <div style="margin-top:10px">
            <button class="add" onclick="addToCart(${p.id})">🛒 Add Best Deal to Cart</button>
        </div>
    `;
}

// Modal View Controls
function closeView() {
    const modal = document.getElementById('viewModal');
    if (modal) modal.classList.remove('open');
}

function showView(view) {
    const modal = document.getElementById('viewModal');
    const title = document.getElementById('viewTitle');
    const content = document.getElementById('viewContent');

    if (!modal || !title || !content) return;

    modal.classList.add('open');

    if (view === 'wishlist') {
        title.textContent = '♡ My Wishlist';

        const saved = (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []).filter(p => wish.includes(Number(p.id)));

        content.innerHTML = saved.length
            ? saved.map(p => `
          <div class="modal-item">
            <span>${p.icon || '🛍️'} <b>${p.name}</b><br>${rs(best(p))}</span>
            <span>
              <button onclick="addToCart(${p.id});showView('wishlist')">Add to Cart</button>
              <button onclick="toggleWish(${p.id});showView('wishlist')">Remove</button>
            </span>
          </div>
        `).join('')
            : '<p>Your wishlist is empty. Tap the ♡ on any product to save it.</p>';

    } else if (view === 'cart') {
        title.textContent = '🛒 My Cart';

        const entries = cart.map((id, index) => ({
            product: getProduct(id),
            index
        })).filter(entry => entry.product);

        content.innerHTML = entries.length
            ? entries.map(({ product, index }) => `
          <div class="modal-item">
            <span>${product.icon || '🛍️'} <b>${product.name}</b><br>${rs(best(product))}</span>
            <button onclick="removeFromCart(${index});showView('cart')">Remove</button>
          </div>
        `).join('') +
            `<h3 style="margin-top:16px;text-align:right;color:var(--navy)">Total: ${rs(entries.reduce((sum, entry) => sum + best(entry.product), 0))}</h3>`
            : '<p>Your cart is empty. Add products to see them here.</p>';

    } else if (view === 'list') {
        title.textContent = '📋 My Shopping List';

        content.innerHTML = list.length
            ? list.map((item, index) => `
          <div class="modal-item">
            <label style="cursor:pointer">
              <input type="checkbox" ${item.d ? 'checked' : ''}
                onchange="tick(${index});showView('list')">
              <span style="${item.d ? 'text-decoration:line-through;color:var(--muted)' : ''}">${item.t}</span>
            </label>
            <button onclick="removeItem(${index});showView('list')">Remove</button>
          </div>
        `).join('')
            : '<p>Your shopping list is empty.</p>';

        content.innerHTML += `
      <div style="margin-top:16px;display:flex;gap:8px">
        <input id="modalNewItem" placeholder="Enter an item name..."
          style="padding:9px;flex:1;max-width:320px;border:1px solid var(--border);border-radius:6px">
        <button class="small-btn" style="float:none;margin:0" onclick="
          const el=document.getElementById('modalNewItem');
          if(el && el.value.trim()){
            list.push({t:el.value.trim(),d:0});
            save('list',list);
            renderList();
            showView('list');
          }">+ Add Item</button>
      </div>`;

    } else if (view === 'comparison') {
        title.textContent = '⚖️ Price Comparison';

        content.innerHTML = (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []).map(p => `
      <div class="modal-item">
        <span>${p.icon || '🛍️'} <b>${p.name}</b><br>
          ${Object.entries(p.prices || {}).map(([store, price]) =>
            `${store}: ${rs(price)}`).join(' · ')}
          <br><b>Lowest: ${rs(best(p))}</b>
        </span>
        <button onclick="renderCmp(${p.id});closeView();document.getElementById('panelCmp').scrollIntoView({behavior:'smooth'})">
          Compare
        </button>
      </div>
    `).join('') || '<p>No products available yet.</p>';
    }
}

// App Initialization
function initApp() {
    // Dynamic greeting based on time of day
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        const hour = new Date().getHours();
        if (hour < 12) greetingEl.textContent = 'Good Morning!';
        else if (hour < 18) greetingEl.textContent = 'Good Afternoon!';
        else greetingEl.textContent = 'Good Evening!';
    }

    // Search input listener
    const searchInput = document.getElementById('q');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            renderProducts(filterProducts(currentTab, query));
        });
    }

    // Enter key support for shopping list input
    const newItemInput = document.getElementById('newItem');
    if (newItemInput) {
        newItemInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addItem();
            }
        });
    }

    // Initial renders
    renderTabs();
    setTab('More');
    renderList();
    if (typeof PRODUCTS !== 'undefined' && PRODUCTS.length > 0) {
        renderCmp(PRODUCTS[0].id);
    }
    updateCounters();
    updateBudget();
}

// Execute when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}