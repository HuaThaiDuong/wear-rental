package dev.wearrental.WearRental.Controller;



import dev.wearrental.WearRental.Service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.wearrental.WearRental.Controller.Dtos.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("api/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/{id}")
    public CustomerResponse get (@PathVariable("id") Long id){
        return CustomerResponse.from(customerService.get(id));
    }

    @PostMapping
    public ResponseEntity<CustomerResponse> create(@Valid @RequestBody CustomerRequest req){
        CustomerResponse body = CustomerResponse.from(customerService.create(req));
        var location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(body.id()).toUri();
        return ResponseEntity.created(location).body(body);
    }

    @PostMapping("/{id}")
    public CustomerResponse update(@PathVariable("id") Long id, @Valid @RequestBody CustomerRequest req){
        return CustomerResponse.from(customerService.update(id, req));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        customerService.delete(id);
    }

}
