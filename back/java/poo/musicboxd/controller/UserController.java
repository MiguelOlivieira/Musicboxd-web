package poo.musicboxd.controller;

import lombok.RequiredArgsConstructor;
import poo.musicboxd.dto.response.PlaylistResponseDTO;
import poo.musicboxd.dto.response.PublicationResponseDTO;
import poo.musicboxd.dto.response.UserResponseDTO;
import poo.musicboxd.service.UserService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userProfileService;

    @GetMapping
    public ResponseEntity<Page<UserResponseDTO>> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok(userProfileService.getAllUsers(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserProfile(@PathVariable Integer id) {
        return ResponseEntity.ok(userProfileService.getUserProfile(id));
    }

    @GetMapping("/{id}/playlists")
    public ResponseEntity<Page<PlaylistResponseDTO>> getUserPlaylists(
            @PathVariable Integer id, 
            Pageable pageable) {
        return ResponseEntity.ok(userProfileService.getUserPlaylists(id, pageable));
    }

    @GetMapping("/{id}/publications")
    public ResponseEntity<Page<PublicationResponseDTO>> getUserPublications(
            @PathVariable Integer id, 
            Pageable pageable) {
        return ResponseEntity.ok(userProfileService.getUserPublications(id, pageable));
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