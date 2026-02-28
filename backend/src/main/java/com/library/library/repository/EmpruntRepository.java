package com.library.library.repository;


import com.library.library.model.Emprunt;
import com.library.library.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {
    List<Emprunt> findByUser(User user);
    List<Emprunt> findByUserEmail(String email);
}