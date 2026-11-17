package dev.wearrental.WearRental.Controller;

import dev.wearrental.WearRental.Model.*;
import jakarta.validation.constraints.*;

import java.time.Instant;


public final class Dtos {
    private Dtos(){

    }

    public record CustomerRequest(
        @NotBlank @Size(max = 200) String fullName,
        @NotBlank @Email @Size(max = 200) String email,
        @Size(max = 30) String phone,
        @Size(max = 500) String address
    ){}

    public record CustomerResponse(
            Long id, String fullName, String email, String phone, String address, Instant createdAt
    ){
        public static CustomerResponse from(Customer c){
            return new CustomerResponse(c.getId(), c.getFullName(), c.getEmail(), c.getPhone(), c.getAddress(), c.getCreatedAt());
        }
    }


}
