package musicboxd.dto.response;

public record UserResponseDTO(
        String id,
        String name,
        String username,
        String avatar,
        Integer followers,
        Integer following,
        Boolean isFollowing
) {
}
