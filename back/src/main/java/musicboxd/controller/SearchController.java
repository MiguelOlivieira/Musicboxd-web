package musicboxd.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import musicboxd.dto.response.MusicResponseDTO;
import musicboxd.service.MusicService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final MusicService musicService;

    @GetMapping
    public ResponseEntity<List<MusicResponseDTO>> search(@RequestParam(defaultValue = "") String q) {
        List<MusicResponseDTO> results = musicService.getAllAlbumsList().stream()
                .filter(m -> m.title().toLowerCase().contains(q.toLowerCase()) || 
                             m.artist().toLowerCase().contains(q.toLowerCase()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(results);
    }
}
