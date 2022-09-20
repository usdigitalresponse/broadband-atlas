<template>
  <div class="details-panel" v-if="selectedBlock">
    <div>
      <h2>
        Census Block
      </h2>

      <table class="table">
        <tr>
          <th>Block</th>
          <td>{{ selectedBlockParts.block }}</td>
        </tr>
        <tr>
          <th>Tract</th>
          <td>{{ selectedBlockParts.tract }}</td>
        </tr>
        <tr>
          <th>County</th>
          <td>{{ selectedBlockParts.county }}</td>
        </tr>
      </table>

      <!-- providers -->
      <h2 class="mt-5">Internet Providers</h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Max DL</th>
            <th>Max UL</th>
            <th>Technology</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(provider, index) in providersSorted"
              :key="index"
          >
            <td>{{ provider.dba_name }}</td>
            <td>{{ provider.max_ad_down }}</td>
            <td>{{ provider.max_ad_up }}</td>
            <td>{{ labelForTechCode(provider.tech_code) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- TODO this is just for demoing -->
      <!-- <h2 class="mt-5">Demographics</h2> -->

      <!-- <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Race/Ethnicity</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>American Indian and Alaska Native</td>
            <td>51%</td>
          </tr>
          <tr>
            <td>White, not Hispanic</td>
            <td>29%</td>
          </tr>
          <tr>
            <td>Hispanic</td>
            <td>12%</td>
          </tr>
          <tr>
            <td>Asian, not Hispanic</td>
            <td>4%</td>
          </tr>
          <tr>
            <td>Two or more races</td>
            <td>4%</td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    selectedBlock: state => state.selectedBlock,
    selectedBlockParts() {
      const blockId = this.selectedBlock.census_block_id;

      return {
        county: blockId.substring(2, 5),
        tract: blockId.substring(5, 11),
        block: blockId.substring(11),
      };
    },
    providers: state => state.providers,
    providersSorted() {
      const { providers } = this;

      return [...providers]
        .sort((a, b) => parseInt(a.max_ad_down) < parseInt(b.max_ad_down) ? 1 : -1);
    },
  }),
  methods: {
    labelForTechCode(techCode) {
      return this.$config.fccTechnologyCodeLabels[techCode] || techCode;
    },
  },
};
</script>

<style scoped>
.details-panel {
  border-left: 1px #ebebeb solid;
  overflow-y: auto;
  padding: 1.5rem;
  width: 450px;
}

h1 {
  font-size: 1.5rem;
}

h2 {
  font-size: 1.25rem;
}
</style>
