# Javascript coding challenge

## Overview

This project provides a simple web application with login/logout functionality, image display, and modal interactions. It includes a front-end built with HTML, CSS, and JavaScript, and interacts with a mock backend server to handle authentication and image retrieval. It works with javascript enabled or disabled.

## Requirements

- Python 3.x
- A web browser (e.g., Chrome, Firefox)

## Getting Started

To run the project, you'll need to start two Python servers. Follow the instructions below to set up and start the servers.

### Starting the HTTP Servers

1. **HTML Server**

   This server serves the static HTML, CSS, and JavaScript files required for the frontend of the application.

   - **Script Name:** `html-server.py`
   - **Command to Run:**
     ```sh
     python html-server.py
     ```
   - **Alternative:** Double-click the `html-server.py` file to run it.

2. **Mock Web Server**

   This server provides mock endpoints for login, logout, and status checking. It simulates backend API responses.

   - **Script Name:** `server.py`
   - **Command to Run:**
     ```sh
     python server.py
     ```
   - **Alternative:** Double-click the `server.py` file to run it.

### Running the Project

1. **Start the HTML Server:**

   Open a terminal or command prompt, navigate to the directory containing `/public/html-server.py`, and run:
   ```sh
   python html-server.py
   ```

2. **Start the Mock Web Server:**

   Open a new terminal or command prompt, navigate to the directory containing `/mock-server/server.py`, and run:
   ```sh
   python server.py
   ```

3. **Access the Application:**

   Open your web browser and go to [http://localhost:8001](http://localhost:8001). You should see the application's frontend.

## Usage
- **Login Credentials:** Use the following credentials:
- **Username:** testuser
- **Password:** password123

- **Login:** Use the login form to authenticate. On successful login, you will be redirected to the appropriate page with user-specific content.
- **Logout:** Click the logout button to log out from the application.
- **Image Grid:** The image grid will display different images based on the login state.
- **Disable Javascript:** Disable your browsers use of javascript (Ctrl-Shift-P in chrome then type javascript). The site will continue to function.

## Troubleshooting

- **Server Not Starting:** Ensure that Python is installed and properly configured in your system's PATH.
- **Network Issues:** Verify that both servers are running and that no other application is using port 8000.

## Contributing

Feel free to fork the repository and submit pull requests with improvements or bug fixes. For more details on contributing, please refer to the `CONTRIBUTING.md` file (if available).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or feedback, please contact [Dave Buckley](mailto:davebuckley@outlook.com).
```

### Key Points in Formatting:

- **Headings**: Use `#` for the main title and `##` for subsections.
- **Code Blocks**: Use triple backticks (```) for code blocks and inline code with single backticks (`).
- **Links**: Use markdown syntax for links and email addresses.
- **Lists**: Use hyphens (`-`) or asterisks (`*`) for unordered lists.
- **Commands**: Use code blocks for commands and instructions.
