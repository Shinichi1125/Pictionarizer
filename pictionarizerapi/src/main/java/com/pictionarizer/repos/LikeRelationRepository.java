package com.pictionarizer.repos;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pictionarizer.model.LikeRelation;

public interface LikeRelationRepository extends JpaRepository<LikeRelation, Integer> {
	@Query("SELECT lr FROM LikeRelation lr where lr.wordId = :wordId") 
    List<LikeRelation> findAllByWordId(@Param("wordId") int wordId);
	
	@Query("SELECT lr FROM LikeRelation lr where lr.userId = :userId") 
    List<LikeRelation> findAllByUserId(@Param("userId") int userId);
	
	@Query("SELECT lr FROM LikeRelation lr where lr.userId = :userId AND lr.wordId = :wordId") 
    LikeRelation findByUserIdAndWordId(@Param("userId") int userId, @Param("wordId") int wordId);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM LikeRelation lr where lr.wordId = :wordId") 
    void deleteAllByWordId(@Param("wordId") int wordId);	
	
	@Transactional
	@Modifying
	@Query("DELETE FROM LikeRelation lr where lr.userId = :userId") 
    void deleteAllByUserId(@Param("userId") int userId);	
}
