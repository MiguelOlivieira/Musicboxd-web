package musicboxd.service;

import musicboxd.dto.request.PlaylistRequestDTO;
import musicboxd.dto.response.MusicResponseDTO;
import musicboxd.dto.response.PlaylistResponseDTO;
import musicboxd.model.Music;
import musicboxd.model.Playlist;
import musicboxd.model.User;
import musicboxd.repository.PlaylistRepository;
import musicboxd.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final MusicService musicService;
    private final UserRepository userRepository;

    @Transactional
    public PlaylistResponseDTO createPlaylist(PlaylistRequestDTO request) {
        User user = userRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<Music> musicas = request.musicasIds() != null ? 
                request.musicasIds().stream()
                        .map(musicService::findById)
                        .collect(Collectors.toList()) 
                : List.of();

        Playlist playlist = Playlist.builder()
                .nomePlaylist(request.nomePlaylist())
                .playlist(musicas)
                .user(user)
                .build();

        return mapToResponse(playlistRepository.save(playlist));
    }

    @Transactional(readOnly = true)
    public PlaylistResponseDTO getPlaylistById(Integer id) {
        return mapToResponse(findById(id));
    }

    @Transactional
    public PlaylistResponseDTO updatePlaylist(Integer id, PlaylistRequestDTO request) {
        Playlist playlist = findById(id);

        playlist.setNomePlaylist(request.nomePlaylist());

        if (request.musicasIds() != null) {
            List<Music> musicas = request.musicasIds().stream()
                    .map(musicService::findById)
                    .collect(Collectors.toList());
            playlist.setPlaylist(musicas);
        }

        return mapToResponse(playlistRepository.save(playlist));
    }

    @Transactional
    public void deletePlaylist(Integer id) {
        playlistRepository.delete(findById(id));
    }

    @Transactional
    public void addSongToPlaylist(Integer playlistId, Integer songId) {
        Playlist playlist = findById(playlistId);
        Music music = musicService.findById(songId);

        if (!playlist.getPlaylist().contains(music)) {
            playlist.getPlaylist().add(music);
            playlistRepository.save(playlist);
        }
    }

    @Transactional
    public void removeSongFromPlaylist(Integer playlistId, Integer songId) {
        Playlist playlist = findById(playlistId);
        Music music = musicService.findById(songId);

        playlist.getPlaylist().remove(music);
        playlistRepository.save(playlist);
    }

    public Playlist findById(Integer id) {
        return playlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada com ID: " + id));
    }

    private PlaylistResponseDTO mapToResponse(Playlist playlist) {
        List<MusicResponseDTO> musicasDtos = playlist.getPlaylist().stream()
                .map(musicService::mapToResponse)
                .collect(Collectors.toList());

        return new PlaylistResponseDTO(
                playlist.getPlaylistID(),
                playlist.getNomePlaylist(),
                musicasDtos
        );
    }
}