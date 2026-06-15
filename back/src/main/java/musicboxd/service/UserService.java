package musicboxd.service;

import lombok.RequiredArgsConstructor;
import musicboxd.dto.response.PlaylistResponseDTO;
import musicboxd.dto.response.PublicationResponseDTO;
import musicboxd.dto.response.UserResponseDTO;
import musicboxd.model.User;
import musicboxd.repository.PlaylistRepository;
import musicboxd.repository.PublicationRepository;
import musicboxd.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class UserService {

    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;
    private final PublicationRepository publicationRepository;

    @Transactional(readOnly = true)
    public Page<UserResponseDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getUserProfile(Integer id) {
        return mapToResponse(findById(id));
    }

    @Transactional(readOnly = true)
    public Page<PlaylistResponseDTO> getUserPlaylists(Integer id, Pageable pageable) {
        return new PageImpl<>(Collections.<PlaylistResponseDTO>emptyList());
    }

    @Transactional(readOnly = true)
    public Page<PublicationResponseDTO> getUserPublications(Integer id, Pageable pageable) {
        return new PageImpl<>(Collections.<PublicationResponseDTO>emptyList());
    }

    @Transactional
    public void deletePlaylist(Integer userId, Integer playlistId) {
        findById(userId);
        playlistRepository.deleteById(playlistId);
    }

    @Transactional
    public void deletePublication(Integer userId, Integer publicationId) {
        findById(userId);
        publicationRepository.deleteById(publicationId);
    }

    @Transactional
    public void followUser(Integer id) {
        User user = findById(id);
        userRepository.save(user);
    }

    @Transactional
    public void unfollowUser(Integer id) {
        User user = findById(id);
        userRepository.save(user);
    }

    public User findById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    private UserResponseDTO mapToResponse(User user) {
        return new UserResponseDTO(
                String.valueOf(user.getUsuarioID()),
                user.getNome(),
                user.getEmail(),
                "",
                0,
                0,
                false
        );
    }
}