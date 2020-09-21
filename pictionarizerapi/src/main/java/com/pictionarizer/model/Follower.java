package com.pictionarizer.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "follower_relation")
public class Follower {
	
	@Id
	private int pairId;
	private int userId;
	private int followedBy;
	
	public Follower() {
		
	}

	public int getPairId() {
		return pairId;
	}

	public void setPairId(int pairId) {
		this.pairId = pairId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getFollowedBy() {
		return followedBy;
	}

	public void setFollowedBy(int followedBy) {
		this.followedBy = followedBy;
	}

}
