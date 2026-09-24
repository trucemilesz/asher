const ADMIN_PASS = "hecadmin2026"; // CHANGE THIS!

let news = JSON.parse(localStorage.getItem('hec_news')) || [
    {title:"Ruwadzano District Conference 2026 Announced", date:"12 Aug 2026", content:"HEC to host 100 delegates in Harare"},
    {title:"New Church Plant in Aspindale", date:"10 Aug 2026", content:"HEC opens 5th assembly in West Harare"}
];
let sermons = JSON.parse(localStorage.getItem('hec_sermons')) || [
    {title:"Anchored In Christ", preacher:"Pastor Mupudzi", video:"#"},
    {title:"The Power of Faith", preacher:"Elder Baureni", video:"#"}
];
let events = JSON.parse(localStorage.getItem('hec_events')) || [
    {title:"Harare & Chitungwiza Y-Crew Get-together", date:"29 Aug 2026", location:"HEC | Mbare"}
];
let tv = [
    {title:"Y-Crew Get-together", preacher:"HEC Y-Crew", img:"https://images.unsplash.com/photo-1507699622104-4be3abd695fe?w=400"},
    {title:"Praise & Worship", preacher:"HEC Praise Team", img:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400"}
];

function saveAll(){
    localStorage.setItem('hec_news', JSON.stringify(news));
    localStorage.setItem('hec_sermons', JSON.stringify(sermons));
    localStorage.setItem('hec_events', JSON.stringify(events));
}

function enterApp() {
    document.getElementById('homePage').style.display='none';
    document.getElementById('mainApp').style.display='block';
    showTab('live');
}
function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
    document.getElementById(tab+'Tab').classList.add('active');
    window.scrollTo(0,0);
    if(tab === 'admin') loadAdminList();
}

function loadContent() {
    document.getElementById('newsFeed').innerHTML = news.map(n=>`<div class="news-card"><h3>${n.title}</h3><small>${n.date}</small><p>${n.content}</p></div>`).join('');
    document.getElementById('sermonFeed').innerHTML = sermons.map(s=>`<div class="card"><img src="https://images.unsplash.com/photo-1507699622104-4be3abd695fe?w=400"><h3>${s.title}</h3><p>${s.preacher}</p></div>`).join('');
    document.getElementById('eventsFeed').innerHTML = events.map(e=>`<div class="event-card"><h4>${e.title}</h4><p><i class="fa-solid fa-calendar-day"></i> ${e.date}</p><p><i class="fa-solid fa-location-dot"></i> ${e.location}</p></div>`).join('');
    document.getElementById('tvFeed').innerHTML = tv.map(t=>`<div class="card"><img src="${t.img}"><h3>${t.title}</h3><p>${t.preacher}</p></div>`).join('');
}
loadContent();

function searchSermons() {
    let term = document.getElementById('searchSermon').value.toLowerCase();
    let filtered = sermons.filter(s=>s.title.toLowerCase().includes(term) || s.preacher.toLowerCase().includes(term));
    document.getElementById('sermonFeed').innerHTML = filtered.map(s=>`<div class="card"><img src="https://images.unsplash.com/photo-1507699622104-4be3abd695fe?w=400"><h3>${s.title}</h3><p>${s.preacher}</p></div>`).join('');
}
function payEcoCash() {
    let amount = document.getElementById('customAmount').value;
    if(!amount || amount <= 0){alert("Please enter a valid amount"); return;}
    let merchant = "0772464970";
    let url = `https://www.ecocash.co.zw/collect?merchant=${merchant}&amount=${amount}&reference=HEC Offering`;
    if(confirm(`Give $${amount} to Harare Evangelical Church?`)) window.open(url, '_blank');
}
function showNotifications() {alert("🔔 New: Sunday Service is Live Now!\n🔔 New Sermon: Anchored In Christ uploaded");}

// ADMIN
function adminLogin(){
    let pass = document.getElementById('adminPass').value;
    if(pass === ADMIN_PASS){
        localStorage.setItem('hec_admin_loggedin', 'true');
        showTab('admin');
        loadAdminList();
    } else {alert("Wrong Password!");}
}
function adminLogout(){
    localStorage.removeItem('hec_admin_loggedin');
    showTab('live');
}
function addNews(){
    let title = document.getElementById('newsTitle').value;
    let date = document.getElementById('newsDate').value;
    let content = document.getElementById('newsContent').value;
    if(!title || !date || !content) return alert("Fill all fields");
    news.unshift({title, date, content}); saveAll(); loadContent(); loadAdminList();
    alert("News Posted!"); document.getElementById('newsTitle').value = ''; document.getElementById('newsContent').value = '';
}
function addSermon(){
    let title = document.getElementById('sermonTitle').value;
    let preacher = document.getElementById('sermonPreacher').value;
    let video = document.getElementById('sermonVideo').value;
    if(!title || !preacher) return alert("Fill all fields");
    sermons.unshift({title, preacher, video}); saveAll(); loadContent(); loadAdminList();
    alert("Sermon Added!");
}
function addEvent(){
    let title = document.getElementById('eventTitle').value;
    let date = document.getElementById('eventDate').value;
    let location = document.getElementById('eventLocation').value;
    if(!title || !date || !location) return alert("Fill all fields");
    events.unshift({title, date, location}); saveAll(); loadContent(); loadAdminList();
    alert("Event Added!");
}
function deleteItem(type, index){
    if(confirm("Delete this item?")){
        if(type === 'news') news.splice(index,1);
        if(type === 'sermon') sermons.splice(index,1);
        if(type === 'event') events.splice(index,1);
        saveAll(); loadContent(); loadAdminList();
    }
}
function loadAdminList(){
    let html = "<h4>News</h4>";
    html += news.map((n,i)=>`<div class="admin-item"><span>${n.title}</span><button onclick="deleteItem('news',${i})">Delete</button></div>`).join('');
    html += "<h4 style='margin-top:15px;'>Sermons</h4>";
    html += sermons.map((s,i)=>`<div class="admin-item"><span>${s.title}</span><button onclick="deleteItem('sermon',${i})">Delete</button></div>`).join('');
    html += "<h4 style='margin-top:15px;'>Events</h4>";
    html += events.map((e,i)=>`<div class="admin-item"><span>${e.title}</span><button onclick="deleteItem('event',${i})">Delete</button></div>`).join('');
    document.getElementById('adminContentList').innerHTML = html;
}
console.log("%c HEC Website Designed by Chigombe Asher ", "background: #1e3a8a; color: gold; font-size: 14px;");