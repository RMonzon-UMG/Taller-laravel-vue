import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api';
const router = useRouter();
const route = useRoute();
const form = ref();
const valid = ref(false);
const loading = ref(false);
const loadingUsuarios = ref(false);
const isEdit = computed(() => !!route.params.id);
const formData = ref({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    fecha_vencimiento: '',
    prioridad: 'media',
    usuario_id: null
});
const usuarios = ref([]);
const estadoOptions = [
    { title: 'Pendiente', value: 'pendiente' },
    { title: 'En Proceso', value: 'en_proceso' },
    { title: 'Completada', value: 'completada' }
];
const prioridadOptions = [
    { title: 'Baja', value: 'baja' },
    { title: 'Media', value: 'media' },
    { title: 'Alta', value: 'alta' }
];
const rules = {
    required: (value) => !!value || 'Este campo es obligatorio'
};
const snackbar = ref({
    show: false,
    message: '',
    color: 'success'
});
const showMessage = (message, color = 'success') => {
    snackbar.value = { show: true, message, color };
};
const fetchUsuarios = async () => {
    loadingUsuarios.value = true;
    try {
        const { data } = await api.get('/usuarios/listUsers');
        usuarios.value = data;
    }
    catch (error) {
        showMessage('Error al cargar usuarios', 'error');
    }
    finally {
        loadingUsuarios.value = false;
    }
};
const submitForm = async () => {
    if (!form.value?.validate())
        return;
    loading.value = true;
    try {
        const payload = { ...formData.value };
        // Si no hay fecha de vencimiento, enviar null
        if (!payload.fecha_vencimiento) {
            payload.fecha_vencimiento = '';
        }
        if (isEdit.value) {
            await api.put(`/tareas/updateTarea/${route.params.id}`, payload);
            showMessage('Tarea actualizada correctamente');
        }
        else {
            await api.post('/tareas/addTarea', payload);
            showMessage('Tarea creada correctamente');
        }
        setTimeout(() => router.push('/tareas'), 1500);
    }
    catch (error) {
        const message = error.response?.data?.message || 'Error al procesar la solicitud';
        showMessage(message, 'error');
    }
    finally {
        loading.value = false;
    }
};
const goBack = () => {
    router.push('/tareas');
};
onMounted(async () => {
    await fetchUsuarios();
    if (isEdit.value) {
        try {
            const { data } = await api.get(`/tareas/getTarea/${route.params.id}`);
            formData.value = {
                titulo: data.titulo,
                descripcion: data.descripcion || '',
                estado: data.estado,
                fecha_vencimiento: data.fecha_vencimiento || '',
                prioridad: data.prioridad,
                usuario_id: data.usuario_id
            };
        }
        catch (error) {
            showMessage('Error al cargar la tarea', 'error');
            router.push('/tareas');
        }
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
VContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    justify: "center",
}));
const __VLS_8 = __VLS_7({
    justify: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
const __VLS_11 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    cols: "12",
    md: "8",
}));
const __VLS_13 = __VLS_12({
    cols: "12",
    md: "8",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
const __VLS_16 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_20 } = __VLS_19.slots;
const __VLS_21 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
VCardTitle;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ class: "text-h5" },
}));
const __VLS_23 = __VLS_22({
    ...{ class: "text-h5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_25 } = __VLS_24.slots;
(__VLS_ctx.isEdit ? 'Editar Tarea' : 'Nueva Tarea');
// @ts-ignore
[isEdit,];
var __VLS_24;
const __VLS_26 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
VCardText;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const { default: __VLS_30 } = __VLS_29.slots;
const __VLS_31 = {}.VForm;
/** @type {[typeof __VLS_components.VForm, typeof __VLS_components.vForm, typeof __VLS_components.VForm, typeof __VLS_components.vForm, ]} */ ;
// @ts-ignore
VForm;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    ...{ 'onSubmit': {} },
    ref: "form",
    modelValue: (__VLS_ctx.valid),
}));
const __VLS_33 = __VLS_32({
    ...{ 'onSubmit': {} },
    ref: "form",
    modelValue: (__VLS_ctx.valid),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
let __VLS_35;
let __VLS_36;
const __VLS_37 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.submitForm) });
/** @type {typeof __VLS_ctx.form} */ ;
var __VLS_38 = {};
const { default: __VLS_40 } = __VLS_34.slots;
// @ts-ignore
[valid, submitForm, form,];
const __VLS_41 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    modelValue: (__VLS_ctx.formData.titulo),
    label: "Título",
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}));
const __VLS_43 = __VLS_42({
    modelValue: (__VLS_ctx.formData.titulo),
    label: "Título",
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
// @ts-ignore
[formData, rules,];
const __VLS_46 = {}.VTextarea;
/** @type {[typeof __VLS_components.VTextarea, typeof __VLS_components.vTextarea, ]} */ ;
// @ts-ignore
VTextarea;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    modelValue: (__VLS_ctx.formData.descripcion),
    label: "Descripción",
    variant: "outlined",
    ...{ class: "mb-3" },
    rows: "3",
}));
const __VLS_48 = __VLS_47({
    modelValue: (__VLS_ctx.formData.descripcion),
    label: "Descripción",
    variant: "outlined",
    ...{ class: "mb-3" },
    rows: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
// @ts-ignore
[formData,];
const __VLS_51 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({}));
const __VLS_53 = __VLS_52({}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_55 } = __VLS_54.slots;
const __VLS_56 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    cols: "12",
    md: "6",
}));
const __VLS_58 = __VLS_57({
    cols: "12",
    md: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_60 } = __VLS_59.slots;
const __VLS_61 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
VSelect;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    modelValue: (__VLS_ctx.formData.estado),
    label: "Estado",
    items: (__VLS_ctx.estadoOptions),
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}));
const __VLS_63 = __VLS_62({
    modelValue: (__VLS_ctx.formData.estado),
    label: "Estado",
    items: (__VLS_ctx.estadoOptions),
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
// @ts-ignore
[formData, rules, estadoOptions,];
var __VLS_59;
const __VLS_66 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    cols: "12",
    md: "6",
}));
const __VLS_68 = __VLS_67({
    cols: "12",
    md: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_70 } = __VLS_69.slots;
const __VLS_71 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
VSelect;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
    modelValue: (__VLS_ctx.formData.prioridad),
    label: "Prioridad",
    items: (__VLS_ctx.prioridadOptions),
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}));
const __VLS_73 = __VLS_72({
    modelValue: (__VLS_ctx.formData.prioridad),
    label: "Prioridad",
    items: (__VLS_ctx.prioridadOptions),
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
// @ts-ignore
[formData, rules, prioridadOptions,];
var __VLS_69;
var __VLS_54;
const __VLS_76 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({}));
const __VLS_78 = __VLS_77({}, ...__VLS_functionalComponentArgsRest(__VLS_77));
const { default: __VLS_80 } = __VLS_79.slots;
const __VLS_81 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    cols: "12",
    md: "6",
}));
const __VLS_83 = __VLS_82({
    cols: "12",
    md: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
const { default: __VLS_85 } = __VLS_84.slots;
const __VLS_86 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
VSelect;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    modelValue: (__VLS_ctx.formData.usuario_id),
    label: "Asignar a",
    items: (__VLS_ctx.usuarios),
    itemTitle: "nombre",
    itemValue: "id",
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
    loading: (__VLS_ctx.loadingUsuarios),
}));
const __VLS_88 = __VLS_87({
    modelValue: (__VLS_ctx.formData.usuario_id),
    label: "Asignar a",
    items: (__VLS_ctx.usuarios),
    itemTitle: "nombre",
    itemValue: "id",
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
    loading: (__VLS_ctx.loadingUsuarios),
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
// @ts-ignore
[formData, rules, usuarios, loadingUsuarios,];
var __VLS_84;
const __VLS_91 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({
    cols: "12",
    md: "6",
}));
const __VLS_93 = __VLS_92({
    cols: "12",
    md: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_92));
const { default: __VLS_95 } = __VLS_94.slots;
const __VLS_96 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
    modelValue: (__VLS_ctx.formData.fecha_vencimiento),
    label: "Fecha de Vencimiento",
    type: "date",
    variant: "outlined",
    ...{ class: "mb-3" },
}));
const __VLS_98 = __VLS_97({
    modelValue: (__VLS_ctx.formData.fecha_vencimiento),
    label: "Fecha de Vencimiento",
    type: "date",
    variant: "outlined",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
// @ts-ignore
[formData,];
var __VLS_94;
var __VLS_79;
var __VLS_34;
var __VLS_29;
const __VLS_101 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
VCardActions;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
    ...{ class: "pa-4" },
}));
const __VLS_103 = __VLS_102({
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const { default: __VLS_105 } = __VLS_104.slots;
const __VLS_106 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
VSpacer;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({}));
const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
const __VLS_111 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111({
    ...{ 'onClick': {} },
    color: "grey",
    variant: "text",
}));
const __VLS_113 = __VLS_112({
    ...{ 'onClick': {} },
    color: "grey",
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
let __VLS_115;
let __VLS_116;
const __VLS_117 = ({ click: {} },
    { onClick: (__VLS_ctx.goBack) });
const { default: __VLS_118 } = __VLS_114.slots;
// @ts-ignore
[goBack,];
var __VLS_114;
const __VLS_119 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
    ...{ 'onClick': {} },
    color: "primary",
    loading: (__VLS_ctx.loading),
    disabled: (!__VLS_ctx.valid),
}));
const __VLS_121 = __VLS_120({
    ...{ 'onClick': {} },
    color: "primary",
    loading: (__VLS_ctx.loading),
    disabled: (!__VLS_ctx.valid),
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
let __VLS_123;
let __VLS_124;
const __VLS_125 = ({ click: {} },
    { onClick: (__VLS_ctx.submitForm) });
const { default: __VLS_126 } = __VLS_122.slots;
// @ts-ignore
[valid, submitForm, loading,];
(__VLS_ctx.isEdit ? 'Actualizar' : 'Crear');
// @ts-ignore
[isEdit,];
var __VLS_122;
var __VLS_104;
var __VLS_19;
var __VLS_14;
var __VLS_9;
const __VLS_127 = {}.VSnackbar;
/** @type {[typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, ]} */ ;
// @ts-ignore
VSnackbar;
// @ts-ignore
const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    timeout: (3000),
}));
const __VLS_129 = __VLS_128({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    timeout: (3000),
}, ...__VLS_functionalComponentArgsRest(__VLS_128));
const { default: __VLS_131 } = __VLS_130.slots;
// @ts-ignore
[snackbar, snackbar,];
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar,];
var __VLS_130;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
// @ts-ignore
var __VLS_39 = __VLS_38;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        form: form,
        valid: valid,
        loading: loading,
        loadingUsuarios: loadingUsuarios,
        isEdit: isEdit,
        formData: formData,
        usuarios: usuarios,
        estadoOptions: estadoOptions,
        prioridadOptions: prioridadOptions,
        rules: rules,
        snackbar: snackbar,
        submitForm: submitForm,
        goBack: goBack,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
