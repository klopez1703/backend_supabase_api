const { buscarEnTodasLasTablas } = require('../utils/supabaseService');

exports.buscar = async (req, res) => {
  const { nom1, id1 } = req.query;

  try {
    const resultados = await buscarEnTodasLasTablas(nom1, id1);

    if (resultados.length > 0) {
      return res.json({
        mensaje: `✅ Nombre encontrado: ${resultados[0].nom1}`,
        resultados
      });
    } else {
      return res.json({
        mensaje: 'No se encontró ningún resultado.',
        resultados: []
      });
    }
  } catch (err) {
    console.error('❌ Error en búsqueda:', err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
