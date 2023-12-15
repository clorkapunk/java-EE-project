package com.alibou.security.demo;

import com.alibou.security.book.Book;
import com.alibou.security.book.BookRepository;
import com.alibou.security.book.BookRequest;
import com.alibou.security.book.BookService;
import com.alibou.security.user.User;
import com.alibou.security.user.UserRepository;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/management")
@CrossOrigin(origins = "*")
@Tag(name = "Management")
public class ManagementController {
    private final BookService service;
    private final BookRepository repository;
    private final UserRepository userRepository;

    public ManagementController(BookService service, BookRepository repository, UserRepository userRepository) {
        this.service = service;
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Operation(
            description = "Get endpoint for manager",
            summary = "This is a summary for management get endpoint",
            responses = {
                    @ApiResponse(
                            description = "Success",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Unauthorized / Invalid Token",
                            responseCode = "403"
                    )
            }

    )

    @GetMapping("/userById/{userId}")
    public Optional<User> getUser(@PathVariable("userId") Integer id){
        return userRepository.findById(id);
    }


    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody BookRequest request
    ) {
        service.save(request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping
    public ResponseEntity<List<Book>> findAllBooks() {
        return ResponseEntity.ok(service.findAll());
    }

    @DeleteMapping("{bookId}")
    @Hidden
    public void deleteBook(@PathVariable("bookId") Integer id){
        repository.deleteById(id);
    }

    @PutMapping("{bookId}")
    @Hidden
    public void updateCustomer(@PathVariable("bookId") Integer id, @RequestBody BookRequest request){
        Book book = repository.findById(id)
                .orElseThrow(() -> new IllegalIdentifierException("Not found: " + id));
        book.setAuthor(request.getAuthor() == null ? book.getAuthor() : request.getAuthor());
        book.setIsbn(request.getIsbn() == null ? book.getIsbn() : request.getIsbn());
        repository.save(book);
    }
}
