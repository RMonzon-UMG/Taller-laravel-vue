<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">
            {{ isEdit ? 'Editar Usuario' : 'Agregar Usuario' }}
          </v-card-title>
          
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
              <v-text-field
                v-model="formData.nombre"
                label="Nombre"
                :rules="[rules.required]"
                required
                variant="outlined"
                class="mb-3"
              />
              
              <v-text-field
                v-model="formData.email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
                required
                variant="outlined"
                class="mb-3"
              />
              
              <v-text-field
                v-model="formData.password"
                label="Contraseña"
                type="password"
                :rules="isEdit ? [] : [rules.required, rules.minLength]"
                :required="!isEdit"
                variant="outlined"
                class="mb-3"
                :hint="isEdit ? 'Dejar en blanco para mantener la contraseña actual' : ''"
                persistent-hint
              />
              
              <v-select
                v-model="formData.rol"
                label="Rol"
                :items="roles"
                :rules="[rules.required]"
                required
                variant="outlined"
                class="mb-3"
              />
            </v-form>
          </v-card-text>
          
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn 
              color="grey" 
              variant="text"
              @click="goBack"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!valid"
              @click="submitForm"
            >
              {{ isEdit ? 'Actualizar' : 'Crear' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'

interface FormData {
  nombre: string
  email: string
  password: string
  rol: string
}

const router = useRouter()
const route = useRoute()

const form = ref()
const valid = ref(false)
const loading = ref(false)
const isEdit = computed(() => !!route.params.id)

const formData = ref<FormData>({
  nombre: '',
  email: '',
  password: '',
  rol: ''
})

const roles = [
  { title: 'Administrador', value: 'admin' },
  { title: 'Usuario', value: 'usuario' }
]

const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Email inválido'
  },
  minLength: (value: string) => value.length >= 6 || 'Mínimo 6 caracteres'
}

const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const showMessage = (message: string, color: string = 'success') => {
  snackbar.value = { show: true, message, color }
}

const submitForm = async () => {
  if (!form.value?.validate()) return
  
  loading.value = true
  
  try {
    const payload = { ...formData.value }
    
    if (isEdit.value && !payload.password) {
      delete payload.password
    }
    
    if (isEdit.value) {
      await api.put(`/usuarios/updateUser/${route.params.id}`, payload)
      showMessage('Usuario actualizado correctamente')
    } else {
      await api.post('/usuarios/addUser', payload)
      showMessage('Usuario creado correctamente')
    }
    
    setTimeout(() => router.push('/usuarios'), 1500)
    
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al procesar la solicitud'
    showMessage(message, 'error')
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/usuarios')
}

onMounted(async () => {
  if (isEdit.value) {
    try {
      const { data } = await api.get(`/usuarios/getUser/${route.params.id}`)
      formData.value = {
        nombre: data.nombre,
        email: data.email,
        password: '',
        rol: data.rol
      }
    } catch (error) {
      showMessage('Error al cargar el usuario', 'error')
      router.push('/usuarios')
    }
  }
})
</script>