package musicboxd.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import musicboxd.dto.request.MusicRequestDTO;
import musicboxd.dto.response.MusicResponseDTO;
import musicboxd.service.MusicService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/albums")
@RequiredArgsConstructor
public class AlbumController {

    private final MusicService musicService;

    @GetMapping
    public ResponseEntity<List<MusicResponseDTO>> getAlbums(
            @RequestParam(required = false, defaultValue = "false") boolean featured) {
        if (featured) {
            return ResponseEntity.ok(musicService.getFeaturedAlbums());
        }
        return ResponseEntity.ok(musicService.getAllAlbumsList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MusicResponseDTO> getAlbumById(@PathVariable Integer id) {
        return ResponseEntity.ok(musicService.getMusicById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MusicResponseDTO> updateAlbum(
            @PathVariable Integer id,
            @Valid @RequestBody MusicRequestDTO request) {
        return ResponseEntity.ok(musicService.updateMusic(id, request));
    }
}