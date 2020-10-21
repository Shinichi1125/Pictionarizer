package com.pictionarizer.repos;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pictionarizer.model.FollowerRelation;

public interface FollowerRelationRepository extends JpaRepository<FollowerRelation, Integer> {
	
	@Query("SELECT fr FROM FollowerRelation fr where fr.followeeId = :followeeId") 
    List<FollowerRelation> findAllByFolloweeId(@Param("followeeId") int followeeId);
	
	@Query("SELECT fr FROM FollowerRelation fr where fr.followerId = :followerId") 
    List<FollowerRelation> findAllByFollowerId(@Param("followerId") int followerId);
	
	@Query("SELECT fr FROM FollowerRelation fr where fr.followerId = :followerId AND fr.followeeId = :followeeId") 
    FollowerRelation findByFollowerIdAndFolloweeId(@Param("followerId") int followerId, @Param("followeeId") int followeeId);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM FollowerRelation fr where fr.followeeId = :userId") 
    void deleteAllByFolloweeId(@Param("userId") int userId);	
	
	@Transactional
	@Modifying
	@Query("DELETE FROM FollowerRelation fr where fr.followerId = :userId") 
    void deleteAllByFollowerId(@Param("userId") int userId);	
}
