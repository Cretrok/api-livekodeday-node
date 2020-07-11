const express = require('express');
const mongoose = require('mongoose');

const app = express();

const Student = mongoose.model('Students',{
  name: {
    type: String,
    required: true
  },
  course:{
    type: String,
    required: true,
    enum: [
      'Programacion',
      'Ingles',
      'Cocina'
    ]
  },
  age: {
    type: Number,
    min: 0
  }
})

app.use(express.json())

app.get('/students', async (req, res) => {
  try{
    const allStudents = await Student.find()

    res.json({
      success: true,
      data: {
        students: allStudents
      }
    })
  } catch (error){
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

app.post('/students', async (req, res) => {
  const studentInfo = req.body

  const newStudent = await Student.create(studentInfo)

  res.json({
    success: true,
    data: {
      student: newStudent
    },
    message: "Usuario creado"
  })
})

app.delete('/students/:id', async (req, res) => {
  try {
    const id = req.params.id

    const studentDelete = await Student.findByIdAndDelete(id)

    if (!studentDelete) {
      throw new Error("Usuario no encontrado")
    }

    res.json({
      success: true,
      data: {
        student: studentDelete
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})


mongoose.connect('mongodb+srv://cretrok:cesaroot@kodemia-livekoday.ebyiw.mongodb.net/school',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  app.listen(8080, () => {
    console.log('Server is ready');
  })
})
