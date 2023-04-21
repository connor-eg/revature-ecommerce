package com.revature.ecommerce.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class UserAccount {
    @Id
    @GeneratedValue
    @JsonIgnore //Don't want to send the ID in the DB over JSON
    private long id;

    @NonNull
    @Column(nullable = false, unique = true)
    private String userName;

    @NonNull
    @Column(nullable = false)
    @JsonIgnore //Don't want to send the password over JSON
    private String password;

    @JsonIgnore //Don't want to send a session token over JSON
    @Column(unique = true)
    private String sessionToken;

    @JsonIgnore //Don't want to send session token information over JSON
    private long sessionExpiry;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<ProductOrder> shoppingCart;
}
