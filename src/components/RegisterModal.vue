<template>
  <Modal v-model="open">
    <template #header>
      <h3>Criar conta</h3>
    </template>

    <form :class="$style.form" @submit.prevent="submit">
      <div
        v-for="field in fields"
        :key="field.key"
        :class="$style.field">
        <Input
          v-model="form[field.key]"
          :label="field.label"
          :type="field.type"
          :placeholder="field.placeholder" />
        <small v-if="errors[field.key]" :class="$style.error">
          {{ errors[field.key] }}
        </small>
      </div>

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

import {
  isRequired,
  minLength,
  isValidEmail,
  passwordsMatch,
} from '~/util/validators';

const open = defineModel<boolean>({ default: false });
const emit = defineEmits<{ (e: 'submit', payload: RegisterForm): void }>();

const form = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const errors = reactive<Partial<Record<keyof RegisterForm, string>>>({});

const fields: RegisterField[] = [
  {
    key: 'name',
    label: 'Nome',
    placeholder: 'Seu nome',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
  },
  {
    key: 'password',
    label: 'Senha',
    type: 'password',
    placeholder: '••••••••',
  },
    {
    key: 'password_confirmation',
    label: 'Confirmar senha',
    type: 'password',
    placeholder: '*******',
  },
];

function clearErrors() {
  Object.keys(errors).forEach(key => {
    delete errors[key as keyof RegisterForm];
  });
}

function validate(): boolean {
  clearErrors();

  if (!isRequired(form.name) || !minLength(form.name, 3)) {
    errors.name = 'O nome deve ter pelo menos 3 caracteres';
  }

  if (!isRequired(form.email)) {
    errors.email = 'Email é obrigatório';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Email inválido';
  }

  if (!isRequired(form.password) || !minLength(form.password, 8)) {
    errors.password = 'A senha deve ter no mínimo 8 caracteres';
  }

  if (!passwordsMatch(form.password, form.password_confirmation)) {
    errors.password_confirmation = 'As senhas não coincidem';
  }

  return Object.keys(errors).length === 0;
}

function submit() {
  if (!validate()) return;

  emit('submit', { ...form });

  Object.keys(form).forEach(
    key => (form[key as keyof RegisterForm] = '')
  );

  clearErrors();
  open.value = false;
}
</script>


<style lang="scss" module>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;


  .field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .error {
    font-size: 0.75rem;
    color: #e5484d;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
}

</style>
