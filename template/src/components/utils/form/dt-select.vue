<template>
  <div class="form-group" :class="{'has-warning': errors.has(name || '')}">
    <label v-if="label" class="control-label"> {{label}}: </label>
    <template v-if="disabled">
      <input class="form-control" :placeholder="label" :value="disabledText" disabled/>
    </template>
    <template v-else>
      <select :name="name" v-model="selected" @change="change" class="form-control" v-validate="validate || ''">
        <option :value="option.value" v-for="option of options" :key="option.value">
          {{option.name}}
        </option>
      </select>
      <small class="text-danger" v-show="errors.has(name || '')">
        {{ errors.first(name || '') }}
      </small>
    </template>
  </div>
</template>

<script>
export default {
  name: 'dt-select',
  props: ['name', 'value', 'label', 'options', 'disabled', 'validate'],
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    disabledText() {
      if (this.options && this.options.length) {
        let options = this.options.filter(
          option => option.value.toString() === this.value.toString()
        )
        return options.length ? options[0].name : this.value
      }
      return this.value
    }
  },
  methods: {
    change($event) {
      this.$emit('input', $event.target.value)
      this.$emit('change')
    }
  }
}
</script>

<style scoped="true">
input:disabled {
  cursor: text;
}
</style>
