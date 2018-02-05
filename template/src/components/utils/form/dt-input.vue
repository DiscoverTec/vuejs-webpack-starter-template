<template>
  <div class="form-group" :class="{'has-warning': errors.has(name || '')}">
    <label v-if="label" :for="name" class="control-label">{{label}}:</label>
    <input :id="name" class="form-control" :type="type || 'text'" :name="name" :value="value" @input="change" v-validate="validate || ''" :maxlength="maxlength || 50" :placeholder="label" :disabled="disabled" />
    <small class="text-danger" v-if="errors.has(name || '')">
      {{ errors.first(name || '') }}
    </small>
  </div>
</template>

<script>
export default {
  name: 'dt-input',
  props: [
    'name',
    'type',
    'value',
    'label',
    'disabled',
    'validate',
    'maxlength'
  ],
  methods: {
    change($event) {
      this.$emit('input', $event.target.value)
    }
  }
}
</script>
