function showMessage(message, duration = 2000) {

    // Get the status container
    const statusContainer = document.getElementById('statusContainer');

    // Remove any existing message elements
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;

    // Append message to body
    statusContainer.appendChild(messageElement);

    // Trigger CSS animation
    requestAnimationFrame(() => {
        messageElement.classList.add('show');
    });

    // Remove message after specified duration
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        messageElement.addEventListener('transitionend', () => {
            messageElement.remove();
        });
    }, duration);
}