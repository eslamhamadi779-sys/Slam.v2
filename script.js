/* ============================================================
   SLAM 💕 - منصة الحب والصداقة والزواج
   script.js - ESO Company © 2026
   ============================================================ */

'use strict';

/* ============================================================
   STATE - حالة التطبيق
   ============================================================ */
const STATE = {
  currentUser: null,
  currentSection: 'feed',
  posts: [],
  stories: [],
  chats: [],
  groups: [],
  users: [],
  currentChat: null,
  randomIndex: 0,
  notifications: [],
  isLoggedIn: false,
};

/* ============================================================
   MOCK DATA - بيانات تجريبية
   ============================================================ */
const MOCK_USERS = [
  { id: 1, name: 'سارة الجميل',    bio: '💕 أحب الموسيقى والسفر',           img: 'https://i.pravatar.cc/80?img=1',  age: 24, city: 'القاهرة',  status: 'online',  karma: 98, followers: 340 },
  { id: 2, name: 'نور الهدى',      bio: '🌸 باحثة عن النصف الثاني',         img: 'https://i.pravatar.cc/80?img=5',  age: 27, city: 'الرياض',   status: 'online',  karma: 95, followers: 210 },
  { id: 3, name: 'ليلى عبدالله',   bio: '☕ قهوة وكتب وهدوء',               img: 'https://i.pravatar.cc/80?img=9',  age: 23, city: 'دبي',      status: 'offline', karma: 92, followers: 520 },
  { id: 4, name: 'مريم حسن',       bio: '🎨 رسامة وعاشقة للفن',             img: 'https://i.pravatar.cc/80?img=20', age: 26, city: 'بيروت',    status: 'online',  karma: 97, followers: 180 },
  { id: 5, name: 'دينا محمود',     bio: '🌺 طبيبة وأحب المغامرات',          img: 'https://i.pravatar.cc/80?img=25', age: 29, city: 'عمّان',    status: 'offline', karma: 99, followers: 670 },
  { id: 6, name: 'أحمد السيد',     bio: '🎸 موسيقار وعاشق الحياة',          img: 'https://i.pravatar.cc/80?img=33', age: 28, city: 'الإسكندرية', status: 'online', karma: 93, followers: 290 },
  { id: 7, name: 'خالد العمري',    bio: '📚 مهندس ومحب للقراءة',            img: 'https://i.pravatar.cc/80?img=52', age: 31, city: 'جدة',      status: 'online',  karma: 96, followers: 410 },
  { id: 8, name: 'يوسف الناصر',   bio: '🏃 رياضي وعاشق للطبيعة',           img: 'https://i.pravatar.cc/80?img=60', age: 25, city: 'الكويت',   status: 'offline', karma: 94, followers: 150 },
];

const MOCK_POSTS = [
  {
    id: 101, userId: 1,
    text: '💕 كل يوم جديد هو فرصة جديدة للحب والسعادة... صباح الورد على كل قلب يبحث عن نصفه 🌹 #SLAM #الحب',
    likes: 128, comments: 34, shares: 12, views: 580,
    time: 'منذ ساعتين', liked: false, postAgeHours: 2, hasTrendingHashtag: true,
  },
  {
    id: 102, userId: 2,
    text: '🌸 "الحب ليس فقط أن تجد شخصاً يكملك، بل أن تجد شخصاً يفهم صمتك قبل كلامك." 💫 #قصة_حب #SLAM',
    likes: 96, comments: 21, shares: 8, views: 390,
    time: 'منذ 4 ساعات', liked: false, postAgeHours: 4, hasTrendingHashtag: true,
  },
  {
    id: 103, userId: 4,
    text: '🎨 أحياناً الحياة لوحة فنية، وأنت تحتاج فقط لشخص يرى معك الألوان التي لا يراها الآخرون 🖌️ #فن #SLAM',
    likes: 74, comments: 15, shares: 5, views: 260,
    time: 'منذ 6 ساعات', liked: false, postAgeHours: 6, hasTrendingHashtag: false,
  },
  {
    id: 104, userId: 6,
    text: '🎸 الموسيقى والحب.. كلاهما يتكلم لغة القلب بدون كلمات 🎵❤️ #موسيقى #الحب #SLAM',
    likes: 211, comments: 47, shares: 29, views: 870,
    time: 'منذ 8 ساعات', liked: false, postAgeHours: 8, hasTrendingHashtag: true,
  },
  {
    id: 105, userId: 3,
    text: '☕ أجمل الأوقات هي تلك التي تقضيها مع شخص يشعرك بالراحة والأمان دون أن تقول كلمة واحدة 💙 #هدوء #SLAM',
    likes: 153, comments: 28, shares: 16, views: 640,
    time: 'منذ يوم', liked: false, postAgeHours: 24, hasTrendingHashtag: false,
  },
];

