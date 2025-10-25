const DEFAULT_WA_NUMBER = "593959239145";
const servicio = document.getElementById('servicio');
const modulosSection = document.getElementById('modulosSection');
const totalEl = document.getElementById('total');
const modulos = document.querySelectorAll('.module');

servicio.addEventListener('change', ()=>{
  modulosSection.style.display = servicio.value === 'modulos' ? 'block' : 'none';
  calcularTotal();
});

modulos.forEach(m=>{
  m.addEventListener('click', ()=>{
    m.classList.toggle('active');
    const selected = document.querySelectorAll('.module.active');
    if(selected.length > 3){
      m.classList.remove('active');
      alert('Solo puedes seleccionar hasta 3 módulos.');
    }
    calcularTotal();
  });
});

function calcularTotal(){
  let total = 0;
  if(servicio.value === 'Inglés') total = 10;
  else if(servicio.value === 'HCD') total = 25;
  else if(servicio.value === 'modulos'){
    const count = document.querySelectorAll('.module.active').length;
    total = count * 3.5;
  }
  totalEl.textContent = `Total estimado: $${total.toFixed(2)}`;
  return total;
}

function openWhatsApp(){
  const telefono = document.getElementById('telefono').value || DEFAULT_WA_NUMBER;
  const nombre = document.getElementById('nombre').value.trim();
  const detalle = document.getElementById('detalle').value.trim();
  const total = calcularTotal();
  let mensaje = nombre ? `Hola, soy ${nombre}. ` : 'Hola. ';
  if(servicio.value === 'Inglés') mensaje += 'Deseo solicitar el MOOC de Inglés ($10).';
  else if(servicio.value === 'HCD') mensaje += 'Deseo solicitar el MOOC HCD Total ($25).';
  else {
    const seleccionados = Array.from(document.querySelectorAll('.module.active')).map(m=>m.dataset.value);
    mensaje += `Deseo solicitar los módulos: ${seleccionados.join(', ')}. Total $${total.toFixed(2)}.`;
  }
  if(detalle) mensaje += `\nDetalles: ${detalle}`;
  mensaje += `\n¿Podemos coordinar la entrega?`;
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
}

document.getElementById('calc').addEventListener('click', calcularTotal);
document.getElementById('enviar').addEventListener('click', openWhatsApp);
document.getElementById('floatWA').addEventListener('click', openWhatsApp);
document.getElementById('year').textContent = new Date().getFullYear();
calcularTotal();
