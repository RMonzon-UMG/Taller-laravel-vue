<template>
  <v-data-table
    :items="filtered"
    :headers="headers"
    :loading="loading"
    class="elevation-1"
  >
    <template #item.estado="{ item }">
      <v-chip
        :color="getEstadoColor(item.estado)"
        variant="flat"
        size="small"
      >
        {{ getEstadoLabel(item.estado) }}
      </v-chip>
    </template>
    
    <template #item.prioridad="{ item }">
      <v-chip
        :color="getPrioridadColor(item.prioridad)"
        variant="flat"
        size="small"
      >
        {{ getPrioridadLabel(item.prioridad) }}
      </v-chip>
    </template>
    
    <template #item.usuario="{ item }">
      {{ item.usuario?.nombre || 'Sin asignar' }}
    </template>
    
    <template #item.fecha_vencimiento="{ item }">
      {{ item.fecha_vencimiento ? formatDate(item.fecha_vencimiento) : 'Sin fecha' }}
    </template>
    
    <template #item.created_at="{ item }">
      {{ formatDate(item.created_at) }}
    </template>
    
    <template #item.actions="{ item }">
      <div class="d-flex">
        <v-btn
          size="small"
          color="primary"
          variant="outlined"
          class="me-2"
          @click="editTarea(item.id)"
        >
          Editar
        </v-btn>
        <v-btn
          size="small"
          color="error"
          variant="outlined"
          @click="deleteTarea(item.id)"
        >
          Eliminar
        </v-btn>
      </div>
    </template>
    
    <template #no-data>
      <div class="pa-6 text-center">No hay tareas para mostrar.</div>
    </template>
  </v-data-table>
  
  <v-dialog v-model="deleteDialog" max-width="400">
    <v-card>
      <v-card-title>Confirmar eliminación</v-card-title>
      <v-card-text>¿Estás seguro de que deseas eliminar esta tarea?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" variant="text" @click="deleteDialog = false">
          Cancelar
        </v-btn>
        <v-btn color="error" @click="confirmDelete">
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="3000"
  >
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

type Usuario = { id: number; nombre: string; email: string; rol: 'admin'|'usuario' }

type Tarea = {
  id: number
  titulo: string
  descripcion: string
  estado: 'pendiente'|'en_proceso'|'completada'
  fecha_vencimiento: string
  prioridad: 'baja'|'media'|'alta'
  usuario_id: number
  usuario?: Usuario
  created_at: string
}

const props = defineProps<{ searchTerm?: string }>()
const router = useRouter()

const items = ref<Tarea[]>([])
const loading = ref(false)
const deleteDialog = ref(false)
const tareaToDelete = ref<number | null>(null)

const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const headers = [
  { title: 'Título', value: 'titulo' },
  { title: 'Estado', value: 'estado' },
  { title: 'Prioridad', value: 'prioridad' },
  { title: 'Asignado a', value: 'usuario' },
  { title: 'Fecha Vencimiento', value: 'fecha_vencimiento' },
  { title: 'Fecha Creación', value: 'created_at', sortable: true },
  { title: 'Acciones', value: 'actions', sortable: false },
]

const fetchTareas = async () => {
  loading.value = true
  try {
    const { data } = await api.get<Tarea[]>('/tareas/listTareas')
    items.value = data
  } finally {
    loading.value = false
  }
}

const filtered = computed(() => {
  const q = (props.searchTerm || '').toLowerCase().trim()
  if (!q) return items.value
  return items.value.filter(t =>
    t.titulo.toLowerCase().includes(q) ||
    t.descripcion?.toLowerCase().includes(q) ||
    t.estado.toLowerCase().includes(q) ||
    t.usuario?.nombre?.toLowerCase().includes(q)
  )
})

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'pendiente': return 'orange'
    case 'en_proceso': return 'blue'
    case 'completada': return 'green'
    default: return 'grey'
  }
}

const getEstadoLabel = (estado: string) => {
  switch (estado) {
    case 'pendiente': return 'Pendiente'
    case 'en_proceso': return 'En Proceso'
    case 'completada': return 'Completada'
    default: return estado
  }
}

const getPrioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case 'baja': return 'green'
    case 'media': return 'orange'
    case 'alta': return 'red'
    default: return 'grey'
  }
}

const getPrioridadLabel = (prioridad: string) => {
  switch (prioridad) {
    case 'baja': return 'Baja'
    case 'media': return 'Media'
    case 'alta': return 'Alta'
    default: return prioridad
  }
}

const editTarea = (id: number) => {
  router.push(`/tareas/${id}/editar`)
}

const deleteTarea = (id: number) => {
  tareaToDelete.value = id
  deleteDialog.value = true
}

const confirmDelete = async () => {
  if (!tareaToDelete.value) return
  
  try {
    await api.delete(`/tareas/deleteTarea/${tareaToDelete.value}`)
    snackbar.value = {
      show: true,
      message: 'Tarea eliminada correctamente',
      color: 'success'
    }
    await fetchTareas()
  } catch (error: any) {
    snackbar.value = {
      show: true,
      message: error.response?.data?.message || 'Error al eliminar la tarea',
      color: 'error'
    }
  } finally {
    deleteDialog.value = false
    tareaToDelete.value = null
  }
}

onMounted(fetchTareas)

defineExpose({
  fetchTareas
})
</script>