const MOCK_STORIES = [
  { id: 1, userId: 1, emoji: '💕' },
  { id: 2, userId: 2, emoji: '🌸' },
  { id: 3, userId: 4, emoji: '🎨' },
  { id: 4, userId: 6, emoji: '🎸' },
  { id: 5, userId: 3, emoji: '☕' },
  { id: 6, userId: 5, emoji: '🌺' },
];

const MOCK_GROUPS = [
  { id: 1, name: 'عشاق الموسيقى',   desc: 'للمحبين الذين يعيشون على الألحان الرومانسية 🎵', emoji: '🎵', members: 1240 },
  { id: 2, name: 'رحلة البحث',      desc: 'مجتمع للباحثين عن شريك الحياة الجاد 💍',          emoji: '💍', members: 876  },
  { id: 3, name: 'قلوب مسافرة',     desc: 'للعشاق الذين يحبون السفر والاستكشاف معاً ✈️',    emoji: '✈️', members: 2100 },
  { id: 4, name: 'كتّاب القلب',     desc: 'مشاركة الكتابة الرومانسية والشعر العاطفي 📖',     emoji: '📖', members: 543  },
  { id: 5, name: 'لقاء الأرواح',    desc: 'مجموعة للتعارف الجاد والصداقة الصادقة 🤝',        emoji: '🤝', members: 3200 },
  { id: 6, name: 'طبخ بالحب',       desc: 'تبادل الوصفات والعشاء الرومانسي 🍽️',              emoji: '🍽️', members: 780  },
];

const MOCK_CHATS = [
  { id: 1, userId: 1, lastMsg: '💕 مرحباً يا قمر، كيف حالك اليوم؟',            time: 'الآن',       unread: 2 },
  { id: 2, userId: 2, lastMsg: '🌸 شكراً على الإعجاب، أنت ذوق!',               time: 'منذ 5 د',    unread: 0 },
  { id: 3, userId: 4, lastMsg: '🎨 أتمنى نلتقي يوماً ونشارك الإبداع معاً ✨',   time: 'منذ ساعة',   unread: 1 },
  { id: 4, userId: 6, lastMsg: '🎸 هل تحب الموسيقى الهادئة أم الصاخبة؟',       time: 'أمس',        unread: 0 },
];

/* ============================================================
   ALGORITHM - من ملف algorithm.js المُدمج
   ============================================================ */
function calculatePostScore(post) {
  let score = 0;
  score += (post.likes   || 0) * 3;
  score += (post.comments|| 0) * 8;
  score += (post.shares  || 0) * 15;
  score += Math.min(post.views || 0, 500) * 0.2;
  if (post.postAgeHours < 24)       score += 40;
  if ((post.userAgeDays || 999) < 30) score += 60;
  if (post.isSpam)                  score -= 500;
  if (post.fakeActivity)            score -= 100;
  if (post.hasTrendingHashtag)      score += 30;
  score += newCreatorBoost(post);
  return score;
}

function newCreatorBoost(post) {
  return (post.followers || 999) < 1000 ? 80 : 0;
}

function detectSpam(user) {
  let spamScore = 0;
  if (user.postsPerHour      > 20) spamScore += 50;
  if (user.sameCommentRepeated)    spamScore += 50;
  if (user.fakeLikesPattern)       spamScore += 100;
  return spamScore;
}

function sortPostsByScore(posts) {
  return [...posts].sort((a, b) => calculatePostScore(b) - calculatePostScore(a));
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  STATE.posts  = [...MOCK_POSTS];
  STATE.users  = [...MOCK_USERS];
  STATE.groups = [...MOCK_GROUPS];
  STATE.chats  = [...MOCK_CHATS];
  STATE.stories= [...MOCK_STORIES];

  renderStories();
  renderPosts();
  renderGroups();
  renderDiscover();
  renderChats();
  bindEvents();
  initSearch();
});

