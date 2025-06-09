const form = document.getElementById("formMateria");
const lista = document.getElementById("listaMaterias");
const promedioFinal = document.getElementById("promedioFinal");
const resultadoBox = document.getElementById("resultado");

const NOTA_PROMOCION = 7;
let materias = JSON.parse(localStorage.getItem("materias")) || [];

renderizarMaterias();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreMateria").value.trim();
  const nota = parseFloat(document.getElementById("notaMateria").value);

  if (nombre === "" || isNaN(nota) || nota < 0 || nota > 10) {
    alert("Por favor ingresá datos válidos.");
    return;
  }

  const nuevaMateria = { nombre, nota };
  materias.push(nuevaMateria);
  localStorage.setItem("materias", JSON.stringify(materias));

  form.reset();
  renderizarMaterias();
});

function renderizarMaterias() {
  lista.innerHTML = "";
  let total = 0;

  if (materias.length > 0) {
    resultadoBox.classList.remove("d-none");
  } else {
    resultadoBox.classList.add("d-none");
  }

  materias.forEach((materia) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = 📘 ${materia.nombre} - Nota: ${materia.nota};

    const badge = document.createElement("span");
    badge.className = "badge bg-" + (materia.nota >= NOTA_PROMOCION ? "success" : "danger");
    badge.textContent = materia.nota >= NOTA_PROMOCION ? "Promocionada" : "Final";
    li.appendChild(badge);

    lista.appendChild(li);
    total += materia.nota;
  });

  const promedio = total / materias.length;
  promedioFinal.textContent = 🎓 Promedio general: ${promedio.toFixed(2)};
}