package musicboxd.service;

import musicboxd.dto.request.MusicRequestDTO;
import musicboxd.dto.response.MusicResponseDTO;
import musicboxd.model.Music;
import musicboxd.model.Publication;
import musicboxd.repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class MusicService {

    private final MusicRepository musicRepository;

    @Transactional(readOnly = true)
    public List<MusicResponseDTO> getFeaturedAlbums() {
        return musicRepository.findAll().stream()
                .map(this::mapToResponse)
                .limit(5)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MusicResponseDTO> getAllAlbumsList() {
        return musicRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public MusicResponseDTO createMusic(MusicRequestDTO request) {
        Music music = Music.builder()
                .nomeMusica(request.nomeMusica())
                .artista(request.artista())
                .genero(request.genero())
                .album(request.album())
                .build();

        return mapToResponse(musicRepository.save(music));
    }

    @Transactional(readOnly = true)
    public MusicResponseDTO getMusicById(Integer id) {
        return mapToResponse(findById(id));
    }

    @Transactional(readOnly = true)
    public Page<MusicResponseDTO> getAllMusics(Pageable pageable) {
        return musicRepository.findAll(pageable).map(this::mapToResponse);
    }

    @Transactional
    public MusicResponseDTO updateMusic(Integer id, MusicRequestDTO request) {
        Music music = findById(id);

        music.setNomeMusica(request.nomeMusica());
        music.setArtista(request.artista());
        music.setGenero(request.genero());
        music.setAlbum(request.album());

        return mapToResponse(musicRepository.save(music));
    }

    @Transactional
    public void deleteMusic(Integer id) {
        musicRepository.delete(findById(id));
    }

    public Music findById(Integer id) {
        return musicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Música não encontrada com ID: " + id));
    }

    public MusicResponseDTO mapToResponse(Music music) {
        double mediaAvaliacoes = 0.0;
        List<Publication> publicacoes = music.getPublications();
        
        if (publicacoes != null && !publicacoes.isEmpty()) {
            mediaAvaliacoes = publicacoes.stream()
                    .mapToInt(Publication::getAvaliacao)
                    .average()
                    .orElse(0.0);
        }

        return new MusicResponseDTO(
                String.valueOf(music.getMusicaID()), 
                music.getNomeMusica(),
                music.getArtista(),
                2023, 
                music.getGenero() != null ? music.getGenero() : "Desconhecido",
                "0:00",
                "",
                mediaAvaliacoes
        );
    }
}