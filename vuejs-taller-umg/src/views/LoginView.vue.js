import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
const router = useRouter();
const route = useRoute();
const { login } = useAuth();
const email = ref('');
const password = ref('');
const loading = ref(false);
const valid = ref(false);
const errorMsg = ref('');
const rules = {
    required: (v) => !!v || 'Requerido',
    email: (v) => /.+@.+\..+/.test(v) || 'Email inválido',
    min6: (v) => (v?.length ?? 0) >= 6 || 'Mínimo 6 caracteres',
};
const onSubmit = async () => {
    errorMsg.value = '';
    loading.value = true;
    try {
        await login(email.value, password.value);
        const redirect = route.query.redirect || '/usuarios';
        router.push(redirect);
    }
    catch (error) {
        errorMsg.value = error.message || 'No se pudo iniciar sesión. Verifica tus credenciales.';
    }
    finally {
        loading.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
VContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "d-flex align-center justify-center fill-height" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "d-flex align-center justify-center fill-height" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    ...{ class: "w-full max-w-md p-6 rounded-2xl" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "w-full max-w-md p-6 rounded-2xl" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-center mb-4" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-xl font-semibold" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-sm text-gray-500" },
});
const __VLS_11 = {}.VForm;
/** @type {[typeof __VLS_components.VForm, typeof __VLS_components.vForm, typeof __VLS_components.VForm, typeof __VLS_components.vForm, ]} */ ;
// @ts-ignore
VForm;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.valid),
}));
const __VLS_13 = __VLS_12({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.valid),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_15;
let __VLS_16;
const __VLS_17 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.onSubmit) });
const { default: __VLS_18 } = __VLS_14.slots;
// @ts-ignore
[valid, onSubmit,];
const __VLS_19 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    type: "email",
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.email]),
    prependInnerIcon: "mdi-email",
    density: "comfortable",
    clearable: true,
}));
const __VLS_21 = __VLS_20({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    type: "email",
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.email]),
    prependInnerIcon: "mdi-email",
    density: "comfortable",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
// @ts-ignore
[email, rules, rules,];
const __VLS_24 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    modelValue: (__VLS_ctx.password),
    label: "Password",
    type: "password",
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.min6]),
    prependInnerIcon: "mdi-lock",
    density: "comfortable",
    clearable: true,
}));
const __VLS_26 = __VLS_25({
    modelValue: (__VLS_ctx.password),
    label: "Password",
    type: "password",
    rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.min6]),
    prependInnerIcon: "mdi-lock",
    density: "comfortable",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
// @ts-ignore
[rules, rules, password,];
if (__VLS_ctx.errorMsg) {
    // @ts-ignore
    [errorMsg,];
    const __VLS_29 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    VAlert;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        type: "error",
        variant: "tonal",
        ...{ class: "mb-3" },
        text: (__VLS_ctx.errorMsg),
        density: "comfortable",
    }));
    const __VLS_31 = __VLS_30({
        type: "error",
        variant: "tonal",
        ...{ class: "mb-3" },
        text: (__VLS_ctx.errorMsg),
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    // @ts-ignore
    [errorMsg,];
}
const __VLS_34 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    loading: (__VLS_ctx.loading),
    disabled: (!__VLS_ctx.valid || __VLS_ctx.loading),
    type: "submit",
    color: "primary",
    ...{ class: "w-full" },
}));
const __VLS_36 = __VLS_35({
    loading: (__VLS_ctx.loading),
    disabled: (!__VLS_ctx.valid || __VLS_ctx.loading),
    type: "submit",
    color: "primary",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_38 } = __VLS_37.slots;
// @ts-ignore
[valid, loading, loading,];
var __VLS_37;
var __VLS_14;
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-height']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        email: email,
        password: password,
        loading: loading,
        valid: valid,
        errorMsg: errorMsg,
        rules: rules,
        onSubmit: onSubmit,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
