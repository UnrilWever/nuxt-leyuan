<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
header {
  height: 80px;
  background: linear-gradient(to right, #ff5f6d, #ffc371);
  display: flex;
  align-items: center;
  justify-content: center;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  margin: 0 10px;
}

nav a {
  color: white;
  text-decoration: none;
}
</style>