/* ============================================================
   NAVIGATION
   ============================================================ */
function showSection(name) {
  // إخفاء الكل
  document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));

  const section = document.getElementById(`${name}-section`);
  if (section) section.classList.add('active');

  // تفعيل زر القائمة
  document.querySelectorAll('.menu-item').forEach(btn => {
    if (btn.getAttribute('onclick')?.includes(`'${name}'`)) btn.classList.add('active');
  });

  STATE.currentSection = name;

  // تحديث المحتوى عند الانتقال
  if (name === 'profile') renderProfilePosts();
  if (name === 'messages') renderChats();
  if (name === 'discover') renderDiscover();
}

/* ============================================================
   STORIES
   ============================================================ */
function renderStories() {
  const container = document.getElementById('stories-container');
  if (!container) return;

  const sorted = sortPostsByScore(STATE.stories.map(s => {
    const user = getUserById(s.userId);
    return { ...s, likes: 10, comments: 2, shares: 1, views: 50, postAgeHours: 1, followers: user?.followers || 999, userAgeDays: 5 };
  }));

  container.innerHTML = sorted.map(s => {
    const user = getUserById(s.userId);
    if (!user) return '';
    return `
      <div class="story-item" onclick="viewStory(${s.id})" title="${user.name}">
        <div class="story-avatar">
          <img src="${user.img}" alt="${user.name}" loading="lazy">
        </div>
        <div class="story-name">${user.name.split(' ')[0]}</div>
      </div>`;
  }).join('');

  // زر إضافة قصة
  container.insertAdjacentHTML('afterbegin', `
    <div class="story-item" onclick="addStory()" title="أضف قصتك">
      <div class="story-avatar" style="background:linear-gradient(135deg,#E91E63,#9C27B0);display:flex;align-items:center;justify-content:center;border:none;padding:0;">
        <span style="font-size:2rem;line-height:1;border-radius:50%;width:68px;height:68px;display:flex;align-items:center;justify-content:center;background:#fff;border:2px solid #E91E63;margin:0 auto;">➕</span>
      </div>
      <div class="story-name">قصتك</div>
    </div>`);
}

function viewStory(id) {
  const story = STATE.stories.find(s => s.id === id);
  const user  = story ? getUserById(story.userId) : null;
  if (!user) return;
  showToast(`📖 قصة ${user.name} ${story.emoji || '💕'}`);
}

function addStory() {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  showToast('📸 ميزة إضافة القصة قريباً!');
}

/* ============================================================
   POSTS
   ============================================================ */
function renderPosts() {
  const container = document.getElementById('posts-container');
  if (!container) return;

  const sorted = sortPostsByScore(STATE.posts);
  container.innerHTML = sorted.map(post => buildPostCard(post)).join('');
}

function buildPostCard(post) {
  const user = getUserById(post.userId);
  if (!user) return '';
  return `
    <div class="post-card" id="post-${post.id}">
      <div class="post-card-header">
        <img src="${user.img}" alt="${user.name}" loading="lazy">
        <div class="post-card-header-info">
          <h4>${user.name}</h4>
          <span>${post.time} · ${user.city}</span>
        </div>
        <button onclick="moreOptions(${post.id})" style="margin-right:auto;background:none;color:var(--text-muted);font-size:1.1rem;padding:4px 8px;">⋯</button>
      </div>
      <div class="post-card-body">
        <p>${escapeHtml(post.text)}</p>
        ${post.img   ? `<img src="${post.img}" alt="صورة المنشور" loading="lazy">` : ''}
        ${post.video ? `<video src="${post.video}" controls></video>` : ''}
      </div>
      <div class="post-card-actions">
        <button class="post-action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
          <i class="fas fa-heart"></i> ${post.likes}
        </button>
        <button class="post-action-btn" onclick="openComments(${post.id})">
          <i class="fas fa-comment"></i> ${post.comments}
        </button>
        <button class="post-action-btn" onclick="sharePost(${post.id})">
          <i class="fas fa-share"></i> ${post.shares}
        </button>
        <button class="post-action-btn" onclick="savePost(${post.id})">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>
    </div>`;
}

