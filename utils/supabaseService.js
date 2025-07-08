const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Nombres exactos de tus tablas en Supabase
const tablas = ['TABLE_BASE_1', 'TABLE_BASE_2', 'TABLE_BASE_3', 'TABLE_BASE_4', 'TABLE_BASE_5'];

(async () => {
  const { data, error } = await supabase.from(tablas[0]).select('*').limit(1);
  if (error) {
    console.error('❌ Error de conexión o consulta:', error.message);
  } else {
    console.log('✅ Conexión a Supabase exitosa');
  }
})();

async function buscarEnTodasLasTablas(nom1, id1) {
  const resultados = [];

  for (const tabla of tablas) {
    let queryBuilder = supabase.from(tabla).select('*');

    if (nom1) queryBuilder = queryBuilder.ilike('nom1', `%${nom1}%`);
    if (id1) queryBuilder = queryBuilder.ilike('id1', `%${id1}%`);

    const { data, error } = await queryBuilder;

    if (error) {
      console.error(`⚠️ Error en tabla ${tabla}:`, error.message);
      continue;
    }

    if (data && data.length > 0) {
      console.log(`🔍 Coincidencias en tabla ${tabla}:`, data.length);
      resultados.push(...data.map(row => ({ ...row, hoja: tabla })));
    }
  }

  console.log('📦 Total resultados encontrados:', resultados.length);
  return resultados;
}

module.exports = { buscarEnTodasLasTablas };
