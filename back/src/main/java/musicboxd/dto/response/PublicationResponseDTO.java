package musicboxd.dto.response;

public record PublicationResponseDTO(
        String id,
        UserResponseDTO user,
        MusicResponseDTO album,
        int rating,
        String timestamp,
        String review,
        int likes,
        int comments
) {
}
