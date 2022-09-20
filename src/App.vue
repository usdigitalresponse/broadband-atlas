<template>
  <nav class="navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        Broadband Atlas 
        <span class="badge bg-warning">Preview</span>
      </a>
    </div>
  </nav>

  <router-view />
</template>

<script>
  export default {};
</script>

<style>
#app {
  height: 100vh;
}

nav {
  box-shadow: 0 1px 0 #ebebeb !important;
}

.navbar-brand {
  font-weight: bold;
  color: #000;
}

.navbar-brand:hover {
  color: #000;
}

.navbar-brand .badge {
  margin-left: 0.3rem;
}
</style>
