package musicboxd.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PublicationRequestDTO(
        
        @NotBlank(message = "A descrição é obrigatória")
        String descricao,
        
        @Min(value = 0, message = "A avaliação mínima é 0")
        @Max(value = 5, message = "A avaliação máxima é 5")
        int avaliacao,
        
        boolean like,
        
        @NotNull(message = "O ID da música é obrigatório")
        Integer musicaID
) {
}
