from http.server import BaseHTTPRequestHandler, HTTPServer
import socketserver
import urllib.parse
import json
from datetime import datetime, timedelta
import email.utils

PORT = 8000

class RequestHandler(BaseHTTPRequestHandler):
    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:8001')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
        self.send_header('Access-Control-Allow-Credentials', 'true')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def do_GET(self):
         # Remove trailing '?' if present
        path = self.path.rstrip('?')

        if path == '/check-login':
            self.handle_check_login()
        elif path == '/loginLink':
            cookie = self.headers.get('Cookie')
            username = self.get_cookie_value(cookie, 'username')
            if(username):
                self.send_response(302)
                self.send_cors_headers()
                self.send_header('Location', 'http://localhost:8001/loggedInPage')
                self.end_headers()
            else:
                self.send_response(302)
                self.send_cors_headers()
                self.send_header('Location', 'http://localhost:8001/loginPage')
                self.end_headers()


    def do_POST(self):
        if self.path == '/login':
            self.handle_login()
        elif self.path == '/logout':
            self.handle_logout()
        else:
            super.do_GET()

    def handle_login(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')

        # Parse form data using urllib.parse
        form_data = urllib.parse.parse_qs(post_data)
        
        username = form_data.get('username', [''])[0]
        password = form_data.get('password', [''])[0]

         # Debugging print statements
        print(f"Username: {username}")
        print(f"Password: {password}")

        # Mock user data
        mock_user = {
            'username': 'testuser',
            'password': 'password123'
        }

        expires = (datetime.utcnow() + timedelta(hours=24)).strftime('%a, %d %b %Y %H:%M:%S GMT')
        if username == mock_user['username'] and password == mock_user['password']:
            response_data = {
                    'status': 'success',
                    'username': username,
                    'loggedIn' : True,
                    'message': "Successfull Login"
                }   
            if 'X-Requested-With' in self.headers and self.headers['X-Requested-With'] == 'XMLHttpRequest':
                print("javascript request")
                self.send_response(200)
                self.send_cors_headers()
                self.send_header('Content-type', 'application/json')
                self.send_header('Set-Cookie', f'username={username}; Expires={expires}; Path=/; SameSite=Lax;')
                self.end_headers()
            else:
                print("html request")
                self.send_response(302)
                self.send_cors_headers()
                self.send_header('Content-type', 'application/json')
                self.send_header('Set-Cookie', f'username={username}; Expires={expires}; Path=/; SameSite=Lax;')
                self.send_header('Location', 'http://localhost:8001/loggedInPage')
                self.end_headers()
        else:
            response_data = {
                    'status': 'failed',
                        'username': "",
                        'loggedIn' : False,
                        'message': "Invalid username or password"
                    }   
             
            if 'X-Requested-With' in self.headers and self.headers['X-Requested-With'] == 'XMLHttpRequest':
                self.send_response(200)
                self.send_cors_headers()
                self.send_header('Content-type', 'application/json')
                self.end_headers()
            else:
                self.send_response(302)
                self.send_cors_headers()
                self.send_header('Content-type', 'application/json')
                self.send_header('Location', 'http://localhost:8000/loginLink')
                self.end_headers()

        response_json = json.dumps(response_data)
        self.wfile.write(response_json.encode('utf-8'))
    
    def handle_logout(self):
        if 'X-Requested-With' in self.headers and self.headers['X-Requested-With'] == 'XMLHttpRequest':
            self.send_response(200)
            self.send_cors_headers()
            self.send_header('Set-Cookie', 'username=;  Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax;')
            self.end_headers()
        else:
            # Redirect for non-AJAX requests
            self.send_response(302)
            self.send_cors_headers()
            self.send_header('Set-Cookie', 'username=;  Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax;')
            self.send_header('Location', 'http://localhost:8001/')
            self.end_headers()
    
    def get_cookie_value(self,cookie_header, cookie_name):
        if(cookie_header):
            cookies = cookie_header.split('; ')
            for cookie in cookies:
                if cookie.startswith(cookie_name + '='):
                    return cookie.split('=')[1]
        return None
    

    def handle_check_login(self):
        cookie_header = self.headers.get('Cookie')
        username = self.get_cookie_value(cookie_header, 'username')

        if username:
            response_data = {
                'status': 'success',
                'username': username,
                'loggedIn' : True
            }
        else:
             response_data = {
                'status': 'success',
                'username': "",
                'loggedIn' : False
            }

        self.send_response(200)
        self.send_cors_headers()
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response_json = json.dumps(response_data)
        self.wfile.write(response_json.encode('utf-8'))


def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting httpd server on port {port}...')
    httpd.serve_forever()

if __name__ == "__main__":
    run(port=8000)