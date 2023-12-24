package com.security.hospital;

import com.fasterxml.jackson.annotation.*;
import com.security.token.Token;
import com.security.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import com.security.config.View;
import com.security.config.View.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Hospital {

    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    private String address;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "hospital"})
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_doctor_id")
    private User districtDoctor;

    @JsonIgnore
    @OneToMany(mappedBy = "hospital", cascade = CascadeType.REMOVE)
    private List<User> user;
}
