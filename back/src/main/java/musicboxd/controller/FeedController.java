package musicboxd.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import musicboxd.dto.response.PublicationResponseDTO;
import musicboxd.service.PublicationService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/feed")
@RequiredArgsConstructor
public class FeedController {

    private final PublicationService publicationService;

    @GetMapping
    public ResponseEntity<List<PublicationResponseDTO>> getFeed() {
        return ResponseEntity.ok(publicationService.getFeed());
    }
}