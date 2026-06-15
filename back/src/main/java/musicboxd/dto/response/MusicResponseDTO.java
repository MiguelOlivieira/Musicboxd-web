package musicboxd.dto.response;

public record MusicResponseDTO(
        String id,
        String title,
        String artist,
        Integer year,
        String genre,
        String duration,
        String cover,
        double rating
) {
}
