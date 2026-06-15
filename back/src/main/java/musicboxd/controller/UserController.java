package musicboxd.controller;

import lombok.RequiredArgsConstructor;
import musicboxd.dto.response.PlaylistResponseDTO;
import musicboxd.dto.response.PublicationResponseDTO;
import musicboxd.dto.response.UserResponseDTO;
import musicboxd.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userProfileService;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userProfileService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserProfile(@PathVariable Integer id) {
        return ResponseEntity.ok(userProfileService.getUserProfile(id));
    }

    @GetMapping("/{id}/playlists")
    public ResponseEntity<List<PlaylistResponseDTO>> getUserPlaylists(@PathVariable Integer id) {
        return ResponseEntity.ok(userProfileService.getUserPlaylists(id));
    }

    @GetMapping("/{id}/publications")
    public ResponseEntity<List<PublicationResponseDTO>> getUserPublications(@PathVariable Integer id) {
        return ResponseEntity.ok(userProfileService.getUserPublications(id));
    }

    @DeleteMapping("/{userId}/playlists/{playlistId}")
    public ResponseEntity<Void> deletePlaylist(
            @PathVariable Integer userId, 
            @PathVariable Integer playlistId) {
        userProfileService.deletePlaylist(userId, playlistId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}/publications/{publicationId}")
    public ResponseEntity<Void> deletePublication(
            @PathVariable Integer userId, 
            @PathVariable Integer publicationId) {
        userProfileService.deletePublication(userId, publicationId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity<Void> followUser(@PathVariable Integer id) {
        userProfileService.followUser(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/follow")
    public ResponseEntity<Void> unfollowUser(@PathVariable Integer id) {
        userProfileService.unfollowUser(id);
        return ResponseEntity.noContent().build();
    }
}