package musicboxd.dto.request;

import jakarta.validation.constraints.NotBlank;

public record MusicRequestDTO(
        
        @NotBlank(message = "O nome da música é obrigatório")
        String nomeMusica,
        
        @NotBlank(message = "O artista é obrigatório")
        String artista,
        
        String genero,
        
        String album
) {
}
