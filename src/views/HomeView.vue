<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <OptionsPanel />
    <MapPanel />
    <DetailsPanel />
  </div>
</template>

<script>
// @ is an alias to /src
import MapPanel from '@/components/MapPanel.vue';
import OptionsPanel from '@/components/OptionsPanel.vue';
import DetailsPanel from '@/components/DetailsPanel.vue';

export default {
  name: 'HomeView',
  components: {
    OptionsPanel,
    MapPanel,
    DetailsPanel,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  height: calc(100vh - 56px);
}
</style>
