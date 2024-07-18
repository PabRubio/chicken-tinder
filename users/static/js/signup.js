function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');
    const password1 = document.getElementById('id_password1');
    const password2 = document.getElementById('id_password2');
    const mismatchDiv = document.getElementById('passwordMismatch');

    form.addEventListener('submit', function (event) {
        if (password1.value !== password2.value) {
            event.preventDefault();
            mismatchDiv.classList.remove('hidden');
        } else {
            mismatchDiv.classList.add('hidden');
        }
    });

    password2.addEventListener('input', function () {
        mismatchDiv.classList.toggle('hidden', this.value === password1.value);
    });
});