function toggleLike(postId) {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  const post = STATE.posts.find(p => p.id === postId);
  if (!post) return;
  post.liked  = !post.liked;
  post.likes += post.liked ? 1 : -1;
  // تحديث DOM بدون re-render كامل
  const card = document.getElementById(`post-${postId}`);
  if (card) {
    const btn = card.querySelector('.post-action-btn');
    btn.classList.toggle('liked', post.liked);
    btn.innerHTML = `<i class="fas fa-heart"></i> ${post.likes}`;
  }
}

function openComments(postId) {
  showToast('💬 ميزة التعليقات قريباً!');
}

function sharePost(postId) {
  const post = STATE.posts.find(p => p.id === postId);
  if (post) {
    post.shares++;
    showToast('🔗 تم مشاركة المنشور!');
    renderPosts();
  }
}

function savePost(postId) {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  showToast('🔖 تم حفظ المنشور في مفضلتك!');
}

function moreOptions(postId) {
  showToast('⋯ خيارات إضافية قريباً!');
}

/* ============================================================
   PUBLISH - نشر منشور جديد
   ============================================================ */
function bindEvents() {
  // زر النشر
  const publishBtn = document.getElementById('publish-btn');
  if (publishBtn) publishBtn.addEventListener('click', publishPost);

  // Enter في حقل الرسائل
  const msgInput = document.getElementById('message-input');
  if (msgInput) msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

  // زر إرسال الرسائل
  const sendBtn = document.getElementById('send-message-btn');
  if (sendBtn) sendBtn.addEventListener('click', sendMessage);

  // زر تسجيل الدخول
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) loginBtn.addEventListener('click', handleLogin);

  // رفع ملف
  const fileInput = document.getElementById('file-input');
  if (fileInput) fileInput.addEventListener('change', handleFileUpload);

  // إغلاق المودال بالخلفية
  const modal = document.getElementById('group-modal');
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

function publishPost() {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  const input = document.getElementById('post-input');
  const text  = input?.value?.trim();
  if (!text) { showToast('✏️ اكتب شيئاً أولاً!'); return; }

  const spamCheck = detectSpam({ postsPerHour: 1, sameCommentRepeated: false, fakeLikesPattern: false });
  if (spamCheck > 100) { showToast('⚠️ تم اكتشاف نشاط مريب، يرجى الانتظار.'); return; }

  const newPost = {
    id:                Date.now(),
    userId:            STATE.currentUser?.id || 1,
    text,
    likes:             0,
    comments:          0,
    shares:            0,
    views:             0,
    time:              'الآن',
    liked:             false,
    postAgeHours:      0,
    hasTrendingHashtag: text.includes('#'),
    followers:         STATE.currentUser?.followers || 50,
    userAgeDays:       1,
  };

  STATE.posts.unshift(newPost);
  input.value = '';
  renderPosts();
  showToast('🚀 تم نشر منشورك بنجاح! 💕');
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const input = document.getElementById('post-input');
  if (input) input.placeholder = `📎 تم إرفاق: ${file.name} - اكتب تعليقاً...`;
  showToast(`📎 تم إرفاق ${file.name}`);
}

function promptLinkInput() {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  const url = prompt('🔗 أدخل رابط الفيديو أو المنشور:');
  if (url && url.startsWith('http')) {
    const input = document.getElementById('post-input');
    if (input) input.value += `\n🔗 ${url}`;
    showToast('🔗 تم إضافة الرابط!');
  } else if (url) {
    showToast('❌ رابط غير صحيح، تأكد من البدء بـ http');
  }
}

/* ============================================================
   PROFILE
   ============================================================ */
