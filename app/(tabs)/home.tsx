import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface Subject {
  id: string
  name: string
  code: string
  credits: number
}

interface Semester {
  id: string
  name: string
  subjects: Subject[]
}

const semesters: Semester[] = [
  {
    id: "1",
    name: "Primer Cuatrimestre",
    subjects: [
      { id: "1-1", name: "Matemáticas I", code: "MAT101", credits: 8 },
      { id: "1-2", name: "Contabilidad Básica", code: "CON101", credits: 6 },
      { id: "1-3", name: "Administración General", code: "ADM101", credits: 6 },
      { id: "1-4", name: "Derecho Empresarial", code: "DER101", credits: 4 },
    ],
  },
  {
    id: "2",
    name: "Segundo Cuatrimestre",
    subjects: [
      { id: "2-1", name: "Matemáticas II", code: "MAT102", credits: 8 },
      { id: "2-2", name: "Contabilidad Intermedia", code: "CON102", credits: 6 },
      { id: "2-3", name: "Microeconomía", code: "ECO101", credits: 6 },
      { id: "2-4", name: "Estadística I", code: "EST101", credits: 6 },
    ],
  },
  {
    id: "3",
    name: "Tercer Cuatrimestre",
    subjects: [
      { id: "3-1", name: "Contabilidad de Costos", code: "CON201", credits: 8 },
      { id: "3-2", name: "Macroeconomía", code: "ECO102", credits: 6 },
      { id: "3-3", name: "Estadística II", code: "EST102", credits: 6 },
      { id: "3-4", name: "Finanzas I", code: "FIN101", credits: 6 },
    ],
  },
  {
    id: "4",
    name: "Cuarto Cuatrimestre",
    subjects: [
      { id: "4-1", name: "Contabilidad Avanzada", code: "CON301", credits: 8 },
      { id: "4-2", name: "Finanzas II", code: "FIN102", credits: 6 },
      { id: "4-3", name: "Auditoría I", code: "AUD101", credits: 6 },
      { id: "4-4", name: "Derecho Fiscal", code: "DER201", credits: 6 },
    ],
  },
  {
    id: "5",
    name: "Quinto Cuatrimestre",
    subjects: [
      { id: "5-1", name: "Auditoría II", code: "AUD102", credits: 8 },
      { id: "5-2", name: "Contabilidad Fiscal", code: "CON401", credits: 6 },
      { id: "5-3", name: "Presupuestos", code: "FIN201", credits: 6 },
      { id: "5-4", name: "Ética Profesional", code: "ETI101", credits: 4 },
    ],
  },
  {
    id: "6",
    name: "Sexto Cuatrimestre",
    subjects: [
      { id: "6-1", name: "Contabilidad Gubernamental", code: "CON501", credits: 6 },
      { id: "6-2", name: "Análisis Financiero", code: "FIN301", credits: 6 },
      { id: "6-3", name: "Sistemas de Información", code: "SIS101", credits: 6 },
      { id: "6-4", name: "Seminario de Titulación", code: "SEM101", credits: 6 },
    ],
  },
]

const greenColors = [
  { bg: "#dcfce7", border: "#bbf7d0" }, // green-100, green-200
  { bg: "#bbf7d0", border: "#86efac" }, // green-200, green-300
  { bg: "#86efac", border: "#4ade80" }, // green-300, green-400
  { bg: "#4ade80", border: "#22c55e" }, // green-400, green-500
  { bg: "#a7f3d0", border: "#6ee7b7" }, // emerald-200, emerald-300
  { bg: "#6ee7b7", border: "#34d399" }, // emerald-300, emerald-400
  { bg: "#d9f99d", border: "#bef264" }, // lime-200, lime-300
  { bg: "#bef264", border: "#a3e635" }, // lime-300, lime-400
]

const { width } = Dimensions.get("window")

