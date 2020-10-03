package at.toaster.springnuxt.repository;

import java.util.Optional;

import at.toaster.springnuxt.entity.ERole;
import at.toaster.springnuxt.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
