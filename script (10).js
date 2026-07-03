let currentUser = null;
let tasks = [
    { id: 1, title: "Help move furniture", budget: 2500, category: "Moving", desc: "Need help with heavy lifting" },
    { id: 2, title: "Assemble IKEA furniture", budget: 1200, category: "Handyman", desc: "Wardrobe assembly" },
    { id: 3, title: "Clean my apartment", budget: 800, category: "Cleaning", desc: "Deep cleaning service" }
];

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section + '-section').classList.remove('hidden');
    if (section === 'home') renderFeaturedTasks();
}

function renderFeaturedTasks() {
    const container = document.getElementById('featured-tasks');
    container.innerHTML = tasks.map(task => `
        <div onclick="viewTask(${task.id})" class="task-card bg-white rounded-3xl p-6 shadow cursor-pointer">
            <h3 class="font-semibold text-lg">${task.title}</h3>
            <p class="text-purple-600 font-bold text-xl mt-3">₹${task.budget}</p>
            <p class="text-sm text-gray-500">${task.category}</p>
        </div>
    `).join('');
}

function renderCategories() {
    const cats = ["Cleaning", "Handyman", "Moving", "Assembly", "Painting"];
    const container = document.getElementById('categories');
    container.innerHTML = cats.map(cat => `
        <div onclick="filterCategory('${cat}')" class="bg-white p-6 rounded-3xl text-center cursor-pointer hover:bg-purple-50 transition">
            <p class="font-medium">${cat}</p>
        </div>
    `).join('');
}

function filterCategory(cat) {
    alert(`Showing tasks in ${cat} (Demo)`);
}

function viewTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        alert(`📋 Task Details:\n\n${task.title}\nBudget: ₹${task.budget}\n\nApply Now? (Demo)`);
    }
}

function showPostTask() {
    if (!currentUser) {
        alert("Please login first");
        showLoginModal();
        return;
    }
    document.getElementById('post-task-modal').classList.remove('hidden');
    document.getElementById('post-task-modal').classList.add('flex');
}

function postTask() {
    const title = document.getElementById('task-title').value;
    const budget = document.getElementById('task-budget').value;
    
    if (title && budget) {
        tasks.unshift({
            id: Date.now(),
            title: title,
            budget: parseInt(budget),
            category: "Custom",
            desc: document.getElementById('task-desc').value
        });
        alert("✅ Task posted successfully!");
        document.getElementById('post-task-modal').classList.add('hidden');
        document.getElementById('post-task-modal').classList.remove('flex');
        renderFeaturedTasks();
    }
}

function searchContent() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = tasks.filter(t => t.title.toLowerCase().includes(query));
    const container = document.getElementById('featured-tasks');
    container.innerHTML = filtered.map(task => `
        <div onclick="viewTask(${task.id})" class="task-card bg-white rounded-3xl p-6 shadow cursor-pointer">
            <h3 class="font-semibold">${task.title}</h3>
            <p class="text-purple-600 font-bold">₹${task.budget}</p>
        </div>
    `).join('');
}

function showLoginModal() {
    document.getElementById('login-modal').classList.remove('hidden');
    document.getElementById('login-modal').classList.add('flex');
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function login() {
    currentUser = "TaskHelper";
    document.getElementById('login-btn').innerHTML = `👋 ${currentUser}`;
    closeLoginModal();
    alert("✅ Logged in successfully!");
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    renderCategories();
    renderFeaturedTasks();
});