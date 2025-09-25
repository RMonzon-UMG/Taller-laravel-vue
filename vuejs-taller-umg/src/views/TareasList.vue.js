import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
const props = defineProps();
const router = useRouter();
const items = ref([]);
const loading = ref(false);
const deleteDialog = ref(false);
const tareaToDelete = ref(null);
const snackbar = ref({
    show: false,
    message: '',
    color: 'success'
});
const headers = [
    { title: 'Título', value: 'titulo' },
    { title: 'Estado', value: 'estado' },
    { title: 'Prioridad', value: 'prioridad' },
    { title: 'Asignado a', value: 'usuario' },
    { title: 'Fecha Vencimiento', value: 'fecha_vencimiento' },
    { title: 'Fecha Creación', value: 'created_at', sortable: true },
    { title: 'Acciones', value: 'actions', sortable: false },
];
const fetchTareas = async () => {
    loading.value = true;
    try {
        const { data } = await api.get('/tareas/listTareas');
        items.value = data;
    }
    finally {
        loading.value = false;
    }
};
const filtered = computed(() => {
    const q = (props.searchTerm || '').toLowerCase().trim();
    if (!q)
        return items.value;
    return items.value.filter(t => t.titulo.toLowerCase().includes(q) ||
        t.descripcion?.toLowerCase().includes(q) ||
        t.estado.toLowerCase().includes(q) ||
        t.usuario?.nombre?.toLowerCase().includes(q));
});
const formatDate = (dateString) => {
    if (!dateString)
        return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};
