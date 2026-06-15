package musicboxd.dto.response;

import java.util.List;

public record PlaylistResponseDTO(
        int playlistID,
        String nomePlaylist,
        List<MusicResponseDTO> playlist
) {
}
