<template>
  <div class="options-panel">
    <section class="mb-4">
      <h2 class="mb-3">
        <span class="badge rounded-pill bg-primary step-number">1</span>
        Select a state
      </h2>

      <div class="option">
        <div class="option__header option--selected">Alaska</div>
      </div>
    </section>

    <section class="mb-4">
      <h2 class="mb-3">
        <span class="badge rounded-pill bg-primary step-number">2</span>
        Select a dataset
      </h2>

      <div class="option">
        <div class="option__header option--selected">FCC Form 477</div>
      </div>

      <!-- <div class="option option--disabled mt-2">
        <div class="option__header">Census ACS</div>
      </div> -->
    </section>

    <section class="mt-4">
      <h2>
        <span class="badge rounded-pill bg-primary step-number">3</span>
        Select a view
      </h2>

      <div class="option mt-2">
        <div class="option__header"
             :class="{ 'option--selected': selectedMapView === 'served-blocks' }"
             @click="didClickOptionHeader"
             id="option-header-served-blocks"
        >
          Served blocks
        </div>

        <!-- <div class="option__body">
          <span class="options-label">Options</span>

          <p>Broadband is</p>
        </div> -->
      </div>

      <div class="option mt-2">
        <div class="option__header"
             :class="{ 'option--selected': selectedMapView === 'speeds' }"
             @click="didClickOptionHeader"
             id="option-header-speeds"
        >
          Download speeds
        </div>
      </div>

      <div class="option mt-2">
        <div class="option__header"
             :class="{ 'option--selected': selectedMapView === 'technologies' }"
             @click="didClickOptionHeader"
             id="option-header-technologies"
        >
          Technologies
        </div>

        <div class="option__body"
             v-if="selectedMapView === 'technologies'"
        >
          <select class="form-select"
                  aria-label="Select a technology"
                  :value="selectedTechnology"
                  @change="didSelectTechnology"
          >
            <option value="fiber">Fiber</option>
            <option value="cable">Cable</option>
            <option value="dsl">DSL</option>
            <option value="no-wireline">No wireline</option>
          </select>
        </div>
      </div>

      <div class="option mt-2">
        <div class="option__header"
             :class="{ 'option--selected': selectedMapView === 'num-providers' }"
             @click="didClickOptionHeader"
             id="option-header-num-providers"
        >
          Number of providers
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      selectedMapView: (state) => state.selectedMapView,
      selectedTechnology: (state) => state.selectedTechnology,
    }),
  },
  methods: {
    didClickOptionHeader(e) {
      const nextMapView = e.target.id.replace('option-header-', '');

      this.$store.commit('setSelectedMapView', nextMapView);
    },
    didSelectTechnology(e) {
      const nextVal = e.target.value;
      this.$store.commit('setSelectedTechnology', nextVal);
    },
  },
};
</script>

<style scoped>
.options-panel {
  border-right: 1px solid #ebebeb;
  padding: 1.5rem;
  width: 450px;
}

h2 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.step-number {
  margin-right: 0.5rem;
}

.option {
  width: 100%;
}

.option__header {
  border: 2px solid #ebebeb;
  border-radius: 5px;
  padding: 0.75rem;
}

.option__body {
  border: 2px solid #ebebeb;
  border-top-width: 0;
  padding: 0.75rem;
}

.option--selected {
  border-color: rgb(13, 110, 253) !important;
}

.option--disabled {
  background-color: #eee;
}

/* HACK better name for this */
.options-label {
  text-transform: uppercase;
  letter-spacing: 0.04rem;
  font-size: 0.8rem;
  color: #555;
}
</style>
