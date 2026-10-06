   const API_URL = 'https://api-farmacia-g9bn.onrender.com/api'; // ⚠️ Cambiar por la URL de tu backend desplegado

   document.addEventListener('DOMContentLoaded', () => {
     const loginForm = document.getElementById('loginForm');
     const registroForm = document.getElementById('registroForm');

     if (loginForm) {
       loginForm.addEventListener('submit', async (e) => {
         e.preventDefault();
         const email = document.getElementById('email').value;
         const password = document.getElementById('password').value;

         // Validación Frontend
         if (!email.includes('@') || password.length < 6) {
           document.getElementById('error').textContent = 'Correo inválido o contraseña muy corta.';
           return;
         }

         try {
           const res = await fetch(`${API_URL}/auth/login`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email, password })
           });
           const data = await res.json();
           if (res.ok) {
             localStorage.setItem('token', data.token);
             localStorage.setItem('usuario', JSON.stringify(data.usuario));
             window.location.href = 'dashboard.html';
           } else {
             document.getElementById('error').textContent = data.mensaje;
           }
         } catch (err) {
           document.getElementById('error').textContent = 'Error de conexión con el servidor.';
         }
       });
     }

     if (registroForm) {
       registroForm.addEventListener('submit', async (e) => {
         e.preventDefault();
         const nombre = document.getElementById('nombre').value;
         const email = document.getElementById('email').value;
         const password = document.getElementById('password').value;
         const rol = document.getElementById('rol').value;

         if (password.length < 6) {
           document.getElementById('mensaje').textContent = 'La contraseña debe tener al menos 6 caracteres.';
           document.getElementById('mensaje').style.color = 'red';
           return;
         }

         try {
           const res = await fetch(`${API_URL}/auth/registro`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ nombre, email, password, rol })
           });
           const data = await res.json();
           document.getElementById('mensaje').textContent = data.mensaje || 'Registro exitoso. Ahora puedes iniciar sesión.';
           document.getElementById('mensaje').style.color = 'green';
           registroForm.reset();
         } catch (err) {
           document.getElementById('mensaje').textContent = 'Error al registrar.';
         }
       });
     }
   });