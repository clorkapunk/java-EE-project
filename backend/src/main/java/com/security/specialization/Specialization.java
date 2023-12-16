package com.security.specialization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.security.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Specialization {

    @Id
    @GeneratedValue
    private Integer id;
    private String title;

    @JsonIgnore
    @OneToMany(mappedBy = "specialization", cascade = CascadeType.REMOVE)
    private List<User> user;
}
