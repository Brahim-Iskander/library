package com.library.library.dto;

public class TopBookDTO {

    private String title;
    private Long count;

    public TopBookDTO(String title, Long count) {
        this.title = title;
        this.count = count;
    }

    public String getTitle() {
        return title;
    }

    public Long getCount() {
        return count;
    }
}