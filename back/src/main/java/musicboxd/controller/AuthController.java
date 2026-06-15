package musicboxd.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import musicboxd.dto.request.LoginRequestDTO;
import musicboxd.dto.request.PasswordRecoveryRequestDTO;
import musicboxd.dto.request.UserRegisterRequestDTO;
import musicboxd.dto.response.AuthResponseDTO;
import musicboxd.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@Valid @RequestBody UserRegisterRequestDTO request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/password-recovery")
    public ResponseEntity<Void> passwordRecovery(@Valid @RequestBody PasswordRecoveryRequestDTO request) {
        authService.sendRecoveryEmail(request.email());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/validate-email")
    public ResponseEntity<Void> validateEmail(@RequestParam String email) {
        authService.validateEmail(email);
        return ResponseEntity.noContent().build();
    }
}
