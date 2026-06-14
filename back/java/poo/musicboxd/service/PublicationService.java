package poo.musicboxd.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import poo.musicboxd.dto.request.PublicationRequestDTO;
import poo.musicboxd.dto.response.MusicResponseDTO;
import poo.musicboxd.dto.response.PublicationResponseDTO;
import poo.musicboxd.dto.response.UserResponseDTO;
import poo.musicboxd.model.Music;
import poo.musicboxd.model.Publication;
import poo.musicboxd.model.User;
import poo.musicboxd.repository.MusicRepository;
import poo.musicboxd.repository.PublicationRepository;
import poo.musicboxd.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class PublicationService {

    private final PublicationRepository publicationRepository;
    private final MusicRepository musicRepository;
    private final UserRepository userRepository;
    private final MusicService musicService;

    @Transactional(readOnly = true)
    public Page<PublicationResponseDTO> getFeed(Pageable pageable) {
        return publicationRepository.findAll(pageable).map(this::mapToResponse);
    }

    @Transactional
    public PublicationResponseDTO createPublication(PublicationRequestDTO request) {
        Music music = musicRepository.findById(request.musicaID())
                .orElseThrow(() -> new RuntimeException("Música não encontrada com ID: " + request.musicaID()));
        User user = userRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Publication publication = Publication.builder()
                .descricao(request.descricao())
                .avaliacao(request.avaliacao())
                .like(request.like())
                .music(music)
                .user(user)
                .build();

        return mapToResponse(publicationRepository.save(publication));
    }

    @Transactional(readOnly = true)
    public PublicationResponseDTO getPublicationById(Integer id) {
        return mapToResponse(findById(id));
    }

    @Transactional
    public PublicationResponseDTO updatePublication(Integer id, PublicationRequestDTO request) {
        Publication publication = findById(id);

        publication.setDescricao(request.descricao());
        publication.setAvaliacao(request.avaliacao());
        publication.setLike(request.like());

        return mapToResponse(publicationRepository.save(publication));
    }

    @Transactional
    public void deletePublication(Integer id) {
        publicationRepository.delete(findById(id));
    }

    @Transactional
    public void featurePublication(Integer id) {
    }

    @Transactional
    public void likePublication(Integer id) {
        Publication publication = findById(id);
        publication.setLike(true);
        publicationRepository.save(publication);
    }

    @Transactional
    public void removeLike(Integer id) {
        Publication publication = findById(id);
        publication.setLike(false);
        publicationRepository.save(publication);
    }

    public Publication findById(Integer id) {
        return publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publicação não encontrada com ID: " + id));
    }

    private PublicationResponseDTO mapToResponse(Publication publication) {
        UserResponseDTO userDto = new UserResponseDTO(
                String.valueOf(publication.getUser().getUsuarioID()),
                publication.getUser().getNome(),
                publication.getUser().getEmail(),
                "",
                0,
                0,
                false
        );

        MusicResponseDTO albumDto = null;
        if (publication.getMusic() != null) {
            albumDto = musicService.mapToResponse(publication.getMusic());
        }

        return new PublicationResponseDTO(
                String.valueOf(publication.getPublicationID()),
                userDto,
                albumDto,
                publication.getAvaliacao(),
                LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME),
                publication.getDescricao(),
                publication.isLike() ? 1 : 0,
                0
        );
    }
}