export default function validationUserForm(formData = {}) {
  const errors = {};

  // Validar nombre
  if (!formData.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio";
  } else if (formData.nombre.length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  // Validar email
  if (!formData.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "El email es inválido";
  }

  // Validar password
  if (!formData.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (formData.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  // Validar role
  if (!formData.role || typeof formData.role !== 'string') {
    errors.role = "El rol es obligatorio y debe ser válido";
  } else if (!["seller"].includes(formData.role)) {
    errors.role = "El rol seleccionado es inválido";
  }

  return errors;
}
