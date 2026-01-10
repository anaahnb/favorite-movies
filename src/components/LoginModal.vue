<template>
  <Modal v-model="open">
    <template #header>
      <h3>Entrar</h3>
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
          Entrar
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
import { isRequired, isValidEmail } from '~/util/validators';
import type { LoginField, LoginForm } from '~/types/login';


const open = defineModel<boolean>({ default: false });
const emit = defineEmits<{ (e: 'submit', payload: LoginForm): void }>();

const form = reactive<LoginForm>({
  email: '',
  password: '',
});

const errors = reactive<Partial<Record<keyof LoginForm, string>>>({});

const fields: LoginField[] = [
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
    placeholder: '*********',
  },
];

function clearErrors() {
  Object.keys(errors).forEach(key => {
    delete errors[key as keyof LoginForm];
  });
}

function validate(): boolean {
  clearErrors();

  if (!isRequired(form.email)) {
    errors.email = 'Email é obrigatório';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Email inválido';
  }

  if (!isRequired(form.password)) {
    errors.password = 'Senha é obrigatória';
  }

  return Object.keys(errors).length === 0;
}

function submit() {
  if (!validate()) return;

  emit('submit', { ...form });

  Object.keys(form).forEach(
    key => (form[key as keyof LoginForm] = '')
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