package com.pictionarizer.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pictionarizer.model.FollowerRelation;

public interface FollowerRelationRepository extends JpaRepository<FollowerRelation, Integer> {

}
