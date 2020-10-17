package com.pictionarizer.repos;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pictionarizer.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	@Query("SELECT c FROM Comment c where c.wordId = :wordId") 
    List<Comment> findAllByWordId(@Param("wordId") int wordId);
	
	@Query("SELECT c FROM Comment c where c.userId = :userId") 
    List<Comment> findAllByUserId(@Param("userId") int userId);	
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Comment c where c.wordId = :wordId") 
    void deleteAllByWordId(@Param("wordId") int wordId);	
}
