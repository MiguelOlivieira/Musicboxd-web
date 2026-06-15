package musicboxd.controller;

import musicboxd.dto.request.PlaylistRequestDTO;
import musicboxd.dto.response.PlaylistResponseDTO;
import musicboxd.service.PlaylistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/playlists")
@RequiredArgsConstructor
public class PlaylistController {

    private final PlaylistService playlistService;

    @PostMapping
    public ResponseEntity<PlaylistResponseDTO> createPlaylist(@Valid @RequestBody PlaylistRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(playlistService.createPlaylist(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlaylistResponseDTO> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(playlistService.getPlaylistById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlaylistResponseDTO> updatePlaylist(
            @PathVariable Integer id,
            @Valid @RequestBody PlaylistRequestDTO request) {
        return ResponseEntity.ok(playlistService.updatePlaylist(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Integer id) {
        playlistService.deletePlaylist(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Void> addSongToPlaylist(
            @PathVariable Integer playlistId,
            @PathVariable Integer songId) {
        playlistService.addSongToPlaylist(playlistId, songId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Void> removeSongFromPlaylist(
            @PathVariable Integer playlistId,
            @PathVariable Integer songId) {
        playlistService.removeSongFromPlaylist(playlistId, songId);
        return ResponseEntity.noContent().build();
    }
}
