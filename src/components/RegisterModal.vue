<template>
  <Modal v-model="open">
    <template #header>
      <h3>Criar conta</h3>
    </template>

    <form :class="$style.form" @submit.prevent="submit">
      <Input
        v-for="field in fields"
        :key="field.key"
        v-model="form[field.key]"
        :label="field.label"
        :type="field.type"
        :placeholder="field.placeholder"
        :required="field.required"
        :minlength="field.minlength"
      />

      <div :class="$style.actions">
        <Button
          size="sm"
          variant="secondary"
          type="button"
          @click="open = false">
          Cancelar
        </Button>

        <Button
          size="sm"
          type="submit">
          Criar conta
        </Button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Input from '~/components/Input.vue';
import Button from '~/components/Button.vue';
import Modal from '~/components/Modal.vue';
import type { RegisterField, RegisterForm } from '~/types/register';

const open = defineModel<boolean>({ default: false });
const emit = defineEmits<{(e: 'submit', payload: RegisterForm): void}>();

const form = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const fields: RegisterField[] = [
  {
    key: 'name',
    label: 'Nome',
    placeholder: 'Seu nome',
    required: true,
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
    required: true,
  },
  {
    key: 'password',
    label: 'Senha',
    type: 'password',
    placeholder: '••••••••',
    required: true,
    minlength: 6,
  },
    {
    key: 'password_confirmation',
    label: 'Confirmar senha',
    type: 'password',
    placeholder: '••••••••',
    required: true,
    minlength: 6,
  }
];

function submit() {
  emit('submit', { ...form });

  (Object.keys(form) as (keyof RegisterForm)[]).forEach(key => { form[key] = '' });
  open.value = false;
}


</script>

<style lang="scss" module>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
}

</style>
