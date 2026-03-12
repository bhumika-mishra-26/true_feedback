# True Feedback 🚀

**True Feedback** is a full-stack anonymous messaging platform where users can receive honest feedback or messages anonymously.
Users can create an account, verify their email, and share their public message link so others can send anonymous messages securely.

Built with **Next.js, NextAuth, MongoDB, Resend, Gemini AI, and shadcn/ui**.

---

# ✨ Features

* 🔐 User authentication with **NextAuth**
* 📧 Email verification using **Resend**
* 📨 Anonymous message submission
* 🤖 **AI-powered message suggestions using Gemini API**
* 📊 User dashboard to view received messages
* ❌ Delete messages
* ⚙️ Toggle accepting messages on/off
* 🎨 Modern UI with **shadcn/ui + TailwindCSS**
* ⚡ Built using **Next.js App Router**

---

# 🛠️ Tech Stack

* **Next.js**
* **TypeScript**
* **NextAuth**
* **MongoDB / Mongoose**
* **Resend (Email Service)**
* **Google Gemini API (AI Suggestions)**
* **TailwindCSS**
* **shadcn/ui**
* **React Hook Form + Zod**

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/bhumika-mishra-26/True-Feedback.git
```

Move into the project:

```bash
cd True-Feedback
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

# ⚙️ Environment Variables

Create a **`.env.local`** file in the root of the project and add the following variables.

```env
# MongoDB Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth Secret
NEXTAUTH_SECRET=your_nextauth_secret

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000

# Resend Email API Key
RESEND_API_KEY=your_resend_api_key

# Google Gemini API Key (for AI message suggestions)
GEMINI_API_KEY=your_gemini_api_key
```

---

# 🔑 How to Get Environment Variables

### 1️⃣ MongoDB URI

Create a free cluster on **MongoDB Atlas**

https://www.mongodb.com/atlas

Example:

```
mongodb+srv://username:password@cluster.mongodb.net/truefeedback
```

---

### 2️⃣ NextAuth Secret

Generate using:

```bash
openssl rand -base64 32
```

---

### 3️⃣ Resend API Key

Create an account:

https://resend.com

Generate API key from:

```
Resend Dashboard → API Keys
```

Example:

```
re_xxxxxxxxxxxxxxxxx
```

---

### 4️⃣ Gemini API Key

Create a key from **Google AI Studio**:

https://aistudio.google.com/app/apikey

Example:

```
AIzaSyxxxxxxxxxxxxxxxx
```

---

# 🚀 Deployment

The project is optimized for **Vercel deployment**.

Steps:

1. Push the project to GitHub
2. Go to **Vercel Dashboard**
3. Click **New Project**
4. Import the GitHub repository
5. Add the required **Environment Variables**
6. Deploy 🚀

---

# 🌐 Live Demo

```
https://true-feedback.vercel.app
```

---

# 🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👩‍💻 Author

**Bhumika Mishra**

GitHub:
https://github.com/bhumika-mishra-26
