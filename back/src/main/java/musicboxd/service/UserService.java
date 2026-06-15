package musicboxd.service;

import lombok.RequiredArgsConstructor;
import musicboxd.dto.response.PlaylistResponseDTO;
import musicboxd.dto.response.PublicationResponseDTO;
import musicboxd.dto.response.UserResponseDTO;
import musicboxd.model.User;
import musicboxd.repository.PlaylistRepository;
import musicboxd.repository.PublicationRepository;
import musicboxd.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;
    private final PublicationRepository publicationRepository;

    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getUserProfile(Integer id) {
        return mapToResponse(findById(id));
    }

    @Transactional(readOnly = true)
    public List<PlaylistResponseDTO> getUserPlaylists(Integer id) {
        return Collections.emptyList();
    }

    @Transactional(readOnly = true)
    public List<PublicationResponseDTO> getUserPublications(Integer id) {
        return Collections.emptyList();
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