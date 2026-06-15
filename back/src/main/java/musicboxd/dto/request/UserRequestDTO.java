package musicboxd.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRequestDTO(
        
        @NotBlank(message = "O nome é obrigatório")
        String nome,
        
        String biografia,
        
        @NotBlank(message = "O email é obrigatório")
        @Email(message = "Formato de email inválido")
        String email,
        
        String sexo
) {
}
