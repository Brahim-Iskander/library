package com.library.library.repository;


import com.library.library.model.Emprunt;
import com.library.library.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.library.library.dto.MonthlyEmpruntDTO;
import com.library.library.dto.TopBookDTO;
import org.springframework.data.domain.Pageable;
import com.library.library.dto.TopStudentDTO;



@Repository
public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {
    List<Emprunt> findByUser(User user);
    List<Emprunt> findByUserEmail(String email);

    @Query("""
   SELECT new com.library.library.dto.MonthlyEmpruntDTO(
       MONTH(e.borrowDate),
       COUNT(e)
   )
   FROM Emprunt e
   GROUP BY MONTH(e.borrowDate)
   ORDER BY MONTH(e.borrowDate)
""")
List<MonthlyEmpruntDTO> countEmpruntsByMonth();

@Query("""
   SELECT new com.library.library.dto.TopBookDTO(
       e.book.title,
       COUNT(e)
   )
   FROM Emprunt e
   GROUP BY e.book.title
   ORDER BY COUNT(e) DESC
""")
List<TopBookDTO> findTopBorrowedBooks(Pageable pageable);
@Query("""
       SELECT new com.library.library.dto.TopStudentDTO(
           e.user.fullName,
           COUNT(e)
       )
       FROM Emprunt e
       GROUP BY e.user.id, e.user.fullName
       ORDER BY COUNT(e) DESC
    """)
    List<TopStudentDTO> findTopActiveStudents(Pageable pageable);

}