const getEstadoColor = (estado) => {
    switch (estado) {
        case 'pendiente': return 'orange';
        case 'en_proceso': return 'blue';
        case 'completada': return 'green';
        default: return 'grey';
    }
};
const getEstadoLabel = (estado) => {
    switch (estado) {
        case 'pendiente': return 'Pendiente';
        case 'en_proceso': return 'En Proceso';
        case 'completada': return 'Completada';
        default: return estado;
    }
};
const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
        case 'baja': return 'green';
        case 'media': return 'orange';
        case 'alta': return 'red';
        default: return 'grey';
    }
};
const getPrioridadLabel = (prioridad) => {
    switch (prioridad) {
        case 'baja': return 'Baja';
        case 'media': return 'Media';
        case 'alta': return 'Alta';
        default: return prioridad;
    }
};
const editTarea = (id) => {
    router.push(`/tareas/${id}/editar`);
};
const deleteTarea = (id) => {
    tareaToDelete.value = id;
    deleteDialog.value = true;
};
const confirmDelete = async () => {
    if (!tareaToDelete.value)
        return;
    try {
        await api.delete(`/tareas/deleteTarea/${tareaToDelete.value}`);
        snackbar.value = {
            show: true,
            message: 'Tarea eliminada correctamente',
            color: 'success'
        };
        await fetchTareas();
    }
    catch (error) {
        snackbar.value = {
            show: true,
            message: error.response?.data?.message || 'Error al eliminar la tarea',
            color: 'error'
        };
    }
    finally {
        deleteDialog.value = false;
        tareaToDelete.value = null;
    }
};
onMounted(fetchTareas);
const __VLS_exposed = {
    fetchTareas
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VDataTable;
/** @type {[typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, ]} */ ;
// @ts-ignore
VDataTable;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    items: (__VLS_ctx.filtered),
    headers: (__VLS_ctx.headers),
    loading: (__VLS_ctx.loading),
    ...{ class: "elevation-1" },
}));
const __VLS_2 = __VLS_1({
    items: (__VLS_ctx.filtered),
    headers: (__VLS_ctx.headers),
    loading: (__VLS_ctx.loading),
    ...{ class: "elevation-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
// @ts-ignore
[filtered, headers, loading,];
{
    const { 'item.estado': __VLS_5 } = __VLS_3.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_5);
    const __VLS_6 = {}.VChip;
    /** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
    // @ts-ignore
    VChip;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        color: (__VLS_ctx.getEstadoColor(item.estado)),
        variant: "flat",
        size: "small",
    }));
    const __VLS_8 = __VLS_7({
        color: (__VLS_ctx.getEstadoColor(item.estado)),
        variant: "flat",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const { default: __VLS_10 } = __VLS_9.slots;
    // @ts-ignore
    [getEstadoColor,];
    (__VLS_ctx.getEstadoLabel(item.estado));
    // @ts-ignore
    [getEstadoLabel,];
    var __VLS_9;
}
{
    const { 'item.prioridad': __VLS_11 } = __VLS_3.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_11);
    const __VLS_12 = {}.VChip;
    /** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
    // @ts-ignore
    VChip;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        color: (__VLS_ctx.getPrioridadColor(item.prioridad)),
        variant: "flat",
        size: "small",
    }));
    const __VLS_14 = __VLS_13({
        color: (__VLS_ctx.getPrioridadColor(item.prioridad)),
        variant: "flat",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const { default: __VLS_16 } = __VLS_15.slots;
    // @ts-ignore
    [getPrioridadColor,];
    (__VLS_ctx.getPrioridadLabel(item.prioridad));
    // @ts-ignore
    [getPrioridadLabel,];
    var __VLS_15;
}
{
    const { 'item.usuario': __VLS_17 } = __VLS_3.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_17);
    (item.usuario?.nombre || 'Sin asignar');
}
{
    const { 'item.fecha_vencimiento': __VLS_18 } = __VLS_3.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_18);
    (item.fecha_vencimiento ? __VLS_ctx.formatDate(item.fecha_vencimiento) : 'Sin fecha');
    // @ts-ignore
    [formatDate,];
}
{
    const { 'item.created_at': __VLS_19 } = __VLS_3.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_19);
    (__VLS_ctx.formatDate(item.created_at));
    // @ts-ignore
    [formatDate,];
}
{
    const { 'item.actions': __VLS_20 } = __VLS_3.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_20);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "d-flex" },
    });
    const __VLS_21 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    VBtn;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ 'onClick': {} },
        size: "small",
        color: "primary",
        variant: "outlined",
        ...{ class: "me-2" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onClick': {} },
        size: "small",
        color: "primary",
        variant: "outlined",
        ...{ class: "me-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.editTarea(item.id);
                // @ts-ignore
                [editTarea,];
            } });
    const { default: __VLS_28 } = __VLS_24.slots;
    var __VLS_24;
    const __VLS_29 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    VBtn;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        ...{ 'onClick': {} },
        size: "small",
        color: "error",
        variant: "outlined",
    }));
    const __VLS_31 = __VLS_30({
        ...{ 'onClick': {} },
        size: "small",
        color: "error",
        variant: "outlined",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    let __VLS_33;
    let __VLS_34;
    const __VLS_35 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.deleteTarea(item.id);
                // @ts-ignore
                [deleteTarea,];
            } });
    const { default: __VLS_36 } = __VLS_32.slots;
    var __VLS_32;
}
{
    const { 'no-data': __VLS_37 } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "pa-6 text-center" },
    });
}
var __VLS_3;
const __VLS_38 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
VDialog;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "400",
}));
const __VLS_40 = __VLS_39({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "400",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const { default: __VLS_42 } = __VLS_41.slots;
// @ts-ignore
[deleteDialog,];
const __VLS_43 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({}));
const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
const { default: __VLS_47 } = __VLS_46.slots;
const __VLS_48 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
VCardTitle;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const { default: __VLS_52 } = __VLS_51.slots;
var __VLS_51;
const __VLS_53 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
VCardText;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({}));
const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
const { default: __VLS_57 } = __VLS_56.slots;
var __VLS_56;
const __VLS_58 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
VCardActions;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({}));
const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_62 } = __VLS_61.slots;
const __VLS_63 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
VSpacer;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({}));
const __VLS_65 = __VLS_64({}, ...__VLS_functionalComponentArgsRest(__VLS_64));
const __VLS_68 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    ...{ 'onClick': {} },
    color: "grey",
    variant: "text",
}));
const __VLS_70 = __VLS_69({
    ...{ 'onClick': {} },
    color: "grey",
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
let __VLS_72;
let __VLS_73;
const __VLS_74 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.deleteDialog = false;
            // @ts-ignore
            [deleteDialog,];
        } });
const { default: __VLS_75 } = __VLS_71.slots;
var __VLS_71;
const __VLS_76 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    ...{ 'onClick': {} },
    color: "error",
}));
const __VLS_78 = __VLS_77({
    ...{ 'onClick': {} },
    color: "error",
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
let __VLS_80;
let __VLS_81;
const __VLS_82 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_83 } = __VLS_79.slots;
// @ts-ignore
[confirmDelete,];
var __VLS_79;
var __VLS_61;
var __VLS_46;
var __VLS_41;
const __VLS_84 = {}.VSnackbar;
/** @type {[typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, ]} */ ;
// @ts-ignore
VSnackbar;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    timeout: (3000),
}));
const __VLS_86 = __VLS_85({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    timeout: (3000),
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const { default: __VLS_88 } = __VLS_87.slots;
// @ts-ignore
[snackbar, snackbar,];
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar,];
var __VLS_87;
/** @type {__VLS_StyleScopedClasses['elevation-1']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['me-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
        deleteDialog: deleteDialog,
        snackbar: snackbar,
        headers: headers,
        filtered: filtered,
        formatDate: formatDate,
        getEstadoColor: getEstadoColor,
        getEstadoLabel: getEstadoLabel,
        getPrioridadColor: getPrioridadColor,
        getPrioridadLabel: getPrioridadLabel,
        editTarea: editTarea,
        deleteTarea: deleteTarea,
        confirmDelete: confirmDelete,
    }),
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
