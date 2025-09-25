<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">
            {{ isEdit ? 'Editar Tarea' : 'Nueva Tarea' }}
          </v-card-title>
          
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
              <v-text-field
                v-model="formData.titulo"
                label="Título"
                :rules="[rules.required]"
                required
                variant="outlined"
                class="mb-3"
              />
              
              <v-textarea
                v-model="formData.descripcion"
                label="Descripción"
                variant="outlined"
                class="mb-3"
                rows="3"
              />
              
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.estado"
                    label="Estado"
                    :items="estadoOptions"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    class="mb-3"
                  />
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.prioridad"
                    label="Prioridad"
                    :items="prioridadOptions"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    class="mb-3"
                  />
                </v-col>
              </v-row>
              
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.usuario_id"
                    label="Asignar a"
                    :items="usuarios"
                    item-title="nombre"
                    item-value="id"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    class="mb-3"
                    :loading="loadingUsuarios"
                  />
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.fecha_vencimiento"
                    label="Fecha de Vencimiento"
                    type="date"
                    variant="outlined"
                    class="mb-3"
                  />
                </v-col>
              </v-row>
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
  titulo: string
  descripcion: string
  estado: string
  fecha_vencimiento: string
  prioridad: string
  usuario_id: number | null
}

type Usuario = { id: number; nombre: string; email: string; rol: 'admin'|'usuario' }

const router = useRouter()
const route = useRoute()

const form = ref()
const valid = ref(false)
const loading = ref(false)
const loadingUsuarios = ref(false)
const isEdit = computed(() => !!route.params.id)

const formData = ref<FormData>({
  titulo: '',
  descripcion: '',
  estado: 'pendiente',
  fecha_vencimiento: '',
  prioridad: 'media',
  usuario_id: null
})

const usuarios = ref<Usuario[]>([])

const estadoOptions = [
  { title: 'Pendiente', value: 'pendiente' },
  { title: 'En Proceso', value: 'en_proceso' },
  { title: 'Completada', value: 'completada' }
]

const prioridadOptions = [
  { title: 'Baja', value: 'baja' },
  { title: 'Media', value: 'media' },
  { title: 'Alta', value: 'alta' }
]

const rules = {
  required: (value: any) => !!value || 'Este campo es obligatorio'
}

const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const showMessage = (message: string, color: string = 'success') => {
  snackbar.value = { show: true, message, color }
}

const fetchUsuarios = async () => {
  loadingUsuarios.value = true
  try {
    const { data } = await api.get<Usuario[]>('/usuarios/listUsers')
    usuarios.value = data
  } catch (error) {
    showMessage('Error al cargar usuarios', 'error')
  } finally {
    loadingUsuarios.value = false
  }
}

const submitForm = async () => {
  if (!form.value?.validate()) return
  
  loading.value = true
  
  try {
    const payload = { ...formData.value }
    
    // Si no hay fecha de vencimiento, enviar null
    if (!payload.fecha_vencimiento) {
      payload.fecha_vencimiento = ''
    }
    
    if (isEdit.value) {
      await api.put(`/tareas/updateTarea/${route.params.id}`, payload)
      showMessage('Tarea actualizada correctamente')
    } else {
      await api.post('/tareas/addTarea', payload)
      showMessage('Tarea creada correctamente')
    }
    
    setTimeout(() => router.push('/tareas'), 1500)
    
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al procesar la solicitud'
    showMessage(message, 'error')
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/tareas')
}

onMounted(async () => {
  await fetchUsuarios()
  
  if (isEdit.value) {
    try {
      const { data } = await api.get(`/tareas/getTarea/${route.params.id}`)
      formData.value = {
        titulo: data.titulo,
        descripcion: data.descripcion || '',
        estado: data.estado,
        fecha_vencimiento: data.fecha_vencimiento || '',
        prioridad: data.prioridad,
        usuario_id: data.usuario_id
      }
    } catch (error) {
      showMessage('Error al cargar la tarea', 'error')
      router.push('/tareas')
    }
  }
})
</script>