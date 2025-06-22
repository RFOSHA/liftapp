if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}

const form = document.getElementById('exercise-form');
const exerciseNameInput = document.getElementById('exercise-name');
const weightInput = document.getElementById('weight');
const repsInput = document.getElementById('reps');
const rirInput = document.getElementById('rir');
const addSetButton = document.getElementById('add-set');
const workoutLog = document.getElementById('workout-log');

let workout = JSON.parse(localStorage.getItem('workout')) || [];
render();

addSetButton.addEventListener('click', () => {
  const name = exerciseNameInput.value.trim();
  const weight = weightInput.value;
  const reps = repsInput.value;
  const rir = rirInput.value;
  if (!name || !weight || !reps) return;

  let exercise = workout.find(e => e.name === name);
  if (!exercise) {
    exercise = { name, sets: [] };
    workout.push(exercise);
  }
  exercise.sets.push({ weight, reps, rir });
  save();
  render();
  weightInput.value = '';
  repsInput.value = '';
  rirInput.value = '';
});

function render() {
  workoutLog.innerHTML = '';
  workout.forEach(ex => {
    const exEl = document.createElement('li');
    exEl.className = 'exercise-item';
    exEl.textContent = ex.name;
    const setsList = document.createElement('ul');
    ex.sets.forEach(set => {
      const setEl = document.createElement('li');
      setEl.className = 'set-item';
      setEl.textContent = `${set.weight} x ${set.reps} (RIR: ${set.rir || 'n/a'})`;
      setsList.appendChild(setEl);
    });
    exEl.appendChild(setsList);
    workoutLog.appendChild(exEl);
  });
}

function save() {
  localStorage.setItem('workout', JSON.stringify(workout));
}
