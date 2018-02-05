<template>
  <div class="container mt-5">
    <div class="mx-auto" style="width: 300px;">
      <div class="card">
        <h5 class="card-header"> Login Sample </h5>
        <div class="card-body">
          <form-login/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormLogin from '@/components/login/form-login'
export default {
  name: 'login',
  components: {
    FormLogin
  }
}
</script>
