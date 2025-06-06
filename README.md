# 💬 ChatApp - Real-Time Chat Application (Spring Boot + WebSocket)

**ChatApp** is a full-stack real-time chat application built using **Spring Boot** and **WebSocket (STOMP)** for the backend, along with a lightweight **HTML/JavaScript frontend**. It allows users to connect, join chatrooms, and send messages instantly through WebSocket communication.

---

## 🚀 Features

- 📡 Real-time bi-directional messaging using WebSocket & STOMP
- 👤 User onboarding and broadcast announcements
- 🔄 Instant updates without page reloads
- 🧱 Clean MVC-based modular backend
- 💻 Frontend using SockJS + STOMP.js for seamless communication

---

## 🛠️ Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| **Backend** | Spring Boot, WebSocket, STOMP      |
| **Frontend**| HTML, JavaScript, SockJS, STOMP.js |
| **Protocol**| WebSocket (STOMP over SockJS)      |

---

## 🔌 WebSocket Endpoints

| Endpoint             | Description                          |
|----------------------|--------------------------------------|
| `/chat.sendMessage`  | Send a message to all chat members   |
| `/chat.addUser`      | Add a new user to the chatroom       |
| `/topic/public`      | Message broadcast subscription topic |

---
## 🖼️ Screenshots

> Below are some snapshots from the application in action:
![image_1.png](ChatAppBacknedWeb/src/main/resources/images/image_1.png)
![image_2.png](ChatAppBacknedWeb/src/main/resources/images/image_2.png)
![image_3.png](ChatAppBacknedWeb/src/main/resources/images/image_3.png)

### Clone the repository
```bash
https://github.com/ripanbaidya08/real-time-chatapp-springboot.git
```

---

