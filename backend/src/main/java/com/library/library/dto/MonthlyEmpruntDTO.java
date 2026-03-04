package com.library.library.dto;

public class MonthlyEmpruntDTO {

    private Integer month;
    private Long count;

    public MonthlyEmpruntDTO(Integer month, Long count) {
        this.month = month;
        this.count = count;
    }

    public Integer getMonth() {
        return month;
    }

    public Long getCount() {
        return count;
    }
}