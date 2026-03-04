package com.library.library.dto;

public class TopStudentDTO {
    private String studentName; // or email if you prefer
    private Long empruntCount;

    public TopStudentDTO(String studentName, Long empruntCount) {
        this.studentName = studentName;
        this.empruntCount = empruntCount;
    }

    public String getStudentName() {
        return studentName;
    }

    public Long getEmpruntCount() {
        return empruntCount;
    }
}