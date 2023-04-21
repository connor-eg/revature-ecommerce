package com.revature.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.ecommerce.model.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    public Optional<UserAccount> findBySessionToken(String sessionToken);

    public boolean existsByUserName(String username);

    public Optional<UserAccount> findByUserNameAndPassword(String username, String password);
}