function renderProfilePosts() {
  const container = document.getElementById('profile-posts-container');
  if (!container) return;
  if (!STATE.isLoggedIn) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-muted);">
        <i class="fas fa-lock" style="font-size:3rem;color:var(--pink-light);margin-bottom:12px;display:block;"></i>
        <p>سجّل دخولك لعرض منشوراتك 💕</p>
      </div>`;
    return;
  }
  const myPosts = STATE.posts.filter(p => p.userId === STATE.currentUser?.id);
  container.innerHTML = myPosts.length
    ? myPosts.map(p => buildPostCard(p)).join('')
    : `<div style="text-align:center;padding:40px;color:var(--text-muted);">
         <i class="fas fa-pen" style="font-size:2.5rem;color:var(--pink-light);margin-bottom:12px;display:block;"></i>
         <p>لا توجد منشورات بعد. شارك أول منشور! 💕</p>
       </div>`;
}

function showProfileTab(tab) {
  ['posts','friends','photos'].forEach(t => {
    const el = document.getElementById(`profile-${t}-container`);
    if (el) el.style.display = t === tab ? 'block' : 'none';
  });
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', ['posts','friends','photos'][i] === tab);
  });

  if (tab === 'friends') renderProfileFriends();
  if (tab === 'photos')  renderProfilePhotos();
}

function renderProfileFriends() {
  const container = document.getElementById('profile-friends-container');
  if (!container) return;
  container.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;padding:10px 0;">
      ${STATE.users.slice(0,6).map(u => `
        <div style="background:var(--card);border-radius:var(--radius-sm);border:2px solid var(--border);padding:16px;text-align:center;cursor:pointer;transition:transform .25s;" 
             onmouseenter="this.style.transform='translateY(-3px)'" 
             onmouseleave="this.style.transform=''" 
             onclick="openUserProfile(${u.id})">
          <img src="${u.img}" style="width:56px;height:56px;border-radius:50%;border:2px solid var(--pink);margin:0 auto 8px;" loading="lazy">
          <div style="font-size:.85rem;font-weight:700;color:var(--text);">${u.name.split(' ')[0]}</div>
          <div style="font-size:.72rem;color:var(--text-muted);">${u.city}</div>
        </div>`).join('')}
    </div>`;
}

function renderProfilePhotos() {
  const container = document.getElementById('profile-photos-container');
  if (!container) return;
  container.innerHTML = `
    <div style="text-align:center;padding:40px;color:var(--text-muted);">
      <i class="fas fa-images" style="font-size:3rem;color:var(--pink-light);margin-bottom:12px;display:block;"></i>
      <p>لا توجد صور مرفوعة بعد 📸</p>
    </div>`;
}

function editProfilePhoto() {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  showToast('📸 ميزة تغيير الصورة قريباً!');
}

function openUserProfile(userId) {
  const user = getUserById(userId);
  if (user) showToast(`👤 عرض صفحة ${user.name}`);
}

/* ============================================================
   MESSAGES
   ============================================================ */
