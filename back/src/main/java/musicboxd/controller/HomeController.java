package musicboxd.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class HomeController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> home() {
        return ResponseEntity.ok(Map.of(
                "application", "Musicboxd API",
                "status", "online",
                "timestamp", LocalDateTime.now(),
                "version", "v1"
        ));
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("API funcionando corretamente");
    }

    @GetMapping("/about")
    public ResponseEntity<Map<String, String>> about() {
        return ResponseEntity.ok(Map.of(
                "name", "Musicboxd",
                "description", "Plataforma social para compartilhar experiências musicais",
                "developer", "Equipe Musicboxd"
        ));
    }
}
