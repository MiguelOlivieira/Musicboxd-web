package musicboxd.controller;

import musicboxd.dto.request.PublicationRequestDTO;
import musicboxd.dto.response.PublicationResponseDTO;
import musicboxd.service.PublicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/publications")
@RequiredArgsConstructor
public class PublicationController {

    private final PublicationService publicationService;

    @PostMapping
    public ResponseEntity<PublicationResponseDTO> createPublication(@Valid @RequestBody PublicationRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(publicationService.createPublication(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicationResponseDTO> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(publicationService.getPublicationById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PublicationResponseDTO> updatePublication(
            @PathVariable Integer id,
            @Valid @RequestBody PublicationRequestDTO request) {
        return ResponseEntity.ok(publicationService.updatePublication(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable Integer id) {
        publicationService.deletePublication(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{publicationId}/feature")
    public ResponseEntity<Void> featurePublication(@PathVariable Integer publicationId) {
        publicationService.featurePublication(publicationId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{publicationId}/likes")
    public ResponseEntity<Void> likePublication(@PathVariable Integer publicationId) {
        publicationService.likePublication(publicationId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{publicationId}/likes")
    public ResponseEntity<Void> removeLike(@PathVariable Integer publicationId) {
        publicationService.removeLike(publicationId);
        return ResponseEntity.noContent().build();
    }
}
