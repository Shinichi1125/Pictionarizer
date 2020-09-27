package com.pictionarizer.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "like_relation")
public class LikeRelation {
	
	@Id
	private int likeId;
	private int wordId;
	private int userId;
	
	public LikeRelation() {
		
	}

	public int getLikeId() {
		return likeId;
	}

	public void setLikeId(int likeId) {
		this.likeId = likeId;
	}

	public int getWordId() {
		return wordId;
	}

	public void setWordId(int wordId) {
		this.wordId = wordId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

}
