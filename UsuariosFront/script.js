document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pregistroForm');
    const tableBody = document.getElementById('pregistrosTable').querySelector('tbody');
    let isUpdating = false;

        const fetchPregistros = async () => {
        const response = await fetch('http://127.0.0.1:5000/pregistros');
        const pregistros = await response.json(); 
        tableBody.innerHTML = '';
        pregistros.forEach(pregistro => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pregistro.id}</td>
                <td>${pregistro.usuario}</td>
                <td>${pregistro.nombre}</td>
                <td>${pregistro.clave}</td>
                <td>
                    <button onclick="editPregistro(${pregistro.id}, '${pregistro.usuario}', '${pregistro.nombre}', '${pregistro.clave}')">Editar</button>
                    <button onclick="deletePregistro(${pregistro.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const addPregistro = async (pregistro) => {
        await fetch('http://127.0.0.1:5000/nuevo_pregistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pregistro)
        });
        fetchPregistros();
    };

    const updatePregistro = async (id, pregistro) => {
        await fetch(`http://127.0.0.1:5000/actualizar_pregistro/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pregistro)
        });
        fetchPregistros();
    };

    const deletePregistro = async (id) => {
        await fetch(`http://127.0.0.1:5000/eliminar_pregistro/${id}`, {
            method: 'DELETE'
        });
        fetchPregistros();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('pregistroId').value;
        const usuario = document.getElementById('usuario').value;
        const nombre = document.getElementById('nombre').value;
        const clave = document.getElementById('clave').value;
        const pregistro = { usuario, nombre, clave };

        if (isUpdating) {
            updatePregistro(id, pregistro);
            isUpdating = false;
        } else {
            addPregistro(pregistro);
        }

        form.reset();
        document.getElementById('pregistroId').value = '';
    });

    window.editPregistro = (id, usuario, nombre, clave) => {
        document.getElementById('pregistroId').value = id;
        document.getElementById('usuario').value = usuario;
        document.getElementById('nombre').value = nombre;
        document.getElementById('clave').value = clave;
        isUpdating = true;
    };

    window.deletePregistro = (id) => {
        if (confirm('¿Vas a eliminar este Usuario?')) {
            deletePregistro(id);
        }
    };

    fetchPregistros();
});
