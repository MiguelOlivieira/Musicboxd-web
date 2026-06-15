package musicboxd.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record PlaylistRequestDTO(
        
        @NotBlank(message = "O nome da playlist é obrigatório")
        String nomePlaylist,
        
        List<Integer> musicasIds
) {
}