function renderChats() {
  const container = document.getElementById('chats-list');
  if (!container) return;

  if (!STATE.isLoggedIn) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-muted);">
        <i class="fas fa-comments" style="font-size:3rem;color:var(--pink-light);margin-bottom:12px;display:block;"></i>
        <p>سجّل دخولك للوصول للرسائل 💕</p>
      </div>`;
    return;
  }

  container.innerHTML = STATE.chats.map(chat => {
    const user = getUserById(chat.userId);
    if (!user) return '';
    return `
      <div class="chat-item" onclick="openChat(${chat.id})">
        <img src="${user.img}" alt="${user.name}" loading="lazy">
        <div class="chat-item-info">
          <h4>${user.name}${chat.unread ? ` <span style="background:var(--pink);color:#fff;border-radius:50%;padding:1px 6px;font-size:.7rem;">${chat.unread}</span>` : ''}</h4>
          <p>${chat.lastMsg}</p>
        </div>
        <div class="chat-item-time">${chat.time}</div>
      </div>`;
  }).join('');
}

function openChat(chatId) {
  const chat = STATE.chats.find(c => c.id === chatId);
  if (!chat) return;
  const user = getUserById(chat.userId);
  if (!user) return;

  STATE.currentChat = chatId;
  chat.unread = 0;
  renderChats();

  document.getElementById('chat-window').style.display = 'block';
  document.getElementById('chat-avatar').src    = user.img;
  document.getElementById('chat-name').textContent  = user.name;
  document.getElementById('chat-status').textContent = user.status === 'online' ? '🟢 متصل الآن' : '⚫ غير متصل';

  const msgs = document.getElementById('messages-container');
  msgs.innerHTML = `
    <div class="message-bubble received">مرحباً! كيف حالك؟ 😊</div>
    <div class="message-bubble sent">الحمد لله بخير، وأنت؟ 💕</div>
    <div class="message-bubble received">${chat.lastMsg}</div>`;
  msgs.scrollTop = msgs.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('message-input');
  const text  = input?.value?.trim();
  if (!text || !STATE.currentChat) return;

  const msgs = document.getElementById('messages-container');
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble sent';
  bubble.textContent = text;
  msgs.appendChild(bubble);
  msgs.scrollTop = msgs.scrollHeight;
  input.value = '';

  // رد تلقائي بعد ثانيتين
  setTimeout(() => {
    const replies = [
      'شكراً على رسالتك 💕',
      'أنت رائع/ة! 🌸',
      'يسعدني التحدث معك 😊',
      'ما شاء الله عليك! ✨',
      'كلامك جميل جداً 🌹',
    ];
    const reply = document.createElement('div');
    reply.className = 'message-bubble received';
    reply.textContent = replies[Math.floor(Math.random() * replies.length)];
    msgs.appendChild(reply);
    msgs.scrollTop = msgs.scrollHeight;
  }, 2000);
}

function createNewChat() {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  showToast('💬 ميزة محادثة جديدة قريباً!');
}

/* ============================================================
   GROUPS
   ============================================================ */
function renderGroups() {
  const container = document.getElementById('groups-container');
  if (!container) return;
  container.innerHTML = STATE.groups.map(g => `
    <div class="group-card">
      <div class="group-card-cover">${g.emoji}</div>
      <div class="group-card-body">
        <h4>${g.name}</h4>
        <p>${g.desc}</p>
        <p style="font-size:.75rem;color:var(--pink);margin-bottom:10px;">👥 ${g.members.toLocaleString()} عضو</p>
        <button class="join-group-btn" onclick="joinGroup(${g.id})">
          <i class="fas fa-plus"></i> انضم للمجموعة
        </button>
      </div>
    </div>`).join('');
}

function joinGroup(groupId) {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  const group = STATE.groups.find(g => g.id === groupId);
  if (group) {
    group.members++;
    renderGroups();
    showToast(`✅ انضممت لمجموعة "${group.name}" بنجاح! 🎉`);
  }
}

function createGroup() {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  const modal = document.getElementById('group-modal');
  if (modal) modal.classList.add('open');
}

function saveGroup() {
  const name = document.getElementById('group-name')?.value?.trim();
  const desc = document.getElementById('group-desc')?.value?.trim();
  if (!name) { showToast('✏️ أدخل اسم المجموعة!'); return; }

  const emojis = ['💕','🌸','✨','🎵','💍','🌺','📖','🤝'];
  const newGroup = {
    id:      Date.now(),
    name,
    desc:    desc || 'مجموعة رومانسية جديدة 💕',
    emoji:   emojis[Math.floor(Math.random() * emojis.length)],
    members: 1,
  };
  STATE.groups.unshift(newGroup);
  renderGroups();
  closeModal();
  showToast(`🎉 تم إنشاء مجموعة "${name}" بنجاح!`);
}

function closeModal() {
  const modal = document.getElementById('group-modal');
  if (modal) modal.classList.remove('open');
}

/* ============================================================
   RANDOM MATCH
   ============================================================ */
function randomMatch() {
  showSection('random');
  startRandomMatch();
}

function startRandomMatch() {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  const result = document.getElementById('random-result');
  if (result) result.style.display = 'block';
  showRandomUser();
}

function showRandomUser() {
  const users  = STATE.users;
  const user   = users[STATE.randomIndex % users.length];
  STATE.randomIndex++;

  const img  = document.getElementById('random-user-img');
  const name = document.getElementById('random-user-name');
  const bio  = document.getElementById('random-user-bio');

  if (img)  img.src           = user.img;
  if (name) name.textContent  = `${user.name} · ${user.age} سنة`;
  if (bio)  bio.textContent   = `📍 ${user.city} · ${user.bio}`;
}

function sendLike() {
  showToast('💕 تم إرسال الإعجاب! سيتم إشعار الشخص.');
  nextRandom();
}

function startChatWithRandom() {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  const user = STATE.users[(STATE.randomIndex - 1) % STATE.users.length];
  showToast(`💬 بدأت محادثة مع ${user.name}!`);
  showSection('messages');
}

function nextRandom() {
  showRandomUser();
  showToast('🎲 شخص جديد!');
}

/* ============================================================
   DISCOVER
   ============================================================ */
function renderDiscover() {
  const container = document.getElementById('discover-container');
  if (!container) return;

  const sorted = [...STATE.users].sort((a, b) => b.karma - a.karma);
  container.innerHTML = sorted.map(user => `
    <div class="discover-card" onclick="openUserProfile(${user.id})">
      <img src="${user.img}" alt="${user.name}" loading="lazy">
      <h4>${user.name}</h4>
      <p>${user.bio}</p>
      <p style="font-size:.72rem;color:var(--text-muted);margin-bottom:10px;">📍 ${user.city} · ${user.age} سنة</p>
      <p style="font-size:.72rem;color:var(--green);margin-bottom:12px;">⭐ سمعة ${user.karma}%</p>
      <button class="add-friend-btn" onclick="event.stopPropagation();addFriend(${user.id})">
        <i class="fas fa-user-plus"></i> إضافة صديق
      </button>
    </div>`).join('');
}

function addFriend(userId) {
  if (!STATE.isLoggedIn) { promptLogin(); return; }
  const user = getUserById(userId);
  if (user) showToast(`💕 تم إرسال طلب صداقة إلى ${user.name}!`);
}

/* ============================================================
   SEARCH
   ============================================================ */
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  let debounceTimer;
  input.addEventListener('input', e => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => doSearch(e.target.value.trim()), 350);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { input.value = ''; renderPosts(); }
  });
}

function doSearch(query) {
  if (!query) { renderPosts(); return; }

  const q = query.toLowerCase();

  // بحث في المنشورات
  const filteredPosts = STATE.posts.filter(p =>
    p.text.toLowerCase().includes(q) ||
    getUserById(p.userId)?.name.toLowerCase().includes(q)
  );

  // بحث في المستخدمين
  const filteredUsers = STATE.users.filter(u =>
    u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.bio.toLowerCase().includes(q)
  );

  const container = document.getElementById('posts-container');
  if (!container) return;

  let html = '';

  if (filteredUsers.length) {
    html += `<div style="margin-bottom:16px;">
      <h3 style="font-size:.95rem;font-weight:700;color:var(--text);margin-bottom:10px;">👤 أشخاص (${filteredUsers.length})</h3>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        ${filteredUsers.map(u => `
          <div style="background:var(--card);border:2px solid var(--border);border-radius:var(--radius-sm);padding:12px;display:flex;align-items:center;gap:10px;cursor:pointer;min-width:200px;"
               onclick="openUserProfile(${u.id})">
            <img src="${u.img}" style="width:40px;height:40px;border-radius:50%;border:2px solid var(--pink);" loading="lazy">
            <div>
              <div style="font-size:.88rem;font-weight:700;">${u.name}</div>
              <div style="font-size:.75rem;color:var(--text-muted);">${u.city}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  }

  if (filteredPosts.length) {
    html += `<h3 style="font-size:.95rem;font-weight:700;color:var(--text);margin-bottom:10px;">📝 منشورات (${filteredPosts.length})</h3>`;
    html += filteredPosts.map(p => buildPostCard(p)).join('');
  }

  if (!html) {
    html = `<div style="text-align:center;padding:40px;color:var(--text-muted);">
      <i class="fas fa-search" style="font-size:3rem;color:var(--pink-light);margin-bottom:12px;display:block;"></i>
      <p>لا توجد نتائج لـ "${escapeHtml(query)}"</p>
    </div>`;
  }

  container.innerHTML = html;
  showSection('feed');
}

/* ============================================================
   LOGIN / AUTH
   ============================================================ */
function handleLogin() {
  if (STATE.isLoggedIn) {
    // تسجيل خروج
    STATE.isLoggedIn  = false;
    STATE.currentUser = null;
    updateUIAfterAuth();
    showToast('👋 تم تسجيل الخروج بنجاح!');
    return;
  }

  // محاكاة تسجيل الدخول (في الواقع هتكون Google OAuth)
  const demoUser = STATE.users[0];
  STATE.currentUser = demoUser;
  STATE.isLoggedIn  = true;
  updateUIAfterAuth();
  showToast(`💕 أهلاً وسهلاً ${demoUser.name}!`);
}

function updateUIAfterAuth() {
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.innerHTML = STATE.isLoggedIn
      ? `<i class="fas fa-sign-out-alt"></i> خروج`
      : `<i class="fab fa-google"></i> تسجيل / دخول`;
  }

  if (STATE.isLoggedIn && STATE.currentUser) {
    const u = STATE.currentUser;
    const nameEl     = document.getElementById('user-name');
    const bioEl      = document.getElementById('user-bio');
    const imgEl      = document.getElementById('user-img');
    const postAvatar = document.getElementById('post-avatar');
    const bigImg     = document.getElementById('big-profile-img');
    const fullName   = document.getElementById('profile-full-name');
    const statusEl   = document.getElementById('profile-status');
    const karmaEl    = document.getElementById('user-karma');

    if (nameEl)     nameEl.textContent  = u.name;
    if (bioEl)      bioEl.textContent   = u.bio;
    if (imgEl)      imgEl.src           = u.img;
    if (postAvatar) postAvatar.src      = u.img;
    if (bigImg)     bigImg.src          = u.img;
    if (fullName)   fullName.textContent= u.name;
    if (statusEl)   statusEl.textContent= u.bio;
    if (karmaEl)    karmaEl.textContent = `${u.karma}%`;

    const statusBadge = document.querySelector('.profile-info .status');
    if (statusBadge) statusBadge.textContent = '🟢 متصل';
  } else {
    // إعادة قيم افتراضية
    const nameEl = document.getElementById('user-name');
    const bioEl  = document.getElementById('user-bio');
    if (nameEl) nameEl.textContent = 'زائر غير مسجل';
    if (bioEl)  bioEl.textContent  = '💕 ابدأ رحلتك الرومانسية مع SLAM';
  }

  renderChats();
}

function promptLogin() {
  showToast('💕 سجّل دخولك أولاً للمتابعة!', 'warning');
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.style.animation = 'none';
    loginBtn.style.transform = 'scale(1.1)';
    setTimeout(() => { loginBtn.style.transform = ''; }, 600);
  }
}

/* ============================================================
   NOTIFICATIONS & TOASTS
   ============================================================ */
function showToast(message, type = 'success') {
  // إزالة توست قديم لو موجود
  const old = document.getElementById('slam-toast');
  if (old) old.remove();

  const colors = {
    success: 'linear-gradient(135deg, var(--pink), var(--rose))',
    warning: 'linear-gradient(135deg, #FF9800, #F57C00)',
    error:   'linear-gradient(135deg, #F44336, #C62828)',
    info:    'linear-gradient(135deg, var(--teal), #0097A7)',
  };

  const toast = document.createElement('div');
  toast.id = 'slam-toast';
  toast.style.cssText = `
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(20px);
    background:${colors[type] || colors.success}; color:#fff; padding:12px 24px;
    border-radius:50px; font-size:.9rem; font-weight:600; z-index:9999;
    box-shadow:0 6px 24px rgba(0,0,0,.2); opacity:0;
    transition:all .35s cubic-bezier(.4,0,.2,1); white-space:nowrap;
    max-width:90vw; text-align:center;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

/* ============================================================
   UTILITIES
   ============================================================ */
function getUserById(id) {
  return STATE.users.find(u => u.id === id) || null;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
document.addEventListener('keydown', e => {
  if (e.altKey) {
    const map = { '1': 'feed', '2': 'profile', '3': 'messages', '4': 'groups', '5': 'discover' };
    if (map[e.key]) { showSection(map[e.key]); e.preventDefault(); }
  }
});

/* ============================================================
   EXPORT للاستخدام في ملفات أخرى
   ============================================================ */
window.SLAM = {
  STATE,
  showSection,
  showToast,
  getUserById,
  calculatePostScore,
  sortPostsByScore,
  detectSpam,
  newCreatorBoost,
  randomMatch,
  startRandomMatch,
  nextRandom,
  sendLike,
  createGroup,
  saveGroup,
  closeModal,
  publishPost,
  toggleLike,
  joinGroup,
  addFriend,
  showProfileTab,
  editProfilePhoto,
  promptLinkInput,
};
