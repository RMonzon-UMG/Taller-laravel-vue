<template>
  <v-container fluid>
    <v-row>
      <!-- Sidebar -->
      <v-col cols="12" md="3">
        <v-card class="pa-4">
          <div class="text-subtitle-1 mb-2">Acciones</div>

          <!-- Agregar tarea -->
          <v-btn
            block color="primary" class="mb-3"
            @click="goAddTarea"
          >
            Nueva Tarea
          </v-btn>

          <!-- Buscar tareas -->
          <v-text-field
            v-model="search"
            label="Buscar tareas"
            prepend-inner-icon="mdi-magnify"
            density="comfortable"
            clearable
            class="mb-4"
          />

          <!-- Navegación -->
          <v-btn 
            block 
            color="secondary" 
            variant="tonal" 
            class="mb-3"
            @click="goToUsers"
          >
            Ver Usuarios
          </v-btn>

          <v-btn block color="error" variant="tonal" @click="logout">
            Cerrar sesión
          </v-btn>

          <v-divider class="my-4" />

          <div class="text-caption">
            Sesión: <strong>{{ user?.nombre }}</strong> ({{ user?.rol }})
          </div>
        </v-card>
      </v-col>

      <!-- Contenido principal -->
      <v-col cols="12" md="9">
        <v-card class="pa-4">
          <div class="text-h6 mb-4">Gestión de Tareas</div>
          <!-- Componente que pinta la tabla de tareas -->
          <TareasList :search-term="search" ref="tareasListRef" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import TareasList from '@/views/TareasList.vue'

type User = { id:number; nombre:string; email:string; rol:'admin'|'usuario' }

const router = useRouter()
const search = ref('')
const tareasListRef = ref()

const user = ref<User | null>(null)
onMounted(() => {
  const raw = localStorage.getItem('user')
  user.value = raw ? JSON.parse(raw) as User : null
})

const goAddTarea = () => router.push('/tareas/nueva')

const goToUsers = () => router.push('/usuarios')

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>