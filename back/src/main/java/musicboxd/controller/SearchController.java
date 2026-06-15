package musicboxd.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import musicboxd.dto.response.SearchResponseDTO;
import musicboxd.dto.response.MusicResponseDTO;
import musicboxd.dto.response.UserResponseDTO;
import musicboxd.dto.response.PublicationResponseDTO;
import musicboxd.service.MusicService;
import musicboxd.service.UserService;
import musicboxd.service.PublicationService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final MusicService musicService;
    private final UserService userService;
    private final PublicationService publicationService;

    @GetMapping
    public ResponseEntity<SearchResponseDTO> search(@RequestParam(defaultValue = "") String q) {
        String query = q.toLowerCase();

        List<MusicResponseDTO> albums = musicService.getAllAlbumsList().stream()
                .filter(m -> m.title().toLowerCase().contains(query) || 
                             m.artist().toLowerCase().contains(query))
                .collect(Collectors.toList());

        // Alterado: Removido Pageable.unpaged() e .getContent()
        List<UserResponseDTO> users = userService.getAllUsers().stream()
                .filter(u -> u.name().toLowerCase().contains(query) || 
                             u.username().toLowerCase().contains(query))
                .collect(Collectors.toList());

        // Alterado: Removido Pageable.unpaged() e .getContent()
        List<PublicationResponseDTO> publications = publicationService.getFeed().stream()
                .filter(p -> p.review() != null && p.review().toLowerCase().contains(query))
                .collect(Collectors.toList());

        return ResponseEntity.ok(new SearchResponseDTO(albums, users, publications));
    }
}