<template>
  <div class="admin-login">
    <form class="login-form" @submit.prevent="login">
      <h2 class="login-title">Вход в админку</h2>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input 
          id="password" 
          type="password" 
          v-model="password" 
          placeholder="Введите пароль" 
          required 
        />
      </div>

      <button type="submit" class="btn btn--primary">Войти</button>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { setToken } from '../../utils/auth'
import { removeItem } from '../../utils/auth'

const password = ref('')
const error = ref(null)
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('http://:5000/api/login', { password: password.value })
    setToken(res.data.token)
    router.push('/admin-dashboard')
  } catch (err) {
    error.value = 'Неверный пароль'
  }
}
</script>

<style lang="scss" scoped>
.admin-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;

  .login-form {
    background: white;
    padding: 2.5rem 3rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    width: 320px;
    text-align: center;

    .login-title {
      margin-bottom: 2rem;
      font-weight: 600;
      font-size: 1.8rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
      text-align: left;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #555;
        font-size: 0.95rem;
      }

      input {
        width: 100%;
        padding: 0.6rem 0.8rem;
        font-size: 1rem;
        border: 1.8px solid #ccc;
        border-radius: 5px;
        transition: border-color 0.3s ease;

        &:focus {
          outline: none;
          border-color: #ff6b6b;
          box-shadow: 0 0 8px rgba(255, 107, 107, 0.4);
        }
      }
    }

    .btn {
      width: 100%;
      padding: 0.75rem 0;
      background-color: #ff6b6b;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken(#ff6b6b, 10%);
      }
    }

    .error-msg {
      margin-top: 1rem;
      color: #e74c3c;
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
}
</style>
