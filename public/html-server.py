import http.server
import socketserver

PORT = 8001

class HttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        '': 'application/octet-stream',
        '.manifest': 'text/cache-manifest',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg':	'image/svg+xml',
        '.webp': 'image/webp',
        '.css':	'text/css',
        '.js':'application/x-javascript',
        '.wasm': 'application/wasm',
        '.json': 'application/json',
        '.xml': 'application/xml',
    }

    def do_GET(self):
        if self.path == '/loginPage':
            self.path = '/loginPage.html'
        if self.path == '/loggedInPage':
            self.path = '/loggedInPage.html'
        if self.path == '/':
            # should we redirect this to the server to then determin if logged in or not and return something? so go to index (not logged in) or (loggedInPage if logged in)
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

httpd = socketserver.TCPServer(("localhost", PORT), HttpRequestHandler)

try:
    print(f"serving at http://localhost:{PORT}")
    httpd.serve_forever()
except KeyboardInterrupt:
    pass