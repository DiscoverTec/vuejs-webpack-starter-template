<template>
  <table>
    <thead v-if="tableColumns && tableColumns.length">
      <tr>

        <!-- empty detail placeholder cell -->
        <th v-if="$scopedSlots.detail" />

        <template v-for="(column, cIndex) of tableColumns">
          <th :key="cIndex" @click="sort(column, cIndex)" :class="{'cursor': column.sortable}" v-show="!column.hidden">

            <!-- thead scoped slot -->
            <slot v-if="$scopedSlots.thead" name="thead" :column="column" :index="cIndex" />

            <!-- default column -->
            <template v-else>
              \{{ column.label }}
            </template>

            <!-- sort icon -->
            <template v-if="column.sortable && column.field === currentSortOn">
              <i class="fa" :class="`fa-arrow-circle-${ currentSortDir === 'asc' ? 'up' : 'down'}`" aria-hidden="true"></i>
            </template>

          </th>
        </template>
      </tr>
    </thead>

    <tbody v-if="tableData && tableData.length">

      <!-- loading row -->
      <tr v-if="loading">
        <td colspan="999">
          Loading...
        </td>
      </tr>

      <template v-for="(row, rIndex) in tableData">
        <tr :key="rIndex + 1">

          <!-- detail show hide buttons -->
          <template v-if="$scopedSlots.detail">
            <td @click="toggleDetail(row)" class="cursor">
              <i class="fa" :class="`fa-chevron-${row.isDetailVisible ? 'down' : 'up'}`" aria-hidden="true"></i>
            </td>
          </template>

          <!-- tbody scoped slot -->
          <slot v-if="$scopedSlots.tbody" name="tbody" :row="row" />

          <!-- tbody if no slot but columns  -->
          <template v-else-if="tableColumns.length" v-for="(column, cIndex) of tableColumns">
            <td :key="cIndex" v-show="!column.hidden"> \{{ row[column.field] }} </td>
          </template>

          <!-- tbody default -->
          <template v-else>
            <td> \{{row}} </td>
          </template>

        </tr>

        <!-- detail scoped slot -->
        <tr :key="rIndex * -1" v-if="$scopedSlots.detail && row.isDetailVisible">
          <td colspan="999">
            <slot name="detail" :row="row" />
          </td>
        </tr>

      </template>
    </tbody>

    <!-- empty slot -->
    <tbody v-else-if="!loading">
      <tr>
        <td colspan="999">
          <slot name="empty" v-if="$slots.empty" />
        </td>
      </tr>
    </tbody>

    <!-- tfoot slot -->
    <tfoot v-if="$slots.tfoot">
      <tr>
        <td colspan="999">
          <slot name="tfoot" />
        </td>
      </tr>
    </tfoot>

  </table>
</template>

<script>
export default {
  name: 'dt-table',
  components: {},
  data() {
    return {
      currentSortOn: this.sortOn,
      currentSortDir: this.sortDir || 'desc'
    }
  },
  props: {
    sortOn: String,
    sortDir: String,
    loading: Boolean,
    value: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tableData() {
      return this.value
    },
    tableColumns() {
      return this.columns
    }
  },
  created() {
    const sortable = this.tableColumns.filter(i => i.sortable)
    if (sortable.length && !this.currentSortOn) {
      this.currentSortOn = sortable[0].field
    }
  },
  methods: {
    sort(column, index) {
      if (column.sortable) {
        this.currentSortDir =
          column.field === this.currentSortOn
            ? this.currentSortDir === 'asc' ? 'desc' : 'asc'
            : 'asc'
        this.currentSortOn = column.field
        this.$emit('sort', column, this.currentSortDir)
      }
    },
    toggleDetail(row) {
      row.isDetailVisible = !row.isDetailVisible
      this.$forceUpdate()
      this.$emit('toggle', row.isDetailVisible, row)
    }
  }
}
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>
