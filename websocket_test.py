import asyncio
import threading
from wsgiref.simple_server import make_server
from ws4py.websocket import WebSocket
from ws4py.server.wsgirefserver import WSGIServer, WebSocketWSGIRequestHandler
from ws4py.server.wsgiutils import WebSocketWSGIApplication
import time

loop = asyncio.get_event_loop()
connectionList = {}


class MyWebsocket(WebSocket):
    __active = True
    __peername = ""

    def opened(self):
        if self.__active:
            conn = self.connection
            nsock = WebSocket(sock=conn)
            self.__peername = str(conn.getpeername())
            connectionList.update({self.__peername: nsock})

    def received_message(self, message):
        self.send(message.data, message.is_binary)

    def closed(self, code, reason=None):
        connectionList.pop(str(self.__peername))
        self.__active = False

    def sendMessage(self, message):
        self.send(message)


def start(ip, port):
    server = make_server(ip, port,
                         server_class=WSGIServer,
                         handler_class=WebSocketWSGIRequestHandler,
                         app=WebSocketWSGIApplication(handler_cls=MyWebsocket))
    server.initialize_websockets_manager()
    server.serve_forever()


def sendMessage(msg):
    for key in connectionList.keys():
        connectionList.get(key).send(msg)


if __name__ == "__main__":
    ip = '0.0.0.0'
    port = 4001
    timestamp = time.time()
    threadWebSocketServer = threading.Thread(target=start, args=(ip, port,))
    threadWebSocketServer.start()
    msg = {'face': {'timestamp': 1606359847, 'userId': '0ef0gi90001', 'name': '张33',
                    'file_path': 'http://192.168.137.100:5050/face_compare_db/20201126110407572-0ef0gi90001-张33.jpg',
                    'rtsp': 10}}
    while True:
        sendMessage(str(msg))
        time.sleep(1)
