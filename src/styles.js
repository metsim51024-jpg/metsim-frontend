body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0a0f1c;
  color: white;
}

.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  padding: 15px 50px;
  display: flex;
  justify-content: space-between;
  background: rgba(10,15,28,0.9);
}

.navbar a {
  color: white;
  margin-left: 20px;
  text-decoration: none;
}

.navbar a:hover {
  color: #00d4ff;
}

.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 10%;
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
  url("https://images.unsplash.com/photo-1581090700227-4c4f50e6b9f1") center/cover;
}

.hero h1 {
  font-size: 60px;
}

.hero span {
  color: #00d4ff;
}

.btn {
  padding: 12px 25px;
  margin-right: 10px;
  cursor: pointer;
}

.btn-primary {
  background: #00d4ff;
  border: none;
  color: black;
}

.btn-outline {
  border: 1px solid #00d4ff;
  background: transparent;
  color: #00d4ff;
}

.services {
  padding: 100px 10%;
  background: #111827;
}

.cards {
  display: flex;
  gap: 20px;
}

.card {
  flex: 1;
  background: #1f2937;
  padding: 30px;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-10px);
  border: 1px solid #00d4ff;
}