package dev.wearrental.WearRental.Service;


import dev.wearrental.WearRental.Controller.Dtos.*;
import dev.wearrental.WearRental.Model.Customer;
import dev.wearrental.WearRental.Repository.CustomerRepository;
import dev.wearrental.WearRental.Repository.RentalRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;


@Service
@Transactional
public class CustomerService {
    private final CustomerRepository customers;
    private final RentalRepository rentals;

    public CustomerService(CustomerRepository customers, RentalRepository rentals) {
        this.customers = customers;
        this.rentals = rentals;
    }

    @Transactional(readOnly = true)
    public Page<Customer> list(Pageable pageable) {
        return customers.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Customer get(Long id) {
        return customers.findById(id).orElseThrow(() -> ApiException.notFound("Customer", id));
    }

    public Customer create(CustomerRequest req){
        String email = normaliseEmail(req.email());
        if (customers.existsByEmailIgnoreCase(email)){
            throw ApiException.conflict("A customer with email " + email + " already exists");
        }
        Customer c = new Customer();
        apply(c, req, email);
        return customers.save(c);
    }

    public Customer update(Long id, CustomerRequest req){
        Customer c = get(id);
        String email = normaliseEmail(req.email());
        if (customers.existsByEmailIgnoreCaseAndIdNot(email, id)){
            throw ApiException.conflict("A customer with email " + email + " already exists");
        }
        apply(c,req,email);
        return c;
    }

    public void delete(Long id){
        Customer c = get(id);
        if (rentals.existsByCustomerId(id)){
            throw ApiException.conflict("Customer " + id + " has rentals and cannot be deleted");

        }
        customers.delete(c);
    }




    private static void apply(Customer c, CustomerRequest req, String email){
        c.setFullName(req.fullName().trim());
        c.setEmail(email);
        c.setPhone(req.phone());
        c.setAddress(req.address());
    }


    private static String normaliseEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
