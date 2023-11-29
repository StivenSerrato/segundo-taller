var express = require('express');
var router = express.Router();
const { conexion } = require('../database/conexion')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: 'public' });
});


router.get('/listado-medicos', (req, res) => {
  conexion.query('SELECT * FROM medicos;', (error, resultado) => {
    if (error) {
      console.log('ocurrio un error en la ejecucion', error)
      res.status(500).send('error en la ejecucion')
    } else {
     console.log(resultado)
     res.status(200).render('medicos', {resultado})
    }
  })
})

router.get('/listado-pacientes', (req, res) =>{
  conezion.query('SELECT * FROM pacientes;', (error, resultado) =>{
    if (error) {
      console.log('ocurrio un error en la ejecucion', error)
      res.status(500).send('error en la ejecucion')
    }else {
      console.log(resultado)
      res.status(200).render('pacientes', { resultado })
    }
  })
})



router.get('/listado-citas', (req, res) =>{
  conexion.query('SELECT fecha_cita, pacientes.nombres, pacientes.apellidos, pacientes.telefono, medicos.especialidad, medicos.consultorio, medicos.nombres, medicos.apellidos FROM cita_medica, pacientes, medicos WHERE cedula_medico=medicos.cedula AND cedula_paciente=pacientes.cedula;', (error, resultado) => {
    if (error) {
console.log ('ocurrio un error en la ejecucion', error)
res.status(500).send('error en la ejecucion')
    } else {
      res.status(200).render('citas', { resultado })
    }
  })
})

router.post('/agregar-medico', (req, res) => {
  const nombres = req.body.nombres
  const apellidos = req.body.apellidos
  const cedula = req.body.cedula
  const consultorio = req.body.consultorio
  const telefono = req.body.telefono
  const correo = req.body.correo
  const especialidad = req.body.especialidad

  conexion.query(`INSERT INTO medicos (cedula, nombres, apellidos, especialidad, consultorio, correo, telefono) VALUES (${cedula}, '${nombres}', '${apellidos}', '${especialidad}', '${consultorio}', '${correo}', '${telefono}')`, (error, resultado) => {
    if (error) {
      console.log('ocurrio un error en la ejecucion', error)
      res.status(500).send('error en la ejecucion')
    }else{
      res.status(200).redirect('/listado-medico')
    }
  })
})






router.post('/agregar-paciente', (req, res) =>{
  const nombres = req.body.nombres
  const apellidos = req.body.apellidos
  const cedula = req.body.cedula
  const fecha_nacimiento = req.body.fecha_nacimiento
  const telefono = req.body.telefono

  conexion.query(`INSERT INTO pacientes (cedula, nombres, apellidos, fecha_nacimiento, telefono) VALUES (${cedula}, '${nombres}', '${apellidos}', '${fecha_nacimiento}', '${telefono}')`, (error, resultado) => {
    if (error){
      console.log(error)
      res.status(500).send('ocurrio un error en la consulta ')
    } else {
      res.status(200).redirect('/listado-pacientes')
    }
  })
})

router.post('/consulta-cita', (req, res) =>{
  const especialidad = req.body.especialidad

  conexion.query(`SElECT * FROM medicos WHERE especialidad='${especialidad}';`,(error, resultado) =>{
    if (error){
      console.log(error)
      res.status(500).send('ocurrio un error en la consulta')
    }else {
      res.status(200).render('agendar-citas', { resultado })
    }
  })
})

router.post('/agregar-citas', (req, res) => {
  const cedula_paciente = req.body.cedula
  const fecha_cita = req.body.fecha_cita
  const cedula_medico = req.body.cedula_medico
  conexion.query(`INSERT INTO cita_medica (cedula_medico, cedula_paciente, fecha_cita) VALUE (${cedula_medico}, ${cedula_paciente}, '${fecha_cita}')`, (error, resultado) =>{
    if (error){
      console.log(error)
      res.status(500).send('ocurrio un error en la consulta')
    } else {
      res.status(200).send('/listado-cita')
    }
  })
})

module.exports = router;