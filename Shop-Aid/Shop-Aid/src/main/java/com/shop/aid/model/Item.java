package com.shop.aid.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="items")
public class Item {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private long ID;
	@Column(name="title")
	private String title;
	@Column(name="store")
	private String store;
	@Column(name="aisle")
	private String aisleLocation;
	@Column(name="email")
	private String email;
	@Column(name="picture")
	private String picture;
	@Column(name="listID")
	private String listID;
	
	
	
	
	
	public String getListID() {
		return listID;
	}
	public void setListID(String listID) {
		this.listID = listID;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picturePath) {
		this.picture = picturePath;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public long getID() {
		return ID;
	}
	public void setID(long iD) {
		ID = iD;
	}
	public String getStore() {
		return store;
	}
	public void setStore(String storeLocation) {
		this.store = storeLocation;
	}
	public String getAisleLocation() {
		return aisleLocation;
	}
	public void setAisleLocation(String aisleLocation) {
		this.aisleLocation = aisleLocation;
	}

	
	
	
}
