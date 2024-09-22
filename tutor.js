let doubts = [];
let currentUser = null; // Track the logged-in user
let contributions = 0; // Track user contributions

function login() {
    const usernameInput = document.getElementById('login-username').value;
    if (usernameInput) {
        currentUser = usernameInput;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('profile-section').style.display = 'block';
        document.getElementById('profile-name').innerText = `Logged in as: ${currentUser}`;
        updateProfile();
        document.getElementById('post-doubt-section').style.display = 'block';
        displayDoubts(); // Display doubts after login
    }
}

function logout() {
    currentUser = null;
    contributions = 0; // Reset contributions on logout
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('profile-section').style.display = 'none';
    document.getElementById('post-doubt-section').style.display = 'none';
    document.getElementById('doubts-list').innerHTML = ''; // Clear posted doubts
}

function updateProfile() {
    document.getElementById('contributions').innerText = contributions;
}

function postDoubt() {
    const doubtInput = document.getElementById('doubt').value;
    const categoryInput = document.getElementById('category').value;

    if (doubtInput) {
        const newDoubt = {
            id: doubts.length,
            text: doubtInput,
            category: categoryInput,
            votes: 0,
            solutions: [],
            streak: 0,
            asker: currentUser,
        };
        
        doubts.push(newDoubt);
        contributions++; // Increase contributions for posting a doubt
        document.getElementById('doubt').value = '';
        displayDoubts();
        updateProfile(); // Update profile contributions display
    }
}

function displayDoubts() {
    const doubtsList = document.getElementById('doubts-list');
    doubtsList.innerHTML = '';

    doubts.forEach(doubt => {
        const doubtDiv = document.createElement('div');
        doubtDiv.className = 'doubt-item';
        doubtDiv.innerHTML = `
            <div>${doubt.text} (Category: ${doubt.category})</div>
            <div class="votes">
                <span>Votes: ${doubt.votes}</span>
                <button onclick="upvote(${doubt.id})">Upvote</button>
            </div>
            <div>
                <input type="text" placeholder="Provide a solution..." id="solution-${doubt.id}">
                <button onclick="submitSolution(${doubt.id})" ${doubt.asker === currentUser ? 'disabled' : ''}>Submit Solution</button>
            </div>
            <div>Streak: ${doubt.streak}</div>
            <h4>Solutions:</h4>
            <ul id="solutions-${doubt.id}">${displaySolutions(doubt)}</ul>
        `;
        doubtsList.appendChild(doubtDiv);
    });
}

function displaySolutions(doubt) {
    return doubt.solutions.map((solution, index) => `
        <li>
            ${solution.text} 
            ${doubt.asker === currentUser ? `<button onclick="approveSolution(${doubt.id}, ${index})">Approve</button>` : ''}
        </li>
    `).join('');
}

function upvote(id) {
    doubts[id].votes++;
    displayDoubts();
}

function submitSolution(id) {
    const solutionInput = document.getElementById(`solution-${id}`);
    const solutionText = solutionInput.value;

    if (solutionText) {
        doubts[id].solutions.push({ text: solutionText, approved: false });
        contributions++; // Increase contributions for providing a solution
        solutionInput.value = ''; // Clear input
        displayDoubts();
        updateProfile(); // Update profile contributions display
    }
}

function approveSolution(doubtId, solutionIndex) {
    if (!doubts[doubtId].solutions[solutionIndex].approved) {
        doubts[doubtId].solutions[solutionIndex].approved = true;
        doubts[doubtId].streak++; // Increase streak upon approval
        displayDoubts();
    }
}
