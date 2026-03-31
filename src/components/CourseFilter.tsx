import { useBooks } from "../context/BooksContext";
import { MenuItem, Select, Typography, Box, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

export default function CourseFilter() {
  const { books } = useBooks();
  
  // Estados para gerenciar ambos os filtros
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // Extrair disciplinas e semestres únicos para popular os Selects
  const courses = [...new Set(books.map(book => book.course))];
  const semesters = [...new Set(books.map(book => book.semester))].sort((a, b) => a - b);

  // Lógica de filtro combinada (Atividade 3)
  const filteredBooks = books.filter(b => {
    const matchCourse = selectedCourse === "" || b.course === selectedCourse;
    const matchSemester = selectedSemester === "" || b.semester.toString() === selectedSemester;
    return matchCourse && matchSemester;
  });

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>Filtrar por Disciplina e Semestre</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="course-select-label">Disciplina</InputLabel>
          <Select
            labelId="course-select-label"
            value={selectedCourse}
            label="Disciplina"
            onChange={e => setSelectedCourse(e.target.value)}
          >
            <MenuItem value="">Todas as Disciplinas</MenuItem>
            {courses.map(course => (
              <MenuItem key={course} value={course}>{course}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="semester-select-label">Semestre</InputLabel>
          <Select
            labelId="semester-select-label"
            value={selectedSemester}
            label="Semestre"
            onChange={e => setSelectedSemester(e.target.value)}
          >
            <MenuItem value="">Todos os Semestres</MenuItem>
            {semesters.map(semester => (
              <MenuItem key={semester} value={semester.toString()}>{semester}º Semestre</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Resultados:</Typography>
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book, idx) => (
          <Typography key={idx} sx={{ mb: 1, padding: 1, borderBottom: '1px solid #eee' }}>
            <strong>{book.title}</strong><br/>
            <small>{book.course} - {book.semester}º Semestre</small>
          </Typography>
        ))
      ) : (
        <Typography color="text.secondary">Nenhum livro encontrado para este filtro.</Typography>
      )}
    </Box>
  );
}