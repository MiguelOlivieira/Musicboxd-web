package poo.musicboxd.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import poo.musicboxd.dto.response.PublicationResponseDTO;
import poo.musicboxd.service.PublicationService;

@RestController
@RequestMapping("/api/v1/feed")
@RequiredArgsConstructor
public class FeedController {

    private final PublicationService publicationService;

    @GetMapping
    public ResponseEntity<Page<PublicationResponseDTO>> getFeed(Pageable pageable) {
        return ResponseEntity.ok(publicationService.getFeed(pageable));
    }
}