export default function UniversityApp() {
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null)
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set())
  const [selectedSemesters, setSelectedSemesters] = useState<Set<string>>(new Set())

  const toggleSemester = (semesterId: string) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId)
  }

  const toggleSemesterSelection = (semesterId: string) => {
    const semester = semesters.find((s) => s.id === semesterId)
    if (!semester) return

    const newSelectedSemesters = new Set(selectedSemesters)
    const newSelectedSubjects = new Set(selectedSubjects)

    if (selectedSemesters.has(semesterId)) {
      // Deselect semester and all its subjects
      newSelectedSemesters.delete(semesterId)
      semester.subjects.forEach((subject) => {
        newSelectedSubjects.delete(subject.id)
      })
    } else {
      // Select semester and all its subjects
      newSelectedSemesters.add(semesterId)
      semester.subjects.forEach((subject) => {
        newSelectedSubjects.add(subject.id)
      })
    }

    setSelectedSemesters(newSelectedSemesters)
    setSelectedSubjects(newSelectedSubjects)
  }

  const toggleSubject = (subjectId: string) => {
    const newSelected = new Set(selectedSubjects)
    if (newSelected.has(subjectId)) {
      newSelected.delete(subjectId)
    } else {
      newSelected.add(subjectId)
    }
    setSelectedSubjects(newSelected)

    // Check if we need to update semester selection
    const semester = semesters.find((s) => s.subjects.some((sub) => sub.id === subjectId))
    if (semester) {
      const allSubjectsSelected = semester.subjects.every((subject) =>
        subject.id === subjectId ? newSelected.has(subjectId) : newSelected.has(subject.id),
      )

      const newSelectedSemesters = new Set(selectedSemesters)
      if (allSubjectsSelected) {
        newSelectedSemesters.add(semester.id)
      } else {
        newSelectedSemesters.delete(semester.id)
      }
      setSelectedSemesters(newSelectedSemesters)
    }
  }

  const getSubjectStyle = (subjectId: string) => {
    if (selectedSubjects.has(subjectId)) {
      const index = Array.from(selectedSubjects).indexOf(subjectId) % greenColors.length
      return greenColors[index]
    }
    return { bg: "#f0fdf4", border: "#dcfce7" } // green-50, green-100
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Licenciatura en Contabilidad</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {semesters.map((semester) => (
          <View key={semester.id} style={styles.semesterContainer}>
            {/* Semester Header */}
            <TouchableOpacity
              onPress={() => toggleSemester(semester.id)}
              style={[
                styles.semesterHeader,
                selectedSemesters.has(semester.id) ? styles.semesterHeaderSelected : styles.semesterHeaderDefault,
              ]}
            >
              <View style={styles.semesterHeaderContent}>
                <TouchableOpacity
                  onPress={() => toggleSemesterSelection(semester.id)}
                  style={[
                    styles.selectionCircle,
                    selectedSemesters.has(semester.id) ? styles.selectionCircleSelected : styles.selectionCircleDefault,
                  ]}
                />
                <Text
                  style={[
                    styles.semesterTitle,
                    selectedSemesters.has(semester.id) ? styles.semesterTitleSelected : styles.semesterTitleDefault,
                    selectedSemesters.has(semester.id) && styles.strikethrough,
                  ]}
                >
                  {semester.name}
                </Text>
              </View>
              <Ionicons
                name={expandedSemester === semester.id ? "chevron-down" : "chevron-forward"}
                size={20}
                color={selectedSemesters.has(semester.id) ? "#374151" : "white"}
              />
            </TouchableOpacity>

            {/* Subjects */}
            {expandedSemester === semester.id && (
              <View style={styles.subjectsContainer}>
                {semester.subjects.map((subject) => {
                  const subjectStyle = getSubjectStyle(subject.id)
                  return (
                    <TouchableOpacity
                      key={subject.id}
                      onPress={() => toggleSubject(subject.id)}
                      style={[
                        styles.subjectCard,
                        { backgroundColor: subjectStyle.bg, borderColor: subjectStyle.border },
                      ]}
                    >
                      <View style={styles.subjectContent}>
                        <View style={styles.subjectInfo}>
                          <Text style={[styles.subjectName, selectedSubjects.has(subject.id) && styles.strikethrough]}>
                            {subject.name}
                          </Text>
                          <Text style={styles.subjectCode}>Clave: {subject.code}</Text>
                        </View>
                        <View style={styles.creditsContainer}>
                          <Text style={styles.creditsText}>{subject.credits} créditos</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )}
          </View>
        ))}

        {/* Add bottom padding to account for fixed counter */}
        <View style={{ height: selectedSubjects.size > 0 ? 100 : 20 }} />
      </ScrollView>

      {/* Selected subjects counter */}
      {selectedSubjects.size > 0 && (
        <View style={styles.counterContainer}>
          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {selectedSubjects.size} materia{selectedSubjects.size !== 1 ? "s" : ""} seleccionada
              {selectedSubjects.size !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827", // gray-900
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#374151", // gray-700
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  semesterContainer: {
    marginBottom: 12,
  },
  semesterHeader: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  semesterHeaderDefault: {
    backgroundColor: "#1f2937", // gray-800
    borderColor: "#374151", // gray-700
  },
  semesterHeaderSelected: {
    backgroundColor: "#4ade80", // green-400
    borderColor: "#86efac", // green-300
  },
  semesterHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  selectionCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  selectionCircleDefault: {
    backgroundColor: "white",
  },
  selectionCircleSelected: {
    backgroundColor: "#374151", // gray-700
    borderWidth: 2,
    borderColor: "#4b5563", // gray-600
  },
  semesterTitle: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  semesterTitleDefault: {
    color: "white",
  },
  semesterTitleSelected: {
    color: "#374151", // gray-800
  },
  strikethrough: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  subjectsContainer: {
    backgroundColor: "#1f2937", // gray-800
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#374151", // gray-700
  },
  subjectCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  subjectContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151", // gray-800
    marginBottom: 4,
  },
  subjectCode: {
    fontSize: 12,
    color: "#6b7280", // gray-600
    marginBottom: 8,
  },
  creditsContainer: {
    backgroundColor: "#374151", // gray-700
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  creditsText: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
  },
  counterContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  counter: {
    backgroundColor: "#16a34a", // green-600
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  counterText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
})
