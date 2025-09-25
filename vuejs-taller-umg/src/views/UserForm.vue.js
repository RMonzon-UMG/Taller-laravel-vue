import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api';
const router = useRouter();
const route = useRoute();
const form = ref();
const valid = ref(false);
const loading = ref(false);
const isEdit = computed(() => !!route.params.id);
const formData = ref({
    nombre: '',
    email: '',
    password: '',
    rol: ''
});
const roles = [
    { title: 'Administrador', value: 'admin' },
    { title: 'Usuario', value: 'usuario' }
];
const rules = {
    required: (value) => !!value || 'Este campo es obligatorio',
    email: (value) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value) || 'Email inválido';
    },
    minLength: (value) => value.length >= 6 || 'Mínimo 6 caracteres'
};
const snackbar = ref({
    show: false,
    message: '',
    color: 'success'
});
const showMessage = (message, color = 'success') => {
    snackbar.value = { show: true, message, color };
};
const submitForm = async () => {
    if (!form.value?.validate())
        return;
    loading.value = true;
    try {
        const payload = { ...formData.value };
        if (isEdit.value && !payload.password) {
            delete payload.password;
        }
        if (isEdit.value) {
            await api.put(`/usuarios/updateUser/${route.params.id}`, payload);
            showMessage('Usuario actualizado correctamente');
        }
        else {
            await api.post('/usuarios/addUser', payload);
            showMessage('Usuario creado correctamente');
        }
        setTimeout(() => router.push('/usuarios'), 1500);
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
    router.push('/usuarios');
};
onMounted(async () => {
    if (isEdit.value) {
        try {
            const { data } = await api.get(`/usuarios/getUser/${route.params.id}`);
            formData.value = {
                nombre: data.nombre,
                email: data.email,
                password: '',
                rol: data.rol
            };
        }
        catch (error) {
            showMessage('Error al cargar el usuario', 'error');
            router.push('/usuarios');
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
    md: "6",
}));
const __VLS_13 = __VLS_12({
    cols: "12",
    md: "6",
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
(__VLS_ctx.isEdit ? 'Editar Usuario' : 'Agregar Usuario');
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
    modelValue: (__VLS_ctx.formData.nombre),
    label: "Nombre",
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}));
const __VLS_43 = __VLS_42({
    modelValue: (__VLS_ctx.formData.nombre),
    label: "Nombre",
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
// @ts-ignore
[formData, rules,];
const __VLS_46 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    modelValue: (__VLS_ctx.formData.email),
    label: "Email",
    type: "email",
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.email]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}));
const __VLS_48 = __VLS_47({
    modelValue: (__VLS_ctx.formData.email),
    label: "Email",
    type: "email",
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.email]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
// @ts-ignore
[formData, rules, rules,];
const __VLS_51 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    modelValue: (__VLS_ctx.formData.password),
    label: "Contraseña",
    type: "password",
    rules: (__VLS_ctx.isEdit ? [] : [__VLS_ctx.rules.required, __VLS_ctx.rules.minLength]),
    required: (!__VLS_ctx.isEdit),
    variant: "outlined",
    ...{ class: "mb-3" },
    hint: (__VLS_ctx.isEdit ? 'Dejar en blanco para mantener la contraseña actual' : ''),
    persistentHint: true,
}));
const __VLS_53 = __VLS_52({
    modelValue: (__VLS_ctx.formData.password),
    label: "Contraseña",
    type: "password",
    rules: (__VLS_ctx.isEdit ? [] : [__VLS_ctx.rules.required, __VLS_ctx.rules.minLength]),
    required: (!__VLS_ctx.isEdit),
    variant: "outlined",
    ...{ class: "mb-3" },
    hint: (__VLS_ctx.isEdit ? 'Dejar en blanco para mantener la contraseña actual' : ''),
    persistentHint: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
// @ts-ignore
[isEdit, isEdit, isEdit, formData, rules, rules,];
const __VLS_56 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
VSelect;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    modelValue: (__VLS_ctx.formData.rol),
    label: "Rol",
    items: (__VLS_ctx.roles),
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}));
const __VLS_58 = __VLS_57({
    modelValue: (__VLS_ctx.formData.rol),
    label: "Rol",
    items: (__VLS_ctx.roles),
    rules: ([__VLS_ctx.rules.required]),
    required: true,
    variant: "outlined",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
// @ts-ignore
[formData, rules, roles,];
var __VLS_34;
var __VLS_29;
const __VLS_61 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
VCardActions;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    ...{ class: "pa-4" },
}));
const __VLS_63 = __VLS_62({
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
const { default: __VLS_65 } = __VLS_64.slots;
const __VLS_66 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
VSpacer;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({}));
const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const __VLS_71 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
    ...{ 'onClick': {} },
    color: "grey",
    variant: "text",
}));
const __VLS_73 = __VLS_72({
    ...{ 'onClick': {} },
    color: "grey",
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
let __VLS_75;
let __VLS_76;
const __VLS_77 = ({ click: {} },
    { onClick: (__VLS_ctx.goBack) });
const { default: __VLS_78 } = __VLS_74.slots;
// @ts-ignore
[goBack,];
var __VLS_74;
const __VLS_79 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    ...{ 'onClick': {} },
    color: "primary",
    loading: (__VLS_ctx.loading),
    disabled: (!__VLS_ctx.valid),
}));
const __VLS_81 = __VLS_80({
    ...{ 'onClick': {} },
    color: "primary",
    loading: (__VLS_ctx.loading),
    disabled: (!__VLS_ctx.valid),
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
let __VLS_83;
let __VLS_84;
const __VLS_85 = ({ click: {} },
    { onClick: (__VLS_ctx.submitForm) });
const { default: __VLS_86 } = __VLS_82.slots;
// @ts-ignore
[valid, submitForm, loading,];
(__VLS_ctx.isEdit ? 'Actualizar' : 'Crear');
// @ts-ignore
[isEdit,];
var __VLS_82;
var __VLS_64;
var __VLS_19;
var __VLS_14;
var __VLS_9;
const __VLS_87 = {}.VSnackbar;
/** @type {[typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, ]} */ ;
// @ts-ignore
VSnackbar;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    timeout: (3000),
    top: true,
}));
const __VLS_89 = __VLS_88({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    timeout: (3000),
    top: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_91 } = __VLS_90.slots;
// @ts-ignore
[snackbar, snackbar,];
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar,];
var __VLS_90;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
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
        isEdit: isEdit,
        formData: formData,
        roles: roles,
        rules: rules,
        snackbar: snackbar,
        submitForm: submitForm,
        goBack: goBack,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
