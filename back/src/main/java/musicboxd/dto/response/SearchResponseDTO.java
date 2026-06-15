package musicboxd.dto.response;

import java.util.List;

public record SearchResponseDTO(
        List<MusicResponseDTO> albums,
        List<UserResponseDTO> users,
        List<PublicationResponseDTO> publications
) {
}