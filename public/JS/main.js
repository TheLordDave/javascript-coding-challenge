document.addEventListener('DOMContentLoaded', () => {
    // Header Forms and buttons for login/logout
    const loginHeaderForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const logoutHeaderForm = document.getElementById('logout-form');

    // Popup Modal Login Form
    const loginPopupForm = document.getElementById('login-popup-form');
    const modal = document.getElementById("login-popup-modal");
    const modalSubmit = document.getElementById("login-popup-submit");
    const modalCancel = document.getElementById("login-popup-cancel");
    const modalSpinner = document.getElementById("login-popup-loader");
    const loginMessage = document.getElementById('login-message');
    const headerUsername = document.getElementById('welcome-message');
    const headerSpinner = document.getElementById('login-status-loader');
    const imageGrid = document.getElementById("imageGrid");

    // Event Listeners
    if (loginHeaderForm) {
        loginHeaderForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            showModal(true);
            loginMessage.textContent = "";
        });
    }

    if (loginPopupForm) {
        loginPopupForm.addEventListener('submit', async (event) => {
            if (!navigator.onLine) return;

            showHeaderLoadingSpinner(true);
            showMessage("Logging In...");
            hideHeaderButtons();
            enableModalButtons(false);
            loginMessage.textContent = "";

            event.preventDefault();
            const formData = new FormData(event.target);
            const params = new URLSearchParams(formData);

            try {
                const response = await fetch('http://localhost:8000/login', {
                    method: 'POST',
                    body: params,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                const data = await response.json();
                if (response.ok && data.loggedIn) {
                    updateHeader(data.username);
                    showModal(false);
                    showMessage('Welcome back ' + data.username);
                    updateLoggedInContent(true);
                } else {
                    loginMessage.textContent = data.message || 'Login failed.';
                    showMessage("Login Failed...");
                }
            } catch (error) {
                loginMessage.textContent = 'An error occurred: ' + error;
                showMessage("Login Failed...");
            } finally {
                showHeaderLoadingSpinner(false);
                enableModalButtons(true);
            }
        });

        modalCancel.addEventListener('click', () => {
            showModal(false);
            showLoginButton(true);
        });
    }

    if (logoutHeaderForm) {
        logoutHeaderForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            showHeaderLoadingSpinner(true);
            showMessage("Logging out...");
            hideHeaderButtons();

            try {
                const response = await fetch('http://localhost:8000/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Logout failed');
                }

                updateHeader(null);
                showMessage('Successfully logged out');
                logoutButton.disabled = false;
                pageSetup();
            } catch (error) {
                logoutButton.disabled = false;
                showMessage('Logout failed');
            } finally {
                showHeaderLoadingSpinner(false);
            }
        });
    }

    pageSetup();
});

// Function Definitions

async function pageSetup() {
    showMessage("Checking login status");
    showHeaderLoadingSpinner(true);
    updateLoggedInContent(false);
    hideHeaderButtons();

    try {
        const response = await fetch('http://localhost:8000/check-login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        if (data.status === 'success') {
            if (data.username) {
                showMessage('Welcome back ' + data.username);
                updateHeader(data.username);
                updateLoggedInContent(true);
            } else {
                showMessage('Please Log In');
                updateHeader();
                updateLoggedInContent(false);
            }
        }
    } catch (error) {
        showMessage("Failed to check login status: " + error);
    } finally {
        showHeaderLoadingSpinner(false);
    }
}

function updateLoggedInContent(loggedIn) {
    const urls = loggedIn ? loggedInImageURLS : loggedOutImageURLS;
    imageGrid.innerHTML = ''; // Clear existing images
    urls.forEach(url => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';
        anchor.setAttribute('data-image-url', url);

        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Dynamic Image';

        anchor.appendChild(img);
        imageItem.appendChild(anchor);
        imageGrid.appendChild(imageItem);

        addModalImageClickEventListener(anchor);
    });
}

function updateHeader(username) {
    showHeaderLoadingSpinner(false);
    if (username) {
        showLoginButton(false);
        loginHeaderForm.style.display = 'none';
        showLogoutButton(true);
        headerUsername.innerText = username;
    } else {
        showLoginButton(true);
        showLogoutButton(false);
        headerUsername.innerText = "";
    }
}

function showHeaderLoadingSpinner(show) {
    headerSpinner.style.display = show ? 'block' : 'none';
}

function hideHeaderButtons() {
    showLoginButton(false);
    showLogoutButton(false);
}

function showModal(show) {
    modal.style.display = show ? 'block' : 'none';
}

function showLoginButton(show) {
    loginHeaderForm.style.display = show ? 'block' : 'none';
}

function showLogoutButton(show) {
    logoutHeaderForm.style.display = show ? 'block' : 'none';
}

function enableModalButtons(enable) {
    modalSubmit.disabled = !enable;
    modalCancel.disabled = !enable;
    modalSpinner.style.display = enable ? 'none' : 'block';
}
